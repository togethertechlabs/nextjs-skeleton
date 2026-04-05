import type { MetadataRoute } from 'next';
import siteConfig from '@/site-config.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const canonical = siteConfig.seo?.canonical || 'https://example.com';
  return [
    {
      url: canonical,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
