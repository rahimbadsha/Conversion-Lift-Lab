import { motion } from 'framer-motion';
import { ArrowRight, Star, BadgeCheck, TrendingUp } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import { useTheme } from '../../context/ThemeContext';
import { useEffect, useRef } from 'react';

const stats = [
  { en: '950+ Pages Built', bn: '৯৫০+ পেজ', num: 950, suffix: '+' },
  { en: '100% Job Success', bn: '১০০% সাফল্য', num: 100, suffix: '%' },
  { en: '$200K+ Earned', bn: '$২০০K+ আয়', num: 200, suffix: 'K+' },
  { en: '10+ Years Exp.', bn: '১০+ বছর', num: 10, suffix: '+' },
];

function StatCounter({ target, suffix, label, isDark }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const duration = 1800;
      const start = performance.now();
      const update = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(ease * target) + suffix;
        if (p < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
      observer.unobserve(el);
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);

  return (
    <div className="text-center px-3">
      <div ref={ref} className="text-2xl lg:text-3xl font-bold text-gradient">{target}{suffix}</div>
      <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</div>
    </div>
  );
}

const platforms = [
  'Webflow', 'ClickFunnels', 'GoHighLevel', 'HubSpot',
  'Unbounce', 'Instapage', 'WordPress', 'Shopify',
  'Systeme.io', 'Funnelish', 'Gem Pages', 'Elementor',
];

// Duplicated for seamless loop
const marqueeItems = [...platforms, ...platforms];

export default function Hero() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden ${isDark ? 'bg-[#050816]' : 'bg-white'}`}>
      {/* Orbs */}
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px] pointer-events-none ${isDark ? 'bg-indigo-600/20' : 'bg-indigo-300/30'}`} />
      <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none ${isDark ? 'bg-purple-600/20' : 'bg-purple-300/25'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full">

        {/* ── Trust row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {/* Upwork Top Rated badge */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${isDark ? 'bg-green-500/10 border-green-500/25 text-green-300' : 'bg-green-50 border-green-200 text-green-700'}`}>
            <BadgeCheck size={15} className="text-green-500" />
            {t('Top Rated on Upwork', 'আপওয়ার্কে টপ রেটেড')}
          </div>
          {/* JSS */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${isDark ? 'bg-indigo-500/10 border-indigo-500/25 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-700'}`}>
            <TrendingUp size={15} className="text-indigo-500" />
            100% Job Success Score
          </div>
          {/* Stars */}
          <div className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border ${isDark ? 'bg-yellow-500/10 border-yellow-500/25 text-yellow-300' : 'bg-yellow-50 border-yellow-200 text-yellow-700'}`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-1">358+ Reviews</span>
          </div>
        </motion.div>

        {/* ── Headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-center text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}
        >
          {t(
            <>I Build Landing Pages That<br /><span className="text-gradient">Actually Convert</span></>,
            <>আমি ল্যান্ডিং পেজ তৈরি করি<br /><span className="text-gradient">যা সত্যিই রূপান্তর করে</span></>
          )}
        </motion.h1>

        {/* ── Sub ── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-center text-lg sm:text-xl max-w-2xl mx-auto mb-10 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
        >
          {t(
            'CRO-focused funnels, sales pages & lead gen systems built for measurable ROI. 10+ years, 950+ pages delivered.',
            'CRO-কেন্দ্রিক ফানেল, সেলস পেজ ও লিড জেন সিস্টেম পরিমাপযোগ্য ROI-এর জন্য।'
          )}
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
        >
          <a href="/contact" className="btn-primary">
            {t('Get a Free CRO Audit', 'ফ্রি CRO অডিট পান')}
            <ArrowRight size={18} />
          </a>
          <a href="#case-studies" className="btn-secondary">
            {t('View Case Studies', 'কেস স্টাডি দেখুন')}
          </a>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`flex flex-wrap justify-center divide-x gap-y-4 glass rounded-2xl py-5 max-w-2xl mx-auto mb-14 ${isDark ? 'divide-white/10' : 'divide-slate-200'}`}
        >
          {stats.map((s, i) => (
            <StatCounter key={i} target={s.num} suffix={s.suffix} label={t(s.en, s.bn)} isDark={isDark} />
          ))}
        </motion.div>

        {/* ── Platforms marquee ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className={`text-center text-xs uppercase tracking-widest font-medium mb-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            {t('Works with all major page builders & coding platforms', 'সকল প্রধান পেজ বিল্ডার ও কোডিং প্ল্যাটফর্মে কাজ করি')}
          </p>
          <div className="marquee-wrap">
            <div className="marquee-track">
              {marqueeItems.map((p, i) => (
                <span
                  key={i}
                  className={`mx-3 px-5 py-2.5 rounded-full text-sm font-medium border whitespace-nowrap shrink-0 ${
                    isDark
                      ? 'bg-white/5 text-slate-300 border-white/10'
                      : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                  }`}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
