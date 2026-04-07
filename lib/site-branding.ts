import "server-only";
import { resolveIndustryBranding } from "@/lib/industry-branding";
import { siteConfig, type SiteConfig } from "@/lib/site-config";

type SiteBrandingInput = Pick<SiteConfig, "brand" | "intent" | "layout" | "images">;

export function resolveSiteBranding(siteData: SiteBrandingInput) {
  return resolveIndustryBranding({
    industry: siteData.brand.industry,
    subIndustry: siteData.brand.subIndustry,
    folder: siteData.images.folder,
    theme: siteData.layout.theme,
    premiumMode: siteData.intent.premiumMode,
    businessIntent: siteData.intent.businessIntent,
    conversionStyle: siteData.intent.conversionStyle,
    serviceUrgency: siteData.intent.serviceUrgency,
    pricePosition: siteData.brand.pricePosition,
    targetCustomer: siteData.brand.targetCustomer,
    tone: siteData.brand.tone,
    visualStyle: siteData.brand.visualStyle,
    brandHeroEnergy: siteData.brand.heroEnergy,
    brandCtaStyle: siteData.brand.ctaStyle,
    seedSource: [
      siteData.brand.name,
      siteData.brand.subIndustry,
      siteData.brand.location,
      siteData.brand.phone,
      siteData.brand.pricePosition,
      siteData.intent.businessIntent,
      siteData.intent.conversionStyle,
      siteData.intent.serviceUrgency,
      siteData.layout.theme,
      siteData.layout.heroVariant,
      siteData.layout.servicesVariant
    ].join("|")
  });
}

export const siteBranding = resolveSiteBranding(siteConfig);
