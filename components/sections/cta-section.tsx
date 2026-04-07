import { Container, PrimaryButton, SecondaryButton, SectionHeading } from "@/components/ui";
import { resolveModuleSpacing, type ResolvedModuleSpacing } from "@/lib/module-spacing";
import { siteBranding } from "@/lib/site-branding";
import { siteConfig } from "@/lib/site-config";

function getDefaultCtaSpacing() {
  return resolveModuleSpacing({
    current: "cta",
    designDominance: siteBranding.designDominance,
    premiumMode: siteBranding.premiumMode,
    contentDensity: siteBranding.contentDensity
  });
}

function CtaA({ spacing }: { spacing: ResolvedModuleSpacing }) {
  return (
    <section className={`module-section ${spacing.wrapperClass} bg-white`}>
      <Container>
        <div className={`industry-cta-panel premium-cta ${spacing.cardClass} module-card-pad rounded-[2.5rem] bg-gradient-to-r from-slate-800 to-slate-300 text-white shadow-glow ${siteBranding.heroPanelClassName}`}>
          <SectionHeading
            eyebrow={siteConfig.cta.eyebrow}
            title={siteConfig.cta.heading}
            description={siteConfig.cta.body}
            invert
          />
          <div className={`${spacing.leadClass} flex flex-wrap gap-4`}>
            <PrimaryButton href="/contact">{siteConfig.cta.button}</PrimaryButton>
            <SecondaryButton href="/services">See services</SecondaryButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CtaB({ spacing }: { spacing: ResolvedModuleSpacing }) {
  return (
    <section className={`module-section ${spacing.wrapperClass} bg-panel`}>
      <Container className={`industry-cta-panel premium-cta ${spacing.cardClass} module-card-pad module-grid ${spacing.gridClass} grid rounded-[2.5rem] border border-line bg-shell text-white shadow-glow lg:grid-cols-[0.7fr_0.3fr] lg:items-center ${siteBranding.heroPanelClassName}`}>
        <div className="module-stack module-inner-normal">
          <p className="industry-eyebrow text-sm uppercase tracking-[0.35em] text-accent">{siteConfig.cta.eyebrow}</p>
          <h2 className="industry-heading text-5xl font-black tracking-tight">{siteConfig.cta.heading}</h2>
          <p className="max-w-2xl text-xl leading-8 text-white/75">{siteConfig.cta.body}</p>
        </div>
        <div className="flex justify-start lg:justify-end">
          <PrimaryButton href="/contact">{siteConfig.cta.button}</PrimaryButton>
        </div>
      </Container>
    </section>
  );
}

function CtaC({ spacing }: { spacing: ResolvedModuleSpacing }) {
  return (
    <section className={`module-section ${spacing.wrapperClass} bg-panel`}>
      <Container>
        <div className={`industry-cta-panel premium-cta ${spacing.cardClass} module-card-pad module-grid ${spacing.gridClass} grid rounded-[2.5rem] border border-line bg-white shadow-soft lg:grid-cols-[0.55fr_0.45fr] lg:items-center`}>
          <div className="module-stack module-inner-normal">
            <p className="industry-eyebrow text-sm uppercase tracking-[0.35em] text-accent">{siteConfig.cta.eyebrow}</p>
            <h2 className="industry-heading text-5xl font-black tracking-tight text-ink">{siteConfig.cta.heading}</h2>
            <p className="max-w-2xl text-xl leading-8 text-muted">{siteConfig.cta.body}</p>
          </div>
          <div className={`module-stack module-inner-tight ${spacing.cardClass} module-card-pad rounded-[2rem] bg-shell text-white shadow-glow ${siteBranding.heroPanelClassName}`}>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Call</p>
            <p className="text-3xl font-black">{siteConfig.brand.phone}</p>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Email</p>
            <p className="text-xl font-semibold">{siteConfig.brand.email}</p>
            <div>
              <PrimaryButton href="/contact">{siteConfig.cta.button}</PrimaryButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function CtaSection({ spacing = getDefaultCtaSpacing() }: { spacing?: ResolvedModuleSpacing }) {
  switch (siteConfig.layout.ctaVariant) {
    case "cta-b":
      return <CtaB spacing={spacing} />;
    case "cta-c":
      return <CtaC spacing={spacing} />;
    default:
      return <CtaA spacing={spacing} />;
  }
}
