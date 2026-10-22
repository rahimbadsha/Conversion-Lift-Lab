import { assertAllowed } from './safeFetch.js';

// Reads the first few KB of an image to learn its real size (bytes + pixels). Best effort.
async function probeOne(url) {
  try {
    assertAllowed(new URL(url));
    const res = await fetch(url, { headers: { Range: 'bytes=0-2047', 'User-Agent': 'ConversionLiftLabBot/1.0' }, signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const range = res.headers.get('content-range') || '';
    const total = parseInt(range.split('/')[1] || res.headers.get('content-length') || '0', 10) || 0;
    await res.arrayBuffer();
    return { total, type: res.headers.get('content-type') || '' };
  } catch {
    return null;
  }
}

// Returns [{ url, bytes, type }] for up to `max` images (checked a few at a time).
export async function probeImageWeights(urls, { max = 12, limit = 6 } = {}) {
  const list = urls.slice(0, max);
  const out = [];
  let next = 0;
  const worker = async () => {
    while (next < list.length) {
      const url = list[next++];
      const info = await probeOne(url);
      if (info && info.total) out.push({ url, bytes: info.total, type: info.type });
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, list.length) }, worker));
  return out;
}
