import { Menu, User, Building2, LogOut } from 'lucide-react';
import type { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@root/components/ui';
import { RoutesPath } from '@root/router/routes';
import { useAuthStore } from '@root/store/authStore';

export const Navbar: FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const currentUser = useAuthStore.use.currentUser();
    const logout = useAuthStore.use.logout();

    const handleLogout = async () => {
        await logout();
        navigate(RoutesPath.Login);
    };

    if (currentUser) {
        return (
            <nav className="flex items-center gap-3">
                {/* Mobile dropdown menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Відкрити меню</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                            <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                                <User className="h-4 w-4" />
                                <span>Мій профіль</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link to="/business" className="flex items-center gap-2 cursor-pointer">
                                <Building2 className="h-4 w-4" />
                                <span>Для бізнесу</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Вихід</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Desktop buttons */}
                <div className="hidden md:flex items-center gap-2">
                    <Button asChild variant="ghost" className="gap-2">
                        <Link to="/profile">
                            <User className="h-4 w-4" />
                            <span>Мій профіль</span>
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="gap-2">
                        <Link to="/business">
                            <Building2 className="h-4 w-4" />
                            <span>Для бізнесу</span>
                        </Link>
                    </Button>
                    <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Вихід</span>
                    </Button>
                </div>
            </nav>
        );
    }

    const navItems =
        pathname === RoutesPath.Login
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
                <Button key={item.to} asChild variant="outline" className="rounded-full">
                    <Link to={item.to}>{item.label}</Link>
                </Button>
            ))}
        </nav>
    );
};
