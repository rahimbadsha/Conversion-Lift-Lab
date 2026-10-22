import { json, errorResponse, rateLimit, readJson, sameOriginOnly } from '../_lib/http.js';
import { safeFetch, normalizeUrl } from '../_lib/safeFetch.js';
import { extractPage } from '../_lib/extract.js';
import { scorePage } from '../_lib/score.js';
import { checkCrawlFiles } from '../_lib/technical.js';
import { probeImageWeights } from '../_lib/imageProbe.js';

const kb = bytes => (bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`);

function categorySummary(c) {
  const bad = c.checks.find(ch => ch.status !== 'pass');
  return `${c.points}/${c.max} points · ${bad ? `needs work: ${bad.label.toLowerCase()}` : 'all checks passed'}`;
}

// Runs the real inspection. `emit` receives each finding as soon as it is actually computed.
async function inspect(url, emit) {
  const page = await safeFetch(url);
  emit({
    id: 'fetch',
    label: 'Loaded your page',
    detail: `HTTP ${page.status} · ${page.ttfbMs} ms · ${kb(page.bytes)}${page.redirects ? ` · ${page.redirects} redirect(s)` : ''}`,
    progress: 14,
  });

  const model = await extractPage(page.html, page.finalUrl);
  emit({
    id: 'read',
    label: 'Read the page structure',
    detail: `${model.wordCount} words · ${model.images.length} images · ${model.links.length} links · ${model.forms} form(s)`,
    progress: 26,
  });

  // Start the network-based checks now so they run while we score the page itself.
  const origin = new URL(page.finalUrl).origin;
  const crawlP = checkCrawlFiles(origin);
  const imageUrls = model.images.map(i => i.src).filter(u => /^https?:/i.test(u || ''));
  const imagesP = probeImageWeights([...new Set(imageUrls)]);

  const base = scorePage(model);
  const steps = [
    ['message', 'Checked message and headline', 38],
    ['cta', 'Checked calls to action', 50],
    ['trust', 'Checked trust and proof', 62],
    ['friction', 'Checked forms and friction', 72],
    ['mobile', 'Checked mobile and page weight', 80],
  ];
  steps.forEach(([id, label, progress], i) => emit({ id, label, detail: categorySummary(base.categories[i]), progress }));

  const hdr = page.headers;
  const secCount = [hdr.hsts, hdr.csp, hdr.xcto, hdr.xfo, hdr.referrer].filter(Boolean).length;
  emit({ id: 'headers', label: 'Checked security headers', detail: `${secCount} of 5 common headers found`, progress: 85 });

  const crawl = await crawlP;
  emit({
    id: 'crawl',
    label: 'Checked robots.txt and sitemap',
    detail: `robots.txt ${crawl.robotsOk ? 'found' : 'missing'} · sitemap ${crawl.sitemapOk ? 'found' : 'missing'}${crawl.blocksAll ? ' · blocks all crawlers!' : ''}`,
    progress: 91,
  });

  const images = await imagesP;
  const heavy = images.filter(i => i.bytes > 300_000).length;
  emit({
    id: 'images',
    label: 'Measured image weight',
    detail: images.length ? `${images.length} images measured · ${heavy} over 300 KB` : 'No images could be measured',
    progress: 97,
  });

  const result = scorePage(model, { fetch: page, crawl, images });
  return {
    url: page.finalUrl,
    fetchedMs: page.ms,
    ...result,
    found: {
      title: model.title,
      headline: model.h1[0] || '',
      description: model.description,
      forms: model.forms,
      fields: model.fields.length,
      images: model.images.length,
      links: model.links.length,
    },
  };
}

export async function onRequestPost({ request, env }) {
  try {
    sameOriginOnly(request);
    await rateLimit(env, request, 'analyze', 15);

    const body = await readJson(request);
    normalizeUrl(body.url); // validate up front so bad input returns a normal error response
    const wantsStream = new URL(request.url).searchParams.get('stream') === '1';

    if (!wantsStream) {
      return json(await inspect(body.url, () => {}));
    }

    const enc = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const send = obj => controller.enqueue(enc.encode(`${JSON.stringify(obj)}\n`));
        try {
          const data = await inspect(body.url, step => send({ type: 'step', ...step }));
          send({ type: 'result', data });
        } catch (err) {
          const known = err && typeof err.status === 'number';
          if (!known) console.error('scan failed', err && err.stack ? err.stack : err);
          send({ type: 'error', error: known ? err.message : 'Something went wrong on our side. Please try again.' });
        } finally {
          controller.close();
        }
      },
    });
    return new Response(stream, {
      headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' },
    });
  } catch (err) {
    return errorResponse(err);
  }
}

export function onRequest() {
  return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', Allow: 'POST' },
  });
}
