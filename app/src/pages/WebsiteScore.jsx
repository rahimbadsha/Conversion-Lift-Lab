import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertTriangle, XCircle, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const GRADE_STYLE = {
  'A+': 'from-emerald-400 to-green-500',
  A: 'from-emerald-400 to-green-500',
  B: 'from-sky-400 to-indigo-500',
  C: 'from-amber-400 to-orange-500',
  D: 'from-orange-500 to-red-500',
  F: 'from-red-500 to-rose-600',
};

const STATUS_ICON = {
  pass: <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />,
  warn: <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />,
  fail: <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />,
};

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

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

      // Findings arrive as the server completes them. Each one is revealed with a short pause so
      // they are readable; the content itself is exactly what the server measured.
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

  return (
    <main className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-[#050816]' : 'bg-slate-50'}`}>
      <Helmet>
        <title>Free Landing Page Score | ConversionLiftLab</title>
        <meta name="description" content="Paste your page URL and get an instant conversion-focused score: message clarity, calls to action, trust, friction, mobile basics and technical health." />
        <link rel="canonical" href="https://conversionliftlab.com/website-score" />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className={`text-3xl sm:text-5xl font-bold mb-4 leading-tight ${heading}`}>
            Free Landing Page <span className="text-gradient">Score</span>
          </h1>
          <p className={`max-w-xl mx-auto ${muted}`}>
            Paste your page address. We inspect the live page, measure real speed and technical signals, and grade it for conversions, with the three fixes worth making first.
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
            {busy ? 'Scanning…' : 'Score my page'}
            {!busy && <ArrowRight size={16} />}
          </button>
        </form>
        <p className={`text-xs text-center mb-10 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          Free · No signup · We only read the public page you enter
        </p>

        {busy && (
          <div className="glass rounded-2xl p-6 sm:p-8" aria-live="polite">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className={heading}>Inspecting <span className="font-semibold">{target}</span></span>
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
            <div className="glass rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${GRADE_STYLE[result.grade] || GRADE_STYLE.C} flex items-center justify-center shrink-0`}>
                <span className="text-4xl font-black text-white">{result.grade}</span>
              </div>
              <div className="text-center sm:text-left min-w-0">
                <div className={`text-3xl font-bold ${heading}`}>{result.score}<span className={`text-lg font-medium ${muted}`}>/100</span></div>
                <p className={`text-sm break-all ${muted}`}>{result.url}</p>
                {result.found?.headline && (
                  <p className={`text-sm mt-2 ${muted}`}>Main headline found: <span className={heading}>“{result.found.headline.slice(0, 120)}”</span></p>
                )}
              </div>
            </div>

            {result.notes?.map(n => (
              <div key={n} className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-600">{n}</div>
            ))}

            {result.topFixes?.length > 0 && (
              <div className="glass rounded-2xl p-6">
                <h2 className={`font-semibold text-lg mb-4 ${heading}`}>Fix these first</h2>
                <ol className="space-y-4">
                  {result.topFixes.map((f, i) => (
                    <li key={f.label} className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <div>
                        <div className={`text-sm font-medium ${heading}`}>{f.label}</div>
                        <div className={`text-sm ${muted}`}>{f.tip}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="space-y-4">
              {result.categories.map(c => (
                <div key={c.name} className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-semibold ${heading}`}>{c.name}</h3>
                    <span className={`text-sm font-medium ${muted}`}>{c.points}/{c.max}</span>
                  </div>
                  <div className={`h-2 rounded-full mb-4 ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}>
                    <div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${c.score}%` }} />
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

            <div className="glass rounded-3xl p-8 text-center">
              <h2 className={`text-2xl font-bold mb-2 ${heading}`}>Want a human to review it?</h2>
              <p className={`mb-6 max-w-md mx-auto ${muted}`}>
                This is a quick automated scan of your page&apos;s HTML and technical signals. For a real teardown of your page, I&apos;ll tell you what is costing you conversions.
              </p>
              <a href="/contact" className="btn-primary inline-flex">
                Get a free landing page teardown <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
