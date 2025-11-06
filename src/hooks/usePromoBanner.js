import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

/**
 * Custom hook to fetch active promo banner from Firebase
 * Returns the most recent active promo banner
 */
export const usePromoBanner = () => {
  const [promoBanner, setPromoBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromoBanner = async () => {
      try {
        setLoading(true);
        setError(null);

        // Query for active promo banners, ordered by creation date (most recent first)
        const promosRef = collection(db, 'promoBanners');
        const q = query(
          promosRef,
          where('enabled', '==', true),
          orderBy('createdAt', 'desc'),
          limit(1)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setPromoBanner({
            id: doc.id,
            ...doc.data()
          });
        } else {
          setPromoBanner(null);
        }
      } catch (err) {
        console.error('Error fetching promo banner:', err);
        setError(err.message);
        setPromoBanner(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPromoBanner();
  }, []);

  return { promoBanner, loading, error };
};

export default usePromoBanner;
