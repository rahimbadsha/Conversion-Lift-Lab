import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

export default function NotFound() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <main className={`min-h-screen pt-24 pb-20 flex items-center justify-center ${isDark ? 'bg-[#050816]' : 'bg-slate-50'}`}>
      <Helmet>
        <title>Page Not Found | ConversionLiftLab</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
        <div className="text-gradient text-7xl font-bold mb-4">404</div>
        <h1 className={`text-2xl lg:text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {t("Page Not Found", 'পেজ পাওয়া যায়নি')}
        </h1>
        <p className={`mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {t("The page you're looking for doesn't exist or has moved. Head back home or check out the CRO services on offer.", 'আপনি যে পেজটি খুঁজছেন তা নেই বা সরানো হয়েছে।')}
        </p>
        <a href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20">
          {t('Back to Home', 'হোমে ফিরে যান')}<ArrowRight size={16} />
        </a>
      </div>
    </main>
  );
}
