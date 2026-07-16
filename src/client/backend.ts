// Backend switcher — Supabase ↔ Firebase
// Import this instead of importing api.ts or firebase-api.ts directly.
// The active backend is read from useSettingsStore.backend.

// Supabase implementations
import {
	createProject as sbCreateProject,
	deleteProject as sbDeleteProject,
	duplicateProject as sbDuplicateProject,
	fetchArchivedProjects as sbFetchArchivedProjects,
	fetchNotifications as sbFetchNotifications,
	fetchProfile as sbFetchProfile,
	fetchProjectById as sbFetchProjectById,
	fetchProjects as sbFetchProjects,
	markAllNotificationsRead as sbMarkAllNotificationsRead,
	markNotificationRead as sbMarkNotificationRead,
	updateProfile as sbUpdateProfile,
	updateProjectMeta as sbUpdateProjectMeta,
	updateTopology as sbUpdateTopology,
} from "@/db/api";
// Firebase implementations
import {
	fbArchiveProject,
	fbCreateProject,
	fbDeleteProject,
	fbDuplicateProject,
	fbFetchArchivedProjects,
	fbFetchNotifications,
	fbFetchProfile,
	fbFetchProjectById,
	fbFetchProjects,
	fbMarkAllNotificationsRead,
	fbMarkNotificationRead,
	fbRenameProject,
	fbUpdateProfile,
	fbUpdateProjectMeta,
	fbUpdateTopology,
} from "@/db/firebase-api";
import { useSettingsStore } from "@/store/useSettingsStore";
import type { AppNotification, Profile, Project, TopologyData } from "@/types";

function useBackend() {
	return useSettingsStore.getState().backend ?? "firebase";
}

export const backendApi = {
	fetchProjects: (userId: string): Promise<Project[]> =>
		useBackend() === "firebase"
			? fbFetchProjects(userId)
			: sbFetchProjects(userId),

	fetchArchivedProjects: (userId: string): Promise<Project[]> =>
		useBackend() === "firebase"
			? fbFetchArchivedProjects(userId)
			: sbFetchArchivedProjects(userId),

	fetchProjectById: (id: string): Promise<Project | null> =>
		useBackend() === "firebase"
			? fbFetchProjectById(id)
			: sbFetchProjectById(id),

	createProject: (
		userId: string,
		name: string,
		description?: string,
	): Promise<Project> =>
		useBackend() === "firebase"
			? fbCreateProject(userId, name, description)
			: sbCreateProject(name, description),

	updateTopology: (projectId: string, topology: TopologyData): Promise<void> =>
		useBackend() === "firebase"
			? fbUpdateTopology(projectId, topology)
			: sbUpdateTopology(projectId, topology),

	deleteProject: (projectId: string): Promise<void> =>
		useBackend() === "firebase"
			? fbDeleteProject(projectId)
			: sbDeleteProject(projectId),

	archiveProject: (projectId: string): Promise<void> =>
		useBackend() === "firebase"
			? fbArchiveProject(projectId)
			: sbUpdateProjectMeta(projectId, { is_archived: true }),

	renameProject: (projectId: string, name: string): Promise<void> =>
		useBackend() === "firebase"
			? fbRenameProject(projectId, name)
			: sbUpdateProjectMeta(projectId, { name }),

	fetchProfile: (userId: string): Promise<Profile | null> =>
		useBackend() === "firebase"
			? fbFetchProfile(userId)
			: sbFetchProfile(userId),

	updateProfile: (
		userId: string,
		updates: Partial<Profile>,
	): Promise<Profile> =>
		useBackend() === "firebase"
			? fbUpdateProfile(userId, updates)
			: sbUpdateProfile(userId, updates),

	duplicateProject: (project: Project): Promise<Project> =>
		useBackend() === "firebase"
			? fbDuplicateProject(project)
			: sbDuplicateProject(project),

	updateProjectMeta: (
		id: string,
		updates: Partial<
			Pick<Project, "name" | "description" | "is_favorite" | "is_archived">
		>,
	): Promise<void> =>
		useBackend() === "firebase"
			? fbUpdateProjectMeta(id, updates)
			: sbUpdateProjectMeta(id, updates),

	fetchNotifications: (userId: string): Promise<AppNotification[]> =>
		useBackend() === "firebase"
			? fbFetchNotifications(userId)
			: sbFetchNotifications(userId),

	markNotificationRead: (id: string): Promise<void> =>
		useBackend() === "firebase"
			? fbMarkNotificationRead(id)
			: sbMarkNotificationRead(id),

	markAllNotificationsRead: (userId: string): Promise<void> =>
		useBackend() === "firebase"
			? fbMarkAllNotificationsRead(userId)
			: sbMarkAllNotificationsRead(userId),
};
