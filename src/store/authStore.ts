import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createSelectors } from './utils/createSelectors';

type Credentials = {
    email: string;
    password: string;
};

type AuthState = {
    isLoading: boolean;
    error: string | null;
    login: (credentials: Credentials) => Promise<void>;
    resetError: () => void;
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
            }
        }),
        { name: 'auth-store' }
    )
);

export const useAuthStore = createSelectors(useAuthStoreBase);
