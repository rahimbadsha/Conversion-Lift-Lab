import { motion } from 'framer-motion';
import { useLang } from '../../context/LangContext';
import { useTheme } from '../../context/ThemeContext';

const steps = [
  { num: '01', en: { title: 'Discovery Call', desc: 'We align on your offer, audience, traffic source, and conversion goals in a 30-min strategy session.' }, bn: { title: 'ডিসকভারি কল', desc: 'আপনার অফার, দর্শক, ট্র্যাফিক সোর্স এবং রূপান্তর লক্ষ্য নিয়ে ৩০ মিনিটের কৌশল সেশন।' } },
  { num: '02', en: { title: 'Research & Strategy', desc: 'Competitor analysis, customer avatar, messaging hierarchy, and CRO audit of existing assets.' }, bn: { title: 'গবেষণা ও কৌশল', desc: 'প্রতিযোগী বিশ্লেষণ, কাস্টমার অ্যাভাটার, মেসেজিং হায়ারার্কি এবং CRO অডিট।' } },
  { num: '03', en: { title: 'Design & Build', desc: 'Wireframe → high-fidelity design → pixel-perfect build on your platform of choice. No shortcuts.' }, bn: { title: 'ডিজাইন ও বিল্ড', desc: 'ওয়্যারফ্রেম → হাই-ফিডেলিটি ডিজাইন → আপনার পছন্দের প্ল্যাটফর্মে নির্ভুল বিল্ড।' } },
  { num: '04', en: { title: 'QA & Launch', desc: 'Cross-browser, mobile, and speed testing. Tracking pixels, analytics, and integrations verified.' }, bn: { title: 'QA ও লঞ্চ', desc: 'ক্রস-ব্রাউজার, মোবাইল এবং স্পিড টেস্টিং। ট্র্যাকিং পিক্সেল, অ্যানালিটিক্স যাচাই।' } },
  { num: '05', en: { title: 'Optimize & Scale', desc: 'Post-launch A/B testing, heatmap review, and iterative improvements based on real data.' }, bn: { title: 'অপ্টিমাইজ ও স্কেল', desc: 'লঞ্চের পরে A/B টেস্টিং, হিটম্যাপ রিভিউ এবং বাস্তব ডেটার উপর ভিত্তি করে উন্নতি।' } },
];

export default function Process() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="process" className={`py-20 lg:py-28 ${isDark ? 'bg-[#050816]' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-indigo-600 text-sm font-medium uppercase tracking-widest">
            {t('How It Works', 'কিভাবে কাজ করে')}
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className={`text-3xl lg:text-5xl font-bold mt-3 mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('My ', 'আমার ')}<span className="text-gradient">{t('5-Step Process', '৫-ধাপ প্রক্রিয়া')}</span>
          </motion.h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/40 via-purple-500/40 to-transparent -translate-x-1/2" />
          <div className="space-y-8">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col lg:flex-row items-center gap-6 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className="lg:w-5/12 glass rounded-2xl p-6 w-full">
                  <div className="text-indigo-600 font-bold text-sm mb-3">{t('STEP', 'ধাপ')} {s.num}</div>
                  <h3 className={`font-semibold text-xl mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t(s.en.title, s.bn.title)}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t(s.en.desc, s.bn.desc)}</p>
                </div>
                <div className="hidden lg:flex w-2/12 justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/30 z-10">
                    {s.num}
                  </div>
                </div>
                <div className="hidden lg:block lg:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
