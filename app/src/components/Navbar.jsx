import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import { portfolioPages } from '../data/portfolioPages';

const navLinks = [
  { en: 'Services', bn: 'সেবাসমূহ', href: '/services' },
  {
    en: 'Work',
    bn: 'কাজ',
    children: [
      { en: 'Case Studies', bn: 'কেস স্টাডি', href: '/case-studies', desc: 'Projects, goals and results', descBn: 'প্রজেক্ট, লক্ষ্য ও ফলাফল' },
      { en: 'Portfolio', bn: 'পোর্টফোলিও', href: '/portfolio', desc: `${portfolioPages.length} full-page designs`, descBn: `${portfolioPages.length}টি সম্পূর্ণ পেজ ডিজাইন` },
    ],
  },
  { en: 'Process', bn: 'প্রক্রিয়া', href: '/#process' },
  { en: 'Pricing', bn: 'মূল্য', href: '/#pricing' },
  { en: 'Smart Audit', bn: 'স্মার্ট অডিট', href: '/website-score', lgOnly: true },
  { en: 'About', bn: 'সম্পর্কে', href: '/about' },
  { en: 'Contact', bn: 'যোগাযোগ', href: '/contact' },
];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const workRef = useRef(null);

  // Close the "Work" dropdown on outside click or Escape.
  useEffect(() => {
    if (!workOpen) return undefined;
    const onDown = e => {
      if (workRef.current && !workRef.current.contains(e.target)) setWorkOpen(false);
    };
    const onKey = e => {
      if (e.key === 'Escape') setWorkOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [workOpen]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const isDark = theme === 'dark';

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            CL
          </div>
          <span className={`font-semibold hidden sm:block text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Conversion<span className="text-gradient">Lift</span>Lab
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(l => (l.children ? (
            <div key={l.en} ref={workRef} className="relative" onMouseEnter={() => setWorkOpen(true)} onMouseLeave={() => setWorkOpen(false)}>
              <button
                onClick={() => setWorkOpen(v => !v)}
                aria-expanded={workOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1 text-sm whitespace-nowrap transition-colors duration-200 hover:text-indigo-600 ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-indigo-600'}`}
              >
                {lang === 'bn' ? l.bn : l.en}
                <ChevronDown size={14} className={`transition-transform duration-200 ${workOpen ? 'rotate-180' : ''}`} />
              </button>
              {workOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64">
                  <div className={`rounded-2xl border p-2 shadow-2xl backdrop-blur-xl ${isDark ? 'bg-[#0b1020]/95 border-white/10' : 'bg-white/95 border-slate-200'}`}>
                    {l.children.map(c => (
                      <a
                        key={c.href}
                        href={c.href}
                        className={`block rounded-xl px-4 py-3 transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-indigo-50'}`}
                      >
                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{lang === 'bn' ? c.bn : c.en}</div>
                        <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{lang === 'bn' ? c.descBn : c.desc}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <a
              key={l.en}
              href={l.href}
              className={`${l.lgOnly ? 'hidden lg:inline' : ''} text-sm whitespace-nowrap transition-colors duration-200 hover:text-indigo-600 ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              {lang === 'bn' ? l.bn : l.en}
            </a>
          )))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Lang toggle */}
          <div className={`flex items-center gap-1 rounded-full px-2 py-1 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
            <button
              onClick={() => setLang('en')}
              className={`text-xs px-2 py-0.5 rounded-full transition-all ${lang === 'en' ? 'bg-indigo-600 text-white' : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('bn')}
              className={`text-xs px-2 py-0.5 rounded-full transition-all ${lang === 'bn' ? 'bg-indigo-600 text-white' : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}
            >
              বাং
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isDark ? 'bg-white/10 text-yellow-300 hover:bg-white/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* CTA */}
          <a
            href="/contact"
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity shadow-md shadow-indigo-500/20"
          >
            {t('Free Audit', 'ফ্রি অডিট')}
          </a>

          {/* Mobile menu toggle */}
          <button
            className={`md:hidden p-1 ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`md:hidden border-t px-4 py-4 space-y-3 ${isDark ? 'bg-[#050816]/95 border-indigo-500/10' : 'bg-white/95 border-slate-200'}`}>
          {navLinks.map(l => (l.children ? (
            <div key={l.en}>
              <div className={`py-1.5 text-xs font-medium uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{lang === 'bn' ? l.bn : l.en}</div>
              <div className={`ml-2 pl-3 border-l space-y-1 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                {l.children.map(c => (
                  <a
                    key={c.href}
                    href={c.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-1.5 text-sm ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-indigo-600'}`}
                  >
                    {lang === 'bn' ? c.bn : c.en}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a
              key={l.en}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-1.5 text-sm ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              {lang === 'bn' ? l.bn : l.en}
            </a>
          )))}
          <a
            href="/contact"
            className="block mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-2.5 rounded-full text-sm font-medium"
          >
            {t('Get a Free Audit', 'ফ্রি অডিট পান')}
          </a>
        </div>
      )}
    </nav>
  );
}
