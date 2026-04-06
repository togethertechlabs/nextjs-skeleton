import type { PropsWithChildren } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getInteriorContentOffsetClass, resolvePageCompatibility, type PageKind } from "@/lib/layout-compat";
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
    <>
      <SiteHeader
        brand={siteConfig.brand}
        variant={siteConfig.layout.headerVariant}
        compatibility={compatibilityPlan.header}
      />
      <div className={contentOffsetClass}>{children}</div>
      <SiteFooter />
    </>
  );
}
