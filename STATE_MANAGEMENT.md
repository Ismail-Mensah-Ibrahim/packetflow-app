# State Management

State in PacketFlow is divided into two distinct categories: Local/Client State and Server State.

## Local / Client State (Zustand)
We use **Zustand** for high-performance, un-opinionated local state management. Store definitions are located in `src/store/`.

### `useCanvasStore.ts`
The canvas requires extremely fast reads and writes that shouldn't trigger global React re-renders unless absolutely necessary.
- Manages the active tool (Select, Connect, Delete, etc.).
- Manages selected node IDs and edge IDs.
- *Note:* The actual X/Y panning and zooming values are typically stored in Reanimated `useSharedValue` for 60fps performance, bypassing Zustand to avoid JS thread bottlenecks.

### `useThemeStore.ts`
Manages the user's explicit preference for Light/Dark mode, overriding the system default if requested.

## Server State (React Query)
We use **@tanstack/react-query** for fetching, caching, synchronizing, and updating server state.

### Implementation Details
- React Query handles caching lists of projects, user profiles, and notification feeds.
- Queries are invalidated upon mutation (e.g., after saving a project, the `['projects']` query is invalidated to instantly reflect the updated timestamp on the home screen).

```typescript
const { data, isLoading } = useQuery({
  queryKey: ['project', projectId],
  queryFn: () => fetchProjectById(projectId),
});
```
