import type { ReactNode } from "react";
import { AboutSection } from "@/components/sections/about-section";
import { CoverageSection } from "@/components/sections/coverage-section";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TrustBarSection } from "@/components/sections/trust-bar-section";
import { type SectionName, siteConfig } from "@/lib/site-config";

const sections: Record<SectionName, ReactNode> = {
  hero: <HeroSection />,
  trustBar: <TrustBarSection />,
  services: <ServicesSection />,
  about: <AboutSection />,
  coverage: <CoverageSection />,
  testimonials: <TestimonialsSection />,
  faq: <FaqSection />,
  cta: <CtaSection />
};

export function HomeSections() {
  return <>{siteConfig.layout.sectionOrder.map((section) => <div key={section}>{sections[section]}</div>)}</>;
}
