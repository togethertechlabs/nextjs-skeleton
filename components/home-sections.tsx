import { AboutSection } from '@/components/about-section';
import { CoverageSection } from '@/components/coverage-section';
import { CtaBanner } from '@/components/cta-banner';
import { FaqSection } from '@/components/faq-section';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { TrustBar } from '@/components/trust-bar';
import { siteConfig } from '@/lib/site-config';

const sections = {
  hero: <HeroSection />,
  trustBar: <TrustBar />,
  services: <ServicesSection />,
  about: <AboutSection />,
  coverage: <CoverageSection />,
  testimonials: <TestimonialsSection />,
  faq: <FaqSection />,
  cta: <CtaBanner />
} as const;

export function HomeSections() {
  return <>{siteConfig.layout.sectionOrder.map((key) => <div key={key}>{sections[key]}</div>)}</>;
}
