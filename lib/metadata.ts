import type { Metadata } from 'next';
import { getCanonical, siteConfig } from '@/lib/site-config';

export function buildMetadata(title?: string, description?: string, path = ''): Metadata {
  const finalTitle = title || siteConfig.seo.title;
  const finalDescription = description || siteConfig.seo.description;
  const canonical = getCanonical(path);

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: siteConfig.seo.keywords,
    alternates: { canonical },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonical,
      siteName: siteConfig.brand.name,
      images: [siteConfig.images.hero],
      locale: 'en_GB',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [siteConfig.images.hero]
    }
  };
}
