/* global HTMLRewriter -- provided by the Cloudflare Workers runtime */
// Turns raw HTML into a compact "page model" used by both the score and the redesign tools.

const clean = s => s.replace(/\s+/g, ' ').trim();

function absolute(href, base) {
  try {
    return new URL(href, base).toString();
  } catch {
    return null;
  }
}

// Brand colours are the saturated ones — drop whites, blacks and greys.
function isBrandColour(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
  return Math.max(r, g, b) - Math.min(r, g, b) > 40;
}

export function scanCss(css) {
  const colours = new Map();
  const fonts = new Map();
  for (const c of css.match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g) || []) {
    const k = c.toLowerCase();
    if (isBrandColour(k)) colours.set(k, (colours.get(k) || 0) + 1);
  }
  for (const f of css.matchAll(/font-family\s*:\s*([^;}{]+)/gi)) {
    const first = f[1].split(',')[0].replace(/["']/g, '').trim();
    if (first && !/^(inherit|initial|unset|sans-serif|serif|monospace|system-ui|var\(.*)$/i.test(first)) {
      fonts.set(first, (fonts.get(first) || 0) + 1);
    }
  }
  return { colours, fonts };
}

function topCounts(map, n) {
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k]) => k);
}

export async function extractPage(rawHtml, baseUrl) {
  const html = rawHtml.replace(/<br\s*\/?>/gi, ' ');
  const m = {
    url: baseUrl,
    lang: '',
    title: '',
    description: '',
    canonical: '',
    viewport: '',
    themeColor: '',
    ogImage: '',
    hasJsonLd: false,
    h1: [],
    h2: [],
    h3: [],
    paragraphs: [],
    listItems: [],
    quotes: [],
    buttons: [],
    links: [],
    navLinkCount: 0,
    footerLinkCount: 0,
    forms: 0,
    fields: [],
    images: [],
    scripts: { total: 0, external: 0, inline: 0 },
    stylesheets: 0,
    stylesheetUrls: [],
    videos: 0,
    tel: [],
    mailto: [],
    htmlBytes: html.length,
    wordCount: 0,
    colors: [],
    fonts: [],
  };

  const colorCounts = new Map();
  const fontCounts = new Map();
  const countColors = css => {
    const { colours, fonts } = scanCss(css);
    for (const [k, v] of colours) colorCounts.set(k, (colorCounts.get(k) || 0) + v);
    for (const [k, v] of fonts) fontCounts.set(k, (fontCounts.get(k) || 0) + v);
  };

  // Generic "collect text of each matched element" helper.
  const collect = (sink, { max = 40, maxLen = 400, onEnd } = {}) => {
    let cur = '';
    return {
      element(el) {
        cur = '';
        el.onEndTag(() => {
          const t = clean(cur);
          if (t && sink.length < max) sink.push(t.slice(0, maxLen));
          if (onEnd) onEnd(t);
          cur = '';
        });
      },
      text(t) {
        cur += t.text;
      },
    };
  };

  let titleBuf = '';
  let anchorHref = '';
  let anchorText = '';
  let styleBuf = '';
  let wordText = '';

  const rewriter = new HTMLRewriter()
    .on('html', {
      element(el) {
        m.lang = el.getAttribute('lang') || '';
      },
    })
    .on('title', {
      text(t) {
        titleBuf += t.text;
      },
    })
    .on('meta', {
      element(el) {
        const name = (el.getAttribute('name') || el.getAttribute('property') || '').toLowerCase();
        const content = el.getAttribute('content') || '';
        if (name === 'description') m.description = clean(content);
        else if (name === 'viewport') m.viewport = content;
        else if (name === 'theme-color') m.themeColor = content;
        else if (name === 'og:image') m.ogImage = absolute(content, baseUrl) || '';
      },
    })
    .on('link', {
      element(el) {
        const rel = (el.getAttribute('rel') || '').toLowerCase();
        if (rel === 'canonical') m.canonical = el.getAttribute('href') || '';
        if (rel.includes('stylesheet')) {
          m.stylesheets++;
          const href = el.getAttribute('href');
          if (href && m.stylesheetUrls.length < 4) m.stylesheetUrls.push(absolute(href, baseUrl));
        }
      },
    })
    .on('script', {
      element(el) {
        m.scripts.total++;
        const type = (el.getAttribute('type') || '').toLowerCase();
        if (type === 'application/ld+json') m.hasJsonLd = true;
        if (el.getAttribute('src')) m.scripts.external++;
        else m.scripts.inline++;
      },
    })
    .on('style', {
      element() {
        styleBuf = '';
      },
      text(t) {
        styleBuf += t.text;
        if (t.lastInTextNode) {
          countColors(styleBuf);
          styleBuf = '';
        }
      },
    })
    .on('[style]', {
      element(el) {
        countColors(el.getAttribute('style') || '');
      },
    })
    .on('h1', collect(m.h1, { max: 5 }))
    .on('h2', collect(m.h2, { max: 20 }))
    .on('h3', collect(m.h3, { max: 20 }))
    .on('p', collect(m.paragraphs, { max: 40, onEnd: t => (wordText += ` ${t}`) }))
    .on('li', collect(m.listItems, { max: 40, maxLen: 200, onEnd: t => (wordText += ` ${t}`) }))
    .on('blockquote', collect(m.quotes, { max: 12, maxLen: 400 }))
    .on('button', collect(m.buttons, { max: 30, maxLen: 80 }))
    .on('nav a', {
      element() {
        m.navLinkCount++;
      },
    })
    .on('footer a', {
      element() {
        m.footerLinkCount++;
      },
    })
    .on('a', {
      element(el) {
        anchorHref = el.getAttribute('href') || '';
        anchorText = '';
        const href = anchorHref;
        if (/^tel:/i.test(href)) m.tel.push(href.slice(4));
        if (/^mailto:/i.test(href)) m.mailto.push(href.slice(7).split('?')[0]);
        // Cloudflare email obfuscation and chat links still count as real contact methods.
        if (/cdn-cgi\/l\/email-protection/i.test(href)) m.mailto.push('(protected email)');
        if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|m\.me|t\.me)\//i.test(href)) m.tel.push('(chat link)');
        el.onEndTag(() => {
          const text = clean(anchorText);
          if (href && !/^(#|javascript:|mailto:|tel:)/i.test(href) && m.links.length < 200) {
            m.links.push({ text: text.slice(0, 80), href: absolute(href, baseUrl) || href });
          }
        });
      },
      text(t) {
        anchorText += t.text;
      },
    })
    .on('form', {
      element() {
        m.forms++;
      },
    })
    .on('input, select, textarea', {
      element(el) {
        const type = (el.getAttribute('type') || el.tagName).toLowerCase();
        if (['hidden', 'submit', 'button', 'image', 'reset'].includes(type)) return;
        m.fields.push({
          type,
          name: el.getAttribute('name') || '',
          required: el.hasAttribute('required'),
        });
      },
    })
    .on('img', {
      element(el) {
        if (m.images.length >= 60) return;
        const src = el.getAttribute('src') || el.getAttribute('data-src') || '';
        m.images.push({
          src: src ? absolute(src, baseUrl) : '',
          alt: el.getAttribute('alt'),
          lazy: (el.getAttribute('loading') || '').toLowerCase() === 'lazy',
          sized: !!(el.getAttribute('width') && el.getAttribute('height')),
          hint: `${el.getAttribute('class') || ''} ${el.getAttribute('id') || ''} ${src}`.toLowerCase(),
        });
      },
    })
    .on('video, iframe', {
      element() {
        m.videos++;
      },
    });

  // Consume the stream so all handlers run.
  await rewriter.transform(new Response(html)).arrayBuffer();

  m.title = clean(titleBuf);
  m.wordCount = clean(wordText).split(' ').filter(Boolean).length;
  m.colors = topCounts(colorCounts, 6);
  m.fonts = topCounts(fontCounts, 3);
  m.tel = [...new Set(m.tel)];
  m.mailto = [...new Set(m.mailto)];
  return m;
}
