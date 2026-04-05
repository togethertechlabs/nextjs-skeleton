import { SiteConfig } from '@/lib/types';

export function buildLocalBusinessSchema(config: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: config.brand.name,
    telephone: config.brand.phone,
    email: config.brand.email,
    areaServed: config.coverage.areas,
    description: config.seo?.description || config.hero.subheadline,
  };
}
