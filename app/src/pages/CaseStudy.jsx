import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, Target, Hammer, Lightbulb, TrendingUp, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { caseStudies, bySlug } from '../data/caseStudies';
import NotFound from './NotFound';

function Block({ icon: Icon, title, children, isDark, heading }) {
  return (
    <section className="glass rounded-2xl p-6 sm:p-8">
      <h2 className={`flex items-center gap-2.5 text-xl font-semibold mb-4 ${heading}`}>
        <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-50'}`}>
          <Icon size={18} className="text-indigo-500" />
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function List({ items, body }) {
  return (
    <ul className="space-y-3">
      {items.map(t => (
        <li key={t} className={`flex gap-3 ${body}`}>
          <CheckCircle2 size={18} className="text-indigo-500 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const cs = bySlug(slug);
  if (!cs) return <NotFound />;

  const i = caseStudies.indexOf(cs);
  const prev = caseStudies[(i - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(i + 1) % caseStudies.length];
  const url = `https://conversionliftlab.com/case-studies/${cs.slug}`;
  const heading = isDark ? 'text-white' : 'text-slate-900';
  const muted = isDark ? 'text-slate-400' : 'text-slate-600';
  const body = isDark ? 'text-slate-300' : 'text-slate-700';

  const snapshot = [
    ['Project type', cs.type],
    ['Industry', cs.industry],
    ['Page', cs.pageType],
    ['Main action', cs.primaryAction],
    cs.platform && ['Built with', cs.platform],
    cs.timeline && ['Timeline', cs.timeline],
  ].filter(Boolean);

  return (
    <main className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-[#050816]' : 'bg-slate-50'}`}>
      <Helmet>
        <title>{`${cs.title} | Case Study | ConversionLiftLab`}</title>
        <meta name="description" content={`${cs.summary} Reported result: ${cs.result}.`} />
        <link rel="canonical" href={url} />
        <meta property="og:image" content={`https://conversionliftlab.com${cs.image}.webp`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': `${url}#webpage`,
              url,
              name: `${cs.title} | Case Study`,
              description: cs.summary,
              isPartOf: { '@id': 'https://conversionliftlab.com/#website' },
              about: { '@id': 'https://conversionliftlab.com/#organization' },
              primaryImageOfPage: `https://conversionliftlab.com${cs.image}.webp`,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://conversionliftlab.com/' },
                { '@type': 'ListItem', position: 2, name: 'Case Studies', item: 'https://conversionliftlab.com/case-studies' },
                { '@type': 'ListItem', position: 3, name: cs.title, item: url },
              ],
            },
          ],
        })}</script>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className={`text-sm mb-6 ${muted}`}>
          <a href="/" className="hover:text-indigo-500">Home</a> <span aria-hidden="true">/</span>{' '}
          <a href="/case-studies" className="hover:text-indigo-500">Case Studies</a> <span aria-hidden="true">/</span>{' '}
          <span className={heading}>{cs.short}</span>
        </nav>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/30 mb-4">{cs.type} · {cs.industry}</span>
          <h1 className={`text-3xl sm:text-5xl font-bold mb-4 leading-tight ${heading}`}>{cs.title}</h1>
          <p className={`text-lg max-w-3xl ${muted}`}>{cs.summary}</p>
        </motion.div>

        <div className="glass rounded-3xl p-3 sm:p-4 mb-8">
          <img
            src={`${cs.image}.webp`}
            alt={`${cs.title} landing page design`}
            width="1600"
            height="1200"
            fetchPriority="high"
            className="w-full h-auto rounded-2xl"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2 glass rounded-2xl p-6 sm:p-8 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
              <TrendingUp size={26} className="text-white" />
            </div>
            <div>
              <div className={`text-xs uppercase tracking-widest mb-1 ${muted}`}>Reported result</div>
              <div className="text-3xl sm:text-4xl font-black text-gradient">{cs.result}</div>
            </div>
          </div>
          <dl className="glass rounded-2xl p-6 text-sm space-y-2.5">
            {snapshot.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className={muted}>{k}</dt>
                <dd className={`text-right font-medium ${heading}`}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-6">
          {cs.goal && <Block icon={Target} title="The goal" isDark={isDark} heading={heading}><p className={`leading-relaxed ${body}`}>{cs.goal}</p></Block>}
          {cs.challenge && <Block icon={Lightbulb} title="The challenge" isDark={isDark} heading={heading}><p className={`leading-relaxed ${body}`}>{cs.challenge}</p></Block>}
          <Block icon={Hammer} title="What I built" isDark={isDark} heading={heading}><List items={cs.built} body={body} /></Block>
          <Block icon={Lightbulb} title="Design and conversion approach" isDark={isDark} heading={heading}><List items={cs.approach} body={body} /></Block>

          {cs.clientQuote && (
            <blockquote className="glass rounded-2xl p-6 sm:p-8 border-l-4 border-indigo-500">
              <p className={`text-lg leading-relaxed mb-3 ${body}`}>&ldquo;{cs.clientQuote.text}&rdquo;</p>
              <cite className={`text-sm not-italic ${muted}`}>{cs.clientQuote.by}</cite>
            </blockquote>
          )}

          {(cs.liveUrl || cs.figmaUrl) && (
            <div className="flex flex-wrap gap-4">
              {cs.liveUrl && <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-indigo-500 font-medium">View the live page <ExternalLink size={14} /></a>}
              {cs.figmaUrl && <a href={cs.figmaUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-indigo-500 font-medium">View the design file <ExternalLink size={14} /></a>}
            </div>
          )}
        </div>

        <p className={`text-xs mt-6 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          The result above is the figure reported for this project. Results depend on the offer, traffic and market, so yours may differ.
        </p>

        <div className="glass rounded-3xl p-8 sm:p-10 text-center mt-10">
          <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${heading}`}>Need a page like this?</h2>
          <p className={`mb-6 max-w-lg mx-auto ${muted}`}>
            I design and build {cs.type === 'Advertorial' ? 'advertorials' : cs.type === 'SaaS' ? 'SaaS landing pages' : 'landing pages and funnels'} with conversion in mind. Start with a free teardown of your current page.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contact" className="btn-primary inline-flex justify-center">Get a free landing page teardown <ArrowRight size={16} /></a>
            <a href="/services" className="btn-secondary inline-flex justify-center">See my services</a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <a href={`/case-studies/${prev.slug}`} className="glass rounded-xl p-4 block hover:border-indigo-500/40">
            <span className={`flex items-center gap-1 text-xs mb-1 ${muted}`}><ArrowLeft size={13} /> Previous</span>
            <span className={`text-sm font-medium ${heading}`}>{prev.short}</span>
          </a>
          <a href={`/case-studies/${next.slug}`} className="glass rounded-xl p-4 block text-right hover:border-indigo-500/40">
            <span className={`flex items-center justify-end gap-1 text-xs mb-1 ${muted}`}>Next <ArrowRight size={13} /></span>
            <span className={`text-sm font-medium ${heading}`}>{next.short}</span>
          </a>
        </div>
      </div>
    </main>
  );
}
