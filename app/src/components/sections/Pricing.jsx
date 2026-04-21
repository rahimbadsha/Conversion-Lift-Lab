import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import { useTheme } from '../../context/ThemeContext';

const plans = [
  {
    en: {
      name: 'Starter',
      price: '$997',
      note: 'one-time',
      desc: 'One high-converting landing page — built, copy, and optimized end to end.',
      features: [
        '1 Landing Page (up to 7 sections)',
        'Conversion Copywriting',
        'Mobile-First Design',
        'CRO Audit & Research',
        '3–5 Day Delivery',
        '2 Revision Rounds',
        '30-Day Post-Launch Support',
      ],
    },
    bn: {
      name: 'স্টার্টার',
      price: '$৯৯৭',
      note: 'এককালীন',
      desc: 'একটি উচ্চ-রূপান্তরকারী ল্যান্ডিং পেজ — বিল্ড, কপি এবং অপ্টিমাইজড।',
      features: [
        '১টি ল্যান্ডিং পেজ (৭টি পর্যন্ত সেকশন)',
        'কনভার্সন কপিরাইটিং',
        'মোবাইল-ফার্স্ট ডিজাইন',
        'CRO অডিট ও গবেষণা',
        '৩–৫ দিনের ডেলিভারি',
        '২ রাউন্ড রিভিশন',
        '৩০ দিনের সাপোর্ট',
      ],
    },
  },
  {
    popular: true,
    en: {
      name: 'Growth Funnel',
      price: '$2,997',
      note: 'per project',
      desc: 'Complete conversion funnel for businesses scaling with paid traffic.',
      features: [
        'Up to 5 Pages (full funnel)',
        'Deep CRO Strategy & Research',
        'Conversion Copywriting',
        'A/B Test Setup',
        'Email & CRM Integration',
        'Tracking & Analytics Setup',
        'Heatmap Review (Hotjar / Clarity)',
        '7–14 Day Delivery',
        'Unlimited Revisions',
      ],
    },
    bn: {
      name: 'গ্রোথ ফানেল',
      price: '$২,৯৯৭',
      note: 'প্রতি প্রজেক্ট',
      desc: 'পেইড ট্র্যাফিক দিয়ে স্কেল করতে প্রস্তুত ব্যবসার জন্য সম্পূর্ণ ফানেল।',
      features: [
        '৫টি পেজ পর্যন্ত (সম্পূর্ণ ফানেল)',
        'গভীর CRO কৌশল ও গবেষণা',
        'কনভার্সন কপিরাইটিং',
        'A/B টেস্ট সেটআপ',
        'ইমেইল ও CRM ইন্টিগ্রেশন',
        'ট্র্যাকিং ও অ্যানালিটিক্স সেটআপ',
        'হিটম্যাপ রিভিউ (Hotjar / Clarity)',
        '৭–১৪ দিনের ডেলিভারি',
        'আনলিমিটেড রিভিশন',
      ],
    },
  },
  {
    en: {
      name: 'Agency Retainer',
      price: '$4,997',
      note: 'per month',
      desc: 'Dedicated CRO partnership — continuous testing, new pages, and optimization.',
      features: [
        'Everything in Growth Funnel',
        '4 New Pages Per Month',
        'Monthly CRO Reports',
        'Heatmap & Session Analysis',
        'Ongoing A/B Testing',
        'Priority Turnaround',
        'Direct Access via Email',
      ],
    },
    bn: {
      name: 'এজেন্সি রিটেইনার',
      price: '$৪,৯৯৭',
      note: 'প্রতি মাস',
      desc: 'ডেডিকেটেড CRO অংশীদারিত্ব — ক্রমাগত পরীক্ষা, নতুন পেজ এবং অপ্টিমাইজেশন।',
      features: [
        'গ্রোথ ফানেলের সব কিছু',
        'মাসে ৪টি নতুন পেজ',
        'মাসিক CRO রিপোর্ট',
        'হিটম্যাপ ও সেশন বিশ্লেষণ',
        'চলমান A/B টেস্টিং',
        'অগ্রাধিকার ডেলিভারি',
        'সরাসরি ইমেইল অ্যাক্সেস',
      ],
    },
  },
];

export default function Pricing() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="pricing" className={`py-20 lg:py-28 ${isDark ? 'bg-[#050816]' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-indigo-600 text-sm font-medium uppercase tracking-widest">
            {t('Investment', 'বিনিয়োগ')}
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className={`text-3xl lg:text-5xl font-bold mt-3 mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('Transparent', 'স্বচ্ছ')}{' '}<span className="text-gradient">{t('Pricing', 'মূল্য')}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className={`max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('No hidden fees. No hourly billing surprises. Fixed-price projects with guaranteed delivery.', 'কোনো লুকানো ফি নেই। নির্দিষ্ট মূল্যের প্রজেক্ট এবং নিশ্চিত ডেলিভারি।')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const data = t(plan.en, plan.bn);
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`relative glass rounded-2xl p-7 flex flex-col ${plan.popular ? 'ring-2 ring-indigo-500/50' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs px-4 py-1 rounded-full font-medium whitespace-nowrap">
                    {t('Most Popular', 'সবচেয়ে জনপ্রিয়')}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`font-semibold text-xl mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{data.name}</h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-gradient">{data.price}</span>
                    <span className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{data.note}</span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{data.desc}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {data.features.map((f, j) => (
                    <li key={j} className={`flex items-start gap-2.5 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <Check size={15} className="text-indigo-600 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className={`flex items-center justify-center gap-2 py-3 rounded-full font-medium text-sm transition-all ${plan.popular ? 'btn-primary' : isDark ? 'glass text-white hover:border-indigo-500/40' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100'}`}>
                  {t('Get Started', 'শুরু করুন')}<ArrowRight size={15} />
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className={`text-center text-sm mt-8 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {t('Need a custom quote? ', 'কাস্টম কোটেশন দরকার? ')}<a href="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium">{t("Let's talk", 'কথা বলুন')}</a>
        </motion.p>
      </div>
    </section>
  );
}
