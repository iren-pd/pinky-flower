import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { auth, db } from '@root/lib/firebase';

import { createSelectors } from './utils/createSelectors';

type Credentials =
    | {
          email: string;
          phone?: never;
          password: string;
      }
    | {
          email?: never;
          phone: string;
          password: string;
      };

type RegistrationData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
};

type GoogleAuthUser = {
    uid: string;
    email: string | null;
    displayName: string | null;
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
    saveUserDataFromGoogleAuth: (user: GoogleAuthUser) => Promise<void>;
};

const useAuthStoreBase = create<AuthState>()(
    devtools(
        (set) => ({
            isLoading: false,
            error: null,
            login: async ({ email, phone, password }) => {
                set(
                    () => ({
                        isLoading: true,
                        error: null
                    }),
                    false,
                    { type: 'auth/login/start' }
                );

                try {
                    if (email) {
                        await signInWithEmailAndPassword(auth, email, password);
                    } else if (phone) {
                        // Для входа через телефон нужен дополнительный код верификации
                        // Пока что используем email-пароль логику, но можно расширить
                        throw new Error('Вхід через телефон поки що не підтримується');
                    }

                    console.info('Logged in successfully');
                    toast.success('Вхід успішний!', {
                        description: 'Ви увійшли в акаунт'
                    });

                    set(
                        () => ({
                            isLoading: false
                        }),
                        false,
                        { type: 'auth/login/success' }
                    );
                } catch (error: unknown) {
                    let errorMessage = 'Не вдалося виконати вхід';

                    if (error instanceof Error) {
                        const errorCode = (error as { code?: string }).code;
                        switch (errorCode) {
                            case 'auth/user-not-found':
                                errorMessage = 'Користувача з такою електронною поштою не знайдено';
                                break;
                            case 'auth/wrong-password':
                            case 'auth/invalid-credential':
                                errorMessage = 'Невірний пароль';
                                break;
                            case 'auth/invalid-email':
                                errorMessage = 'Невірний формат електронної пошти';
                                break;
                            case 'auth/user-disabled':
                                errorMessage = 'Обліковий запис користувача вимкнено';
                                break;
                            case 'auth/too-many-requests':
                                errorMessage = 'Занадто багато спроб. Спробуйте пізніше';
                                break;
                            case 'auth/network-request-failed':
                                errorMessage = 'Помилка мережі. Перевірте підключення';
                                break;
                            case 'auth/popup-closed-by-user':
                                errorMessage = 'Вікно авторизації було закрито';
                                break;
                            default:
                                errorMessage = error.message || 'Не вдалося виконати вхід';
                        }
                    }

                    console.error('Login error:', error);
                    toast.error('Помилка входу', { description: errorMessage });

                    set(
                        () => ({
                            isLoading: false,
                            error: errorMessage
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
                    const userCredential = await createUserWithEmailAndPassword(
                        auth,
                        data.email,
                        data.password
                    );
                    const user = userCredential.user;

                    const phoneDigits = data.phone.replace(/\D/g, '');

                    await setDoc(doc(db, 'users', user.uid), {
                        uid: user.uid,
                        firstName: data.firstName.trim(),
                        lastName: data.lastName.trim(),
                        email: data.email.trim().toLowerCase(),
                        phone: phoneDigits,
                        phoneFormatted: data.phone,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    });

                    console.info('User registered successfully:', user.uid);
                    toast.success('Реєстрація успішна!', {
                        description: 'Ваш акаунт створено'
                    });

                    set(
                        () => ({
                            registerLoading: false
                        }),
                        false,
                        { type: 'auth/register/success' }
                    );
                } catch (error: unknown) {
                    let errorMessage = 'Не вдалося завершити реєстрацію';

                    if (error instanceof Error) {
                        const errorCode = (error as { code?: string }).code;
                        const errorMessageText = error.message || '';

                        // Обрабатываем коды ошибок Firebase
                        switch (errorCode) {
                            case 'auth/email-already-in-use':
                                errorMessage = 'Електронна пошта вже використовується';
                                break;
                            case 'auth/invalid-email':
                                errorMessage = 'Невірний формат електронної пошти';
                                break;
                            case 'auth/weak-password':
                                errorMessage = 'Пароль занадто слабкий. Мінімум 6 символів';
                                break;
                            case 'auth/operation-not-allowed':
                                errorMessage = 'Ця операція заборонена';
                                break;
                            case 'auth/network-request-failed':
                                errorMessage = 'Помилка мережі. Перевірте підключення';
                                break;
                            case 'auth/too-many-requests':
                                errorMessage = 'Занадто багато спроб. Спробуйте пізніше';
                                break;
                            default:
                                // Обрабатываем случаи, когда ошибка приходит в message (например, EMAIL_EXISTS)
                                if (
                                    errorMessageText.includes('EMAIL_EXISTS') ||
                                    errorMessageText.includes('email already exists')
                                ) {
                                    errorMessage = 'Електронна пошта вже використовується';
                                } else if (
                                    errorMessageText.includes('WEAK_PASSWORD') ||
                                    errorMessageText.includes('weak password')
                                ) {
                                    errorMessage = 'Пароль занадто слабкий. Мінімум 6 символів';
                                } else {
                                    errorMessage =
                                        errorMessageText || 'Не вдалося завершити реєстрацію';
                                }
                        }
                    }

                    console.error('Registration error:', error);
                    toast.error('Помилка реєстрації', { description: errorMessage });

                    set(
                        () => ({
                            registerLoading: false,
                            registerError: errorMessage
                        }),
                        false,
                        { type: 'auth/register/error' }
                    );
                }
            },
            saveUserDataFromGoogleAuth: async (user: GoogleAuthUser) => {
                try {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (!userDoc.exists()) {
                        const nameParts = user.displayName?.split(' ') || [];
                        const firstName = nameParts[0] || '';
                        const lastName = nameParts.slice(1).join(' ') || '';

                        await setDoc(userDocRef, {
                            firstName: firstName,
                            lastName: lastName,
                            email: user.email?.toLowerCase() || '',
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                        });

                        console.info('User data saved from Google auth:', user.uid);
                    }
                } catch (error) {
                    console.error('Error saving user data from Google auth:', error);
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
