import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import PageGallery from '../components/PageGallery';
import { portfolioPages, pageCategories, pageSrc, pageThumb } from '../data/portfolioPages';

export default function Portfolio() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [cat, setCat] = useState('All');
  const [index, setIndex] = useState(0);
  const list = cat === 'All' ? portfolioPages : portfolioPages.filter(p => p.cat === cat);
  const heading = isDark ? 'text-white' : 'text-slate-900';
  const muted = isDark ? 'text-slate-400' : 'text-slate-600';

  const choose = c => {
    setCat(c);
    setIndex(0);
  };

  return (
    <main className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-[#050816]' : 'bg-slate-50'}`}>
      <Helmet>
        <title>Landing Page Design Portfolio: Full-Page Examples | ConversionLiftLab</title>
        <meta name="description" content="Browse 20 complete landing page designs for e-commerce, SaaS, lead generation, local services and health brands. Scroll each page from top to bottom." />
        <link rel="canonical" href="https://conversionliftlab.com/portfolio" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': 'https://conversionliftlab.com/portfolio#webpage',
              url: 'https://conversionliftlab.com/portfolio',
              name: 'Landing Page Design Portfolio',
              isPartOf: { '@id': 'https://conversionliftlab.com/#website' },
              about: { '@id': 'https://conversionliftlab.com/#organization' },
              hasPart: portfolioPages.map(p => ({
                '@type': 'ImageObject',
                name: p.label,
                contentUrl: `https://conversionliftlab.com${pageSrc(p.key)}`,
                thumbnailUrl: `https://conversionliftlab.com${pageThumb(p.key)}`,
                encodingFormat: 'image/webp',
                creator: { '@id': 'https://conversionliftlab.com/#person' },
              })),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://conversionliftlab.com/' },
                { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://conversionliftlab.com/portfolio' },
              ],
            },
          ],
        })}</script>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-8">
          <h1 className={`text-3xl sm:text-5xl font-bold mb-4 leading-tight ${heading}`}>
            Landing Page <span className="text-gradient">Design Portfolio</span>
          </h1>
          <p className={muted}>
            {portfolioPages.length} complete landing pages across e-commerce, SaaS, lead generation, local services and health. Scroll each design from the first screen to the last.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8" role="group" aria-label="Filter designs">
          {pageCategories.map(c => (
            <button
              key={c}
              onClick={() => choose(c)}
              aria-pressed={cat === c}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                cat === c
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : isDark ? 'border-white/10 text-slate-300 hover:border-indigo-500/50' : 'border-slate-200 text-slate-600 hover:border-indigo-400 bg-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <PageGallery items={list} index={index} onSelect={setIndex} />

        <div className="glass rounded-3xl p-8 sm:p-10 text-center mt-14">
          <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${heading}`}>Want a page like these for your business?</h2>
          <p className={`mb-6 max-w-lg mx-auto ${muted}`}>
            Tell me about your offer and I&apos;ll show you what a conversion-focused page could look like, starting with a free teardown of your current one.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contact" className="btn-primary inline-flex justify-center">Get a free landing page teardown <ArrowRight size={16} /></a>
            <a href="/case-studies" className="btn-secondary inline-flex justify-center">Read the case studies</a>
          </div>
        </div>
      </div>
    </main>
  );
}
