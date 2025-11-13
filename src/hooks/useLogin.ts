import type { FormikHelpers } from 'formik';
import { useCallback, useEffect } from 'react';

import { useAuthStore } from '@root/store';

type LoginValues = {
    email: string;
    password: string;
};

export const useLogin = () => {
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
                await login(values);
            } finally {
                setSubmitting(false);
            }
        },
        [login]
    );

    return {
        handleSubmit,
        isLoading,
        error,
        resetError
    };
};
