import type { MetadataRoute } from 'next';
import siteConfig from '@/site-config.json';

export default function robots(): MetadataRoute.Robots {
  const canonical = siteConfig.seo?.canonical || 'https://example.com';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${canonical}/sitemap.xml`,
  };
}
