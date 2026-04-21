import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { en: 'Services', bn: 'সেবাসমূহ', href: '/#services' },
  { en: 'Case Studies', bn: 'কেস স্টাডি', href: '/#case-studies' },
  { en: 'Process', bn: 'প্রক্রিয়া', href: '/#process' },
  { en: 'Pricing', bn: 'মূল্য', href: '/#pricing' },
  { en: 'About', bn: 'সম্পর্কে', href: '/about' },
  { en: 'Contact', bn: 'যোগাযোগ', href: '/contact' },
];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
            ConversionLift<span className="text-gradient">Lab</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(l => (
            <a
              key={l.en}
              href={l.href}
              className={`text-sm transition-colors duration-200 hover:text-indigo-600 ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              {lang === 'bn' ? l.bn : l.en}
            </a>
          ))}
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
          {navLinks.map(l => (
            <a
              key={l.en}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-1.5 text-sm ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              {lang === 'bn' ? l.bn : l.en}
            </a>
          ))}
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
