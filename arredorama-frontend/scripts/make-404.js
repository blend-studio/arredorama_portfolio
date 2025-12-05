import { copyFile, access, constants } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distIndex = path.resolve(__dirname, '..', 'dist', 'index.html');
const dist404 = path.resolve(__dirname, '..', 'dist', '404.html');

(async () => {
  try {
    await access(distIndex, constants.R_OK);
    await copyFile(distIndex, dist404);
    console.log('[postbuild] Copied index.html to 404.html for GitHub Pages SPA routing.');
  } catch (err) {
    console.error('[postbuild] Unable to create 404.html:', err.message);
    process.exitCode = 1;
  }
})();
