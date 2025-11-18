import { collection, query, where, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '@root/lib/firebase';
import { useAuthStore } from '@root/store/authStore';
import type { Membership } from '@root/types/membership';

export const useMemberships = () => {
    const currentUser = useAuthStore.use.currentUser();
    const [memberships, setMemberships] = useState<Membership[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMemberships = async () => {
            if (!currentUser) {
                setMemberships([]);
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                const membershipsQuery = query(
                    collection(db, 'memberships'),
                    where('userId', '==', currentUser.uid)
                );

                const querySnapshot = await getDocs(membershipsQuery);
                const membershipsData: Membership[] = [];

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    membershipsData.push({
                        id: doc.id,
                        organizationId: data.organizationId,
                        userId: data.userId,
                        totalSessions: data.totalSessions || 0,
                        usedSessions: data.usedSessions || 0,
                        validFrom: data.validFrom,
                        validTo: data.validTo,
                        isActive: data.isActive ?? true,
                        createdAt: data.createdAt
                    });
                });

                setMemberships(membershipsData);
            } catch (err) {
                console.error('Error fetching memberships:', err);
                setError('Не вдалося завантажити абонементи');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMemberships();
    }, [currentUser]);

    return { memberships, isLoading, error };
};
