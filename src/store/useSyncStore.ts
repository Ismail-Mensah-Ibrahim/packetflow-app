import { create } from "zustand";
import { backendApi } from "@/client/backend";
import { saveTopologyCache } from "@/lib/topologyCache";
import type { NetworkEdge, NetworkNode } from "@/types";

interface SyncState {
	isSyncing: boolean;
	isOffline: boolean;
	lastSyncedAt: Date | null;
	pendingSave: {
		projectId: string;
		projectName: string;
		nodes: NetworkNode[];
		edges: NetworkEdge[];
	} | null;
	syncError: string | null;

	queueSave: (
		projectId: string,
		projectName: string,
		nodes: NetworkNode[],
		edges: NetworkEdge[],
	) => void;
	flushSync: () => Promise<void>;
	setOffline: (status: boolean) => void;
}

export const useSyncStore = create<SyncState>((set, get) => ({
	isSyncing: false,
	isOffline: false,
	lastSyncedAt: null,
	pendingSave: null,
	syncError: null,

	queueSave: (projectId, projectName, nodes, edges) => {
		set({ pendingSave: { projectId, projectName, nodes, edges } });
		get().flushSync();
	},

	flushSync: async () => {
		const state = get();
		if (state.isSyncing || !state.pendingSave) return;

		set({ isSyncing: true, syncError: null });
		const { projectId, projectName, nodes, edges } = state.pendingSave;

		try {
			// Always save to local cache first
			await saveTopologyCache(projectId, projectName, { nodes, edges });

			// Attempt remote sync
			await backendApi.updateTopology(projectId, { nodes, edges });

			set({
				isSyncing: false,
				isOffline: false,
				lastSyncedAt: new Date(),
				pendingSave: null,
			});
		} catch (error: any) {
			// Network failed or backend error
			console.error("Sync error:", error);
			set({
				isSyncing: false,
				isOffline: true,
				syncError: error.message || "Failed to sync",
				// Keep pendingSave so it can be retried later
			});
		}
	},

	setOffline: (status: boolean) => {
		set({ isOffline: status });
		if (!status) {
			get().flushSync(); // Retry sync when coming back online
		}
	},
}));

// Initialize AppState listener for background saving
import { AppState } from "react-native";

AppState.addEventListener("change", (state) => {
	if (state === "background" || state === "inactive") {
		useSyncStore.getState().flushSync();
	}
});
