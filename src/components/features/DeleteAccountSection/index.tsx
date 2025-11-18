import { AlertCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert, AlertDescription, Button } from '@root/components/ui';
import { RoutesPath } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

export const DeleteAccountSection: FC = () => {
    const deleteAccount = useAuthStore.use.deleteAccount();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            setError(null);

            await deleteAccount();
            navigate(RoutesPath.Login);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Не вдалося видалити обліковий запис');
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-destructive">Видалити обліковий запис</h2>
            <p className="text-sm text-muted-foreground">
                Видалення облікового запису є незворотною дією. Всі ваші дані будуть видалені
                назавжди.
            </p>

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {!showConfirm ? (
                <Button
                    variant="outline"
                    onClick={() => setShowConfirm(true)}
                    className="gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                    <Trash2 className="h-4 w-4" />
                    Видалити обліковий запис
                </Button>
            ) : (
                <div className="space-y-3">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Ви впевнені? Цю дію неможливо скасувати.
                        </AlertDescription>
                    </Alert>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={handleDelete}
                            disabled={isLoading}
                            className="gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                            <Trash2 className="h-4 w-4" />
                            {isLoading ? 'Видалення...' : 'Так, видалити'}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowConfirm(false);
                                setError(null);
                            }}
                            disabled={isLoading}
                        >
                            Скасувати
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
