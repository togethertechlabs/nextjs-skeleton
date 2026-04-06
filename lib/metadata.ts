import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export function buildMetadata(
  title?: string,
  description?: string,
  path?: string
): Metadata {
  const canonical = siteConfig.seo.canonical.replace(/\/$/, "");
  const fullPath = path ? `/${path.replace(/^\//, "")}` : "";
  return {
    title: title || siteConfig.seo.title,
    description: description || siteConfig.seo.description,
    keywords: siteConfig.seo.keywords,
    alternates: {
      canonical: `${canonical}${fullPath}`
    }
  };
}
