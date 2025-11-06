import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

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

        // Get all promo banners and filter/sort client-side
        const promosRef = collection(db, 'promoBanners');
        const querySnapshot = await getDocs(promosRef);

        if (!querySnapshot.empty) {
          // Filter for enabled banners and sort by createdAt on the client side
          const promos = querySnapshot.docs
            .map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
            .filter(promo => promo.enabled === true)
            .sort((a, b) => {
              const aTime = a.createdAt?.seconds || 0;
              const bTime = b.createdAt?.seconds || 0;
              return bTime - aTime; // Most recent first
            });

          if (promos.length > 0) {
            setPromoBanner(promos[0]);
            console.log('Promo banner loaded:', promos[0]);
          } else {
            console.log('No enabled promo banners found');
            setPromoBanner(null);
          }
        } else {
          console.log('No promo banners in database');
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
