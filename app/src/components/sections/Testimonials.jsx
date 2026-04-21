import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Play, Pause } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import { useTheme } from '../../context/ThemeContext';

const videoTestimonials = [
  {
    src: '/video/michael-copats.mp4',
    name: 'Michael Copats',
    role: 'Client Testimonial',
    thumb: null,
  },
  {
    src: '/video/physiclab.mp4',
    name: 'PhysicLab',
    role: 'Client Testimonial',
    thumb: null,
  },
];

const textReviews = [
  { name: 'Client — TortExpert', role: 'Legal Lead Gen, 2-Year Retainer', stars: 5, en: '"Rahim is exceptional. He redesigned our landing pages and our lead cost dropped from $41 to $12. Working together for 2 years now. Highly recommend."', bn: '"রাহিম অসাধারণ। তিনি আমাদের ল্যান্ডিং পেজ পুনর্ডিজাইন করেছেন এবং আমাদের লিড খরচ $৪১ থেকে $১২-তে নেমেছে।"' },
  { name: 'Client — TrueGoldRepublic', role: 'eCommerce, Ongoing', stars: 5, en: '"The funnel Rahim built converts cold Facebook traffic at 3.8%. Tried 3 other designers before — none came close. He understands buyer psychology."', bn: '"রাহিমের তৈরি ফানেল ৩.৮% কনভার্সন দিচ্ছে। আগে ৩ জন ডিজাইনার ট্রাই করেছিলাম — কেউ কাছেও আসেনি।"' },
  { name: 'Upwork Client', role: 'SaaS Startup, USA', stars: 5, en: '"Best landing page expert on Upwork. Delivered 48 hours early, communicated perfectly, and the page doubled our trial signups."', bn: '"আপওয়ার্কে সেরা ল্যান্ডিং পেজ বিশেষজ্ঞ। ৪৮ ঘণ্টা আগে ডেলিভারি এবং পেজটি ট্রায়াল সাইনআপ দ্বিগুণ করেছে।"' },
  { name: 'Upwork Client', role: 'Course Creator, Canada', stars: 5, en: '"Rahim transformed our course sales page. ROAS went from 1.1 to 2.4 within 2 weeks. His CRO knowledge is genuinely impressive."', bn: '"রাহিম আমাদের কোর্স সেলস পেজ রূপান্তর করেছেন। লঞ্চের ২ সপ্তাহের মধ্যে ROAS ১.১ থেকে ২.৪-এ গেছে।"' },
];

function VideoCard({ video, isDark }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) { ref.current.pause(); setPlaying(false); }
    else { ref.current.play(); setPlaying(true); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`glass rounded-2xl overflow-hidden flex flex-col`}
    >
      {/* Video */}
      <div className="relative aspect-video bg-black cursor-pointer group" onClick={toggle}>
        <video
          ref={ref}
          src={video.src}
          className="w-full h-full object-cover"
          onEnded={() => setPlaying(false)}
          playsInline
        />
        {/* Play overlay */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play size={22} className="text-white fill-white ml-1" />
            </div>
          </div>
        )}
        {playing && (
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-9 h-9 rounded-full bg-black/50 flex items-center justify-center">
              <Pause size={15} className="text-white" />
            </div>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {video.name[0]}
        </div>
        <div>
          <div className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{video.name}</div>
          <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{video.role}</div>
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={11} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`py-20 lg:py-28 ${isDark ? 'bg-[#080c1a]' : 'bg-white'}`}>
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

        {/* Video testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {videoTestimonials.map((v, i) => (
            <VideoCard key={i} video={v} isDark={isDark} />
          ))}
        </div>

        {/* Text reviews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {textReviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-5 flex flex-col">
              <Quote size={20} className="text-indigo-500 mb-3 opacity-50" />
              <p className={`text-sm leading-relaxed flex-1 mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t(r.en, r.bn)}</p>
              <div className={`flex items-center gap-2.5 pt-3 border-t ${isDark ? 'border-indigo-500/10' : 'border-slate-100'}`}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {r.name[0]}
                </div>
                <div className="min-w-0">
                  <div className={`font-medium text-xs truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{r.name}</div>
                  <div className={`text-xs truncate ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{r.role}</div>
                </div>
                <div className="ml-auto flex gap-0.5 shrink-0">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Star key={j} size={10} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
