// Rule-based conversion-focused scoring. Deterministic: same HTML in -> same score out.
// 100 points: Message 25, CTAs 25, Trust & proof 20, Friction 15, Mobile & speed 15.

const STRONG_CTA = /\b(get|start|book|schedule|buy|shop|try|claim|download|join|request|sign ?up|register|order|apply|subscribe|reserve|quote|demo|call|contact|audit|talk)\b/i;
const WEAK_CTA = /^(submit|click here|learn more|read more|more|continue|here|go|send|details)$/i;
const BENEFIT = /\b(you|your|get|grow|save|more|faster|without|never|free|results|increase|reduce|boost|build|turn|win|stop|finally)\b/i;

function status(points, max) {
  if (points >= max) return 'pass';
  if (points > 0) return 'warn';
  return 'fail';
}

function mk(label, points, max, detail, tip) {
  return { label, points, max, status: status(points, max), detail, tip: points >= max ? '' : tip };
}

const cat = (name, checks) => {
  const points = checks.reduce((n, c) => n + c.points, 0);
  const max = checks.reduce((n, c) => n + c.max, 0);
  return { name, points, max, score: Math.round((points / max) * 100), checks };
};

export function gradeFor(score) {
  if (score >= 92) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 45) return 'D';
  return 'F';
}

// Plain-language rating shown to visitors instead of a school grade.
export function ratingFor(score) {
  if (score >= 90) return { label: 'Excellent', tagline: 'Conversion machine', tone: 'emerald' };
  if (score >= 80) return { label: 'Very Good', tagline: 'Strong foundation', tone: 'green' };
  if (score >= 65) return { label: 'Good', tagline: 'Room to grow', tone: 'sky' };
  if (score >= 50) return { label: 'Needs Work', tagline: 'Leaking leads', tone: 'amber' };
  if (score >= 35) return { label: 'Poor', tagline: 'Losing customers', tone: 'orange' };
  return { label: 'Critical', tagline: 'Urgent fixes needed', tone: 'red' };
}

export function scoreTechnical(t) {
  const f = t.fetch;
  const hdr = f.headers || {};
  const secCount = [hdr.hsts, hdr.csp, hdr.xcto, hdr.xfo, hdr.referrer].filter(Boolean).length;
  const heavy = (t.images || []).filter(i => i.bytes > 300_000);
  const crawl = t.crawl || {};
  const crawlPts = crawl.blocksAll ? 0 : crawl.robotsOk && crawl.sitemapOk ? 3 : crawl.robotsOk || crawl.sitemapOk ? 1 : 0;

  return cat('Technical health', [
    mk(
      'Secure connection (HTTPS)',
      /^https:/i.test(f.finalUrl) ? 3 : 0,
      3,
      /^https:/i.test(f.finalUrl) ? 'Page is served over HTTPS.' : 'Page is not served over HTTPS.',
      'Serve every page over HTTPS. Browsers warn visitors about insecure pages, which kills trust and conversions.'
    ),
    mk(
      'Fast server response',
      f.ttfbMs <= 600 ? 3 : f.ttfbMs <= 1500 ? 1 : 0,
      3,
      `Server answered in ${f.ttfbMs} ms (measured from our server, so your visitors may see slightly different times).`,
      'Slow servers lose visitors before the page even starts. Use caching or a CDN, and a faster host if needed.'
    ),
    mk(
      'Security headers',
      secCount >= 3 ? 2 : secCount >= 1 ? 1 : 0,
      2,
      `${secCount} of 5 common security headers found.`,
      'Add HSTS, Content-Security-Policy, X-Content-Type-Options and Referrer-Policy headers to protect visitors and show professionalism.'
    ),
    mk(
      'Crawlable by search engines',
      crawlPts,
      3,
      crawl.blocksAll
        ? 'robots.txt appears to block all crawlers.'
        : `robots.txt: ${crawl.robotsOk ? 'found' : 'not found'} · sitemap: ${crawl.sitemapOk ? 'found' : 'not found'}.`,
      crawl.blocksAll
        ? 'Your robots.txt blocks search engines. Remove the blanket Disallow unless this is intentional.'
        : 'Add a robots.txt and an XML sitemap so search engines can find and index your pages.'
    ),
    mk(
      'Image weight',
      (t.images || []).length === 0 ? 2 : heavy.length === 0 ? 2 : heavy.length <= 2 ? 1 : 0,
      2,
      (t.images || []).length === 0
        ? 'No images could be measured.'
        : `${t.images.length} images measured, ${heavy.length} over 300 KB.`,
      'Compress large images (use WebP/AVIF and proper sizes). Heavy images are the most common cause of slow mobile pages.'
    ),
  ]);
}

