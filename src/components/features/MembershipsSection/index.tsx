import { Calendar, CreditCard } from 'lucide-react';
import type { FC } from 'react';

import { Separator } from '@root/components/ui';
import { useMemberships } from '@root/hooks/useMemberships';

export const MembershipsSection: FC = () => {
    const { memberships, isLoading, error } = useMemberships();

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('uk-UA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Абонементи</h2>
                <p className="text-sm text-muted-foreground">Завантаження...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Абонементи</h2>
                <p className="text-sm text-destructive">{error}</p>
            </div>
        );
    }

    if (memberships.length === 0) {
        return (
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Абонементи</h2>
                <p className="text-sm text-muted-foreground">
                    У вас поки що немає активних абонементів
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Абонементи</h2>
            <div className="space-y-3">
                {memberships.map((membership) => (
                    <div
                        key={membership.id}
                        className="rounded-lg border border-border bg-card p-4 space-y-3"
                    >
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">
                                        {membership.isActive ? 'Активний' : 'Неактивний'}
                                    </span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Залишилось:{' '}
                                    <span className="font-medium text-foreground">
                                        {membership.totalSessions - membership.usedSessions} з{' '}
                                        {membership.totalSessions}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>Дійсний з: {formatDate(membership.validFrom)}</span>
                            </div>
                            {membership.validTo && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>До: {formatDate(membership.validTo)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
