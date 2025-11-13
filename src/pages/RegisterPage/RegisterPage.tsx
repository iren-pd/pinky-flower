import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { RegisterForm } from '@root/components/features/RegisterForm';
import { RoutesPath } from '@root/router/routes';

const RegisterPage: FC = () => {
    return (
        <section
            className="flex h-full w-full items-center justify-center"
            aria-labelledby="register-heading"
        >
            <section
                className="w-full max-w-2xl space-y-6 rounded-2xl bg-card p-5 shadow-lg sm:space-y-8 sm:p-8"
                aria-describedby="register-description"
            >
                <header className="space-y-2 text-center sm:space-y-3">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-3xl sm:h-16 sm:w-16 sm:text-4xl">
                        🌸
                    </div>
                    <h1
                        id="register-heading"
                        className="text-2xl font-semibold text-foreground sm:text-3xl"
                    >
                        Создайте аккаунт
                    </h1>
                    <p
                        id="register-description"
                        className="text-sm text-muted-foreground sm:text-base"
                    >
                        Заполните данные профиля, чтобы бронировать тренировки и управлять
                        расписанием в Pinky Flower.
                    </p>
                </header>

                <RegisterForm />

                <p className="text-center text-sm text-muted-foreground">
                    Уже есть аккаунт?{' '}
                    <Link
                        to={RoutesPath.Login}
                        className="font-medium text-primary hover:underline"
                    >
                        Войти
                    </Link>
                </p>
            </section>
        </section>
    );
};

export default RegisterPage;
