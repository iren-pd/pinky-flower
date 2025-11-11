import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const Main: FC = () => {
    return (
        <main>
            <Outlet />
        </main>
    );
};
