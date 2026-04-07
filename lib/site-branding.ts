import "server-only";
import { resolveIndustryBranding } from "@/lib/industry-branding";
import { siteConfig } from "@/lib/site-config";

export const siteBranding = resolveIndustryBranding({
  industry: siteConfig.brand.industry,
  folder: siteConfig.images.folder,
  theme: siteConfig.layout.theme,
  seedSource: [
    siteConfig.brand.name,
    siteConfig.brand.location,
    siteConfig.brand.phone,
    siteConfig.layout.theme,
    siteConfig.layout.heroVariant,
    siteConfig.layout.servicesVariant
  ].join("|")
});
