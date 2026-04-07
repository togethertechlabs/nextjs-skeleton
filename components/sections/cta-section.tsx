import { Container, PrimaryButton, SecondaryButton, SectionHeading } from "@/components/ui";
import { resolveModuleSpacing, type ResolvedModuleSpacing } from "@/lib/module-spacing";
import { resolveModuleStyling, type ResolvedModuleStyling } from "@/lib/module-styling";
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

function getDefaultCtaStyling() {
  return resolveModuleStyling({
    current: "cta",
    branding: siteBranding
  });
}

function CtaA({ spacing, styling }: { spacing: ResolvedModuleSpacing; styling: ResolvedModuleStyling }) {
  return (
    <section className={`module-section ${spacing.wrapperClass} ${styling.sectionClass}`}>
      <Container>
        <div className={`industry-cta-panel premium-cta ${styling.panelClass} ${spacing.cardClass} module-card-pad rounded-[2.5rem] shadow-glow ${siteBranding.heroPanelClassName}`}>
          <SectionHeading
            eyebrow={siteConfig.cta.eyebrow}
            title={siteConfig.cta.heading}
            description={siteConfig.cta.body}
            eyebrowClassName={styling.eyebrowClass}
            titleClassName={styling.titleClass}
            descriptionClassName={styling.bodyClass}
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

function CtaB({ spacing, styling }: { spacing: ResolvedModuleSpacing; styling: ResolvedModuleStyling }) {
  return (
    <section className={`module-section ${spacing.wrapperClass} ${styling.sectionClass}`}>
      <Container className={`industry-cta-panel premium-cta ${styling.panelClass} ${spacing.cardClass} module-card-pad module-grid ${spacing.gridClass} grid rounded-[2.5rem] border shadow-glow lg:grid-cols-[0.7fr_0.3fr] lg:items-center ${siteBranding.heroPanelClassName}`}>
        <div className="module-stack module-inner-normal">
          <p className={`industry-eyebrow ${styling.eyebrowClass} text-sm uppercase tracking-[0.35em]`}>{siteConfig.cta.eyebrow}</p>
          <h2 className={`industry-heading ${styling.titleClass} text-5xl font-black tracking-tight`}>{siteConfig.cta.heading}</h2>
          <p className={`${styling.bodyClass} max-w-2xl text-xl leading-8`}>{siteConfig.cta.body}</p>
        </div>
        <div className="flex justify-start lg:justify-end">
          <PrimaryButton href="/contact">{siteConfig.cta.button}</PrimaryButton>
        </div>
      </Container>
    </section>
  );
}

function CtaC({ spacing, styling }: { spacing: ResolvedModuleSpacing; styling: ResolvedModuleStyling }) {
  return (
    <section className={`module-section ${spacing.wrapperClass} ${styling.sectionClass}`}>
      <Container>
        <div className={`industry-cta-panel premium-cta ${styling.cardClass} ${spacing.cardClass} module-card-pad module-grid ${spacing.gridClass} grid rounded-[2.5rem] border shadow-soft lg:grid-cols-[0.55fr_0.45fr] lg:items-center`}>
          <div className="module-stack module-inner-normal">
            <p className={`industry-eyebrow ${styling.eyebrowClass} text-sm uppercase tracking-[0.35em]`}>{siteConfig.cta.eyebrow}</p>
            <h2 className={`industry-heading ${styling.titleClass} text-5xl font-black tracking-tight`}>{siteConfig.cta.heading}</h2>
            <p className={`${styling.bodyClass} max-w-2xl text-xl leading-8`}>{siteConfig.cta.body}</p>
          </div>
          <div className={`module-stack module-inner-tight ${styling.panelClass} ${spacing.cardClass} module-card-pad rounded-[2rem] shadow-glow ${siteBranding.heroPanelClassName}`}>
            <p className={`${styling.mutedClass} text-sm uppercase tracking-[0.3em]`}>Call</p>
            <p className={`${styling.titleClass} text-3xl font-black`}>{siteConfig.brand.phone}</p>
            <p className={`${styling.mutedClass} text-sm uppercase tracking-[0.3em]`}>Email</p>
            <p className={`${styling.bodyClass} text-xl font-semibold`}>{siteConfig.brand.email}</p>
            <div>
              <PrimaryButton href="/contact">{siteConfig.cta.button}</PrimaryButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function CtaSection({
  spacing = getDefaultCtaSpacing(),
  styling = getDefaultCtaStyling()
}: {
  spacing?: ResolvedModuleSpacing;
  styling?: ResolvedModuleStyling;
}) {
  switch (siteConfig.layout.ctaVariant) {
    case "cta-b":
      return <CtaB spacing={spacing} styling={styling} />;
    case "cta-c":
      return <CtaC spacing={spacing} styling={styling} />;
    default:
      return <CtaA spacing={spacing} styling={styling} />;
  }
}
