import type { FormikHelpers } from 'formik';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutesPath } from '@root/router/routes';
import { useAuthStore } from '@root/store';

type LoginValues = {
    email: string;
    phone: string;
    password: string;
};

type LoginType = 'email' | 'phone';

export const useLogin = (loginType: LoginType = 'email') => {
    const navigate = useNavigate();
    const login = useAuthStore.use.login();
    const isLoading = useAuthStore.use.isLoading();
    const error = useAuthStore.use.error();
    const resetError = useAuthStore.use.resetError();

    useEffect(
        () => () => {
            resetError();
        },
        [resetError]
    );

    const handleSubmit = useCallback(
        async (values: LoginValues, { setSubmitting }: FormikHelpers<LoginValues>) => {
            try {
                if (loginType === 'email') {
                    await login({ email: values.email, password: values.password });
                } else {
                    await login({ phone: values.phone, password: values.password });
                }
                // После успешного входа перенаправляем на домашнюю страницу только при успехе
                navigate(RoutesPath.Root);
            } catch {
                // Ошибка уже обработана в store с toast
                // Редирект не происходит при ошибке
            } finally {
                setSubmitting(false);
            }
        },
        [login, loginType, navigate]
    );

    return {
        handleSubmit,
        isLoading,
        error,
        resetError
    };
};
