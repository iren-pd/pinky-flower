import type { FC } from 'react';

import { useCounter } from '@root/hooks';

export const HomePage: FC = () => {
    const { count, increase, decrease, resetCount } = useCounter();

    return (
        <section>
            <h1>Hello World</h1>
            <div>
                <p>Counter: {count}</p>
                <div>
                    <button type="button" onClick={increase}>
                        Increase
                    </button>
                    <button type="button" onClick={decrease}>
                        Decrease
                    </button>
                    <button type="button" onClick={resetCount}>
                        Reset
                    </button>
                </div>
            </div>
        </section>
    );
};
