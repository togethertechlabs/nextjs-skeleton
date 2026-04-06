import type { ReactNode } from "react";
import { AboutSection } from "@/components/sections/about-section";
import { CoverageSection } from "@/components/sections/coverage-section";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TrustBarSection } from "@/components/sections/trust-bar-section";
import {
  getAboutSectionMetadata,
  getCoverageSectionMetadata,
  getCtaSectionMetadata,
  getFaqSectionMetadata,
  getHeroMetadata,
  getSectionTransitionClass,
  getServicesSectionMetadata,
  getTestimonialsCompatibility,
  getTestimonialsSectionMetadata,
  getTrustBarSectionMetadata,
  type SectionMetadata
} from "@/lib/layout-compat";
import { type SectionName, siteConfig } from "@/lib/site-config";

type PlannedSection = {
  key: SectionName;
  node: ReactNode;
  metadata: SectionMetadata;
  wrapperClassName?: string;
};

function planSections(): PlannedSection[] {
  const planned: PlannedSection[] = [];
  let previousMetadata: SectionMetadata | null = null;

  for (const section of siteConfig.layout.sectionOrder) {
    let metadata: SectionMetadata;
    let node: ReactNode;
    let wrapperClassName = "";

    switch (section) {
      case "hero":
        metadata = {
          tone: getHeroMetadata(siteConfig.layout.heroVariant).tone,
          density: "balanced"
        };
        node = <HeroSection />;
        break;
      case "trustBar":
        metadata = getTrustBarSectionMetadata();
        node = <TrustBarSection />;
        break;
      case "services":
        metadata = getServicesSectionMetadata(siteConfig.layout.servicesVariant);
        node = <ServicesSection />;
        break;
      case "about":
        metadata = getAboutSectionMetadata(siteConfig.layout.aboutVariant);
        node = <AboutSection />;
        break;
      case "coverage":
        metadata = getCoverageSectionMetadata(siteConfig.layout.coverageVariant);
        node = <CoverageSection />;
        break;
      case "faq":
        metadata = getFaqSectionMetadata(siteConfig.layout.faqVariant);
        node = <FaqSection />;
        break;
      case "cta":
        metadata = getCtaSectionMetadata(siteConfig.layout.ctaVariant);
        node = <CtaSection />;
        break;
      case "testimonials": {
        const compatibility = getTestimonialsCompatibility(previousMetadata, siteConfig.layout.testimonialsVariant);
        metadata = getTestimonialsSectionMetadata(compatibility.variant);
        node = (
          <TestimonialsSection
            variantOverride={compatibility.variant}
            spacingClassName={compatibility.spacingClassName}
          />
        );
        break;
      }
      default:
        continue;
    }

    wrapperClassName = `${wrapperClassName} ${getSectionTransitionClass(previousMetadata, metadata)}`.trim();
    planned.push({ key: section, node, metadata, wrapperClassName });
    previousMetadata = metadata;
  }

  return planned;
}

export function HomeSections() {
  return (
    <>
      {planSections().map((section) => (
        <div key={section.key} className={section.wrapperClassName}>
          {section.node}
        </div>
      ))}
    </>
  );
}
