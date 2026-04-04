export type Service = {
  title: string;
  description: string;
};

export type SiteConfig = {
  siteName: string;
  location: string;
  industry: string;
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  services: Service[];
  cta: {
    text: string;
  };
};
