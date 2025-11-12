import type { FC } from 'react';

import { Button } from '@root/components/ui';
import { useCounter } from '@root/hooks';
import { Minus, Plus, RotateCcw } from 'lucide-react';

export const HomePage: FC = () => {
    const { count, increase, decrease, resetCount } = useCounter();

    return (
        <div className="flex flex-col items-center gap-6">
            <header className="text-center">
                <h1 className="text-3xl font-bold mb-2">Hello World</h1>
                <p className="text-muted-foreground">
                    Minimal template bundled with Tailwind & shadcn/ui
                </p>
            </header>

            <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-6 shadow-sm">
                <p className="text-lg font-medium">
                    Counter: <span className="font-semibold">{count}</span>
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                    <Button onClick={increase} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Increase
                    </Button>
                    <Button variant="secondary" onClick={decrease} className="gap-2">
                        <Minus className="h-4 w-4" />
                        Decrease
                    </Button>
                    <Button variant="outline" onClick={resetCount} className="gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
};
