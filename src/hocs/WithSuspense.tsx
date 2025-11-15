import { Loader2 } from 'lucide-react';
import { type ReactNode, Suspense } from 'react';

interface WithSuspenseOptions {
    showLoader?: boolean;
}

const LoadingFlower = () => (
    <div className="flex min-h-[200px] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin-slow text-primary" />
    </div>
);

export const WithSuspense = (
    element: ReactNode,
    options: WithSuspenseOptions = { showLoader: true }
) => <Suspense fallback={options.showLoader ? <LoadingFlower /> : null}>{element}</Suspense>;
