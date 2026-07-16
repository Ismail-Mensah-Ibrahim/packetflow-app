# Backend Integration

PacketFlow utilizes a hybrid backend architecture relying on both **Supabase** and **Firebase**.

## Firebase
- **Initialization**: `src/lib/firebase.ts`
- **Purpose**: Primarily handles user authentication, identity management, and potential telemetry or push notification services. 
- **SDK**: Uses standard Firebase JavaScript SDK (`firebase/app`, `firebase/auth`).

## Supabase
- **Initialization**: `src/lib/supabase.ts`
- **Purpose**: Acts as the primary relational database. Stores complex relational data such as:
  - User Profiles (name, bio, avatars)
  - Projects (topology state, nodes, edges)
  - Notifications
- **SDK**: Uses `@supabase/supabase-js`.

## Data Flow
1. **Auth Sync**: When a user registers via Firebase Auth, a corresponding profile record is typically required in Supabase to link relational data to that user ID.
2. **Client Fetching**: `@tanstack/react-query` is used throughout the application to fetch and cache data from Supabase, ensuring the UI remains snappy and optimistic updates can be applied where necessary.
3. **Saving State**: When a user saves a topology on the canvas, the `nodes` and `edges` JSON arrays are serialized and pushed to the corresponding project row in Supabase.
