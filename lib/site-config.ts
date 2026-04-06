import rawSiteConfig from "@/site-config.json";

export type ThemeName =
  | "trade-blue"
  | "industrial-dark"
  | "slate-premium"
  | "electric-amber"
  | "graphite-red"
  | "construction-orange"
  | "stone-premium"
  | "clean-light";

export type SectionName =
  | "hero"
  | "trustBar"
  | "services"
  | "about"
  | "coverage"
  | "testimonials"
  | "faq"
  | "cta";

export type ServiceItem = {
  slug: string;
  title: string;
  short?: string;
  description: string;
  bullets?: string[];
  cta?: string;
};

export type CoverageArea =
  | string
  | {
      slug?: string;
      name: string;
      summary?: string;
      intro?: string;
    };

export type SiteConfig = {
  brand: {
    name: string;
    legalName?: string;
    industry: string;
    location: string;
    phone: string;
    email: string;
    tagline?: string;
    eyebrow?: string;
    badge?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonical: string;
  };
  layout: {
    theme: ThemeName;
    headerVariant?: string;
    heroVariant?: string;
    servicesVariant?: string;
    aboutVariant?: string;
    coverageVariant?: string;
    testimonialsVariant?: string;
    faqVariant?: string;
    ctaVariant?: string;
    footerVariant?: string;
    sectionOrder: SectionName[];
  };
  images: {
    folder?: string;
    hero: string;
    about?: string;
    services: string[];
  };
  trustBar: Array<{
    label: string;
    subtext?: string;
  }>;
  hero: {
    eyebrow?: string;
    badge?: string;
    headline: string;
    highlight?: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  servicesIntro?: {
    eyebrow?: string;
    heading: string;
    body: string;
  };
  services: ServiceItem[];
  about: {
    eyebrow?: string;
    heading: string;
    body: string;
    highlights?: string[];
    cardEyebrow?: string;
    cardTitle?: string;
    cardBody?: string;
  };
  coverage: {
    eyebrow?: string;
    heading: string;
    body: string;
    areas: CoverageArea[];
  };
  testimonials: {
    eyebrow?: string;
    heading: string;
    body: string;
    items: Array<{
      name: string;
      quote: string;
    }>;
  };
  faq: {
    eyebrow?: string;
    heading: string;
    body: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    eyebrow?: string;
    heading: string;
    body: string;
    button: string;
  };
  footer: {
    microcopy?: string;
    copyright: string;
  };
};

export const siteConfig = rawSiteConfig as SiteConfig;

export function toSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function getServiceBySlug(slug: string) {
  return siteConfig.services.find((service) => service.slug === slug);
}

export function getAreaSlug(area: CoverageArea) {
  if (typeof area === "string") return toSlug(area);
  return area.slug || toSlug(area.name);
}

export function getAreaName(area: CoverageArea) {
  return typeof area === "string" ? area : area.name;
}

export function getAreaSummary(area: CoverageArea) {
  if (typeof area === "string") return `${siteConfig.brand.name} provides trusted services in ${area}.`;
  return area.summary || `${siteConfig.brand.name} provides trusted services in ${area.name}.`;
}

export function getAreaIntro(area: CoverageArea) {
  if (typeof area === "string") {
    return `${siteConfig.brand.name} supports customers across ${area} with reliable service, strong presentation and local expertise.`;
  }
  return area.intro || `${siteConfig.brand.name} supports customers across ${area.name} with reliable service, strong presentation and local expertise.`;
}

export function getAreaBySlug(slug: string) {
  return siteConfig.coverage.areas.find((area) => getAreaSlug(area) === slug);
}

export function getCanonical(path = "") {
  const base = siteConfig.seo.canonical.replace(/\/$/, "");
  return path ? `${base}/${path.replace(/^\//, "")}` : base;
}

export function getThemeClass(theme: ThemeName) {
  return `theme-${theme}`;
}
