import { Form, Formik } from 'formik';
import { AlertCircle } from 'lucide-react';
import type { FC } from 'react';
import * as Yup from 'yup';

import { Alert, AlertDescription, Button, Input, Label } from '@root/components/ui';
import { useRegister } from '@root/hooks';
import { formatPhoneNumber } from '@root/lib/utils';

type RegisterFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
};

const validationSchema = Yup.object<RegisterFormValues>({
    firstName: Yup.string().trim().required("Обов'язкове поле"),
    lastName: Yup.string().trim().required("Обов'язкове поле"),
    email: Yup.string().email('Введіть коректний email').required("Обов'язкове поле"),
    phone: Yup.string()
        .matches(
            /^\+38 \(\d{3}\) \d{3} \d{2} \d{2}$/,
            'Введіть номер телефону в форматі +38 (000) 000 00 00'
        )
        .required("Обов'язкове поле"),
    password: Yup.string()
        .min(6, 'Мінімальна довжина пароля — 6 символів')
        .required("Обов'язкове поле"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Паролі повинні збігатися')
        .required('Підтвердіть пароль')
});

const initialValues: RegisterFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '+38',
    password: '',
    confirmPassword: ''
};

export const RegisterForm: FC = () => {
    const { handleSubmit, isLoading, error, resetError } = useRegister();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({
                errors,
                touched,
                isSubmitting,
                handleChange,
                handleBlur,
                values,
                setFieldValue
            }) => (
                <Form className="grid gap-4 sm:gap-5">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                        <div className="grid gap-1.5 sm:gap-2">
                            <Label
                                htmlFor="firstName"
                                className="text-sm font-medium text-foreground"
                            >
                                Ім'я
                            </Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                placeholder="Оксана"
                                autoComplete="given-name"
                                value={values.firstName}
                                onChange={(event) => {
                                    resetError();
                                    handleChange(event);
                                }}
                                onBlur={handleBlur}
                                className="h-10 text-sm leading-tight sm:h-11 sm:text-base"
                                aria-invalid={touched.firstName && Boolean(errors.firstName)}
                                aria-describedby="firstName-error"
                            />
                            {touched.firstName && errors.firstName && (
                                <p id="firstName-error" className="text-sm text-destructive">
                                    {errors.firstName}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-1.5 sm:gap-2">
                            <Label
                                htmlFor="lastName"
                                className="text-sm font-medium text-foreground"
                            >
                                Прізвище
                            </Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                placeholder="Іваненко"
                                autoComplete="family-name"
                                value={values.lastName}
                                onChange={(event) => {
                                    resetError();
                                    handleChange(event);
                                }}
                                onBlur={handleBlur}
                                className="h-10 text-sm leading-tight sm:h-11 sm:text-base"
                                aria-invalid={touched.lastName && Boolean(errors.lastName)}
                                aria-describedby="lastName-error"
                            />
                            {touched.lastName && errors.lastName && (
                                <p id="lastName-error" className="text-sm text-destructive">
                                    {errors.lastName}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-1.5 sm:gap-2">
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">
                            Електронна пошта
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
                            className="h-10 text-sm leading-tight sm:h-11 sm:text-base"
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
                        <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                            Телефон
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+38 (000) 000 00 00"
                            autoComplete="tel"
                            value={values.phone}
                            onChange={(event) => {
                                resetError();
                                const newValue = event.target.value;

                                if (values.phone === '+38') {
                                    const newDigits = newValue.replace(/\D/g, '');
                                    if (newDigits.length < 2 || !newDigits.startsWith('38')) {
                                        setFieldValue('phone', '+38');
                                        return;
                                    }
                                }

                                const formatted = formatPhoneNumber(newValue);
                                setFieldValue('phone', formatted);
                            }}
                            onFocus={() => {
                                if (
                                    !values.phone ||
                                    values.phone.trim() === '' ||
                                    values.phone === '+38'
                                ) {
                                    setFieldValue('phone', '+38');
                                }
                            }}
                            onBlur={(e) => {
                                const digits = e.target.value.replace(/\D/g, '');
                                if (!digits || digits === '38' || digits.length <= 2) {
                                    setFieldValue('phone', '+38');
                                }
                                handleBlur(e);
                            }}
                            className="h-10 text-sm leading-tight sm:h-11 sm:text-base"
                            aria-invalid={touched.phone && Boolean(errors.phone)}
                            aria-describedby="phone-error"
                        />
                        {touched.phone && errors.phone && (
                            <p id="phone-error" className="text-sm text-destructive">
                                {errors.phone}
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
                            placeholder="Вигадайте пароль"
                            autoComplete="new-password"
                            value={values.password}
                            onChange={(event) => {
                                resetError();
                                handleChange(event);
                            }}
                            onBlur={handleBlur}
                            className="h-10 text-sm leading-tight sm:h-11 sm:text-base"
                            aria-invalid={touched.password && Boolean(errors.password)}
                            aria-describedby="password-error"
                        />
                        {touched.password && errors.password && (
                            <p id="password-error" className="text-sm text-destructive">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-1.5 sm:gap-2">
                        <Label
                            htmlFor="confirmPassword"
                            className="text-sm font-medium text-foreground"
                        >
                            Підтвердіть пароль
                        </Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Повторіть пароль"
                            autoComplete="new-password"
                            value={values.confirmPassword}
                            onChange={(event) => {
                                resetError();
                                handleChange(event);
                            }}
                            onBlur={handleBlur}
                            className="h-10 text-sm leading-tight sm:h-11 sm:text-base"
                            aria-invalid={
                                touched.confirmPassword && Boolean(errors.confirmPassword)
                            }
                            aria-describedby="confirmPassword-error"
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                            <p id="confirmPassword-error" className="text-sm text-destructive">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="mx-auto w-full md:w-1/2 h-10 text-sm sm:h-10 sm:text-base"
                    >
                        {isLoading ? 'Створюємо акаунт...' : 'Зареєструватися'}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
