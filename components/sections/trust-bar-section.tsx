import { Container, DarkCard } from "@/components/ui";
import { resolveModuleSpacing, type ResolvedModuleSpacing } from "@/lib/module-spacing";
import { resolveModuleStyling, type ResolvedModuleStyling } from "@/lib/module-styling";
import { siteBranding } from "@/lib/site-branding";
import { siteConfig } from "@/lib/site-config";

function getDefaultTrustSpacing() {
  return resolveModuleSpacing({
    current: "trustBar",
    designDominance: siteBranding.designDominance,
    premiumMode: siteBranding.premiumMode,
    contentDensity: siteBranding.contentDensity
  });
}

function getDefaultTrustStyling() {
  return resolveModuleStyling({
    current: "trustBar",
    branding: siteBranding
  });
}

export function TrustBarSection({
  spacing = getDefaultTrustSpacing(),
  styling = getDefaultTrustStyling()
}: {
  spacing?: ResolvedModuleSpacing;
  styling?: ResolvedModuleStyling;
}) {
  return (
    <section className={`module-section ${spacing.wrapperClass} ${styling.sectionClass}`}>
      <Container>
        <DarkCard className={`industry-trust-grid ${styling.panelClass} ${spacing.cardClass} module-card-pad module-grid ${spacing.gridClass} grid md:grid-cols-2 lg:grid-cols-4`}>
          {siteConfig.trustBar.map((item) => (
            <div key={item.label} className={`industry-chip ${styling.badgeClass} ${spacing.cardClass} module-card-pad rounded-3xl border`}>
              <div className={`industry-heading ${styling.accentClass} text-2xl font-black`}>{item.label}</div>
              <p className={`${styling.bodyClass} mt-2.5`}>{item.subtext}</p>
            </div>
          ))}
        </DarkCard>
      </Container>
    </section>
  );
}
