import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createSelectors } from './utils/createSelectors';

type Credentials = {
    email: string;
    password: string;
};

type RegistrationData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
};

type AuthState = {
    isLoading: boolean;
    error: string | null;
    login: (credentials: Credentials) => Promise<void>;
    resetError: () => void;
    registerLoading: boolean;
    registerError: string | null;
    register: (data: RegistrationData) => Promise<void>;
    resetRegisterError: () => void;
};

const useAuthStoreBase = create<AuthState>()(
    devtools(
        (set) => ({
            isLoading: false,
            error: null,
            login: async ({ email, password }) => {
                set(
                    () => ({
                        isLoading: true,
                        error: null
                    }),
                    false,
                    { type: 'auth/login/start' }
                );

                try {
                    await new Promise((resolve) => setTimeout(resolve, 750));
                    console.info('Logged in with credentials:', { email, password });

                    set(
                        () => ({
                            isLoading: false
                        }),
                        false,
                        { type: 'auth/login/success' }
                    );
                } catch (error) {
                    set(
                        () => ({
                            isLoading: false,
                            error:
                                error instanceof Error ? error.message : 'Не удалось выполнить вход'
                        }),
                        false,
                        { type: 'auth/login/error' }
                    );
                }
            },
            resetError: () => {
                set(
                    () => ({
                        error: null
                    }),
                    false,
                    { type: 'auth/login/resetError' }
                );
            },
            registerLoading: false,
            registerError: null,
            register: async (data) => {
                set(
                    () => ({
                        registerLoading: true,
                        registerError: null
                    }),
                    false,
                    { type: 'auth/register/start' }
                );

                try {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    console.info('Registered user:', data);

                    set(
                        () => ({
                            registerLoading: false
                        }),
                        false,
                        { type: 'auth/register/success' }
                    );
                } catch (error) {
                    set(
                        () => ({
                            registerLoading: false,
                            registerError:
                                error instanceof Error
                                    ? error.message
                                    : 'Не удалось завершить регистрацию'
                        }),
                        false,
                        { type: 'auth/register/error' }
                    );
                }
            },
            resetRegisterError: () => {
                set(
                    () => ({
                        registerError: null
                    }),
                    false,
                    { type: 'auth/register/resetError' }
                );
            }
        }),
        { name: 'auth-store' }
    )
);

export const useAuthStore = createSelectors(useAuthStoreBase);
