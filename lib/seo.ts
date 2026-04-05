import type { Metadata } from 'next';
import { SiteConfig } from '@/lib/types';

export function buildMetadata(config: SiteConfig): Metadata {
  const title = config.seo?.title || config.brand.name;
  const description = config.seo?.description || config.hero.subheadline;
  const canonical = config.seo?.canonical || '/';

  return {
    title,
    description,
    keywords: config.seo?.keywords || [],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: config.brand.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
