import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createSelectors } from './utils/createSelectors';

interface AppState {
    count: number;
    increase: () => void;
    decrease: () => void;
    resetCount: () => void;
}

const useAppStoreBase = create<AppState>()(
    /**
     * devtools wires the store to Redux DevTools.
     * action.type follows app-store/<slice>/<action> to keep event history searchable.
     */
    devtools(
        (set, get) => ({
            count: 0,
            increase: () => {
                const { count } = get();
                set(() => ({ count: count + 1 }), false, { type: 'app-store/count/increase' });
            },
            decrease: () => {
                const { count } = get();
                set(() => ({ count: Math.max(0, count - 1) }), false, {
                    type: 'app-store/count/decrease'
                });
            },
            resetCount: () => {
                set(() => ({ count: 0 }), false, { type: 'app-store/count/reset' });
            }
        }),
        { name: 'app-store' }
    )
);

export const useAppStore = createSelectors(useAppStoreBase);
