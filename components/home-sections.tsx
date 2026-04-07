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
  getHeroPaddingClass,
  getHeroSectionMetadata,
  getSectionTransitionClass,
  getServicesSectionMetadata,
  getTestimonialsCompatibility,
  getTestimonialsSectionMetadata,
  resolvePageCompatibility,
  getTrustBarSectionMetadata,
  type SectionMetadata
} from "@/lib/layout-compat";
import { getIndustrySectionWrapperClass } from "@/lib/industry-branding";
import { resolveModuleSpacing } from "@/lib/module-spacing";
import { resolveModuleStyling } from "@/lib/module-styling";
import { siteBranding } from "@/lib/site-branding";
import { type SectionName, siteConfig } from "@/lib/site-config";

type PlannedSection = {
  key: SectionName;
  node: ReactNode;
  metadata: SectionMetadata;
  wrapperClassName?: string;
};

function getSectionPlan(
  section: SectionName,
  previousMetadata: SectionMetadata | null,
  heroTopPaddingClass: string,
  previousSection: SectionName | null,
  nextSection: SectionName | null
): PlannedSection | null {
  const spacing = resolveModuleSpacing({
    current: section,
    previous: previousSection,
    next: nextSection,
    designDominance: siteBranding.designDominance,
    premiumMode: siteBranding.premiumMode,
    contentDensity: siteBranding.contentDensity
  });
  const styling = resolveModuleStyling({
    current: section,
    previous: previousSection,
    next: nextSection,
    branding: siteBranding
  });
  let metadata: SectionMetadata;
  let node: ReactNode;

  switch (section) {
    case "hero":
      metadata = getHeroSectionMetadata(siteConfig.layout.heroVariant);
      node = <HeroSection spacing={spacing} styling={styling} topPaddingClass={heroTopPaddingClass} />;
      break;
    case "trustBar":
      metadata = getTrustBarSectionMetadata();
      node = <TrustBarSection spacing={spacing} styling={styling} />;
      break;
    case "services":
      metadata = getServicesSectionMetadata(siteConfig.layout.servicesVariant);
      node = <ServicesSection spacing={spacing} styling={styling} />;
      break;
    case "about":
      metadata = getAboutSectionMetadata(siteConfig.layout.aboutVariant);
      node = <AboutSection spacing={spacing} styling={styling} />;
      break;
    case "coverage":
      metadata = getCoverageSectionMetadata(siteConfig.layout.coverageVariant);
      node = <CoverageSection spacing={spacing} styling={styling} />;
      break;
    case "faq":
      metadata = getFaqSectionMetadata(siteConfig.layout.faqVariant);
      node = <FaqSection spacing={spacing} styling={styling} />;
      break;
    case "cta":
      metadata = getCtaSectionMetadata(siteConfig.layout.ctaVariant);
      node = <CtaSection spacing={spacing} styling={styling} />;
      break;
    case "testimonials": {
      const compatibility = getTestimonialsCompatibility(previousMetadata, siteConfig.layout.testimonialsVariant);
      metadata = getTestimonialsSectionMetadata(compatibility.variant);
      node = (
        <TestimonialsSection
          spacing={spacing}
          styling={styling}
          variantOverride={compatibility.variant}
          spacingClassName={compatibility.spacingClassName}
        />
      );
      break;
    }
    default:
      return null;
  }

  return {
    key: section,
    node,
    metadata,
    wrapperClassName: [
      getSectionTransitionClass(previousMetadata, metadata),
      getIndustrySectionWrapperClass(siteBranding, section)
    ].filter(Boolean).join(" ")
  };
}

function planSections(): PlannedSection[] {
  const planned: PlannedSection[] = [];
  let previousMetadata: SectionMetadata | null = null;
  const pageCompatibility = resolvePageCompatibility({
    pageKind: "home",
    headerVariant: siteConfig.layout.headerVariant,
    heroVariant: siteConfig.layout.heroVariant
  });
  const heroTopPaddingClass = getHeroPaddingClass(pageCompatibility);

  const orderedSections = getResolvedSectionOrder();

  for (const [index, section] of orderedSections.entries()) {
    const plannedSection = getSectionPlan(
      section,
      previousMetadata,
      heroTopPaddingClass,
      orderedSections[index - 1] ?? null,
      orderedSections[index + 1] ?? null
    );

    if (!plannedSection) continue;

    planned.push(plannedSection);
    previousMetadata = plannedSection.metadata;
  }

  return planned;
}

function getResolvedSectionOrder() {
  const uniqueSections = Array.from(new Set(siteConfig.layout.sectionOrder));

  if (!siteBranding.premiumMode) {
    return uniqueSections;
  }

  const dominancePriorityMap: Record<typeof siteBranding.designDominance, SectionName[]> = {
    hero: ["hero", "services"],
    services: ["services", "trustBar"],
    cta: ["services", "trustBar"],
    trust: ["trustBar", "testimonials"],
    balanced: ["trustBar", "services"]
  };
  const prioritySections = dominancePriorityMap[siteBranding.designDominance];
  const withoutHero = uniqueSections.filter((section) => section !== "hero" && section !== "cta");
  const prioritized = withoutHero.filter((section) => prioritySections.includes(section));
  const remainder = withoutHero.filter((section) => !prioritySections.includes(section));
  const filtered = [
    "hero" as const,
    ...prioritized,
    ...(siteBranding.designDominance === "cta" ? ["cta" as const] : []),
    ...remainder,
    ...(siteBranding.designDominance === "cta" ? [] : ["cta" as const])
  ].filter((section, index, items) => items.indexOf(section) === index);

  return filtered.filter((section) => {
    if (section === "faq" && siteConfig.faq.items.length < 3) return false;
    if (section === "testimonials" && siteConfig.testimonials.items.length < 2) return false;
    return true;
  });
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
