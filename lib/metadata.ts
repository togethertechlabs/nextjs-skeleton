import type { Metadata } from "next";
import { getCanonical, getImagePath, siteConfig } from "@/lib/site-config";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
};

export function buildPageMetadata({ title, description, path }: MetadataInput = {}): Metadata {
  const resolvedTitle = title || siteConfig.seo.title;
  const resolvedDescription = description || siteConfig.seo.description;
  const canonical = getCanonical(path);
  const socialImage = getImagePath("hero");

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: siteConfig.seo.keywords,
    alternates: {
      canonical
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      siteName: siteConfig.brand.name,
      type: "website",
      images: socialImage ? [{ url: socialImage, alt: siteConfig.brand.name }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: socialImage ? [socialImage] : undefined
    }
  };
}
