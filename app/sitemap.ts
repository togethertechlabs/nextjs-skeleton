import type { MetadataRoute } from "next";
import { getAreaSlug, getCanonical, siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = ["", "/about", "/contact", "/services", "/coverage"].map((pathname) => ({
    url: getCanonical(pathname),
    lastModified
  }));

  const serviceRoutes = siteConfig.services.map((service) => ({
    url: getCanonical(`/services/${service.slug}`),
    lastModified
  }));

  const areaRoutes = siteConfig.coverage.areas.map((area) => ({
    url: getCanonical(`/areas/${getAreaSlug(area)}`),
    lastModified
  }));

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes];
}
