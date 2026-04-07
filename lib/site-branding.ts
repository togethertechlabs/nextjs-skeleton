import { resolveIndustryBranding } from "./industry-branding";

type SiteData = {
  brand?: Record<string, any>;
  intent?: Record<string, any>;
  layout?: Record<string, any>;
  images?: Record<string, any>;
};

export function resolveSiteBranding(siteData: SiteData) {
  const brand = siteData.brand || {};
  const intent = siteData.intent || {};
  const layout = siteData.layout || {};
  const images = siteData.images || {};

  const resolved = resolveIndustryBranding({
    industry: brand.industry || "",
    subIndustry: brand.subIndustry || "",
    location: brand.location || "",
    pricePosition: brand.pricePosition || "mid-market",
    targetCustomer: brand.targetCustomer || [],
    tone: brand.tone || [],
    visualStyle: brand.visualStyle || [],
    heroEnergy: brand.heroEnergy || "medium",
    ctaStyle: brand.ctaStyle || "consultative",
    businessIntent: intent.businessIntent || "lead-gen",
    conversionStyle: intent.conversionStyle || "consultative",
    serviceUrgency: intent.serviceUrgency || "medium",
    premiumMode: intent.premiumMode ?? true,
    layout,
    images
  });

  return {
    ...resolved,
    businessIntent: intent.businessIntent || "lead-gen",
    conversionStyle: intent.conversionStyle || "consultative",
    serviceUrgency: intent.serviceUrgency || "medium",
    premiumMode: intent.premiumMode ?? true,

    pricePosition: brand.pricePosition || "mid-market",
    targetCustomer: brand.targetCustomer || [],
    subIndustry: brand.subIndustry || "",
    brandTone: brand.tone || [],
    visualStyle: brand.visualStyle || [],
    heroEnergy: brand.heroEnergy || resolved.heroEnergy,
    ctaStyle: brand.ctaStyle || resolved.ctaStyle
  };
}