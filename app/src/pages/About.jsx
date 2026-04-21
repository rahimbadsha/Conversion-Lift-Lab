import { motion } from 'framer-motion';
import { Award, Users, TrendingUp, Clock } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import CTA from '../components/sections/CTA';

const platforms = ['Webflow', 'ClickFunnels', 'GoHighLevel', 'HubSpot', 'Unbounce', 'Instapage', 'WordPress', 'Shopify', 'Systeme.io', 'Funnelish', 'Gem Pages', 'Elementor'];

const achievements = [
  { icon: Award, en: { label: 'Top Rated on Upwork', val: '100% JSS' }, bn: { label: 'আপওয়ার্কে টপ রেটেড', val: '১০০% JSS' } },
  { icon: Users, en: { label: 'Jobs Completed', val: '358+' }, bn: { label: 'সম্পন্ন কাজ', val: '৩৫৮+' } },
  { icon: TrendingUp, en: { label: 'Total Earnings', val: '$200K+' }, bn: { label: 'মোট আয়', val: '$২০০K+' } },
  { icon: Clock, en: { label: 'Years Experience', val: '10+' }, bn: { label: 'বছরের অভিজ্ঞতা', val: '১০+' } },
];

export default function About() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <main className={`min-h-screen pt-24 pb-0 ${isDark ? 'bg-[#050816]' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-indigo-600 text-sm font-medium uppercase tracking-widest">{t('About Me', 'আমার সম্পর্কে')}</span>
            <h1 className={`text-4xl lg:text-5xl font-bold mt-3 mb-5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t('Hi, I\'m ', 'হ্যালো, আমি ')}<span className="text-gradient">Rahim Badsha</span>
            </h1>
            <p className={`leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t('I\'m a CRO specialist and landing page expert with over 10 years of experience building conversion-focused funnels for businesses across the globe. I\'ve delivered 950+ pages on Upwork with a 100% Job Success Score.', 'আমি একজন CRO বিশেষজ্ঞ এবং ল্যান্ডিং পেজ এক্সপার্ট যার বিশ্বজুড়ে ব্যবসার জন্য রূপান্তর-কেন্দ্রিক ফানেল তৈরিতে ১০ বছরেরও বেশি অভিজ্ঞতা আছে।')}
            </p>
            <p className={`leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t('My approach is rooted in buyer psychology, data, and direct-response copywriting. I don\'t just make pages look pretty — I architect them to convert. Every element has a reason.', 'আমার পদ্ধতি ক্রেতার মনোবিজ্ঞান, ডেটা এবং ডাইরেক্ট-রেসপন্স কপিরাইটিংয়ে প্রোথিত।')}
            </p>
            <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t('Notable clients include TortExpert (2-year retainer) and TrueGoldRepublic (ongoing). Available on Upwork and Fiverr for project-based work.', 'উল্লেখযোগ্য ক্লায়েন্টের মধ্যে রয়েছে TortExpert (২ বছরের রিটেইনার) এবং TrueGoldRepublic (চলমান)।')}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 gap-4">
            {achievements.map((a, i) => {
              const Icon = a.icon;
              const data = t(a.en, a.bn);
              return (
                <div key={i} className="glass rounded-2xl p-6 text-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-50'}`}>
                    <Icon size={22} className="text-indigo-600" />
                  </div>
                  <div className="text-3xl font-bold text-gradient mb-1">{data.val}</div>
                  <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{data.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-8 mb-12">
          <h2 className={`font-semibold text-xl mb-6 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('Platform Expertise', 'প্ল্যাটফর্ম বিশেষজ্ঞতা')}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {platforms.map(p => (
              <span key={p} className={`px-4 py-2 rounded-full text-sm font-medium border ${isDark ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' : 'bg-indigo-50 text-indigo-700 border-indigo-100'}`}>{p}</span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
          <h2 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('My Philosophy', 'আমার দর্শন')}</h2>
          <div className={`space-y-4 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <p>{t('Most designers build landing pages that look good in Dribbble screenshots but fail in the real world. They focus on aesthetics over psychology — and that\'s why conversion rates stay low.', 'অধিকাংশ ডিজাইনার ল্যান্ডিং পেজ তৈরি করেন যা Dribbble স্ক্রিনশটে ভালো দেখায় কিন্তু বাস্তব জগতে ব্যর্থ হয়।')}</p>
            <p>{t('I study buyer intent, map the emotional journey, and engineer every headline, subhead, bullet, and CTA to move the reader toward a single action. This is CRO — not art.', 'আমি ক্রেতার উদ্দেশ্য অধ্যয়ন করি, আবেগময় যাত্রা ম্যাপ করি এবং প্রতিটি হেডলাইন এবং CTA ইঞ্জিনিয়ার করি।')}</p>
            <p>{t('After 10 years and 950+ pages, the principle remains the same: understand your customer better than anyone else, and the conversions follow naturally.', '১০ বছর এবং ৯৫০+ পেজের পরে, নীতি একই থাকে: আপনার গ্রাহককে সবার চেয়ে ভালো বুঝুন।')}</p>
          </div>
        </motion.div>
      </div>
      <CTA />
    </main>
  );
}
