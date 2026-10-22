import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, AlertTriangle, XCircle, Search, MessageSquare, MousePointerClick,
  ShieldCheck, Filter, Smartphone, Activity, Flame, TrendingUp,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Static class names so Tailwind can see them.
const TONES = {
  emerald: { hex: '#10b981', text: 'text-emerald-500', chip: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' },
  green: { hex: '#22c55e', text: 'text-green-500', chip: 'bg-green-500/10 text-green-500 border-green-500/30' },
  sky: { hex: '#38bdf8', text: 'text-sky-500', chip: 'bg-sky-500/10 text-sky-500 border-sky-500/30' },
  amber: { hex: '#f59e0b', text: 'text-amber-500', chip: 'bg-amber-500/10 text-amber-500 border-amber-500/30' },
  orange: { hex: '#f97316', text: 'text-orange-500', chip: 'bg-orange-500/10 text-orange-500 border-orange-500/30' },
  red: { hex: '#ef4444', text: 'text-red-500', chip: 'bg-red-500/10 text-red-500 border-red-500/30' },
};

const CATEGORY_ICON = {
  'Message clarity': MessageSquare,
  'Calls to action': MousePointerClick,
  'Trust & proof': ShieldCheck,
  Friction: Filter,
  'Mobile & speed': Smartphone,
  'Technical health': Activity,
};

const STATUS_ICON = {
  pass: <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />,
  warn: <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />,
  fail: <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />,
};

// Messaging by rating. Qualitative only: no invented statistics.
const VERDICT = {
  Excellent: {
    head: "You're ahead of most pages. The last 10% is where the money is.",
    points: [
      'Small, targeted tests on your headline and call to action can still add leads.',
      'A strong page deserves traffic that converts, so protect the advantage you have.',
      "A human teardown finds what automated checks can't see.",
    ],
  },
  'Very Good': {
    head: 'A strong base with a few fixable gaps.',
    points: [
      'Your fundamentals work, so the remaining issues are the quick, high-return ones.',
      'Fixing the top items is often cheaper than buying more traffic.',
      'The difference between good and great is usually a few specific changes.',
    ],
  },
  Good: {
    head: "Decent, but you're likely leaving leads on the table.",
    points: [
      'Some visitors who would have contacted you are probably leaving without acting.',
      'Every issue below adds a little friction between a visitor and a customer.',
      'Fixing the top three could noticeably change how your page performs.',
    ],
  },
  'Needs Work': {
    head: 'Your page is probably leaking leads every day.',
    points: [
      'Every visitor you pay for (ads, SEO, referrals) has a harder time becoming a customer.',
      'Competitors with clearer pages win the same clicks.',
      'The longer these issues stay, the more traffic you pay for without getting results.',
    ],
  },
  Poor: {
    head: 'Visitors are likely leaving before they contact you.',
    points: [
      'The page is making it hard to understand your offer or take the next step.',
      'Ad spend and search traffic are working harder than your page is.',
      'These issues are fixable, and every week you wait costs you potential customers.',
    ],
  },
  Critical: {
    head: 'Your page is working against you.',
    points: [
      'Serious gaps are stopping visitors from trusting you or taking action.',
      'Money spent on traffic is likely being wasted until these are fixed.',
      'The good news: these are exactly the problems a CRO audit is built to solve.',
    ],
  },
};

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

function Gauge({ score, tone }) {
  const size = 230;
  const r = 96;
  const c = 2 * Math.PI * r;
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => Math.round(v));
  useEffect(() => {
    const controls = animate(count, score, { duration: 1.4, ease: 'easeOut' });
    return () => controls.stop();
  }, [score, count]);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={tone.hex} />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="18" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * score) / 100 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span className="text-6xl font-black tabular-nums">{rounded}</motion.span>
        <span className="text-sm opacity-60">out of 100</span>
      </div>
    </div>
  );
}

