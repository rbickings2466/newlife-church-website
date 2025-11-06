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

        // Query for active promo banners
        // We'll get all enabled banners and sort client-side to avoid needing a composite index
        const promosRef = collection(db, 'promoBanners');
        const q = query(
          promosRef,
          where('enabled', '==', true)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Sort by createdAt on the client side and get the most recent
          const promos = querySnapshot.docs
            .map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
            .sort((a, b) => {
              const aTime = a.createdAt?.seconds || 0;
              const bTime = b.createdAt?.seconds || 0;
              return bTime - aTime; // Most recent first
            });

          setPromoBanner(promos[0]);
          console.log('Promo banner loaded:', promos[0]);
        } else {
          console.log('No enabled promo banners found');
          setPromoBanner(null);
        }
      } catch (err) {
        console.error('Error fetching promo banner:', err);
        console.error('Error details:', err.code, err.message);
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
