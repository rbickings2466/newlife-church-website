import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export const useSermons = () => {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sermonsQuery = query(
      collection(db, "sermons"),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(
      sermonsQuery,
      (snapshot) => {
        const sermonsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSermons(sermonsData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { sermons, loading, error };
};

export const usePrayerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestsQuery = query(
      collection(db, "prayerRequests"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(requestsQuery, (snapshot) => {
      const requestsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(requestsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addPrayerRequest = async (request) => {
    try {
      await addDoc(collection(db, "prayerRequests"), {
        ...request,
        createdAt: new Date(),
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { requests, loading, addPrayerRequest };
};
