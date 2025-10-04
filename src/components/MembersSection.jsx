import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { auth, db } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  where,
} from "firebase/firestore";
import AdminUsersPanel from "./AdminUsersPanel";

export default function MembersSection() {
  const { user, loading: authLoading, logout } = useAuth();
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [resetStatus, setResetStatus] = useState("");

  const [prayerText, setPrayerText] = useState("");
  const MAX_LEN = 600;
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [prayerLoading, setPrayerLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Real-time listener: merge two queries
  // 1. All vetted requests
  // 2. Own requests (even if not vetted yet)
  useEffect(() => {
    if (!user) return;
    const baseCol = collection(db, "prayerRequests");
    const vettedQuery = query(
      baseCol,
      where("isVetted", "==", true),
      orderBy("createdAt", "desc")
    );
    const ownQuery = query(
      baseCol,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const allData = new Map();

    const apply = () => {
      const merged = Array.from(allData.values()).sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
      );
      setPrayerRequests(merged);
    };

    const unsub1 = onSnapshot(
      vettedQuery,
      (snap) => {
        snap.docChanges().forEach((ch) => {
          if (ch.type === "removed") {
            allData.delete(ch.doc.id);
          } else {
            allData.set(ch.doc.id, { id: ch.doc.id, ...ch.doc.data() });
          }
        });
        apply();
      },
      (err) => console.error("[prayerRequests] vetted snapshot error", err)
    );

    const unsub2 = onSnapshot(
      ownQuery,
      (snap) => {
        snap.docChanges().forEach((ch) => {
          if (ch.type === "removed") {
            allData.delete(ch.doc.id);
          } else {
            allData.set(ch.doc.id, { id: ch.doc.id, ...ch.doc.data() });
          }
        });
        apply();
      },
      (err) => console.error("[prayerRequests] own snapshot error", err)
    );

    return () => {
      unsub1();
      unsub2();
    };
  }, [user]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const submitPrayer = async (e) => {
    e.preventDefault();
    const trimmed = prayerText.trim();
    if (!trimmed) return;
    if (trimmed.length > MAX_LEN) return;
    setPrayerLoading(true);
    setSubmitError("");
    try {
      console.log("[prayerRequests] add attempt", trimmed.slice(0, 40));
      await addDoc(collection(db, "prayerRequests"), {
        text: trimmed,
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp(),
        createdAtMillis: Date.now(),
        isVetted: !!user?.vetted,
        updatedAt: serverTimestamp(),
      });
      console.log("[prayerRequests] add success");
      setPrayerText("");
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      console.error("[prayerRequests] add failed", err);
      setSubmitError(err.message);
    } finally {
      setPrayerLoading(false);
    }
  };

  return (
    <section className='py-16 lg:py-24'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
            Members Area
          </h2>
        </div>
        {authLoading ? (
          <div className='text-center text-gray-600'>
            Loading authentication...
          </div>
        ) : !user ? (
          <div className='max-w-md mx-auto bg-white rounded-xl shadow p-8'>
            <div className='flex justify-center mb-4'>
              <div className='w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center'>
                <span className='text-white text-2xl'>🔒</span>
              </div>
            </div>
            <h3 className='text-xl font-semibold text-center mb-4'>
              {mode === "login" ? "Member Login" : "Create Account"}
            </h3>
            {authError && (
              <p className='text-sm text-red-600 mb-3'>{authError}</p>
            )}
            <form onSubmit={handleAuth} className='space-y-4'>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium'
              >
                {mode === "login" ? "Login" : "Register"}
              </button>
            </form>
            <div className='text-center mt-4'>
              <button
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className='text-sm text-blue-600 hover:underline'
              >
                {mode === "login"
                  ? "Need an account? Register"
                  : "Have an account? Login"}
              </button>
              {mode === "login" && (
                <div className='mt-3 space-y-1'>
                  <button
                    type='button'
                    onClick={async () => {
                      setAuthError("");
                      setResetStatus("");
                      if (!email) {
                        setAuthError("Enter your email above first");
                        return;
                      }
                      try {
                        await sendPasswordResetEmail(auth, email);
                        setResetStatus("Password reset email sent.");
                      } catch (err) {
                        setAuthError(err.message);
                      }
                    }}
                    className='text-xs text-blue-600 hover:underline'
                  >
                    Forgot password?
                  </button>
                  {resetStatus && (
                    <p className='text-xs text-green-600'>{resetStatus}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='space-y-10'>
            {user?.role === "admin" && (
              <div className='bg-blue-50 border border-blue-200 text-blue-900 rounded-lg p-4'>
                <h4 className='font-semibold mb-1'>Admin Quickstart</h4>
                <ul className='list-disc list-inside text-sm space-y-1'>
                  <li>
                    <a
                      href='#user-management'
                      className='text-blue-700 underline hover:no-underline'
                    >
                      Jump to User Management
                    </a>{" "}
                    to vet users and promote/demote roles.
                  </li>
                  <li>
                    Vetting a user makes all of their past and future requests
                    visible to others.
                  </li>
                  <li>
                    Use the Admin badge here to confirm your access is active.
                  </li>
                </ul>
                <div className='mt-2 text-sm'>
                  <a
                    href='/admin-guide.html'
                    target='_blank'
                    rel='noreferrer'
                    className='text-blue-700 underline hover:no-underline'
                  >
                    Open detailed Admin & Moderation Guide
                  </a>
                </div>
              </div>
            )}
            <div className='flex items-center justify-between flex-wrap gap-2'>
              <p className='text-gray-700'>
                Logged in as <span className='font-medium'>{user.email}</span>
                {user?.role === "admin" && (
                  <span className='ml-2 px-2 py-0.5 text-xs rounded bg-purple-100 text-purple-700'>
                    Admin
                  </span>
                )}
                {user?.vetted ? (
                  <span className='ml-2 px-2 py-0.5 text-xs rounded bg-green-100 text-green-700'>
                    Vetted
                  </span>
                ) : (
                  <span className='ml-2 px-2 py-0.5 text-xs rounded bg-yellow-100 text-yellow-700'>
                    Pending Vetting
                  </span>
                )}
              </p>
              <button
                onClick={logout}
                className='text-sm text-red-600 hover:underline'
              >
                Logout
              </button>
            </div>
            <div className='bg-white rounded-xl shadow p-6'>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>
                Submit a Prayer Request
              </h3>
              {submitError && (
                <p className='text-sm text-red-600 mb-3'>{submitError}</p>
              )}
              {submitSuccess && !submitError && (
                <p className='text-sm text-green-600 mb-3'>
                  Prayer request submitted.
                </p>
              )}
              <form onSubmit={submitPrayer} className='space-y-4'>
                <textarea
                  value={prayerText}
                  onChange={(e) =>
                    setPrayerText(e.target.value.slice(0, MAX_LEN))
                  }
                  rows={4}
                  placeholder='Enter your prayer request...'
                  className='w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  required
                />
                <div className='flex justify-between text-xs text-gray-500'>
                  <span>
                    {prayerText.trim().length} / {MAX_LEN}
                  </span>
                  {prayerText.trim().length > MAX_LEN && (
                    <span className='text-red-600'>Too long</span>
                  )}
                </div>
                <button
                  type='submit'
                  disabled={prayerLoading}
                  className='bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg'
                >
                  {prayerLoading ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            </div>
            <div className='bg-white rounded-xl shadow p-6'>
              <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
                Recent Prayer Requests
                <span className='text-xs font-normal text-gray-500'>
                  ({prayerRequests.length})
                </span>
              </h3>
              {prayerRequests.length === 0 ? (
                <p className='text-gray-600 text-sm'>No requests yet.</p>
              ) : (
                <ul className='space-y-4'>
                  {prayerRequests.map((req) => {
                    const canDelete =
                      req.userId === user.uid || user?.role === "admin";
                    const canEdit = req.userId === user.uid;
                    const pending = !req.isVetted;
                    return (
                      <li
                        key={req.id}
                        className='border-l-4 border-blue-500 pl-4 bg-gray-50 p-4 rounded relative'
                      >
                        {canDelete && (
                          <button
                            onClick={async () => {
                              try {
                                await deleteDoc(
                                  doc(db, "prayerRequests", req.id)
                                );
                              } catch (err) {
                                console.error("Delete failed", err);
                              }
                            }}
                            className='absolute top-2 right-2 text-xs text-red-600 hover:underline'
                          >
                            Delete
                          </button>
                        )}
                        {canEdit && editingId !== req.id && (
                          <button
                            onClick={() => {
                              setEditingId(req.id);
                              setEditText(req.text);
                            }}
                            className='absolute top-2 right-14 text-xs text-blue-600 hover:underline'
                          >
                            Edit
                          </button>
                        )}
                        {editingId === req.id ? (
                          <form
                            onSubmit={async (e) => {
                              e.preventDefault();
                              const newText = editText.trim();
                              if (!newText || newText.length > MAX_LEN) return;
                              try {
                                const ref = doc(db, "prayerRequests", req.id);
                                const snap = await getDoc(ref);
                                if (!snap.exists()) return;
                                const data = snap.data();
                                await updateDoc(ref, {
                                  text: newText,
                                  updatedAt: serverTimestamp(),
                                  // Re-store immutable / required fields to satisfy rules check
                                  userId: data.userId,
                                  userEmail: data.userEmail,
                                  createdAt: data.createdAt,
                                  isVetted: data.isVetted,
                                  createdAtMillis: data.createdAtMillis,
                                });
                                setEditingId(null);
                                setEditText("");
                              } catch (err) {
                                console.error("Edit failed", err);
                              }
                            }}
                            className='space-y-2'
                          >
                            <textarea
                              value={editText}
                              onChange={(e) =>
                                setEditText(e.target.value.slice(0, MAX_LEN))
                              }
                              rows={3}
                              className='w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <div className='flex items-center gap-2 text-xs text-gray-500'>
                              <span>
                                {editText.trim().length} / {MAX_LEN}
                              </span>
                              <div className='ml-auto flex gap-2'>
                                <button
                                  type='button'
                                  onClick={() => {
                                    setEditingId(null);
                                    setEditText("");
                                  }}
                                  className='px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700'
                                >
                                  Cancel
                                </button>
                                <button
                                  type='submit'
                                  disabled={!editText.trim()}
                                  className='px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </form>
                        ) : (
                          <>
                            {pending && (
                              <p className='text-xs text-yellow-600 mb-1'>
                                Pending vetting – only you (and admins) see this
                                until approved.
                              </p>
                            )}
                            <p className='text-gray-800 whitespace-pre-wrap break-words'>
                              {req.text}
                            </p>
                          </>
                        )}
                        <p className='text-xs text-gray-500 mt-1'>
                          {req.userEmail || "Anonymous"} •{" "}
                          {req.createdAt?.toDate
                            ? req.createdAt.toDate().toLocaleString()
                            : "Just now"}
                          {req.updatedAt?.toDate && editingId !== req.id && (
                            <span className='ml-2 italic'>
                              Edited {req.updatedAt.toDate().toLocaleString()}
                            </span>
                          )}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            {user?.role === "admin" && <AdminUsersPanel />}
          </div>
        )}
      </div>
    </section>
  );
}
