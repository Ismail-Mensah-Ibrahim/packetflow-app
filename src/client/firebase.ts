// Firebase JS SDK client — PacketFlow
// Credentials are loaded from EXPO_PUBLIC_FIREBASE_* env vars.
// Switch between Supabase and Firebase via useSettingsStore.backend

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { type FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { type Auth, getAuth, initializeAuth } from "firebase/auth";
// @ts-expect-error
import { getReactNativePersistence } from "firebase/auth";
import { type Firestore, initializeFirestore } from "firebase/firestore";
import { Platform } from "react-native";

const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "",
	authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
	projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "",
	storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
	messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
	appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "",
	measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};

// Avoid duplicate app initialization in hot-reload environments
let app: FirebaseApp;
if (getApps().length === 0) {
	app = initializeApp(firebaseConfig);
} else {
	app = getApp();
}

let auth: Auth;
if (Platform.OS === "web") {
	auth = getAuth(app);
} else {
	try {
		auth = initializeAuth(app, {
			persistence: getReactNativePersistence(ReactNativeAsyncStorage),
		});
	} catch (e: any) {
		if (e.code === "auth/already-initialized") {
			auth = getAuth(app);
		} else {
			throw e;
		}
	}
}

let db: Firestore;
try {
	db = initializeFirestore(app, {
		experimentalForceLongPolling: true,
	});
} catch (e: any) {
	// If already initialized during hot reload
	const { getFirestore } = require("firebase/firestore");
	db = getFirestore(app);
}

export const firebaseApp = app;
export const firebaseAuth: Auth = auth;
export const firestore: Firestore = db;
