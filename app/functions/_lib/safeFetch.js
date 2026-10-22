import { HttpError } from './http.js';

const BLOCKED_NAMES = [/^localhost$/i, /\.localhost$/i, /\.local$/i, /\.internal$/i, /\.lan$/i, /\.home$/i];

function isBlockedHost(rawHost) {
  const h = rawHost.toLowerCase().replace(/^\[|\]$/g, '');
  if (!h || BLOCKED_NAMES.some(r => r.test(h))) return true;
  if (h.includes(':')) return true; // IPv6 literals
  if (/^\d+$/.test(h) || /^0x[0-9a-f]+$/i.test(h)) return true; // decimal/hex-encoded IPv4
  const m = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    const a = +m[1];
    const b = +m[2];
    if (a === 0 || a === 10 || a === 127 || a >= 224) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 100 && b >= 64 && b <= 127) return true;
    return true; // no raw IPs at all — public sites have hostnames
  }
  if (!h.includes('.')) return true;
  return false;
}

export function normalizeUrl(input) {
  let s = String(input || '').trim();
  if (!s || s.length > 2048) throw new HttpError(400, 'Please enter a valid URL.');
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  let url;
  try {
    url = new URL(s);
  } catch {
    throw new HttpError(400, 'Please enter a valid URL.');
  }
  assertAllowed(url);
  return url;
}

function assertAllowed(url) {
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new HttpError(400, 'Only http and https URLs are supported.');
  }
  if (url.username || url.password) throw new HttpError(400, 'URLs with credentials are not allowed.');
  if (url.port && url.port !== '80' && url.port !== '443') throw new HttpError(400, 'That port is not allowed.');
  if (isBlockedHost(url.hostname)) throw new HttpError(400, 'That address is not allowed.');
}

// Fetches a public web page with redirect re-validation, a timeout, and a size cap.
export async function safeFetch(input, { maxBytes = 1_500_000, timeoutMs = 9000, expect = /text\/html|application\/xhtml/i, accept = 'text/html,application/xhtml+xml' } = {}) {
  let url = normalizeUrl(input);
  const started = Date.now();

  for (let hop = 0; hop < 5; hop++) {
    assertAllowed(url);
    let res;
    try {
      res = await fetch(url.toString(), {
        redirect: 'manual',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ConversionLiftLabBot/1.0; +https://conversionliftlab.com)',
          Accept: accept,
          'Accept-Language': 'en-US,en;q=0.8',
        },
        signal: AbortSignal.timeout(timeoutMs),
      });
    } catch {
      throw new HttpError(422, "We couldn't reach that website. Check the address and try again.");
    }

    if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
      try {
        url = new URL(res.headers.get('location'), url);
      } catch {
        throw new HttpError(422, 'That website redirected somewhere invalid.');
      }
      continue;
    }

    if (res.status >= 400) {
      throw new HttpError(422, `That website responded with an error (${res.status}).`);
    }
    const type = res.headers.get('content-type') || '';
    if (!expect.test(type)) {
      throw new HttpError(422, "That address doesn't look like a web page.");
    }

    const reader = res.body.getReader();
    const chunks = [];
    let size = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        break;
      }
      chunks.push(value);
    }
    const buf = new Uint8Array(chunks.reduce((n, c) => n + c.byteLength, 0));
    let off = 0;
    for (const c of chunks) {
      buf.set(c, off);
      off += c.byteLength;
    }
    return {
      finalUrl: url.toString(),
      html: new TextDecoder('utf-8').decode(buf),
      bytes: size,
      ms: Date.now() - started,
      truncated: size > maxBytes,
    };
  }
  throw new HttpError(422, 'That website redirected too many times.');
}
