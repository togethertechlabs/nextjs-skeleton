import type { MetadataRoute } from "next";
import { getAreaSlug, siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.seo.canonical.replace(/\/$/, "");

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/services",
    "/coverage"
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date()
  }));

  const serviceRoutes = siteConfig.services.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: new Date()
  }));

  const areaRoutes = siteConfig.coverage.areas.map((area) => ({
    url: `${base}/areas/${getAreaSlug(area)}`,
    lastModified: new Date()
  }));

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes];
}
