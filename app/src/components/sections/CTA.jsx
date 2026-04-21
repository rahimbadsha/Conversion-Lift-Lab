import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import { useTheme } from '../../context/ThemeContext';

export default function CTA() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`py-20 lg:py-28 relative overflow-hidden ${isDark ? 'bg-[#050816]' : 'bg-white'}`}>
      <div className={`absolute inset-0 pointer-events-none ${isDark ? 'bg-gradient-to-br from-indigo-900/30 via-transparent to-purple-900/30' : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'}`} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass rounded-3xl p-10 lg:p-16">
          <h2 className={`text-3xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('Ready to Stop Losing', 'রূপান্তর হারানো বন্ধ করতে')}<br />
            <span className="text-gradient">{t('Conversions?', 'প্রস্তুত?')}</span>
          </h2>
          <p className={`text-lg max-w-xl mx-auto mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('Get a free CRO audit of your current landing page. No sales pitch — just actionable insights.', 'আপনার বর্তমান ল্যান্ডিং পেজের বিনামূল্যে CRO অডিট পান। কোনো সেলস পিচ নেই — শুধু কার্যকর অন্তর্দৃষ্টি।')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-base hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/25">
              {t('Get My Free Audit', 'ফ্রি অডিট পান')}<ArrowRight size={18} />
            </a>
            <a href="https://www.upwork.com/freelancers/rahimbadsha" target="_blank" rel="noopener" className={`flex items-center justify-center gap-2 glass px-8 py-4 rounded-full font-medium text-sm transition-all ${isDark ? 'text-white hover:border-indigo-500/40' : 'text-slate-700 hover:border-indigo-400'}`}>
              <MessageSquare size={16} />
              {t('Message on Upwork', 'আপওয়ার্কে মেসেজ করুন')}
            </a>
          </div>
          <p className={`text-xs mt-6 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
            {t('Typically responds within 24 hours · No commitment required', 'সাধারণত ২৪ ঘণ্টার মধ্যে সাড়া দেন · কোনো প্রতিশ্রুতি প্রয়োজন নেই')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
