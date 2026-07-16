# Environment Variables

PacketFlow relies on environment variables for configuring its connection to Firebase and Supabase. 

## Setup
Create a file named `.env.local` in the root of your project directory. This file is ignored by Git to prevent secrets from leaking into version control.

## Required Variables

### Firebase Configuration
Used for authentication and specific real-time services.
```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Supabase Configuration
Used for primary database storage, profile management, and project state syncing.
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Usage in Code
Because we use Expo, all environment variables intended for the client **must** be prefixed with `EXPO_PUBLIC_`. These are replaced inline at build time.

Access them in code via `process.env`:
```typescript
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  // ...
};
```
