import type { FC } from 'react';

import { ErrorBoundary } from '@root/components/common/ErrorBoundary';
import { Footer } from '@root/components/layout/Footer';
import { Header } from '@root/components/layout/Header';
import { Main } from '@root/components/layout/Main';
import { Toaster } from '@root/components/ui';

export const App: FC = () => {
    return (
        <ErrorBoundary>
            <div className="flex min-h-screen flex-col">
                <Header />
                <Main />
                <Footer />
            </div>
            <Toaster />
        </ErrorBoundary>
    );
};
