import type { PropsWithChildren } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { resolveHeaderCompatibility } from "@/lib/layout-compat";
import { siteConfig } from "@/lib/site-config";

export function PageShell({
  children,
  pageKind = "interior"
}: PropsWithChildren<{ pageKind?: "home" | "interior" }>) {
  const headerCompatibility = resolveHeaderCompatibility({
    isHomePage: pageKind === "home",
    headerVariant: siteConfig.layout.headerVariant,
    heroVariant: siteConfig.layout.heroVariant
  });

  return (
    <>
      <SiteHeader
        brand={siteConfig.brand}
        variant={siteConfig.layout.headerVariant}
        compatibility={headerCompatibility}
      />
      {children}
      <SiteFooter />
    </>
  );
}
