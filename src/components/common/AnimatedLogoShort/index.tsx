import type { FC } from 'react';

import { cn } from '@root/lib/utils';

type AnimatedLogoShortProps = {
    className?: string;
};

export const AnimatedLogoShort: FC<AnimatedLogoShortProps> = ({ className }) => {
    return (
        <div
            aria-hidden="true"
            className={cn(
                'relative flex h-14 w-14 items-center justify-center rounded-full text-3xl sm:h-16 sm:w-16 sm:text-4xl',
                className
            )}
        >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/60 via-primary/25 to-primary/10 opacity-90 blur" />
            <div className="absolute inset-[2px] rounded-full border border-primary/30 bg-card/95 shadow-[inset_0_2px_6px_rgba(255,255,255,0.4)] backdrop-blur" />

            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-white/10 to-transparent opacity-70" />

            <span className="pointer-events-none relative z-10 inline-flex animate-[pulse_6s_ease-in-out_infinite]">
                🌸
            </span>
        </div>
    );
};
