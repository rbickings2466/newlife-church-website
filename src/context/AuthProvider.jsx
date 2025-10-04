import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { isAdminEmail } from "../config/adminConfig";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          // bootstrap profile
          await setDoc(ref, {
            email: firebaseUser.email || "",
            createdAt: serverTimestamp(),
            vetted: isAdminEmail(firebaseUser.email) ? true : false,
            role: isAdminEmail(firebaseUser.email) ? "admin" : "member",
          });
          setUser({
            ...firebaseUser,
            vetted: isAdminEmail(firebaseUser.email),
            role: isAdminEmail(firebaseUser.email) ? "admin" : "member",
          });
        } else {
          const data = snap.data();
          let role =
            data.role ||
            (isAdminEmail(firebaseUser.email) ? "admin" : "member");
          let vetted =
            typeof data.vetted === "boolean"
              ? data.vetted
              : isAdminEmail(firebaseUser.email);

          // Auto-promote on login if env now marks this email as admin
          if (
            isAdminEmail(firebaseUser.email) &&
            (role !== "admin" || vetted !== true)
          ) {
            try {
              await updateDoc(ref, { role: "admin", vetted: true });
              role = "admin";
              vetted = true;
              console.log(
                "[AuthProvider] Auto-promoted to admin based on env email"
              );
            } catch (e) {
              console.warn("[AuthProvider] Failed to auto-promote admin", e);
            }
          }

          setUser({ ...firebaseUser, vetted, role });
        }
      } catch (e) {
        console.error("[AuthProvider] profile bootstrap failed", e);
        setUser(firebaseUser); // fallback minimal
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
