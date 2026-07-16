# Folder Structure

PacketFlow uses a structured, feature-based directory layout to keep the codebase modular, scalable, and easy to navigate.

## Root Directory
- **`src/`**: The core source code of the application.
- **`docs/`**: Developer documentation (you are here).
- **`assets/`**: Static assets like images and fonts used by Expo.
- **`package.json`, `app.json`, `metro.config.js`, `babel.config.js`**: Core project configuration.

## `src/` Directory Breakdown

```text
src/
├── app/                  # Expo Router file-based routing
│   ├── (auth)/           # Unauthenticated routes (Login, Register, Onboarding)
│   ├── (app)/            # Authenticated application routes
│   │   ├── (tabs)/       # Bottom tab navigation screens
│   │   ├── canvas/       # Interactive topology canvas route
│   │   └── view/         # Read-only project view
│   ├── _layout.tsx       # Root layout provider
│   └── +not-found.tsx    # 404 handler
├── components/           # Reusable UI components (Buttons, Inputs, Modals)
│   ├── ui/               # rn-primitives and base UI elements
│   └── ...               # Domain-agnostic components
├── features/             # Feature-sliced modules encapsulating specific business logic
│   ├── devices/          # Device catalog, drawer, and related components
│   ├── terminal/         # Simulation output panel logic
│   └── ...
├── lib/                  # Utilities, core logic, and third-party wrappers
│   ├── firebase.ts       # Firebase initialization
│   ├── supabase.ts       # Supabase client setup
│   ├── topologyCache.ts  # Caching logic for canvas states
│   └── utils.ts          # General helper functions (Tailwind merge, etc.)
└── store/                # Zustand global state stores
    ├── useCanvasStore.ts # State for canvas pan, zoom, selection
    ├── useThemeStore.ts  # Light/Dark mode state
    └── ...
```

### Design Principles
1. **File-based Routing**: If it's a screen or page, it belongs in `src/app/`.
2. **Feature Slices**: If components, hooks, and logic are heavily tied to a specific domain (e.g., the Terminal), they are grouped under `src/features/<domain>/` rather than scattered globally.
3. **Shared Components**: Dumb, reusable components go in `src/components/`.
