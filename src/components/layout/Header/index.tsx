import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Navbar } from '@root/components/common/Navbar';

export const Header: FC = () => {
    return (
        <header className="border-b bg-card py-4">
            <div className="container flex items-center justify-between">
                <Link
                    to="/"
                    className="text-lg font-semibold tracking-tight text-foreground transition hover:text-primary"
                >
                    Pinky🌸Flower
                </Link>
                <Navbar />
            </div>
        </header>
    );
};
