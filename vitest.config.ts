import path from 'path';

import { coverageConfigDefaults, defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: path.resolve(__dirname, './src/setupTests.ts'),
            css: true,
            passWithNoTests: true,
            alias: {
                '@root': path.resolve(__dirname, './src')
            },
            coverage: {
                provider: 'v8',
                reporter: ['text', 'html', 'lcov'],
                reportsDirectory: 'coverage',
                include: ['src/**/*.{ts,tsx}'],
                exclude: [
                    ...coverageConfigDefaults.exclude,
                    'src/main.tsx',
                    'src/**/*.d.ts',
                    'src/**/__mocks__/**',
                    'src/**/*.stories.tsx'
                ]
            }
        }
    })
);
