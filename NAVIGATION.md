# Navigation

Navigation in PacketFlow is strictly handled by **Expo Router**, providing a file-based routing architecture similar to Next.js.

## Directory Structure Maps to Routes
The `src/app` directory is the root of our navigation tree.

- `src/app/_layout.tsx`: The root layout. Handles global providers (Theme, QueryClient, GestureHandler).
- `src/app/(auth)/...`: All authentication screens. The `(auth)` group is omitted from the URL path.
- `src/app/(app)/...`: The main authenticated application.
  - `(tabs)`: A bottom tab navigator containing `home`, `projects`, `saved`, and `profile`.
  - `canvas/[id].tsx`: A dynamic route for the interactive topology editor. Accessed via `/canvas/123`.
  - `view/[id].tsx`: A read-only view for a project.

## Programmatic Navigation
To navigate between screens, use the `useRouter` hook provided by `expo-router`:

```typescript
import { useRouter } from 'expo-router';

export function MyComponent() {
  const router = useRouter();

  return (
    <Button onPress={() => router.push('/(app)/canvas/123')}>
      Open Canvas
    </Button>
  );
}
```

## Deep Linking
Because we use Expo Router, deep linking is supported out-of-the-box. The URL scheme is defined in `app.json` as `packetflow://`.
