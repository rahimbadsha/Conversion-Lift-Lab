import { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { pageSrc, pageThumb } from '../data/portfolioPages';

// A full-width, scrollable view of an entire landing page, with a thumbnail slider underneath.
export default function PageGallery({ items, index, onSelect }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const viewerRef = useRef(null);
  const stripRef = useRef(null);
  const item = items[index];

  // Back to the top of the page whenever another design is selected.
  useEffect(() => {
    if (viewerRef.current) viewerRef.current.scrollTop = 0;
  }, [item.key]);

  // Keep the active thumbnail in view, and warm the neighbouring images.
  useEffect(() => {
    const strip = stripRef.current;
    const active = strip && strip.querySelector('[data-active="true"]');
    if (active) strip.scrollTo({ left: active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2, behavior: 'smooth' });
    [items[index + 1], items[index - 1]].filter(Boolean).forEach(n => {
      const img = new Image();
      img.src = pageSrc(n.key);
    });
  }, [index, items]);

  const go = d => onSelect((index + d + items.length) % items.length);
  const onKey = e => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  const heading = isDark ? 'text-white' : 'text-slate-900';
  const muted = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div onKeyDown={onKey} role="region" aria-label="Landing page gallery">
      {/* Viewer */}
      <div className={`rounded-2xl overflow-hidden border ${isDark ? 'border-white/10 bg-[#0b1020]' : 'border-slate-200 bg-white'} shadow-2xl`}>
        <div className={`flex items-center gap-3 px-4 py-3 border-b ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
          <div className="hidden sm:flex gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-red-400/80" />
            <span className="w-3 h-3 rounded-full bg-amber-400/80" />
            <span className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          <div className="min-w-0 flex-1">
            <div className={`text-sm font-medium truncate ${heading}`}>{item.label}</div>
            <div className={`text-xs ${muted}`}>{item.cat} · scroll to view the full page</div>
          </div>
          <span className={`text-xs tabular-nums shrink-0 ${muted}`}>{index + 1} / {items.length}</span>
          <button onClick={() => go(-1)} aria-label="Previous design" className={`w-9 h-9 rounded-full flex items-center justify-center border shrink-0 ${isDark ? 'border-white/10 hover:bg-white/10 text-white' : 'border-slate-200 hover:bg-slate-100 text-slate-700'}`}>
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => go(1)} aria-label="Next design" className={`w-9 h-9 rounded-full flex items-center justify-center border shrink-0 ${isDark ? 'border-white/10 hover:bg-white/10 text-white' : 'border-slate-200 hover:bg-slate-100 text-slate-700'}`}>
            <ChevronRight size={18} />
          </button>
          <a href={pageSrc(item.key)} target="_blank" rel="noopener noreferrer" aria-label="Open full-size image in a new tab" className={`hidden sm:flex w-9 h-9 rounded-full items-center justify-center border shrink-0 ${isDark ? 'border-white/10 hover:bg-white/10 text-white' : 'border-slate-200 hover:bg-slate-100 text-slate-700'}`}>
            <ExternalLink size={15} />
          </a>
        </div>
        <div ref={viewerRef} tabIndex={0} className="overflow-y-auto bg-white" style={{ maxHeight: '78vh' }} aria-label={`${item.label}, full page design`}>
          <img
            key={item.key}
            src={pageSrc(item.key)}
            alt={`${item.label} (full page design)`}
            width="1440"
            height={item.h}
            fetchPriority={index === 0 ? 'high' : undefined}
            className="w-full h-auto block"
          />
        </div>
      </div>

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
