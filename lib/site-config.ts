import rawSiteConfig from '@/site-config.json';

export type SiteConfig = typeof rawSiteConfig;
export type ServiceItem = SiteConfig['services'][number];
export type ThemeName = SiteConfig['layout']['theme'];
export type SectionName = SiteConfig['layout']['sectionOrder'][number];

export const siteConfig: SiteConfig = rawSiteConfig;

export function getServiceBySlug(slug: string) {
  return siteConfig.services.find((service) => service.slug === slug);
}

export function getAreaBySlug(slug: string) {
  return siteConfig.coverage.areas.find(
    (area) => area.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
  );
}

export function getCanonical(path = '') {
  const base = siteConfig.seo.canonical.replace(/\/$/, '');
  return path ? `${base}/${path.replace(/^\//, '')}` : base;
}

export function getThemeClass(theme: ThemeName) {
  return `theme-${theme}`;
}
