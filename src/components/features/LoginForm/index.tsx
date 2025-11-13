import { Form, Formik, type FormikHelpers } from 'formik';
import type { FC } from 'react';
import * as Yup from 'yup';

import { Button, Input, Label } from '@root/components/ui';

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
    const handleSubmit = (
        values: LoginFormValues,
        { setSubmitting }: FormikHelpers<LoginFormValues>
    ) => {
        console.log('Submit login form:', values);
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, isSubmitting, handleChange, handleBlur, values }) => (
                <Form className="grid gap-6">
                    <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                            Email
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={touched.email && Boolean(errors.email)}
                            aria-describedby="email-error"
                        />
                        {touched.email && errors.email && (
                            <p id="email-error" className="text-sm text-destructive">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={touched.password && Boolean(errors.password)}
                            aria-describedby="password-error"
                        />
                        {touched.password && errors.password && (
                            <p id="password-error" className="text-sm text-destructive">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        Войти
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
