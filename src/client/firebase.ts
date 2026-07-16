// Firebase JS SDK client — PacketFlow
// Credentials are loaded from EXPO_PUBLIC_FIREBASE_* env vars.
// Switch between Supabase and Firebase via useSettingsStore.backend
import { type FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { type Auth, getAuth } from 'firebase/auth';
import { type Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain:        process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId:         process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket:     process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId:             process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? '',
};

// Avoid duplicate app initialization in hot-reload environments
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const firebaseApp = app;
export const firebaseAuth: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);
