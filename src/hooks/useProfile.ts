import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '@root/lib/firebase';
import { useAuthStore } from '@root/store/authStore';
import type { AppUser } from '@root/types/user';

export const useProfile = () => {
    const currentUser = useAuthStore.use.currentUser();
    const [profile, setProfile] = useState<AppUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!currentUser) {
                setProfile(null);
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setProfile({
                        id: currentUser.uid,
                        email: data.email || currentUser.email || '',
                        firstName: data.firstName || '',
                        lastName: data.lastName || '',
                        phone: data.phoneFormatted || data.phone || undefined,
                        avatarEmodji: data.avatarEmodji || undefined
                    });
                } else {
                    setError('Профіль не знайдено');
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Не вдалося завантажити профіль');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [currentUser]);

    return { profile, isLoading, error };
};
