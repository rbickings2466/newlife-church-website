import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Reads admin emails from VITE_ADMIN_EMAILS and writes to /config/adminAllowlist
const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID,
  VITE_ADMIN_EMAILS,
} = process.env;

if (!VITE_FIREBASE_PROJECT_ID) {
  console.error(
    "Missing Firebase env. Ensure .env.local is loaded when running this script."
  );
  process.exit(1);
}

const app = initializeApp({
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
});

const db = getFirestore(app);

const emails = (VITE_ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

const map = emails.reduce((acc, e) => {
  acc[e] = true;
  return acc;
}, {});

try {
  await setDoc(
    doc(db, "config", "adminAllowlist"),
    { emails: map },
    { merge: true }
  );
  console.log("Wrote config/adminAllowlist with", emails.length, "emails");
} catch (e) {
  console.error("Failed to write admin allowlist:", e.message);
  process.exit(1);
}
