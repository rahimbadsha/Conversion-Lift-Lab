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
