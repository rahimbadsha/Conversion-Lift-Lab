import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import AboutMe from '../components/sections/AboutMe';
import Services from '../components/sections/Services';
import CaseStudies from '../components/sections/CaseStudies';
import Process from '../components/sections/Process';
import Testimonials from '../components/sections/Testimonials';
import Pricing from '../components/sections/Pricing';
import FAQ from '../components/sections/FAQ';
import CTA from '../components/sections/CTA';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>CRO Landing Pages & Sales Funnels | ConversionLiftLab</title>
        <meta name="description" content="Top Rated Upwork CRO specialist (100% Job Success, $200K+ earned). 1050+ landing pages built on Webflow, ClickFunnels & more. Free CRO audit." />
        <link rel="canonical" href="https://conversionliftlab.com/" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': 'https://conversionliftlab.com/#webpage',
          url: 'https://conversionliftlab.com/',
          name: 'CRO Landing Pages & Sales Funnels | ConversionLiftLab',
          description: 'Top Rated Upwork CRO specialist (100% Job Success, $200K+ earned). 1050+ landing pages built on Webflow, ClickFunnels & more.',
          isPartOf: { '@id': 'https://conversionliftlab.com/#website' },
          about: { '@id': 'https://conversionliftlab.com/#person' },
          primaryImageOfPage: 'https://conversionliftlab.com/images/og-cover.png',
        })}</script>
      </Helmet>
      <Hero />
      <AboutMe />
      <Services />
      <CaseStudies />
      <Process />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
