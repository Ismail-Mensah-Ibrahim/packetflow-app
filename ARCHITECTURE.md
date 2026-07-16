# Architecture Overview

PacketFlow follows a modern, feature-sliced architectural pattern tailored for Expo and React Native applications.

## High-Level Architecture
The application is built on top of **Expo** and relies on **Expo Router** for file-based navigation. 

### Presentation Layer
- **UI Framework**: React Native 0.86 with Expo SDK 57.
- **Styling**: NativeWind (Tailwind CSS for React Native) provides utility-class styling. `rn-primitives` is used for accessible UI components (dialogs, tooltips, accordions).
- **Animations & Gestures**: `react-native-reanimated` and `react-native-gesture-handler` power the interactive canvas (pan, zoom, drag-and-drop).

### State Management Layer
- **Local/Client State**: `zustand` is used for the complex, fast-updating states like the `useCanvasStore` (pan, zoom, active tool) and `useThemeStore`.
- **Server/Async State**: `@tanstack/react-query` is utilized for fetching, caching, and updating asynchronous data from the backend (projects, profiles).

### Backend / Infrastructure Layer
The application utilizes a dual-backend approach to leverage the specific strengths of two major platforms:
- **Firebase**: Handles secure authentication, push notifications, and some real-time telemetry.
- **Supabase**: Serves as the primary Postgres database for relational data, project state storage, profiles, and complex querying.

### Routing Layer
- **Expo Router (File-based)**: The `src/app` directory maps directly to the application routes. The `(auth)` group handles unauthenticated states, while the `(app)` group handles the main authenticated application flow.

## Core Domain: The Canvas
The most complex architectural piece is the topology canvas (`src/app/(app)/canvas/[id].tsx`). 
It strictly separates:
- **Gesture Handling**: Captured via `GestureDetector`.
- **Shared Values**: Stored via Reanimated `useSharedValue` for 60fps performance without triggering React re-renders.
- **Rendering**: Heavy SVG and view rendering is optimized to rely on these shared values, bypassing the main JS thread where possible.
