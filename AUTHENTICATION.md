# Authentication

Authentication in PacketFlow is managed via **Firebase Auth**.

## Flow Overview
1. **Unauthenticated State**: Users are presented with the `(auth)` route group, containing `login`, `register`, `forgot-password`, and `onboarding` screens.
2. **Session Verification**: The root layout (`src/app/_layout.tsx`) or an Auth Provider wraps the application and listens to `onAuthStateChanged`. 
3. **Routing**: Expo Router dynamically redirects users to the `(app)` group once a valid session is detected, or kicks them back to `(auth)` if the session expires or they log out.

## Key Files
- `src/app/(auth)/login.tsx`: Handles user sign-in.
- `src/app/(auth)/register.tsx`: Handles account creation.
- `src/lib/firebase.ts`: Exports the initialized `auth` instance.

## Session State
The current user's session is typically synced into a global store (e.g., Zustand) or passed down via a Context Provider, ensuring that components across the app have instantaneous access to the user's `uid` and status.
