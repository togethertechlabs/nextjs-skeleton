import { Container, DarkCard } from "@/components/ui";
import { resolveModuleSpacing, type ResolvedModuleSpacing } from "@/lib/module-spacing";
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

export function TrustBarSection({ spacing = getDefaultTrustSpacing() }: { spacing?: ResolvedModuleSpacing }) {
  return (
    <section className={`module-section ${spacing.wrapperClass} bg-shell text-white`}>
      <Container>
        <DarkCard className={`industry-trust-grid ${spacing.cardClass} module-card-pad module-grid ${spacing.gridClass} grid md:grid-cols-2 lg:grid-cols-4`}>
          {siteConfig.trustBar.map((item) => (
            <div key={item.label} className={`industry-chip ${spacing.cardClass} module-card-pad rounded-3xl border border-white/10 bg-white/5`}>
              <div className="industry-heading text-2xl font-black text-primary">{item.label}</div>
              <p className="mt-2.5 text-white/65">{item.subtext}</p>
            </div>
          ))}
        </DarkCard>
      </Container>
    </section>
  );
}
