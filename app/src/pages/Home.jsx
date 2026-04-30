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
        <title>ConversionLiftLab | CRO Landing Page & Funnel Expert — Rahim Badsha</title>
        <meta name="description" content="Top Rated Upwork freelancer (100% JSS, $200K+) specializing in CRO landing pages, sales funnels & AI-powered lead automation. 950+ pages built. Get a free CRO audit." />
        <link rel="canonical" href="https://conversionliftlab.com/" />
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
