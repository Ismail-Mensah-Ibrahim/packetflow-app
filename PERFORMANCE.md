# Performance Guidelines

To ensure PacketFlow maintains a 60fps experience even with complex network topologies, follow these performance best practices.

## The Canvas (`useSharedValue`)
Do **not** use React `useState` for anything related to real-time drag, pan, or zoom on the canvas. 
- Always use `react-native-reanimated`'s `useSharedValue`.
- Always apply updates via `useAnimatedStyle`.
- Passing data back to the JS thread (via `runOnJS`) should only be done at the *end* of a gesture (e.g., `onEnd` of a drag) to save the final coordinates to the database.

## List Rendering
For standard lists (e.g., Notifications, Terminal output):
- Use `FlatList`.
- Provide an explicit `keyExtractor`.
- For massive lists, apply `initialNumToRender`, `maxToRenderPerBatch`, and `windowSize` to prevent memory bloat.
- **Future Upgrade Path**: If rendering limits are reached, migrate from `FlatList` to `@shopify/flash-list` for view recycling.

## Memoization
- Wrap heavy canvas nodes or static UI elements in `React.memo` to prevent unnecessary re-renders when the parent context changes.
- Use `useCallback` for functions passed down to multiple child components (especially inside `FlatList` `renderItem`).
- Use `useMemo` when computing complex topological routes or packet traces before passing the result to the UI.

## Image Optimization
- Always use `expo-image` rather than the standard React Native `Image` component. It provides automatic disk caching and memory management.
