import "server-only";
import { resolveIndustryBranding } from "@/lib/industry-branding";
import { siteConfig } from "@/lib/site-config";

export const siteBranding = resolveIndustryBranding({
  industry: siteConfig.brand.industry,
  subIndustry: siteConfig.brand.subIndustry,
  folder: siteConfig.images.folder,
  theme: siteConfig.layout.theme,
  premiumMode: siteConfig.intent.premiumMode,
  businessIntent: siteConfig.intent.businessIntent,
  conversionStyle: siteConfig.intent.conversionStyle,
  serviceUrgency: siteConfig.intent.serviceUrgency,
  pricePosition: siteConfig.brand.pricePosition,
  targetCustomer: siteConfig.brand.targetCustomer,
  tone: siteConfig.brand.tone,
  visualStyle: siteConfig.brand.visualStyle,
  brandHeroEnergy: siteConfig.brand.heroEnergy,
  brandCtaStyle: siteConfig.brand.ctaStyle,
  seedSource: [
    siteConfig.brand.name,
    siteConfig.brand.subIndustry,
    siteConfig.brand.location,
    siteConfig.brand.phone,
    siteConfig.brand.pricePosition,
    siteConfig.intent.businessIntent,
    siteConfig.intent.conversionStyle,
    siteConfig.intent.serviceUrgency,
    siteConfig.layout.theme,
    siteConfig.layout.heroVariant,
    siteConfig.layout.servicesVariant
  ].join("|")
});
