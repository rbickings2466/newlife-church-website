import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  updateDoc,
  writeBatch,
  getDocs,
  where,
} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

// Simple admin panel: list users, toggle vetted, promote/demote admin.
// Assumes Firestore rules allow admin updates to users and prayerRequests.
export default function AdminUsersPanel({ className = "" }) {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyIds, setBusyIds] = useState(new Set());
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!isAdmin) return;
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setUsers(list);
        setLoading(false);
      },
      (err) => {
        console.error("[AdminUsersPanel] snapshot error", err);
        setError(err.message);
        setLoading(false);
      }
    );
    return () => unsub();
  }, [isAdmin]);

  if (!isAdmin) return null; // hide for non-admins

  const setBusy = (id, on) => {
    setBusyIds((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const toggleVetted = async (u) => {
    setBusy(u.id, true);
    try {
      const ref = doc(db, "users", u.id);
      await updateDoc(ref, { vetted: !u.vetted });
      // Cascade: update existing prayerRequests isVetted when moving to vetted=true
      if (!u.vetted) {
        const prQ = query(
          collection(db, "prayerRequests"),
          where("userId", "==", u.id)
        );
        const prSnap = await getDocs(prQ);
        const batch = writeBatch(db);
        prSnap.docs.forEach((d) => {
          batch.update(d.ref, { isVetted: true });
        });
        await batch.commit();
      }
    } catch (e) {
      console.error("Toggle vetted failed", e);
      setError(e.message);
    } finally {
      setBusy(u.id, false);
    }
  };

  const toggleRole = async (u) => {
    if (u.id === user.uid) return; // prevent self role change
    setBusy(u.id, true);
    try {
      const ref = doc(db, "users", u.id);
      await updateDoc(ref, { role: u.role === "admin" ? "member" : "admin" });
    } catch (e) {
      console.error("Toggle role failed", e);
      setError(e.message);
    } finally {
      setBusy(u.id, false);
    }
  };

  return (
    <div
      id='user-management'
      className={`bg-white rounded-xl shadow p-6 mt-10 ${className}`}
    >
      <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
        User Management{" "}
        <span className='text-xs text-gray-500'>({users.length})</span>
      </h3>
      {error && <p className='text-sm text-red-600 mb-3'>{error}</p>}
      {loading ? (
        <p className='text-sm text-gray-600'>Loading users…</p>
      ) : users.length === 0 ? (
        <p className='text-sm text-gray-600'>No users yet.</p>
      ) : (
        <div className='overflow-x-auto -mx-4 sm:mx-0'>
          <table className='min-w-full text-sm'>
            <thead>
              <tr className='text-left border-b'>
                <th className='py-2 pr-4'>Email</th>
                <th className='py-2 pr-4'>Role</th>
                <th className='py-2 pr-4'>Vetted</th>
                <th className='py-2 pr-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className='border-b last:border-b-0'>
                  <td className='py-2 pr-4'>{u.email || "(no email)"}</td>
                  <td className='py-2 pr-4'>
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        u.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className='py-2 pr-4'>
                    {u.vetted ? (
                      <span className='px-2 py-0.5 rounded text-xs bg-green-100 text-green-700'>
                        Yes
                      </span>
                    ) : (
                      <span className='px-2 py-0.5 rounded text-xs bg-yellow-100 text-yellow-700'>
                        No
                      </span>
                    )}
                  </td>
                  <td className='py-2 pr-4'>
                    <div className='flex gap-2'>
                      <button
                        disabled={busyIds.has(u.id)}
                        onClick={() => toggleVetted(u)}
                        className='px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-xs disabled:opacity-50'
                      >
                        {u.vetted ? "Unvet" : "Vet"}
                      </button>
                      <button
                        disabled={busyIds.has(u.id) || u.id === user.uid}
                        onClick={() => toggleRole(u)}
                        className='px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs disabled:opacity-50'
                      >
                        {u.role === "admin" ? "Demote" : "Promote"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className='mt-4 text-xs text-gray-500'>
        Changes are real-time. Vetting immediately exposes a user's existing
        requests to other vetted users. Promoting to admin grants moderation
        privileges.
      </p>
    </div>
  );
}
