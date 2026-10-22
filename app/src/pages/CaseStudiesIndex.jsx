import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { caseStudies, featuredFirst, caseTypes } from '../data/caseStudies';
import { pageThumb } from '../data/portfolioPages';

export default function CaseStudiesIndex() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [filter, setFilter] = useState('All');
  const list = filter === 'All' ? featuredFirst : featuredFirst.filter(c => c.type === filter);
  const heading = isDark ? 'text-white' : 'text-slate-900';
  const muted = isDark ? 'text-slate-400' : 'text-slate-600';

  return (
    <main className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-[#050816]' : 'bg-slate-50'}`}>
      <Helmet>
        <title>Landing Page, Funnel & CRO Case Studies | ConversionLiftLab</title>
        <meta name="description" content="Real landing page, advertorial and funnel projects across SaaS, legal, wellness and local services, with what was built, why, and the result reported for each." />
        <link rel="canonical" href="https://conversionliftlab.com/case-studies" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': 'https://conversionliftlab.com/case-studies#webpage',
              url: 'https://conversionliftlab.com/case-studies',
              name: 'Landing Page, Funnel & CRO Case Studies',
              isPartOf: { '@id': 'https://conversionliftlab.com/#website' },
              about: { '@id': 'https://conversionliftlab.com/#organization' },
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: caseStudies.map((c, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  url: `https://conversionliftlab.com/case-studies/${c.slug}`,
                  name: c.title,
                })),
              },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://conversionliftlab.com/' },
                { '@type': 'ListItem', position: 2, name: 'Case Studies', item: 'https://conversionliftlab.com/case-studies' },
              ],
            },
          ],
        })}</script>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-10">
          <h1 className={`text-3xl sm:text-5xl font-bold mb-4 leading-tight ${heading}`}>
            Landing Page &amp; Funnel <span className="text-gradient">Case Studies</span>
          </h1>
          <p className={muted}>
            Real projects across SaaS, legal, wellness and local services. See what was built, the thinking behind it, and the result reported for each.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10" role="group" aria-label="Filter case studies">
          {caseTypes.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              aria-pressed={filter === t}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                filter === t
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : isDark ? 'border-white/10 text-slate-300 hover:border-indigo-500/50' : 'border-slate-200 text-slate-600 hover:border-indigo-400 bg-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((c, i) => (
            <motion.a
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.06 }}
              whileHover={{ y: -5 }}
              className="group glass rounded-2xl overflow-hidden block"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={c.page ? pageThumb(c.page) : `${c.image}-thumb.webp`}
                  alt={`${c.title} landing page design`}
                  width="520"
                  height="322"
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow flex items-center gap-1">
                  <TrendingUp size={12} /> {c.result || c.platform}
                </div>
              </div>
              <div className="p-5">
                <span className="text-indigo-500 text-xs font-medium">{c.type} · {c.industry}{c.platform && c.result ? ` · ${c.platform}` : ''}</span>
                <h2 className={`font-semibold text-lg mt-1 mb-2 leading-snug ${heading}`}>{c.title}</h2>
                <p className={`text-sm mb-4 ${muted}`}>{c.summary}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-500 group-hover:gap-2.5 transition-all">
                  Read the case study <ArrowRight size={15} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="/portfolio" className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-400 font-medium">
            Browse 110 full-page landing page designs <ArrowRight size={16} />
          </a>
        </div>

        <p className={`text-xs text-center mt-6 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          Results are the figures reported for each individual project. Every business, offer and traffic source is different, so your results will vary.
        </p>

        <div className="glass rounded-3xl p-8 sm:p-10 text-center mt-12">
          <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${heading}`}>Want results like these for your page?</h2>
          <p className={`mb-6 max-w-lg mx-auto ${muted}`}>
            Get a free teardown of your current landing page. I&apos;ll show you what is costing you conversions and what to fix first.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contact" className="btn-primary inline-flex justify-center">Get a free landing page teardown <ArrowRight size={16} /></a>
            <a href="/website-score" className="btn-secondary inline-flex justify-center">Try the free CRO audit tool</a>
          </div>
        </div>
      </div>
    </main>
  );
}
