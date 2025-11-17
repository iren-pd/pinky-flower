import { signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { AnimatedLogoShort } from '@root/components/common/AnimatedLogoShort';
import { RegisterForm } from '@root/components/features/RegisterForm';
import { Button } from '@root/components/ui';
import { auth, googleProvider } from '@root/lib/firebase';
import { RoutesPath } from '@root/router/routes';

const RegisterPage: FC = () => {
    const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

    const handleGoogleLogin = async () => {
        try {
            setIsGoogleLoading(true);
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error('Error signing in with Google:', error);
            setIsGoogleLoading(false);
        }
    };

    return (
        <section
            className="flex h-full w-full items-center justify-center"
            aria-labelledby="register-heading"
        >
            <section
                className="w-full max-w-2xl space-y-6 rounded-2xl border border-primary/15 bg-card p-5 shadow-lg sm:space-y-8 sm:p-8"
                aria-describedby="register-description"
            >
                <header className="space-y-2 text-center sm:space-y-3">
                    <AnimatedLogoShort className="mx-auto bg-primary/10" />
                    <h1
                        id="register-heading"
                        className="text-2xl font-semibold text-foreground sm:text-3xl"
                    >
                        Створіть акаунт
                    </h1>
                    <p
                        id="register-description"
                        className="text-sm text-muted-foreground sm:text-base"
                    >
                        Заповніть дані профілю, щоб бронювати тренування та керувати розкладом у
                        Pinky Flower.
                    </p>
                </header>

                <RegisterForm />

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">або</span>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleLogin}
                    disabled={isGoogleLoading}
                    className="w-full h-10 text-xs sm:h-11 sm:text-sm"
                >
                    <svg
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    {isGoogleLoading ? 'Реєстрація...' : 'Зареєструватися через Google'}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                    Вже є акаунт?{' '}
                    <Link
                        to={RoutesPath.Login}
                        className="font-medium text-primary hover:underline"
                    >
                        Увійти
                    </Link>
                </p>
            </section>
        </section>
    );
};

export default RegisterPage;
