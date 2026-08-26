/**
 * Stages dist/ under the site's base path so Lighthouse audits the pages at
 * the same URLs GitHub Pages serves them from. Without this the built pages
 * request /My-Porfolio/ assets that a root-served dist cannot resolve, and
 * every audit fails with a 404.
 */
import { cp, rm, mkdir } from 'node:fs/promises';

const target = '.lighthouse-site/My-Porfolio';

await rm('.lighthouse-site', { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp('dist', target, { recursive: true });

console.log(`Staged dist/ -> ${target}`);
