import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { LoginForm } from '@root/components/features/LoginForm';
import { RoutesPath } from '@root/router/routes';

const LoginPage: FC = () => {
    return (
        <section
            className="flex h-full w-full items-center justify-center"
            aria-labelledby="login-heading"
        >
            <section
                className="w-full max-w-lg space-y-5 rounded-2xl bg-card p-5 shadow-lg sm:space-y-7 sm:p-7"
                aria-describedby="login-description"
            >
                <header className="space-y-2 text-center sm:space-y-3">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-3xl sm:h-16 sm:w-16 sm:text-4xl">
                        🌸
                    </div>
                    <h1
                        id="login-heading"
                        className="text-2xl font-semibold text-foreground sm:text-3xl"
                    >
                        Добро пожаловать
                    </h1>
                    <p id="login-description" className="text-sm text-muted-foreground sm:text-sm">
                        Авторизуйтесь, чтобы записываться на любимые тренировки, следить за
                        расписанием и оставаться в форме вместе с Pinky Flower.
                    </p>
                </header>

                <LoginForm />

                <p className="text-center text-sm text-muted-foreground">
                    Нет аккаунта?{' '}
                    <Link
                        to={RoutesPath.Register}
                        className="font-medium text-primary hover:underline"
                    >
                        Зарегистрируйтесь
                    </Link>
                </p>
            </section>
        </section>
    );
};

export default LoginPage;
