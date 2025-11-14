import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint2';
import svgr from 'vite-plugin-svgr';

const repoName = 'pinky-flower';

export default defineConfig({
    server: {
        port: 3000,
        strictPort: false
    },
    plugins: [react(), eslint(), svgr()],
    base: `/${repoName}/`,
    build: {
        minify: 'esbuild',
        target: 'esnext'
    },
    preview: {
        port: 3000,
        strictPort: false
    },
    resolve: {
        alias: {
            '@root': path.resolve(__dirname, './src')
        }
    },
    appType: 'spa'
});
