import { copyFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

const indexPath = join(distDir, 'index.html');
const notFoundPath = join(distDir, '404.html');
const nojekyllPath = join(distDir, '.nojekyll');

if (!existsSync(indexPath)) {
    console.error('Error: index.html not found in dist directory. Run build first.');
    process.exit(1);
}

try {
    // Copy index.html to 404.html for GitHub Pages SPA routing
    copyFileSync(indexPath, notFoundPath);
    console.log('✓ Created 404.html for GitHub Pages SPA support');

    // Create .nojekyll to disable Jekyll processing
    writeFileSync(nojekyllPath, '');
    console.log('✓ Created .nojekyll file');
} catch (error) {
    console.error('Error creating GitHub Pages files:', error);
    process.exit(1);
}
