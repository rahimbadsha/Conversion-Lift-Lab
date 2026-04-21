import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Play, X } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import { useTheme } from '../../context/ThemeContext';

const videoTestimonials = [
  { src: '/video/michael-copats.mp4', name: 'Michael Copats', role: 'Client Testimonial' },
  { src: '/video/physiclab.mp4', name: 'PhysicLab', role: 'Client Testimonial' },
];

const textReviews = [
  { name: 'Client — TortExpert', role: 'Legal Lead Gen, 2-Year Retainer', stars: 5, en: '"Rahim is exceptional. He redesigned our landing pages and our lead cost dropped from $41 to $12. Working together for 2 years now. Highly recommend."', bn: '"রাহিম অসাধারণ। তিনি আমাদের ল্যান্ডিং পেজ পুনর্ডিজাইন করেছেন এবং লিড খরচ $৪১ থেকে $১২-তে নেমেছে।"' },
  { name: 'Client — TrueGoldRepublic', role: 'eCommerce, Ongoing', stars: 5, en: '"The funnel Rahim built converts cold Facebook traffic at 3.8%. Tried 3 other designers before — none came close. He understands buyer psychology."', bn: '"রাহিমের তৈরি ফানেল ৩.৮% কনভার্সন দিচ্ছে। আগে ৩ জন ডিজাইনার ট্রাই করেছিলাম — কেউ কাছেও আসেনি।"' },
  { name: 'Upwork Client', role: 'SaaS Startup, USA', stars: 5, en: '"Best landing page expert on Upwork. Delivered 48 hours early and the page doubled our trial signups. Will hire again."', bn: '"আপওয়ার্কে সেরা ল্যান্ডিং পেজ বিশেষজ্ঞ। ৪৮ ঘণ্টা আগে ডেলিভারি এবং ট্রায়াল সাইনআপ দ্বিগুণ হয়েছে।"' },
  { name: 'Upwork Client', role: 'Course Creator, Canada', stars: 5, en: '"Rahim transformed our course sales page. ROAS went from 1.1 to 2.4 within 2 weeks of launch."', bn: '"রাহিম আমাদের কোর্স সেলস পেজ রূপান্তর করেছেন। লঞ্চের ২ সপ্তাহের মধ্যে ROAS ১.১ থেকে ২.৪-এ গেছে।"' },
];

function VideoModal({ video, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    if (ref.current) ref.current.play();
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        className="relative z-10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors">
          <X size={16} />
        </button>
        <video ref={ref} src={video.src} className="w-full aspect-video" controls playsInline />
        <div className="px-5 py-3 flex items-center gap-3 bg-[#111]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">{video.name[0]}</div>
          <div>
            <div className="text-white font-medium text-sm">{video.name}</div>
            <div className="text-slate-400 text-xs">{video.role}</div>
          </div>
          <div className="ml-auto flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={11} className="fill-yellow-400 text-yellow-400" />)}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function VideoThumb({ video, isDark, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
      onClick={onClick}
      className="glass rounded-xl overflow-hidden cursor-pointer group"
    >
      {/* Thumbnail area */}
      <div className="relative aspect-video bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center overflow-hidden">
        {/* Video poster frame — shows first frame */}
        <video src={video.src} className="w-full h-full object-cover opacity-70" preload="metadata" muted />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all">
            <Play size={18} className="text-white fill-white ml-1" />
          </div>
        </div>
      </div>
      {/* Name row */}
      <div className="px-4 py-3 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0">{video.name[0]}</div>
        <div>
          <div className={`font-medium text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{video.name}</div>
          <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{video.role}</div>
        </div>
        <div className="ml-auto flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />)}</div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className={`py-20 lg:py-28 ${isDark ? 'bg-[#080c1a]' : 'bg-white'}`}>
      <AnimatePresence>{activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}</AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-indigo-600 text-sm font-medium uppercase tracking-widest">
            {t('Client Love', 'ক্লায়েন্টের মতামত')}
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className={`text-3xl lg:text-5xl font-bold mt-3 mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('What Clients Say', 'ক্লায়েন্টরা কী বলেন')}
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-indigo-600 font-medium">
            {t('100% Job Success Score · Top Rated · 358+ reviews', '১০০% জব সাফল্য · টপ রেটেড · ৩৫৮+ রিভিউ')}
          </motion.p>
        </div>

        {/*
          Layout:
          - Desktop: text reviews (2-col) on LEFT + video thumbs (stacked) on RIGHT
          - Mobile: video thumbs first, then text reviews
        */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Video thumbs — mobile: order-1, desktop: order-2 (right side) */}
          <div className="order-1 lg:order-2 lg:w-72 xl:w-80 shrink-0 flex flex-col gap-4">
            <p className={`text-xs uppercase tracking-widest font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              {t('Video Reviews', 'ভিডিও রিভিউ')}
            </p>
            {videoTestimonials.map((v, i) => (
              <VideoThumb key={i} video={v} isDark={isDark} onClick={() => setActiveVideo(v)} />
            ))}
          </div>

          {/* Text reviews — mobile: order-2, desktop: order-1 (left side) */}
          <div className="order-2 lg:order-1 flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 content-start">
            {textReviews.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-5 flex flex-col">
                <Quote size={20} className="text-indigo-500 mb-3 opacity-50" />
                <p className={`text-sm leading-relaxed flex-1 mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t(r.en, r.bn)}</p>
                <div className={`flex items-center gap-2.5 pt-3 border-t ${isDark ? 'border-indigo-500/10' : 'border-slate-100'}`}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0">{r.name[0]}</div>
                  <div className="min-w-0">
                    <div className={`font-medium text-xs truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{r.name}</div>
                    <div className={`text-xs truncate ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{r.role}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5 shrink-0">{Array.from({ length: r.stars }).map((_, j) => <Star key={j} size={10} className="fill-yellow-400 text-yellow-400" />)}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
