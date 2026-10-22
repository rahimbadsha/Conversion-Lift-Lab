import { Helmet } from 'react-helmet-async';
import { useTheme } from '../context/ThemeContext';

// Shared layout for the Privacy Policy and Terms pages.
export default function LegalPage({ title, path, description, updated, intro, sections }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const heading = isDark ? 'text-white' : 'text-slate-900';
  const body = isDark ? 'text-slate-300' : 'text-slate-700';

  return (
    <main className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-[#050816]' : 'bg-slate-50'}`}>
      <Helmet>
        <title>{`${title} | ConversionLiftLab`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://conversionliftlab.com${path}`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `https://conversionliftlab.com${path}#webpage`,
          url: `https://conversionliftlab.com${path}`,
          name: title,
          isPartOf: { '@id': 'https://conversionliftlab.com/#website' },
        })}</script>
      </Helmet>

      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${heading}`}>{title}</h1>
        <p className={`text-sm mb-8 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Last updated: {updated}</p>

        {intro.map(p => (
          <p key={p} className={`leading-relaxed mb-4 ${body}`}>{p}</p>
        ))}

        <nav aria-label="Contents" className="glass rounded-2xl p-5 my-8">
          <p className={`text-sm font-medium mb-2 ${heading}`}>On this page</p>
          <ol className={`list-decimal pl-5 text-sm space-y-1 ${body}`}>
            {sections.map((s, i) => (
              <li key={s.h}><a href={`#s${i + 1}`} className="text-indigo-500 hover:text-indigo-400">{s.h}</a></li>
            ))}
          </ol>
        </nav>

        {sections.map((s, i) => (
          <section key={s.h} id={`s${i + 1}`} className="mb-8 scroll-mt-24">
            <h2 className={`text-xl font-semibold mb-3 ${heading}`}>{i + 1}. {s.h}</h2>
            {(s.p || []).map(p => (
              <p key={p} className={`leading-relaxed mb-3 ${body}`}>{p}</p>
            ))}
            {s.list && (
              <ul className={`list-disc pl-5 space-y-2 mb-3 ${body}`}>
                {s.list.map(li => <li key={li} className="leading-relaxed">{li}</li>)}
              </ul>
            )}
          </section>
        ))}
      </article>
    </main>
  );
}
