import { motion } from 'framer-motion';
import { Layout, TrendingUp, Filter, BarChart2, Zap, Globe, Bot } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import { useTheme } from '../../context/ThemeContext';

const services = [
  {
    icon: Layout,
    en: { title: 'Landing Page Design', desc: 'High-converting pages built from scratch — hero, social proof, CTA, optimized for desktop & mobile.' },
    bn: { title: 'ল্যান্ডিং পেজ ডিজাইন', desc: 'স্ক্র্যাচ থেকে উচ্চ-রূপান্তরকারী পেজ তৈরি — হিরো, সোশ্যাল প্রুফ, CTA, ডেস্কটপ ও মোবাইলের জন্য।' },
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Filter,
    en: { title: 'Funnel Building', desc: 'End-to-end sales funnels: optin → upsell → thank you, with A/B tested flows and email integrations.' },
    bn: { title: 'ফানেল বিল্ডিং', desc: 'সম্পূর্ণ সেলস ফানেল: অপটিন → আপসেল → ধন্যবাদ পেজ, A/B টেস্টেড ফ্লো সহ।' },
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: TrendingUp,
    en: { title: 'CRO Optimization', desc: 'Data-driven audits, heatmap analysis, copy rewrites, and A/B testing to lift your conversion rate.' },
    bn: { title: 'CRO অপ্টিমাইজেশন', desc: 'ডেটা-চালিত অডিট, হিটম্যাপ বিশ্লেষণ এবং A/B টেস্টিং দিয়ে রূপান্তর হার বাড়ানো।' },
    color: 'from-cyan-500 to-indigo-500',
  },
  {
    icon: BarChart2,
    en: { title: 'Lead Generation Pages', desc: 'Squeeze pages, webinar registrations, quiz funnels — built to capture qualified leads at scale.' },
    bn: { title: 'লিড জেনারেশন পেজ', desc: 'স্কুইজ পেজ, ওয়েবিনার রেজিস্ট্রেশন, কুইজ ফানেল — স্কেলে যোগ্য লিড ক্যাপচার করতে।' },
    color: 'from-green-500 to-cyan-500',
  },
  {
    icon: Zap,
    en: { title: 'Platform Migration', desc: 'Migrate existing pages to Webflow, GoHighLevel, ClickFunnels, or any funnel platform — pixel perfect.' },
    bn: { title: 'প্ল্যাটফর্ম মাইগ্রেশন', desc: 'বিদ্যমান পেজ Webflow, GoHighLevel বা যেকোনো ফানেল প্ল্যাটফর্মে মাইগ্রেট করুন।' },
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Globe,
    en: { title: 'Advertorial & VSL Pages', desc: 'Native-style advertorials and video sales letters that warm cold traffic and drive affiliate conversions.' },
    bn: { title: 'অ্যাডভার্টোরিয়াল ও VSL পেজ', desc: 'নেটিভ-স্টাইল অ্যাডভার্টোরিয়াল এবং ভিডিও সেলস লেটার যা কোল্ড ট্র্যাফিক গরম করে।' },
    color: 'from-red-500 to-purple-500',
  },
  {
    icon: Bot,
    en: { title: 'AI-Powered Lead & CRM Automation', desc: '10x faster lead qualification, AI follow-up sequences, and CRM automation — so no lead slips through the cracks.' },
    bn: { title: 'AI-চালিত লিড ও CRM অটোমেশন', desc: '১০ গুণ দ্রুত লিড কোয়ালিফিকেশন, AI ফলো-আপ সিকোয়েন্স এবং CRM অটোমেশন — কোনো লিড হারাবে না।' },
    color: 'from-violet-500 to-cyan-500',
  },
];

export default function Services() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="services" className={`py-20 lg:py-28 ${isDark ? 'bg-[#050816]' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-indigo-600 text-sm font-medium uppercase tracking-widest"
          >
            {t('What I Do', 'আমি কী করি')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-3xl lg:text-5xl font-bold mt-3 mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            {t('Services Built for', 'সেবা তৈরি হয়েছে')}{' '}
            <span className="text-gradient">{t('Conversion', 'রূপান্তরের জন্য')}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            {t(
              'Every service is rooted in CRO principles — psychology, design, and data working together.',
              'প্রতিটি সেবা CRO নীতিতে ভিত্তিক — মনোবিজ্ঞান, ডিজাইন এবং ডেটা একসাথে কাজ করে।'
            )}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 group cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {t(s.en.title, s.bn.title)}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t(s.en.desc, s.bn.desc)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
