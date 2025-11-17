import type { FormikHelpers } from 'formik';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutesPath } from '@root/router/routes';
import { useAuthStore } from '@root/store';

type RegisterValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
};

export const useRegister = () => {
    const navigate = useNavigate();
    const register = useAuthStore.use.register();
    const isLoading = useAuthStore.use.registerLoading();
    const error = useAuthStore.use.registerError();
    const resetError = useAuthStore.use.resetRegisterError();

    useEffect(
        () => () => {
            resetError();
        },
        [resetError]
    );

    const handleSubmit = useCallback(
        async (values: RegisterValues, { setSubmitting }: FormikHelpers<RegisterValues>) => {
            const { confirmPassword, ...payload } = values;

            try {
                await register(payload);

                navigate(RoutesPath.Root);
            } catch {
                // Ошибка уже обработана в store с toast
            } finally {
                void confirmPassword;
                setSubmitting(false);
            }
        },
        [register, navigate]
    );

    return {
        handleSubmit,
        isLoading,
        error,
        resetError
    };
};
