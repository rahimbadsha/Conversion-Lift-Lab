import { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { pageThumb, pageParts } from '../data/portfolioPages';
import PageFrame from './PageFrame';

// A full-width, scrollable view of an entire landing page, with a thumbnail slider underneath.
export default function PageGallery({ items, index, onSelect }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const stripRef = useRef(null);
  const item = items[index];

  // Keep the active thumbnail in view, and warm the neighbouring pages' first image.
  useEffect(() => {
    const strip = stripRef.current;
    const active = strip && strip.querySelector('[data-active="true"]');
    if (active) strip.scrollTo({ left: active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2, behavior: 'smooth' });
    [items[index + 1], items[index - 1]].filter(Boolean).forEach(n => {
      const img = new Image();
      img.src = pageParts(n)[0].src;
    });
  }, [index, items]);

  const go = d => onSelect((index + d + items.length) % items.length);
  const onKey = e => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  const muted = isDark ? 'text-slate-400' : 'text-slate-500';
  const btn = `w-9 h-9 rounded-full flex items-center justify-center border shrink-0 ${isDark ? 'border-white/10 hover:bg-white/10 text-white' : 'border-slate-200 hover:bg-slate-100 text-slate-700'}`;

  return (
    <div onKeyDown={onKey} role="region" aria-label="Landing page gallery">
      <PageFrame item={item} title={item.label} subtitle={`${item.cat} · scroll to view the full page`} priority={index === 0}>
        <span className={`text-xs tabular-nums shrink-0 ${muted}`}>{index + 1} / {items.length}</span>
        <button onClick={() => go(-1)} aria-label="Previous design" className={btn}><ChevronLeft size={18} /></button>
        <button onClick={() => go(1)} aria-label="Next design" className={btn}><ChevronRight size={18} /></button>
      </PageFrame>

      {/* Thumbnail slider */}
      <div className="relative mt-5">
        <button
          onClick={() => stripRef.current && stripRef.current.scrollBy({ left: -420, behavior: 'smooth' })}
          aria-label="Scroll thumbnails left"
          className={`hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full items-center justify-center shadow-lg border ${isDark ? 'bg-[#0b1020] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-700'}`}
        >
          <ChevronLeft size={18} />
        </button>
        <div ref={stripRef} className="flex gap-3 overflow-x-auto snap-x pb-2 scroll-smooth" style={{ scrollbarWidth: 'thin' }}>
          {items.map((it, i) => (
            <button
              key={it.key}
              data-active={i === index}
              onClick={() => onSelect(i)}
              aria-label={`Show ${it.label}`}
              aria-current={i === index}
              className={`snap-start shrink-0 w-40 sm:w-48 rounded-xl overflow-hidden border-2 transition-all text-left ${
                i === index ? 'border-indigo-500 ring-2 ring-indigo-500/30 scale-[1.02]' : isDark ? 'border-white/10 opacity-70 hover:opacity-100' : 'border-slate-200 opacity-80 hover:opacity-100'
              }`}
            >
              <img src={pageThumb(it.key)} alt="" width="520" height="322" loading="lazy" className="w-full h-auto block" />
            </button>
          ))}
        </div>
        <button
          onClick={() => stripRef.current && stripRef.current.scrollBy({ left: 420, behavior: 'smooth' })}
          aria-label="Scroll thumbnails right"
          className={`hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full items-center justify-center shadow-lg border ${isDark ? 'bg-[#0b1020] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-700'}`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
