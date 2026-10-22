import { assertAllowed } from './safeFetch.js';

async function textIfOk(url, { maxBytes = 200_000 } = {}) {
  try {
    assertAllowed(new URL(url));
    const res = await fetch(url, { headers: { 'User-Agent': 'ConversionLiftLabBot/1.0' }, signal: AbortSignal.timeout(4000), redirect: 'follow' });
    if (!res.ok) return null;
    const txt = (await res.text()).slice(0, maxBytes);
    return txt;
  } catch {
    return null;
  }
}

// Looks for real robots.txt and sitemap files (not an HTML fallback page).
export async function checkCrawlFiles(origin) {
  const [robots, sitemap] = await Promise.all([textIfOk(`${origin}/robots.txt`), textIfOk(`${origin}/sitemap.xml`)]);
  const robotsOk = !!robots && !/^\s*</.test(robots) && /user-agent|sitemap|disallow|allow/i.test(robots);
  const sitemapOk = !!sitemap && /<urlset|<sitemapindex/i.test(sitemap);
  const sitemapInRobots = robotsOk && /^\s*sitemap:/im.test(robots);
  const blocksAll = robotsOk && /user-agent:\s*\*[\s\S]*?disallow:\s*\/\s*$/im.test(robots) && !/allow:\s*\//i.test(robots);
  return { robotsOk, sitemapOk: sitemapOk || sitemapInRobots, blocksAll };
}
