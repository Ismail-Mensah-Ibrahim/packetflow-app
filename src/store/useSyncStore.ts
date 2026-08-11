import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";
import { create } from "zustand";
import { backendApi } from "@/client/backend";
import { saveTopologyCache } from "@/lib/topologyCache";
import type { NetworkEdge, NetworkNode } from "@/types";

export type SyncStateStatus =
	| "idle"
	| "dirty"
	| "syncing"
	| "synced"
	| "offline"
	| "error";

interface PendingSave {
	projectId: string;
	projectName: string;
	nodes: NetworkNode[];
	edges: NetworkEdge[];
}

interface SyncState {
	status: SyncStateStatus;
	lastSyncedAt: Date | null;
	syncError: string | null;
	pendingSave: PendingSave | null;
	retryCount: number;

	queueSave: (
		projectId: string,
		projectName: string,
		nodes: NetworkNode[],
		edges: NetworkEdge[],
	) => void;
	flushLocal: () => Promise<void>;
	syncData: (retryCount?: number) => Promise<void>;
	setOffline: (isOffline: boolean) => void;
}

const MAX_RETRIES = 5;
const PENDING_SAVE_KEY = "@packetflow_pending_save";

export const useSyncStore = create<SyncState>((set, get) => ({
	status: "idle",
	lastSyncedAt: null,
	syncError: null,
	pendingSave: null,
	retryCount: 0,

	queueSave: (projectId, projectName, nodes, edges) => {
		const pendingSave = { projectId, projectName, nodes, edges };
		set({ pendingSave, status: "dirty" });

		// Immediately persist locally asynchronously without blocking
		get()
			.flushLocal()
			.then(() => {
				// After local save succeeds, attempt cloud sync if not already syncing
				if (get().status !== "syncing") {
					get().syncData(0);
				}
			});
	},

	flushLocal: async () => {
		const state = get();
		if (!state.pendingSave) return;
		try {
			// Write to both our topology cache and AsyncStorage for durability
			await saveTopologyCache(
				state.pendingSave.projectId,
				state.pendingSave.projectName,
				{ nodes: state.pendingSave.nodes, edges: state.pendingSave.edges },
			);
			await AsyncStorage.setItem(
				PENDING_SAVE_KEY,
				JSON.stringify(state.pendingSave),
			);
		} catch (e) {
			console.error("Failed to persist locally", e);
		}
	},

	syncData: async (retryCount = 0) => {
		const state = get();
		if (!state.pendingSave) return;

		set({ status: "syncing", syncError: null, retryCount });
		const { projectId, nodes, edges } = state.pendingSave;

		try {
			// Proceed with network attempt
			await backendApi.updateTopology(projectId, { nodes, edges });

			// Success! Clear dirty flag and AsyncStorage
			set({
				status: "synced",
				lastSyncedAt: new Date(),
				pendingSave: null,
				retryCount: 0,
			});
			await AsyncStorage.removeItem(PENDING_SAVE_KEY);
		} catch (error: any) {
			console.warn(`Sync failed (attempt ${retryCount + 1}):`, error.message);

			if (retryCount < MAX_RETRIES) {
				// Exponential backoff
				const delay = Math.min(1000 * 2 ** retryCount, 30000);
				set({ status: "error", syncError: error.message });
				setTimeout(() => {
					// Only retry if we haven't successfully synced in the meantime
					if (get().pendingSave) {
						get().syncData(retryCount + 1);
					}
				}, delay);
			} else {
				set({ status: "offline", syncError: "Max retries reached" });
			}
		}
	},

	setOffline: (isOffline: boolean) => {
		set({ status: isOffline ? "offline" : "idle" });
		if (!isOffline && get().pendingSave) {
			get().syncData(0);
		}
	},
}));

// Initialize AppState listener for background saving
AppState.addEventListener("change", (state) => {
	if (state === "background" || state === "inactive") {
		// Flush immediately to local storage before OS suspends app
		useSyncStore.getState().flushLocal();
	} else if (state === "active") {
		// Attempt sync when returning to app if we have pending data
		const store = useSyncStore.getState();
		if (store.pendingSave && store.status !== "syncing") {
			store.syncData(0);
		}
	}
});
