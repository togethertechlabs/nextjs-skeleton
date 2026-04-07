import type { CSSProperties, PropsWithChildren } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getInteriorContentOffsetClass, resolvePageCompatibility, type PageKind } from "@/lib/layout-compat";
import { siteBranding } from "@/lib/site-branding";
import { siteConfig } from "@/lib/site-config";

export function PageShell({
  children,
  pageKind = "interior"
}: PropsWithChildren<{ pageKind?: PageKind }>) {
  const compatibilityPlan = resolvePageCompatibility({
    pageKind,
    headerVariant: siteConfig.layout.headerVariant,
    heroVariant: siteConfig.layout.heroVariant
  });

  const contentOffsetClass = pageKind === "interior"
    ? getInteriorContentOffsetClass(compatibilityPlan)
    : "";

  return (
    <div
      className={`min-h-screen ${siteBranding.shellClassName}`}
      style={siteBranding.cssVars as CSSProperties}
      data-industry={siteBranding.key}
      data-visual-mode={siteBranding.visualMode}
      data-accent-style={siteBranding.accentStyle}
      data-hero-composition={siteBranding.heroComposition}
      data-premium-mode={siteBranding.premiumMode ? "true" : "false"}
    >
      <SiteHeader
        brand={siteConfig.brand}
        variant={siteConfig.layout.headerVariant}
        compatibility={compatibilityPlan.header}
        branding={siteBranding}
      />
      <div className={contentOffsetClass}>{children}</div>
      <SiteFooter />
    </div>
  );
}
