import { useRef, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { pageParts } from '../data/portfolioPages';

// Browser-style frame showing an entire landing page at full width. The page scrolls inside the
// frame. `children` renders extra header controls (counter, prev/next buttons).
export default function PageFrame({ item, title, subtitle, priority = false, children }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const viewerRef = useRef(null);
  const parts = pageParts(item);

  // Back to the top whenever another design is shown.
  useEffect(() => {
    if (viewerRef.current) viewerRef.current.scrollTop = 0;
  }, [item.key]);

  const heading = isDark ? 'text-white' : 'text-slate-900';
  const muted = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`rounded-2xl overflow-hidden border ${isDark ? 'border-white/10 bg-[#0b1020]' : 'border-slate-200 bg-white'} shadow-2xl`}>
      <div className={`flex items-center gap-3 px-4 py-3 border-b ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
        <div className="hidden sm:flex gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-amber-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        <div className="min-w-0 flex-1">
          <div className={`text-sm font-medium truncate ${heading}`}>{title}</div>
          <div className={`text-xs ${muted}`}>{subtitle}</div>
        </div>
        {children}
        <a
          href={parts[0].src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open full-size image in a new tab"
          className={`hidden sm:flex w-9 h-9 rounded-full items-center justify-center border shrink-0 ${isDark ? 'border-white/10 hover:bg-white/10 text-white' : 'border-slate-200 hover:bg-slate-100 text-slate-700'}`}
        >
          <ExternalLink size={15} />
        </a>
      </div>
      <div ref={viewerRef} tabIndex={0} className="overflow-y-auto bg-white" style={{ maxHeight: '78vh' }} aria-label={`${title}, full page design`}>
        {parts.map((p, i) => (
          <img
            key={p.src}
            src={p.src}
            alt={i === 0 ? `${title} (full page design)` : ''}
            width="1440"
            height={p.h}
            fetchPriority={priority && i === 0 ? 'high' : undefined}
            loading={i === 0 ? undefined : 'lazy'}
            className="w-full h-auto block"
          />
        ))}
      </div>
    </div>
  );
}