function Ring({ value }) {
  const r = 28;
  const c = 2 * Math.PI * r;
  const color = value >= 80 ? '#10b981' : value >= 60 ? '#38bdf8' : value >= 40 ? '#f59e0b' : '#ef4444';
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90 shrink-0">
      <circle cx="36" cy="36" r={r} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="7" />
      <motion.circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        whileInView={{ strokeDashoffset: c - (c * value) / 100 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </svg>
  );
}

function impactOf(lost) {
  if (lost >= 5) return { label: 'High impact', bars: 3, cls: 'bg-red-500' };
  if (lost >= 3) return { label: 'Medium impact', bars: 2, cls: 'bg-amber-500' };
  return { label: 'Quick win', bars: 1, cls: 'bg-sky-500' };
}

function LeadMath({ isDark, heading, muted }) {
  const [visitors, setVisitors] = useState(1000);
  const v = Math.max(0, Math.min(1_000_000, Number(visitors) || 0));
  const rows = [0.5, 1, 2];
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-1">
        <TrendingUp size={18} className="text-indigo-500" />
        <h3 className={`font-semibold ${heading}`}>What a better page could mean for you</h3>
      </div>
      <p className={`text-sm mb-4 ${muted}`}>Enter your monthly visitors to see what small conversion gains are worth.</p>
      <label className={`text-xs ${muted}`} htmlFor="visitors">Monthly visitors</label>
      <input
        id="visitors"
        type="number"
        min="0"
        inputMode="numeric"
        value={visitors}
        onChange={e => setVisitors(e.target.value)}
        className={`block w-full sm:w-48 rounded-xl px-4 py-2.5 mb-5 outline-none border ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
      />
      <div className="grid grid-cols-3 gap-3">
        {rows.map(pct => (
          <div key={pct} className={`rounded-xl p-4 text-center border ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
            <div className="text-2xl font-black text-gradient tabular-nums">+{Math.round((v * pct) / 100).toLocaleString()}</div>
            <div className={`text-xs mt-1 ${muted}`}>extra leads / month<br />at +{pct}% conversion</div>
          </div>
        ))}
      </div>
      <p className={`text-xs mt-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
        Illustration only. Real results depend on your offer, traffic quality and market.
      </p>
    </div>
  );
}

export default function WebsiteScore() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [url, setUrl] = useState('');
  const [phase, setPhase] = useState('idle'); // idle | loading | done | error
  const [steps, setSteps] = useState([]);
  const [progress, setProgress] = useState(0);
  const [target, setTarget] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const submit = async e => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Enter your page address first, for example yourwebsite.com');
      setPhase('error');
      return;
    }
    setPhase('loading');
    setSteps([]);
    setProgress(4);
    setError('');
    setResult(null);
    setTarget(url.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, ''));

    try {
      const res = await fetch('/api/analyze?stream=1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      // Findings arrive as the server completes them. Each is revealed with a short pause so it is
      // readable; the content is exactly what the server measured.
      const queue = [];
      let streamEnded = false;
      let finalData = null;
      let streamError = '';

      const readAll = async () => {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop();
          for (const line of lines) {
            if (!line.trim()) continue;
            let evt;
            try {
              evt = JSON.parse(line);
            } catch {
              continue;
            }
            if (evt.type === 'step') queue.push(evt);
            else if (evt.type === 'result') finalData = evt.data;
            else if (evt.type === 'error') streamError = evt.error;
          }
        }
        streamEnded = true;
      };

      const reveal = async () => {
        while (!(streamEnded && queue.length === 0)) {
          if (queue.length) {
            const evt = queue.shift();
            setSteps(prev => [...prev, evt]);
            setProgress(evt.progress);
            await wait(420);
          } else {
            await wait(80);
          }
        }
      };

      await Promise.all([readAll(), reveal()]);
      if (streamError) throw new Error(streamError);
      if (!finalData) throw new Error('The scan did not finish. Please try again.');
      setProgress(100);
      await wait(350);
      setResult(finalData);
      setPhase('done');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setPhase('error');
    }
  };

  const muted = isDark ? 'text-slate-400' : 'text-slate-600';
  const heading = isDark ? 'text-white' : 'text-slate-900';
  const busy = phase === 'loading';
  const tone = result ? TONES[result.rating.tone] || TONES.sky : TONES.sky;
  const verdict = result ? VERDICT[result.rating.label] || VERDICT.Good : null;
  const low = result && result.score < 65;
  const contactHref = result
    ? `/contact?audit=${encodeURIComponent(target)}&score=${result.score}&rating=${encodeURIComponent(result.rating.label)}`
    : '/contact';

  return (
    <main className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-[#050816]' : 'bg-slate-50'}`}>
      <Helmet>
        <title>Free Smart CRO Audit for Your Landing Page or Website | ConversionLiftLab</title>
        <meta name="description" content="Find out in seconds what is costing you leads and sales. A free smart CRO audit that inspects your live page: message, calls to action, trust, friction, mobile and technical health." />
        <link rel="canonical" href="https://conversionliftlab.com/website-score" />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border mb-5 ${isDark ? 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10' : 'border-indigo-200 text-indigo-700 bg-indigo-50'}`}>
            <Flame size={13} /> Free · Takes about 10 seconds
          </span>
          <h1 className={`text-3xl sm:text-5xl font-bold mb-4 leading-tight ${heading}`}>
            Get a Smart <span className="text-gradient">CRO Audit</span> for Your Landing Page or Website
          </h1>
          <p className={`max-w-xl mx-auto ${muted}`}>
            Find out what is costing you leads, sales and ad spend. We inspect your live page, measure real speed and technical signals, and show you exactly what to fix first.
          </p>
        </motion.div>

        <form onSubmit={submit} className="glass rounded-2xl p-3 flex flex-col sm:flex-row gap-3 mb-3">
          <div className="flex-1 flex items-center gap-2 px-3">
            <Search size={18} className="text-indigo-500 shrink-0" />
            <input
              type="text"
              inputMode="url"
              autoComplete="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="yourwebsite.com"
              aria-label="Page URL"
              disabled={busy}
              className={`w-full bg-transparent py-3 outline-none ${heading}`}
            />
          </div>
          <button type="submit" disabled={busy} className="btn-primary justify-center disabled:opacity-60">
            {busy ? 'Auditing…' : 'Run my free audit'}
            {!busy && <ArrowRight size={16} />}
          </button>
        </form>
        <p className={`text-xs text-center mb-10 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          No signup · No credit card · We only read the public page you enter
        </p>

        {phase === 'idle' && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {Object.entries(CATEGORY_ICON).map(([name, Icon]) => (
                <div key={name} className="glass rounded-xl p-4 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-50'}`}>
                    <Icon size={17} className="text-indigo-500" />
                  </div>
                  <span className={`text-sm font-medium ${heading}`}>{name}</span>
                </div>
              ))}
            </div>
            <div className="glass rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[['1050+', 'Pages & funnels built'], ['358+', 'Reviews'], ['$200K+', 'Earned'], ['100%', 'Job Success']].map(([v, l]) => (
                <div key={l}>
                  <div className="text-xl font-bold text-gradient">{v}</div>
                  <div className={`text-xs ${muted}`}>{l}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {busy && (
          <div className="glass rounded-2xl p-6 sm:p-8" aria-live="polite">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className={heading}>Auditing <span className="font-semibold">{target}</span></span>
              <span className={`tabular-nums ${muted}`}>{progress}%</span>
            </div>
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              className={`h-2.5 rounded-full overflow-hidden mb-6 ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <ul className="space-y-3">
              {steps.map(s => (
                <motion.li key={s.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className={`text-sm font-medium ${heading}`}>{s.label}</div>
                    <div className={`text-xs ${muted} break-words`}>{s.detail}</div>
                  </div>
                </motion.li>
              ))}
              <li className="flex gap-3 items-center">
                <span className="inline-block w-[18px] h-[18px] border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin shrink-0" />
                <span className={`text-sm ${muted}`}>Working…</span>
              </li>
            </ul>
          </div>
        )}

        {phase === 'error' && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-500" role="alert">
            {error}
          </div>
        )}

        {phase === 'done' && result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Verdict */}
            <div className="glass rounded-3xl p-6 sm:p-8">
              <div className={`flex flex-col sm:flex-row items-center gap-8 ${heading}`}>
                <Gauge score={result.score} tone={tone} />
                <div className="text-center sm:text-left min-w-0">
                  <div className={`text-4xl sm:text-5xl font-black leading-none mb-1 ${tone.text}`}>{result.rating.label}</div>
                  <div className={`text-lg font-semibold mb-3 ${heading}`}>{result.rating.tagline}</div>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-3 text-xs font-medium">
                    <span className="px-2.5 py-1 rounded-full border bg-red-500/10 text-red-500 border-red-500/30">{result.counts.fail} to fix</span>
                    <span className="px-2.5 py-1 rounded-full border bg-amber-500/10 text-amber-500 border-amber-500/30">{result.counts.warn} to improve</span>
                    <span className="px-2.5 py-1 rounded-full border bg-emerald-500/10 text-emerald-500 border-emerald-500/30">{result.counts.pass} passing</span>
                  </div>
                  <p className={`text-sm break-all ${muted}`}>{result.url}</p>
                </div>
              </div>
            </div>

            {result.notes?.map(n => (
              <div key={n} className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-600">{n}</div>
            ))}

            {/* What it means */}
            <div className={`rounded-2xl p-6 border ${low ? 'border-red-500/30 bg-red-500/5' : 'border-indigo-500/30 bg-indigo-500/5'}`}>
              <h2 className={`text-xl font-bold mb-3 ${heading}`}>{verdict.head}</h2>
              <ul className="space-y-2 mb-5">
                {verdict.points.map(p => (
                  <li key={p} className={`flex gap-2.5 text-sm ${muted}`}>
                    <Flame size={16} className={`shrink-0 mt-0.5 ${low ? 'text-red-500' : 'text-indigo-500'}`} />
                    {p}
                  </li>
                ))}
              </ul>
              <a href={contactHref} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">
                {low ? 'Fix my page: get my free CRO audit' : 'Get my free CRO audit'} <ArrowRight size={16} />
              </a>
            </div>

            {/* Category rings */}
            <div>
              <h2 className={`font-semibold text-lg mb-4 ${heading}`}>Where your page is winning and losing</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {result.categories.map(c => {
                  const Icon = CATEGORY_ICON[c.name] || Activity;
                  return (
                    <div key={c.name} className={`glass rounded-2xl p-4 flex items-center gap-3 ${heading}`}>
                      <div className="relative">
                        <Ring value={c.score} />
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold tabular-nums">{c.score}</span>
                      </div>
                      <div className="min-w-0">
                        <Icon size={15} className="text-indigo-500 mb-1" />
                        <div className="text-sm font-medium leading-tight">{c.name}</div>
                        <div className={`text-xs ${muted}`}>{c.points}/{c.max} pts</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Priority fixes */}
            {result.topFixes?.length > 0 && (
              <div className="glass rounded-2xl p-6">
                <h2 className={`font-semibold text-lg mb-1 ${heading}`}>Fix these first</h2>
                <p className={`text-sm mb-5 ${muted}`}>The biggest gaps, ranked by how many points they cost you.</p>
                <ol className="space-y-4">
                  {result.topFixes.map((f, i) => {
                    const imp = impactOf(f.lost);
                    return (
                      <li key={f.label} className={`rounded-xl p-4 border ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
                        <div className="flex gap-3">
                          <span className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3 mb-1">
                              <div className={`text-sm font-semibold ${heading}`}>{f.label}</div>
                              <div className="flex items-center gap-1.5 shrink-0" title={imp.label}>
                                {[1, 2, 3].map(b => (
                                  <span key={b} className={`w-4 h-1.5 rounded-full ${b <= imp.bars ? imp.cls : isDark ? 'bg-white/15' : 'bg-slate-200'}`} />
                                ))}
                              </div>
                            </div>
                            <div className={`text-xs mb-1 ${muted}`}>{imp.label} · +{f.lost} points available · {f.category}</div>
                            <div className={`text-sm ${muted}`}>{f.tip}</div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}

            <LeadMath isDark={isDark} heading={heading} muted={muted} />

            {/* Full checklist */}
            <details className="glass rounded-2xl p-6 group">
              <summary className={`cursor-pointer font-semibold ${heading}`}>See all {result.categories.reduce((n, c) => n + c.checks.length, 0)} checks</summary>
              <div className="space-y-6 mt-5">
                {result.categories.map(c => (
                  <div key={c.name}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-sm font-semibold ${heading}`}>{c.name}</h3>
                      <span className={`text-xs ${muted}`}>{c.points}/{c.max}</span>
                    </div>
                    <ul className="space-y-3">
                      {c.checks.map(ch => (
                        <li key={ch.label} className="flex gap-2.5">
                          {STATUS_ICON[ch.status]}
                          <div className="min-w-0">
                            <div className={`text-sm ${heading}`}>{ch.label}</div>
                            <div className="text-xs text-slate-500 break-words">{ch.detail}</div>
                            {ch.tip && <div className={`text-xs mt-1 ${muted}`}>{ch.tip}</div>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>

            {/* Final CTA */}
            <div className="relative overflow-hidden rounded-3xl p-8 sm:p-10 text-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Turn this report into more customers</h2>
              <p className="mb-6 max-w-lg mx-auto text-white/85">
                This was a quick automated scan. I&apos;ll personally review your page and tell you exactly what is costing you conversions, with no pushy sales and no obligation.
              </p>
              <a href={contactHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-transform shadow-xl">
                Get my free CRO audit <ArrowRight size={18} />
              </a>
              <p className="text-xs mt-5 text-white/75">1050+ pages &amp; funnels built · 358+ reviews · $200K+ earned · 100% Job Success · replies within 2 hours</p>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
