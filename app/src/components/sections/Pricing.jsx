import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import { useTheme } from '../../context/ThemeContext';

const plans = [
  {
    en: { name: 'Starter', price: '$499', desc: 'Perfect for solopreneurs and small businesses testing a new offer.', features: ['1 Landing Page', 'Mobile Optimized', 'Basic CRO Audit', 'Copy Review', '3-Day Delivery', '2 Revision Rounds'] },
    bn: { name: 'স্টার্টার', price: '$৪৯৯', desc: 'একটি নতুন অফার পরীক্ষা করা সোলোপ্রেনার এবং ছোট ব্যবসার জন্য।', features: ['১টি ল্যান্ডিং পেজ', 'মোবাইল অপ্টিমাইজড', 'বেসিক CRO অডিট', 'কপি রিভিউ', '৩ দিনের ডেলিভারি', '২ রাউন্ড রিভিশন'] },
  },
  {
    popular: true,
    en: { name: 'Pro Funnel', price: '$1,299', desc: 'Full funnel for businesses ready to scale with paid traffic.', features: ['Up to 5 Pages', 'Full Funnel Flow', 'Deep CRO Research', 'A/B Test Setup', 'Email Integration', 'Tracking & Analytics', '7-Day Delivery', 'Unlimited Revisions'] },
    bn: { name: 'প্রো ফানেল', price: '$১,২৯৯', desc: 'পেইড ট্র্যাফিক দিয়ে স্কেল করতে প্রস্তুত ব্যবসার জন্য।', features: ['৫টি পেজ পর্যন্ত', 'সম্পূর্ণ ফানেল ফ্লো', 'গভীর CRO গবেষণা', 'A/B টেস্ট সেটআপ', 'ইমেইল ইন্টিগ্রেশন', 'ট্র্যাকিং ও অ্যানালিটিক্স', '৭ দিনের ডেলিভারি', 'আনলিমিটেড রিভিশন'] },
  },
  {
    en: { name: 'Retainer', price: '$2,499/mo', desc: 'Ongoing CRO partner. Continuous testing, optimization, and new pages.', features: ['Everything in Pro', '4 New Pages/Month', 'Monthly CRO Reports', 'Heatmap Analysis', 'Priority Support', 'Strategy Calls', 'Dedicated Slack Channel'] },
    bn: { name: 'রিটেইনার', price: '$২,৪৯৯/মাস', desc: 'চলমান CRO অংশীদার। ক্রমাগত পরীক্ষা, অপ্টিমাইজেশন এবং নতুন পেজ।', features: ['প্রো-র সব কিছু', 'মাসে ৪টি নতুন পেজ', 'মাসিক CRO রিপোর্ট', 'হিটম্যাপ বিশ্লেষণ', 'অগ্রাধিকার সাপোর্ট', 'কৌশল কল', 'ডেডিকেটেড স্ল্যাক চ্যানেল'] },
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
            {t('No hidden fees. No hourly billing surprises. Pick the engagement model that fits your stage.', 'কোনো লুকানো ফি নেই। আপনার পর্যায়ের সাথে মানানসই এনগেজমেন্ট মডেল বেছে নিন।')}
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
                  <div className="text-3xl font-bold text-gradient mb-3">{data.price}</div>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{data.desc}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {data.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-2.5 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <Check size={15} className="text-indigo-600 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className={`flex items-center justify-center gap-2 py-3 rounded-full font-medium text-sm transition-all ${plan.popular ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 shadow-lg shadow-indigo-500/20' : isDark ? 'glass text-white hover:border-indigo-500/40' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100'}`}>
                  {t('Get Started', 'শুরু করুন')}<ArrowRight size={15} />
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className={`text-center text-sm mt-8 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {t('Need something custom? ', 'কাস্টম কিছু দরকার? ')}<a href="/contact" className="text-indigo-600 hover:text-indigo-700">{t('Let\'s talk', 'কথা বলুন')}</a>
        </motion.p>
      </div>
    </section>
  );
}
