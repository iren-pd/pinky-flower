import type { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { RoutesPath } from '@root/router/routes';

export const Navbar: FC = () => {
    const { pathname } = useLocation();

    const navItems =
        pathname === RoutesPath.Login
            ? [{ label: 'Регистрация', to: RoutesPath.Register }]
            : pathname === RoutesPath.Register
              ? [{ label: 'Логин', to: RoutesPath.Login }]
              : [
                    { label: 'Логин', to: RoutesPath.Login },
                    { label: 'Регистрация', to: RoutesPath.Register }
                ];

    return (
        <nav className="flex items-center gap-3">
            {navItems.map((item) => (
                <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
};
