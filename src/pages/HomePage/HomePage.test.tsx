import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useAppStore } from '@root/store';

import { HomePage } from './index';

describe('HomePage', () => {
    beforeEach(() => {
        useAppStore.getState().resetCount();
    });

    it('renders initial counter value', () => {
        render(<HomePage />);

        expect(screen.getByText(/counter/i)).toHaveTextContent('Counter: 0');
    });

    it('increments counter when Increase is clicked', () => {
        render(<HomePage />);

        fireEvent.click(screen.getByRole('button', { name: /increase/i }));

        expect(screen.getByText(/counter/i)).toHaveTextContent('Counter: 1');
    });
});
