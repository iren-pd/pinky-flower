import type { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { RoutesPath } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

export const Navbar: FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const currentUser = useAuthStore.use.currentUser();
    const logout = useAuthStore.use.logout();

    const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        await logout();
        navigate(RoutesPath.Login);
    };

    const navItems = currentUser
        ? [{ label: 'Вихід', to: RoutesPath.Login, onClick: handleLogout }]
        : pathname === RoutesPath.Login
          ? [{ label: 'Зареєструватися', to: RoutesPath.Register }]
          : pathname === RoutesPath.Register
            ? [{ label: 'Увійти', to: RoutesPath.Login }]
            : [
                  { label: 'Увійти', to: RoutesPath.Login },
                  { label: 'Зареєструватися', to: RoutesPath.Register }
              ];

    return (
        <nav className="flex items-center gap-3">
            {navItems.map((item) => (
                <Link
                    key={item.to}
                    to={item.to}
                    onClick={'onClick' in item ? item.onClick : undefined}
                    className="rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
};
