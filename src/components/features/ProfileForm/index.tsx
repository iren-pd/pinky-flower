import { Form, Formik } from 'formik';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';

import { Alert, AlertDescription, Button, Input, Label } from '@root/components/ui';
import { formatPhoneNumber } from '@root/lib/utils';
import { useAuthStore } from '@root/store/authStore';
import type { AppUser } from '@root/types/user';

type ProfileFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatarEmodji: string;
};

const validationSchema = Yup.object<ProfileFormValues>({
    firstName: Yup.string().min(2, 'Мінімальна довжина — 2 символи').required("Обов'язкове поле"),
    lastName: Yup.string().min(2, 'Мінімальна довжина — 2 символи').required("Обов'язкове поле"),
    email: Yup.string().email('Введіть коректний email').required("Обов'язкове поле"),
    phone: Yup.string()
        .matches(
            /^\+38 \(\d{3}\) \d{3} \d{2} \d{2}$/,
            'Введіть номер телефону в форматі +38 (000) 000 00 00'
        )
        .required("Обов'язкове поле"),
    avatarEmodji: Yup.string().max(2, 'Максимум 2 символи')
});

type ProfileFormProps = {
    profile: AppUser;
    onSuccess?: () => void;
};

export const ProfileForm: FC<ProfileFormProps> = ({ profile, onSuccess }) => {
    const updateProfile = useAuthStore.use.updateProfile();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const initialValues: ProfileFormValues = {
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '+38',
        avatarEmodji: profile.avatarEmodji || ''
    };

    const handleSubmit = async (values: ProfileFormValues) => {
        try {
            setIsLoading(true);
            setError(null);
            setSuccess(false);

            await updateProfile({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                avatarEmodji: values.avatarEmodji || undefined
            });

            setSuccess(true);
            onSuccess?.();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Не вдалося оновити профіль');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
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
                <Form className="grid gap-5">
                    <div className="grid gap-1.5">
                        <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                            Ім'я
                        </Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Введіть ім'я"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="h-10 text-sm"
                            aria-invalid={touched.firstName && Boolean(errors.firstName)}
                            aria-describedby="firstName-error"
                        />
                        {touched.firstName && errors.firstName && (
                            <p id="firstName-error" className="text-sm text-destructive">
                                {errors.firstName}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                            Прізвище
                        </Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Введіть прізвище"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="h-10 text-sm"
                            aria-invalid={touched.lastName && Boolean(errors.lastName)}
                            aria-describedby="lastName-error"
                        />
                        {touched.lastName && errors.lastName && (
                            <p id="lastName-error" className="text-sm text-destructive">
                                {errors.lastName}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-1.5">
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="h-10 text-sm"
                            aria-invalid={touched.email && Boolean(errors.email)}
                            aria-describedby="email-error"
                        />
                        {touched.email && errors.email && (
                            <p id="email-error" className="text-sm text-destructive">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                            Телефон
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+38 (000) 000 00 00"
                            value={values.phone}
                            onChange={(event) => {
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
                            className="h-10 text-sm"
                            aria-invalid={touched.phone && Boolean(errors.phone)}
                            aria-describedby="phone-error"
                        />
                        {touched.phone && errors.phone && (
                            <p id="phone-error" className="text-sm text-destructive">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {success && (
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>Профіль успішно оновлено</AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit" disabled={isSubmitting || isLoading} className="h-10">
                        {isLoading ? 'Збереження...' : 'Зберегти зміни'}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
