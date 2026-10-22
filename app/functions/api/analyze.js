import { json, errorResponse, rateLimit, readJson, sameOriginOnly } from '../_lib/http.js';
import { safeFetch } from '../_lib/safeFetch.js';
import { extractPage } from '../_lib/extract.js';
import { scorePage } from '../_lib/score.js';

export async function onRequestPost({ request, env }) {
  try {
    sameOriginOnly(request);
    await rateLimit(env, request, 'analyze', 15);

    const body = await readJson(request);
    const page = await safeFetch(body.url);
    const model = await extractPage(page.html, page.finalUrl);
    const result = scorePage(model);

    return json({
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
