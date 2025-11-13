import { Form, Formik } from 'formik';
import type { FC } from 'react';
import * as Yup from 'yup';

import { Button, Input, Label } from '@root/components/ui';
import { useLogin } from '@root/hooks';

type LoginFormValues = {
    email: string;
    password: string;
};

const validationSchema = Yup.object<LoginFormValues>({
    email: Yup.string().email('Введите корректный email').required('Обязательное поле'),
    password: Yup.string()
        .min(6, 'Минимальная длина пароля — 6 символов')
        .required('Обязательное поле')
});

const initialValues: LoginFormValues = {
    email: '',
    password: ''
};

export const LoginForm: FC = () => {
    const { handleSubmit, isLoading, error, resetError } = useLogin();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, isSubmitting, handleChange, handleBlur, values }) => (
                <Form className="grid gap-5 sm:gap-6">
                    <div className="grid gap-1.5 sm:gap-2">
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            value={values.email}
                            onChange={(event) => {
                                resetError();
                                handleChange(event);
                            }}
                            onBlur={handleBlur}
                            className="h-10 text-sm leading-tight sm:h-12 sm:text-base"
                            aria-invalid={touched.email && Boolean(errors.email)}
                            aria-describedby="email-error"
                        />
                        {touched.email && errors.email && (
                            <p id="email-error" className="text-sm text-destructive">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-1.5 sm:gap-2">
                        <Label htmlFor="password" className="text-sm font-medium text-foreground">
                            Пароль
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Введите пароль"
                            autoComplete="current-password"
                            value={values.password}
                            onChange={(event) => {
                                resetError();
                                handleChange(event);
                            }}
                            onBlur={handleBlur}
                            className="h-10 text-sm leading-tight sm:h-12 sm:text-base"
                            aria-invalid={touched.password && Boolean(errors.password)}
                            aria-describedby="password-error"
                        />
                        {touched.password && errors.password && (
                            <p id="password-error" className="text-sm text-destructive">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {error && <p className="text-sm text-destructive">{error}</p>}

                    <Button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="h-10 text-sm sm:h-11 sm:text-base"
                    >
                        {isLoading ? 'Входим...' : 'Войти'}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
