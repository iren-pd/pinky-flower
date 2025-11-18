import { DeleteAccountSection } from '@root/components/features/DeleteAccountSection';
import { MembershipsSection } from '@root/components/features/MembershipsSection';
import { ProfileForm } from '@root/components/features/ProfileForm';
import { Separator } from '@root/components/ui';
import { useProfile } from '@root/hooks/useProfile';

const ProfilePage = () => {
    const { profile, isLoading, error } = useProfile();

    if (isLoading) {
        return (
            <div className="w-full max-w-2xl space-y-6">
                <h1 className="text-2xl font-semibold">Профіль</h1>
                <p className="text-sm text-muted-foreground">Завантаження...</p>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="w-full max-w-2xl space-y-6">
                <h1 className="text-2xl font-semibold">Профіль</h1>
                <p className="text-sm text-destructive">{error || 'Профіль не знайдено'}</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl space-y-8">
            <div>
                <h1 className="text-2xl font-semibold">Профіль</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Керуйте своїми особистими даними та налаштуваннями
                </p>
            </div>

            <div className="space-y-6 rounded-lg border border-border bg-card p-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Особисті дані</h2>
                    <ProfileForm profile={profile} />
                </div>
            </div>

            <Separator />

            <div className="space-y-6 rounded-lg border border-border bg-card p-6">
                <MembershipsSection />
            </div>

            <Separator />

            <div className="space-y-6 rounded-lg border border-destructive/20 bg-card p-6">
                <DeleteAccountSection />
            </div>
        </div>
    );
};

export default ProfilePage;
