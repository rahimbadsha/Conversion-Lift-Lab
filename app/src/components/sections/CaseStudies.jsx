import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ZoomIn } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import { useTheme } from '../../context/ThemeContext';

const projects = [
  { img: '/images/portfolio/disputifier.png', en: { title: 'Disputifier — SaaS', category: 'SaaS Landing Page', result: '+38% trial signups' }, bn: { title: 'Disputifier — SaaS', category: 'SaaS ল্যান্ডিং পেজ', result: '+৩৮% ট্রায়াল সাইনআপ' } },
  { img: '/images/portfolio/wellness-course-funnel.png', en: { title: 'Wellness Course Funnel', category: 'Course Funnel', result: '2.4x ROAS improvement' }, bn: { title: 'ওয়েলনেস কোর্স ফানেল', category: 'কোর্স ফানেল', result: '২.৪x ROAS উন্নতি' } },
  { img: '/images/portfolio/down-to-ground-advertorial.png', en: { title: 'Down to Ground', category: 'Advertorial', result: '4.1% CTR' }, bn: { title: 'ডাউন টু গ্রাউন্ড', category: 'অ্যাডভার্টোরিয়াল', result: '৪.১% CTR' } },
  { img: '/images/portfolio/zapply-advertorial.png', en: { title: 'Zapply — Advertorial', category: 'Advertorial', result: '3.2% conversion' }, bn: { title: 'Zapply — অ্যাডভার্টোরিয়াল', category: 'অ্যাডভার্টোরিয়াল', result: '৩.২% রূপান্তর' } },
  { img: '/images/portfolio/injury-claim-networks.png', en: { title: 'Injury Claim Networks', category: 'Lead Generation', result: '$12 CPL (was $41)' }, bn: { title: 'ইনজুরি ক্লেম নেটওয়ার্ক', category: 'লিড জেনারেশন', result: '$১২ CPL (আগে $৪১)' } },
  { img: '/images/portfolio/saas-software-integration.png', en: { title: 'SaaS Integration', category: 'SaaS Page', result: '+55% demo bookings' }, bn: { title: 'SaaS ইন্টিগ্রেশন', category: 'SaaS পেজ', result: '+৫৫% ডেমো বুকিং' } },
  { img: '/images/portfolio/era-wedding.png', en: { title: 'Era Wedding', category: 'Event Landing Page', result: '+82% inquiry rate' }, bn: { title: 'এরা ওয়েডিং', category: 'ইভেন্ট পেজ', result: '+৮২% ইনকোয়ারি' } },
  { img: '/images/portfolio/jl-studio.png', en: { title: 'JL Studio', category: 'Photography Funnel', result: '+67% booking rate' }, bn: { title: 'JL স্টুডিও', category: 'ফটোগ্রাফি ফানেল', result: '+৬৭% বুকিং' } },
];

function Lightbox({ project, onClose }) {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`relative z-10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl ${isDark ? 'bg-[#0d1117]' : 'bg-white'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X size={16} />
          </button>

          {/* Image */}
          <img
            src={project.img}
            alt={project.en.title}
            className="w-full max-h-[70vh] object-contain bg-slate-900"
          />

          {/* Footer */}
          <div className="p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <span className="text-indigo-600 text-xs font-medium">{t(project.en.category, project.bn.category)}</span>
              <h3 className={`font-semibold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t(project.en.title, project.bn.title)}</h3>
              <span className="text-sm font-medium text-indigo-600">{t(project.en.result, project.bn.result)}</span>
            </div>
            <a
              href="https://www.upwork.com/freelancers/rahimbadsha"
              target="_blank"
              rel="noopener"
              className="btn-primary text-sm py-2.5 px-5"
              style={{ fontSize: '13px', padding: '10px 20px' }}
            >
              {t('View All on Upwork', 'আপওয়ার্কে সব দেখুন')}
              <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Need useEffect imported for Lightbox
import { useEffect } from 'react';

export default function CaseStudies() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [active, setActive] = useState(null);

  return (
    <section id="case-studies" className={`py-20 lg:py-28 ${isDark ? 'bg-[#080c1a]' : 'bg-white'}`}>
      {active && <Lightbox project={active} onClose={() => setActive(null)} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-indigo-600 text-sm font-medium uppercase tracking-widest">
            {t('Portfolio', 'পোর্টফোলিও')}
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className={`text-3xl lg:text-5xl font-bold mt-3 mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('Real Results,', 'বাস্তব ফলাফল,')}{' '}
            <span className="text-gradient">{t('Real Clients', 'বাস্তব ক্লায়েন্ট')}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className={`max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('Click any project to view full-size. Every page has a measurable outcome.', 'যেকোনো প্রজেক্টে ক্লিক করুন পূর্ণ আকারে দেখতে।')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              onClick={() => setActive(p)}
              className="group glass rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src={p.img} alt={p.en.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Zoom hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <ZoomIn size={22} className="text-white" />
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow">
                  {t(p.en.result, p.bn.result)}
                </div>
              </div>
              <div className="p-4">
                <span className="text-indigo-600 text-xs font-medium">{t(p.en.category, p.bn.category)}</span>
                <h3 className={`font-medium text-sm mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t(p.en.title, p.bn.title)}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
          <a
            href="https://www.upwork.com/freelancers/rahimbadsha"
            target="_blank"
            rel="noopener"
            className="btn-primary"
          >
            {t('See all 358 completed jobs on Upwork', 'আপওয়ার্কে সকল ৩৫৮টি সম্পন্ন কাজ দেখুন')}
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