export function scorePage(m, tech = null) {
  const corpus = [...m.paragraphs, ...m.listItems, ...m.quotes, ...m.h2, ...m.h3, ...m.h1].join(' ').toLowerCase();
  const h1 = m.h1[0] || '';
  const labels = [...m.buttons, ...m.links.map(l => l.text)].map(t => t.trim()).filter(t => t && t.length <= 40);

  // ---- 1. Message clarity (25)
  const message = cat('Message clarity', [
    mk(
      'One clear main headline (H1)',
      m.h1.length === 1 ? 6 : m.h1.length > 1 ? 3 : 0,
      6,
      m.h1.length === 0 ? 'No H1 found.' : m.h1.length === 1 ? `"${h1.slice(0, 90)}"` : `${m.h1.length} H1 tags found.`,
      'Use exactly one H1 that states what you offer and who it is for.'
    ),
    mk(
      'Headline length is easy to scan',
      h1.length >= 25 && h1.length <= 90 ? 5 : h1.length >= 12 && h1.length <= 120 ? 2 : 0,
      5,
      h1 ? `${h1.length} characters.` : 'No headline to measure.',
      'Aim for a headline of roughly 25–90 characters: specific, but readable in two seconds.'
    ),
    mk(
      'Headline speaks to a benefit or the visitor',
      h1 && (BENEFIT.test(h1) || /\d/.test(h1)) ? 5 : 0,
      5,
      h1 ? 'Checked for visitor-focused or outcome words.' : 'No headline found.',
      'Lead with the result the visitor gets ("Get more booked calls") instead of what you are ("Welcome to our company").'
    ),
    mk(
      'Page title fits search results',
      m.title.length >= 30 && m.title.length <= 65 ? 4 : m.title.length > 0 ? 2 : 0,
      4,
      m.title ? `${m.title.length} characters.` : 'No <title> found.',
      'Keep the title around 30–65 characters so it is not cut off in Google.'
    ),
    mk(
      'Meta description present and sized well',
      m.description.length >= 70 && m.description.length <= 165 ? 3 : m.description ? 1 : 0,
      3,
      m.description ? `${m.description.length} characters.` : 'No meta description found.',
      'Write a 70–160 character description that sells the click, not just describes the page.'
    ),
    mk(
      'Enough supporting copy to make the case',
      m.wordCount >= 150 ? 2 : m.wordCount >= 80 ? 1 : 0,
      2,
      `About ${m.wordCount} words of body text detected.`,
      'Add a few short sections covering the offer, how it works, and objections.'
    ),
  ]);

  // ---- 2. Calls to action (25)
  const strong = labels.filter(l => STRONG_CTA.test(l) && !WEAK_CTA.test(l));
  const weak = labels.filter(l => WEAK_CTA.test(l));
  const distinctStrong = new Set(strong.map(s => s.toLowerCase()));
  const topLinks = m.links.slice(0, 15).map(l => l.text);
  const strongNearTop = [...m.buttons.slice(0, 5), ...topLinks].some(t => STRONG_CTA.test(t) && t.length <= 40);
  const contactPaths = (m.forms > 0 ? 1 : 0) + (m.tel.length ? 1 : 0) + (m.mailto.length ? 1 : 0);

  const cta = cat('Calls to action', [
    mk(
      'Has a clear action button or link',
      strong.length > 0 ? 8 : 0,
      8,
      strong.length ? `Examples: ${[...distinctStrong].slice(0, 3).map(s => `"${s}"`).join(', ')}` : 'No action-style buttons or links found.',
      'Add a primary button with an action label such as "Get my free audit" or "Book a call".'
    ),
    mk(
      'Main CTA appears near the top',
      strongNearTop ? 5 : 0,
      5,
      strongNearTop ? 'An action CTA appears early on the page.' : 'No action CTA detected early on the page.',
      'Put the main CTA in the first screen, not only at the bottom.'
    ),
    mk(
      'Avoids vague labels (Submit, Learn more)',
      weak.length === 0 ? 4 : weak.length <= 2 ? 2 : 0,
      4,
      weak.length ? `Vague labels found: ${[...new Set(weak)].slice(0, 3).join(', ')}` : 'No vague labels detected.',
      'Replace "Submit" and "Learn more" with what the visitor actually gets, e.g. "Send my free audit".'
    ),
    mk(
      'CTAs stay focused on one goal',
      distinctStrong.size <= 4 ? 4 : distinctStrong.size <= 8 ? 2 : 0,
      4,
      `${distinctStrong.size} different action labels found.`,
      'Pick one primary goal per page and repeat that CTA instead of offering many different actions.'
    ),
    mk(
      'Easy ways to get in touch',
      contactPaths >= 2 ? 4 : contactPaths === 1 ? 3 : 0,
      4,
      `${m.forms} form(s), ${m.tel.length} phone link(s), ${m.mailto.length} email link(s).`,
      'Offer at least a form plus a phone or email option for people who prefer it.'
    ),
  ]);

  // ---- 3. Trust & proof (20)
  const numberHits = (corpus.match(/\d[\d,.]*\s?(%|\+|k\b|x\b)|\$\s?\d/g) || []).length;
  const hasTestimonials = m.quotes.length > 0 || /testimonial|reviews?\b|what (our )?(clients|customers) say|\bstars?\b|rated \d/.test(corpus);
  const hasAuthority = /trusted by|as seen|featured in|clients include|certified|award|top rated|years of experience|\d+\+?\s*years|since (19|20)\d\d|\d[\d,]*\+? (clients|customers|projects|businesses|users|brands)/.test(corpus);
  const hasRisk = /guarantee|refund|risk[- ]free|no (credit card|obligation|commitment)|cancel anytime|free (trial|consultation|audit|quote|estimate)/.test(corpus);
  const legal = m.links.some(l => /privacy|terms/i.test(`${l.text} ${l.href}`));

  const trust = cat('Trust & proof', [
    mk(
      'Testimonials or reviews',
      hasTestimonials ? 6 : 0,
      6,
      hasTestimonials ? 'Review or testimonial language detected.' : 'No testimonials or reviews detected.',
      'Add 2–3 real customer quotes with names, placed close to your main CTA.'
    ),
    mk(
      'Specific numbers and results',
      numberHits >= 3 ? 4 : numberHits >= 1 ? 2 : 0,
      4,
      `${numberHits} number-based claim(s) detected.`,
      'Replace vague claims with real numbers: results, years, clients served.'
    ),
    mk(
      'Authority or credibility signals',
      hasAuthority ? 3 : 0,
      3,
      hasAuthority ? 'Authority language detected.' : 'No client logos, awards, or experience claims detected.',
      'Show who you have worked with, years in business, or certifications.'
    ),
    mk(
      'Risk reducers (guarantee, free trial, no obligation)',
      hasRisk ? 3 : 0,
      3,
      hasRisk ? 'Risk-reducing language detected.' : 'No guarantee or free-first offer detected.',
      'Lower the risk of acting: a guarantee, free first step, or "no commitment" line near the CTA.'
    ),
    mk(
      'Contact details and legal pages',
      (m.tel.length || m.mailto.length ? 2 : 0) + (legal ? 2 : 0),
      4,
      `${m.tel.length || m.mailto.length ? 'Contact link found. ' : 'No phone or email link. '}${legal ? 'Privacy/terms link found.' : 'No privacy or terms link.'}`,
      'Show a real phone or email and link your privacy policy and terms.'
    ),
  ]);

  // ---- 4. Friction (15)
  const fields = m.fields.length;
  const friction = cat('Friction', [
    mk(
      'Short forms',
      fields === 0 ? 6 : fields <= 4 ? 6 : fields <= 6 ? 4 : fields <= 9 ? 2 : 0,
      6,
      fields === 0 ? 'No form fields detected on this page.' : `${fields} form field(s) detected.`,
      'Every extra field costs leads. Ask only for what you need to follow up (usually name, email, one question).'
    ),
    mk(
      'Limited navigation distractions',
      m.navLinkCount <= 7 ? 5 : m.navLinkCount <= 12 ? 3 : 1,
      5,
      `${m.navLinkCount} navigation link(s).`,
      'For a landing page, trim the menu so fewer links compete with the main CTA.'
    ),
    mk(
      'Not overloaded with links',
      m.links.length <= 40 ? 4 : m.links.length <= 80 ? 2 : 0,
      4,
      `${m.links.length} links on the page.`,
      'Reduce links that lead visitors away from the page goal.'
    ),
  ]);

  // ---- 5. Mobile & speed (15)
  const imgs = m.images;
  const withAlt = imgs.filter(i => i.alt !== null && i.alt !== undefined && i.alt !== '').length;
  const altRatio = imgs.length ? withAlt / imgs.length : 1;
  const sizedOrLazy = imgs.length ? imgs.filter(i => i.sized || i.lazy).length / imgs.length : 1;
  const kb = Math.round(m.htmlBytes / 1024);

  const mobile = cat('Mobile & speed', [
    mk(
      'Mobile viewport is set',
      /width\s*=\s*device-width/i.test(m.viewport) ? 5 : 0,
      5,
      m.viewport ? `viewport: ${m.viewport}` : 'No viewport meta tag found.',
      'Add <meta name="viewport" content="width=device-width, initial-scale=1"> so the page is mobile-friendly.'
    ),
    mk(
      'Lightweight HTML',
      kb <= 200 ? 3 : kb <= 500 ? 1 : 0,
      3,
      `${kb} KB of HTML.`,
      'Large HTML slows first paint. Remove unused markup and inline bloat.'
    ),
    mk(
      'Limited scripts',
      m.scripts.external <= 10 ? 3 : m.scripts.external <= 25 ? 1 : 0,
      3,
      `${m.scripts.external} external and ${m.scripts.inline} inline script(s).`,
      'Each script adds load time. Remove trackers and widgets you do not use.'
    ),
    mk(
      'Images have alt text',
      altRatio >= 0.9 ? 2 : altRatio >= 0.6 ? 1 : 0,
      2,
      imgs.length ? `${withAlt} of ${imgs.length} images have alt text.` : 'No images detected.',
      'Add short, descriptive alt text to every meaningful image.'
    ),
    mk(
      'Images sized or lazy-loaded',
      sizedOrLazy >= 0.5 ? 2 : 0,
      2,
      imgs.length ? `${Math.round(sizedOrLazy * 100)}% of images have width/height or lazy loading.` : 'No images detected.',
      'Set width and height on images and lazy-load the ones below the fold to avoid layout jumps.'
    ),
  ]);

  const categories = [message, cta, trust, friction, mobile];
  if (tech) categories.push(scoreTechnical(tech));
  const points = categories.reduce((n, c) => n + c.points, 0);
  const max = categories.reduce((n, c) => n + c.max, 0);
  const score = Math.round((points / max) * 100);

  const allChecks = categories.flatMap(c => c.checks.map(ch => ({ ...ch, category: c.name })));
  const topFixes = allChecks
    .filter(c => c.points < c.max)
    .sort((a, b) => b.max - b.points - (a.max - a.points))
    .slice(0, 3)
    .map(c => ({ category: c.category, label: c.label, tip: c.tip, lost: c.max - c.points, max: c.max, status: c.status }));

  const notes = [];
  if (m.wordCount < 60 && m.scripts.external > 3) {
    notes.push('This page appears to load most of its content with JavaScript. This scan reads the raw HTML, so the score may be lower than what visitors actually see.');
  }

  const counts = {
    pass: allChecks.filter(c => c.status === 'pass').length,
    warn: allChecks.filter(c => c.status === 'warn').length,
    fail: allChecks.filter(c => c.status === 'fail').length,
  };
  return { score, grade: gradeFor(score), rating: ratingFor(score), counts, categories, topFixes, notes };
}
