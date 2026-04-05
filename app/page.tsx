import TopBar from '@/components/layout/TopBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import TrustBar from '@/components/sections/TrustBar';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import CoverageSection from '@/components/sections/CoverageSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { getSiteConfig } from '@/lib/site-config';

export default async function HomePage() {
  const config = await getSiteConfig();

  return (
    <main className="bg-white text-slate-900">
      <TopBar config={config} />
      <Navbar config={config} />
      <HeroSection config={config} />
      <TrustBar config={config} />
      <ServicesSection config={config} />
      <AboutSection config={config} />
      <CoverageSection config={config} />
      <TestimonialsSection config={config} />
      <FAQSection config={config} />
      <CTASection config={config} />
      <Footer config={config} />
    </main>
  );
}
