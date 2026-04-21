import { motion } from 'framer-motion';
import { Award, CheckCircle2 } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import { useTheme } from '../../context/ThemeContext';

const highlights = [
  { en: '10+ years building high-converting pages', bn: '১০+ বছর ধরে উচ্চ-রূপান্তরকারী পেজ তৈরি' },
  { en: '950+ landing pages delivered across 12 platforms', bn: '১২টি প্ল্যাটফর্মে ৯৫০+ ল্যান্ডিং পেজ ডেলিভারি' },
  { en: '100% Job Success Score on Upwork — Top Rated', bn: 'আপওয়ার্কে ১০০% জব সাফল্য — টপ রেটেড' },
  { en: '$200K+ earned from 358+ completed projects', bn: '৩৫৮+ সম্পন্ন প্রজেক্ট থেকে $২০০K+ আয়' },
  { en: '2-year retainer with TortExpert, ongoing with TrueGoldRepublic', bn: 'TortExpert-এ ২ বছরের রিটেইনার, TrueGoldRepublic চলমান' },
];

export default function AboutMe() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="about" className={`py-20 lg:py-28 ${isDark ? 'bg-[#050816]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 blur-2xl" />
              {/* Photo frame */}
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-3xl overflow-hidden border border-indigo-500/20 shadow-2xl">
                <img
                  src="/images/rahim.png"
                  alt="Rahim Badsha — CRO Landing Page Expert"
                  className="w-full h-full object-cover object-top"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 right-4 glass rounded-xl px-4 py-3 flex items-center gap-3">
                  <Award size={18} className="text-indigo-600 shrink-0" />
                  <div>
                    <div className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {t('Top Rated on Upwork', 'আপওয়ার্কে টপ রেটেড')}
                    </div>
                    <div className="text-xs text-indigo-600">100% Job Success · $200K+ Earned</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-indigo-600 text-sm font-medium uppercase tracking-widest">
              {t('About Me', 'আমার সম্পর্কে')}
            </span>
            <h2 className={`text-3xl lg:text-4xl font-bold mt-3 mb-5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t("I'm Rahim Badsha —", 'আমি রাহিম বদশা —')}<br />
              <span className="text-gradient">{t('I Turn Clicks Into Customers', 'আমি ক্লিককে কাস্টমারে রূপান্তর করি')}</span>
            </h2>

            <p className={`leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t(
                "I'm a CRO specialist who has spent over a decade obsessing over one thing: making landing pages convert. Not just look good — actually convert. I combine buyer psychology, direct-response copy, and data-driven design into every page I build.",
                'আমি একজন CRO বিশেষজ্ঞ যিনি এক দশকেরও বেশি সময় ধরে একটি বিষয়ে মনোযোগ দিয়েছেন: ল্যান্ডিং পেজকে রূপান্তরিত করা। শুধু সুন্দর দেখানো নয় — সত্যিকার অর্থে রূপান্তর করা।'
              )}
            </p>
            <p className={`leading-relaxed mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t(
                "My clients have dropped lead costs from $41 to $12, doubled trial signups, and scaled to 3x ROAS — not by luck, but because every element on their page has a purpose.",
                'আমার ক্লায়েন্টরা লিড খরচ $৪১ থেকে $১২-তে কমিয়েছেন, ট্রায়াল সাইনআপ দ্বিগুণ করেছেন এবং ৩x ROAS-এ স্কেল করেছেন।'
              )}
            </p>

            {/* Highlights list */}
            <ul className="space-y-3 mb-8">
              {highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={17} className="text-indigo-600 mt-0.5 shrink-0" />
                  <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t(h.en, h.bn)}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex gap-3">
              <a
                href="/contact"
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20"
              >
                {t("Work With Me", 'আমার সাথে কাজ করুন')}
              </a>
              <a
                href="https://www.upwork.com/freelancers/rahimbadsha"
                target="_blank"
                rel="noopener"
                className={`flex items-center gap-2 glass px-6 py-3 rounded-full font-medium text-sm transition-all ${isDark ? 'text-white hover:border-indigo-500/40' : 'text-slate-700 hover:border-indigo-400'}`}
              >
                {t('View Upwork Profile', 'আপওয়ার্ক প্রোফাইল দেখুন')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
