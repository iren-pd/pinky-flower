import { Form, Formik } from 'formik';
import { useState } from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';

import {
    Button,
    Input,
    Label,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from '@root/components/ui';
import { useLogin } from '@root/hooks';
import { formatPhoneNumber } from '@root/lib/utils';

type LoginType = 'email' | 'phone';

type LoginFormValues = {
    email: string;
    phone: string;
    password: string;
};

const createValidationSchema = (loginType: LoginType) => {
    const baseSchema = {
        password: Yup.string()
            .min(6, 'Мінімальна довжина пароля — 6 символів')
            .required("Обов'язкове поле")
    };

    if (loginType === 'email') {
        return Yup.object<LoginFormValues>({
            email: Yup.string().email('Введіть коректний email').required("Обов'язкове поле"),
            phone: Yup.string(),
            ...baseSchema
        });
    }

    return Yup.object<LoginFormValues>({
        email: Yup.string(),
        phone: Yup.string()
            .matches(
                /^\+38 \(\d{3}\) \d{3} \d{2} \d{2}$/,
                'Введіть номер телефону в форматі +38 (000) 000 00 00'
            )
            .required("Обов'язкове поле"),
        ...baseSchema
    });
};

const initialValues: LoginFormValues = {
    email: '',
    phone: '+38',
    password: ''
};

export const LoginForm: FC = () => {
    const [loginType, setLoginType] = useState<LoginType>('email');
    const { handleSubmit, isLoading, error, resetError } = useLogin(loginType);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={createValidationSchema(loginType)}
            onSubmit={handleSubmit}
            enableReinitialize
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
                <Form className="grid gap-5 sm:gap-6">
                    <Tabs
                        value={loginType}
                        onValueChange={(value) => {
                            const newType = value as LoginType;
                            setLoginType(newType);
                            resetError();
                            if (newType === 'email') {
                                setFieldValue('phone', '+38');
                            } else {
                                setFieldValue('email', '');
                            }
                        }}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="email">Email</TabsTrigger>
                            <TabsTrigger value="phone">Телефон</TabsTrigger>
                        </TabsList>

                        <TabsContent value="email" className="mt-2">
                            <div className="grid gap-1.5 sm:gap-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium text-foreground"
                                >
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
                        </TabsContent>

                        <TabsContent value="phone" className="mt-2">
                            <div className="grid gap-1.5 sm:gap-2">
                                <Label
                                    htmlFor="phone"
                                    className="text-sm font-medium text-foreground"
                                >
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
                                            if (
                                                newDigits.length < 2 ||
                                                !newDigits.startsWith('38')
                                            ) {
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
                                    className="h-10 text-sm leading-tight sm:h-12 sm:text-base"
                                    aria-invalid={touched.phone && Boolean(errors.phone)}
                                    aria-describedby="phone-error"
                                />
                                {touched.phone && errors.phone && (
                                    <p id="phone-error" className="text-sm text-destructive">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="grid gap-1.5 sm:gap-2">
                        <Label htmlFor="password" className="text-sm font-medium text-foreground">
                            Пароль
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Введіть пароль"
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
                        {isLoading ? 'Вхід...' : 'Увійти'}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
