import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ErrorBoundary } from './index';

const Bomb = () => {
    throw new Error('Boom');
};

describe('ErrorBoundary', () => {
    it('renders fallback UI when child throws', () => {
        render(
            <ErrorBoundary>
                <Bomb />
            </ErrorBoundary>
        );

        expect(screen.getByRole('heading', { name: /something went wrong/i })).toBeInTheDocument();
        expect(screen.getByText(/please refresh/i)).toBeInTheDocument();
        expect(screen.getByText(/Boom/)).toBeInTheDocument();
    });
});
