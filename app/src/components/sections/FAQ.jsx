import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import { useTheme } from '../../context/ThemeContext';

const faqs = [
  { en: { q: 'What platforms do you work with?', a: 'Webflow, ClickFunnels (1 & 2), GoHighLevel, HubSpot, Unbounce, Instapage, WordPress (Elementor/Divi), Shopify, Systeme.io, Funnelish, and Gem Pages. If your platform isn\'t listed, ask — I\'ve probably worked with it.' }, bn: { q: 'আপনি কোন প্ল্যাটফর্মে কাজ করেন?', a: 'Webflow, ClickFunnels (১ ও ২), GoHighLevel, HubSpot, Unbounce, Instapage, WordPress, Shopify, Systeme.io, Funnelish এবং Gem Pages। আপনার প্ল্যাটফর্ম তালিকায় না থাকলে জিজ্ঞেস করুন।' } },
  { en: { q: 'How long does a landing page take?', a: 'Simple landing pages: 3-5 days. Full funnels (3-7 pages): 7-14 days. Timelines are committed to, not estimated.' }, bn: { q: 'একটি ল্যান্ডিং পেজ কতদিন লাগে?', a: 'সাধারণ ল্যান্ডিং পেজ: ৩-৫ দিন। সম্পূর্ণ ফানেল (৩-৭ পেজ): ৭-১৪ দিন।' } },
  { en: { q: 'Do you write copy or just design?', a: 'Both. I handle research, copy, design, and build end-to-end. You can provide your own copy if you prefer — but conversion-focused copy from me is included in every project.' }, bn: { q: 'আপনি কি কপি লেখেন নাকি শুধু ডিজাইন করেন?', a: 'উভয়। আমি গবেষণা, কপি, ডিজাইন এবং বিল্ড সম্পূর্ণভাবে পরিচালনা করি।' } },
  { en: { q: 'What\'s your revision policy?', a: 'Starter: 2 rounds. Pro Funnel & Retainer: unlimited. I work until you\'re happy — not until my hours run out.' }, bn: { q: 'আপনার রিভিশন পলিসি কী?', a: 'স্টার্টার: ২ রাউন্ড। প্রো ফানেল ও রিটেইনার: আনলিমিটেড। আপনি সন্তুষ্ট না হওয়া পর্যন্ত কাজ করি।' } },
  { en: { q: 'Do you offer post-launch optimization?', a: 'Yes — retainer plan includes ongoing A/B testing, heatmap analysis, and monthly CRO reports. For one-time projects, 30-day post-launch support is included.' }, bn: { q: 'আপনি কি লঞ্চের পরে অপ্টিমাইজেশন অফার করেন?', a: 'হ্যাঁ — রিটেইনার প্ল্যানে চলমান A/B টেস্টিং এবং মাসিক CRO রিপোর্ট অন্তর্ভুক্ত।' } },
  { en: { q: 'How do I get started?', a: 'Fill in the contact form, send a message on Upwork or Fiverr, or book a free 30-min audit call. I respond within 24 hours.' }, bn: { q: 'কিভাবে শুরু করবো?', a: 'কন্টাক্ট ফর্ম পূরণ করুন, Upwork বা Fiverr-এ মেসেজ পাঠান। আমি ২৪ ঘণ্টার মধ্যে সাড়া দিই।' } },
];

function FAQItem({ item, index, isDark }) {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="glass rounded-xl overflow-hidden">
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between p-5 text-left gap-4">
        <span className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{t(item.en.q, item.bn.q)}</span>
        <ChevronDown size={18} className={`text-indigo-600 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <p className={`px-5 pb-5 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t(item.en.a, item.bn.a)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="faq" className={`py-20 lg:py-28 ${isDark ? 'bg-[#080c1a]' : 'bg-slate-50'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`text-3xl lg:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('Frequently Asked', 'প্রায়ই জিজ্ঞাসিত')}{' '}
            <span className="text-gradient">{t('Questions', 'প্রশ্নাবলী')}</span>
          </motion.h2>
        </div>
        <div className="space-y-3">
          {faqs.map((item, i) => <FAQItem key={i} item={item} index={i} isDark={isDark} />)}
        </div>
      </div>
    </section>
  );
}
