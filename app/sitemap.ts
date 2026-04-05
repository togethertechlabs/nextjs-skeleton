import { MetadataRoute } from 'next';
import { getCanonical, siteConfig } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes = ['', '/services', '/about', '/coverage', '/contact'];
  const areaRoutes = siteConfig.coverage.areas.map((area) => `/areas/${area.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);

  return [...baseRoutes, ...areaRoutes].map((route) => ({
    url: getCanonical(route),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7
  }));
}
