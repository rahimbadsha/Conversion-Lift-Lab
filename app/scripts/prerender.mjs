// Prerenders each client-side route to static HTML after the Vite build.
// Why: this is a client-only React SPA — bots/AI crawlers that don't execute
// JavaScript (many don't: most LLM crawlers, some social-share scrapers) see
// only an empty <div id="root"> otherwise. This snapshots the fully-rendered
// DOM (post react-helmet head updates) for each route into its own static
// index.html so Cloudflare Pages serves real content + correct <title>/meta
// per URL without requiring JS execution, while still hydrating normally for
// real visitors.
import { execFileSync, spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');
const port = 4713;
import { caseStudies } from '../src/data/caseStudies.js';

const routes = [
  '/', '/about', '/services', '/website-score', '/privacy', '/terms', '/contact', '/case-studies', '/portfolio',
  ...caseStudies.map(c => `/case-studies/${c.slug}`),
];

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

function findChrome() {
  const candidates = [
    CHROME,
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ];
  for (const c of candidates) {
    try {
      execFileSync('test', ['-f', c]);
      return c;
    } catch {
      // not found, try next
    }
  }
  return null;
}

async function waitForServer(url, tries = 40) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      // server not up yet
    }
    await new Promise(r => setTimeout(r, 250));
  }
  throw new Error(`Server at ${url} did not start in time`);
}

async function main() {
  const chrome = findChrome();
  if (!chrome) {
    console.warn('[prerender] No Chrome/Chromium found — skipping prerender step. Site will still work as a client-rendered SPA.');
    return;
  }

  const server = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort'], {
    cwd: root,
    stdio: 'inherit',
  });

  try {
    await waitForServer(`http://localhost:${port}/`);
    // give React a beat to hydrate + framer-motion to settle initial animations
    await new Promise(r => setTimeout(r, 400));

    // IMPORTANT: capture every route from the server's ORIGINAL (unmodified) dist/index.html
    // before writing any snapshot back to disk. vite preview's SPA fallback serves whatever
    // dist/index.html currently contains for unmatched routes (/about, /contact) — if we wrote
    // the "/" snapshot to disk first, subsequent routes would hydrate on top of Home's already-
    // baked markup/title instead of the clean SPA shell, producing duplicate <title> tags.
    const dump = (url) => execFileSync(chrome, [
      '--headless',
      '--disable-gpu',
      '--virtual-time-budget=4000',
      '--run-all-compositor-stages-before-draw',
      '--dump-dom',
      url,
    ], { maxBuffer: 1024 * 1024 * 20 }).toString();

    const captures = routes.map(route => ({
      route,
      html: dump(`http://localhost:${port}${route}`),
    }));
    const notFoundHtml = dump(`http://localhost:${port}/this-page-does-not-exist`);

    for (const { route, html } of captures) {
      // Flat "<route>.html" (not "<route>/index.html") so Cloudflare Pages matches the
      // no-trailing-slash URL directly instead of 308-redirecting /about -> /about/, which
      // would break non-redirect-following bots and conflict with our canonical tags.
      const outFile = route === '/' ? join(dist, 'index.html') : join(dist, `${route.slice(1)}.html`);
      mkdirSync(dirname(outFile), { recursive: true });
      writeFileSync(outFile, `<!doctype html>\n${html}`);
      console.log(`[prerender] wrote ${outFile} (${(html.length / 1024).toFixed(1)} kB)`);
    }

    // Real 404 page for Cloudflare Pages (served with actual 404 status for unmatched routes)
    writeFileSync(join(dist, '404.html'), `<!doctype html>\n${notFoundHtml}`);
    console.log('[prerender] wrote dist/404.html');
  } finally {
    server.kill();
  }
}

main().catch(err => {
  console.error('[prerender] failed:', err);
  process.exitCode = 0; // never block deploys — SPA fallback still works without prerender
});
