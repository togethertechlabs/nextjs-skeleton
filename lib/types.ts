export type SiteConfig = {
  brand: {
    name: string;
    legalName?: string;
    industry: string;
    location: string;
    tagline: string;
    phone: string;
    email?: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    theme: string;
    logoText?: string;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
  };
  hero: {
    eyebrow: string;
    badge: string;
    headline: string;
    highlight: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    backgroundImage: string;
  };
  trustBar: Array<{ label: string; subtext: string }>;
  services: Array<{ title: string; description: string }>;
  about: {
    heading: string;
    body: string;
    bullets: string[];
  };
  coverage: {
    heading: string;
    areas: string[];
  };
  testimonials: Array<{ name: string; quote: string }>;
  faq: Array<{ question: string; answer: string }>;
  cta: {
    heading: string;
    body: string;
    button: string;
  };
  footer: {
    copyright: string;
    serviceText: string;
  };
};
