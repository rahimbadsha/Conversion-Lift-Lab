// Fills the inline-script hash into dist/_headers so the strict Content-Security-Policy always
// matches the theme-init script in index.html. Fails the build if either piece is missing.
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const PLACEHOLDER = '__INLINE_SCRIPT_HASH__';

const html = readFileSync('dist/index.html', 'utf8');
const inline = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
if (inline.length !== 1) throw new Error(`Expected exactly 1 inline script in dist/index.html, found ${inline.length}.`);

const hash = createHash('sha256').update(inline[0]).digest('base64');
const headers = readFileSync('dist/_headers', 'utf8');
if (!headers.includes(PLACEHOLDER)) throw new Error(`dist/_headers has no ${PLACEHOLDER} placeholder.`);

writeFileSync('dist/_headers', headers.replaceAll(PLACEHOLDER, `sha256-${hash}`));
console.log(`[csp-hash] inline script hash sha256-${hash}`);
