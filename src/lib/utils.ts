import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');

    if (!digits || digits.length === 0) {
        return '+38';
    }

    let phoneDigits = digits;
    if (!phoneDigits.startsWith('38')) {
        phoneDigits = '38' + phoneDigits;
    }

    phoneDigits = phoneDigits.substring(0, 12);

    if (phoneDigits === '38' || phoneDigits.length <= 3) {
        return '+38';
    }

    const countryCode = phoneDigits.substring(0, 2);
    const rest = phoneDigits.substring(2);

    if (rest.length === 0) {
        return `+${countryCode}`;
    } else if (rest.length === 1) {
        return `+${countryCode} (${rest}`;
    } else if (rest.length === 2) {
        return `+${countryCode} (${rest}`;
    } else if (rest.length === 3) {
        return `+${countryCode} (${rest})`;
    } else if (rest.length <= 6) {
        return `+${countryCode} (${rest.substring(0, 3)}) ${rest.substring(3)}`;
    } else if (rest.length <= 8) {
        return `+${countryCode} (${rest.substring(0, 3)}) ${rest.substring(3, 6)} ${rest.substring(6)}`;
    } else {
        return `+${countryCode} (${rest.substring(0, 3)}) ${rest.substring(3, 6)} ${rest.substring(6, 8)} ${rest.substring(8, 10)}`;
    }
};
