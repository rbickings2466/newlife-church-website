import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Dev-time validation to surface common misconfiguration that triggers auth/configuration-not-found
if (import.meta.env.DEV) {
  const required = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId",
  ];
  const missing = required.filter((k) => !firebaseConfig[k]);
  if (missing.length) {
    console.error(
      "[Firebase] Missing config keys:",
      missing.join(", "),
      "\nCheck your .env file. Vite env vars must be prefixed with VITE_. Restart dev server after adding them."
    );
  }
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Attempt offline persistence (ignore if unsupported / multiple tabs)
if (typeof window !== "undefined") {
  enableIndexedDbPersistence(db).catch((err) => {
    if (import.meta.env.DEV) {
      console.warn("[Firestore] Persistence not enabled:", err.code);
    }
  });
}
