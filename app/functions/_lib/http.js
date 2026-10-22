export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra },
  });
}

export function errorResponse(err) {
  if (err instanceof HttpError) return json({ error: err.message }, err.status);
  console.error('Unhandled error:', err && err.stack ? err.stack : err);
  return json({ error: 'Something went wrong on our side. Please try again.' }, 500);
}

// Fixed-window rate limit backed by KV. Best-effort (KV is eventually consistent) — it's a
// cost/abuse guard, not a hard security boundary.
export async function rateLimit(env, request, bucket, limit, windowSeconds = 3600) {
  if (!env.JOBS) return;
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const slot = Math.floor(Date.now() / 1000 / windowSeconds);
  const key = `rl:${bucket}:${ip}:${slot}`;
  const used = parseInt((await env.JOBS.get(key)) || '0', 10);
  if (used >= limit) {
    throw new HttpError(429, 'Too many requests. Please try again in a little while.');
  }
  await env.JOBS.put(key, String(used + 1), { expirationTtl: windowSeconds + 60 });
}

export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    throw new HttpError(400, 'Invalid request.');
  }
}

export function sameOriginOnly(request) {
  const origin = request.headers.get('Origin');
  if (!origin) return;
  const host = new URL(request.url).host;
  if (new URL(origin).host !== host) throw new HttpError(403, 'Forbidden.');
}
