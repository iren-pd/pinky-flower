import type { FC } from 'react';

import { Footer } from '@root/components/layout/Footer';
import { Header } from '@root/components/layout/Header';
import { Main } from '@root/components/layout/Main';

export const App: FC = () => {
    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    );
};
