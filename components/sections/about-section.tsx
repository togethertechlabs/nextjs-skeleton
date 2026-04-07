import Image from "next/image";
import { Card, Container, SectionHeading } from "@/components/ui";
import { resolveModuleSpacing, type ResolvedModuleSpacing } from "@/lib/module-spacing";
import { resolveModuleStyling, type ResolvedModuleStyling } from "@/lib/module-styling";
import { siteBranding } from "@/lib/site-branding";
import { getImagePath, siteConfig } from "@/lib/site-config";

function getDefaultAboutSpacing() {
  return resolveModuleSpacing({
    current: "about",
    designDominance: siteBranding.designDominance,
    premiumMode: siteBranding.premiumMode,
    contentDensity: siteBranding.contentDensity
  });
}

function getDefaultAboutStyling() {
  return resolveModuleStyling({
    current: "about",
    branding: siteBranding
  });
}

function AboutA({
  spacing,
  styling
}: {
  spacing: ResolvedModuleSpacing;
  styling: ResolvedModuleStyling;
}) {
  return (
    <section className={`module-section ${spacing.wrapperClass} ${styling.sectionClass}`}>
      <Container className={`module-grid grid items-start lg:grid-cols-[1fr_0.9fr] ${spacing.gridClass}`}>
        <div className="self-start">
          <SectionHeading
            eyebrow={siteConfig.about.eyebrow}
            title={siteConfig.about.heading}
            description={siteConfig.about.body}
            eyebrowClassName={styling.eyebrowClass}
            titleClassName={styling.titleClass}
            descriptionClassName={styling.bodyClass}
          />

          <div className={`module-grid ${spacing.gridClass} ${spacing.leadClass} grid md:grid-cols-3`}>
            {siteConfig.about.highlights.map((item) => (
              <Card key={item} className={`industry-chip ${styling.cardClass} ${styling.badgeClass} ${spacing.cardClass} module-card-pad text-lg font-semibold`}>
                {item}
              </Card>
            ))}
          </div>
        </div>

        <div className={`module-stack ${spacing.innerClass} self-start`}>
          <Card className="overflow-hidden">
            <div className="relative h-72 md:h-[19rem]">
              <Image src={getImagePath("about")} alt={siteConfig.about.heading} fill className="object-cover" />
            </div>
          </Card>

          <div className={`industry-cta-panel premium-cta ${styling.panelClass} ${spacing.cardClass} module-card-pad rounded-[2rem] shadow-glow ${siteBranding.heroPanelClassName}`}>
            <p className={`industry-eyebrow ${styling.eyebrowClass} text-sm uppercase tracking-[0.28em]`}>{siteConfig.about.cardEyebrow}</p>
            <h3 className={`industry-heading ${styling.titleClass} mt-4 text-5xl font-black leading-tight`}>{siteConfig.about.cardTitle}</h3>
            <p className={`${styling.bodyClass} mt-6 text-lg leading-8`}>{siteConfig.about.cardBody}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function AboutB({
  spacing,
  styling
}: {
  spacing: ResolvedModuleSpacing;
  styling: ResolvedModuleStyling;
}) {
  return (
    <section className={`module-section ${spacing.wrapperClass} ${styling.sectionClass}`}>
      <Container className={`module-grid grid items-start lg:grid-cols-[0.95fr_1.05fr] ${spacing.gridClass}`}>
        <Card className="overflow-hidden">
          <div className="relative min-h-[440px]">
            <Image src={getImagePath("about")} alt={siteConfig.about.heading} fill className="object-cover" />
          </div>
        </Card>

        <div className={`module-stack ${spacing.innerClass} self-start`}>
          <SectionHeading
            eyebrow={siteConfig.about.eyebrow}
            title={siteConfig.about.heading}
            description={siteConfig.about.body}
            eyebrowClassName={styling.eyebrowClass}
            titleClassName={styling.titleClass}
            descriptionClassName={styling.bodyClass}
          />

          <div className={`module-grid ${spacing.gridClass} grid sm:grid-cols-2`}>
            {siteConfig.about.highlights.map((item) => (
              <div key={item} className={`industry-chip ${styling.cardClass} ${styling.badgeClass} ${spacing.cardClass} module-card-pad rounded-[1.5rem] border text-lg font-semibold shadow-soft`}>
                {item}
              </div>
            ))}
          </div>

          <Card className={`${styling.cardClass} ${spacing.cardClass} module-card-pad`}>
            <p className={`industry-eyebrow ${styling.eyebrowClass} text-sm uppercase tracking-[0.28em]`}>{siteConfig.about.cardEyebrow}</p>
            <h3 className={`industry-heading ${styling.titleClass} mt-4 text-3xl font-black`}>{siteConfig.about.cardTitle}</h3>
            <p className={`${styling.bodyClass} mt-4 text-lg leading-8`}>{siteConfig.about.cardBody}</p>
          </Card>
        </div>
      </Container>
    </section>
  );
}

export function AboutSection({
  spacing = getDefaultAboutSpacing(),
  styling = getDefaultAboutStyling()
}: {
  spacing?: ResolvedModuleSpacing;
  styling?: ResolvedModuleStyling;
}) {
  return siteConfig.layout.aboutVariant === "about-b"
    ? <AboutB spacing={spacing} styling={styling} />
    : <AboutA spacing={spacing} styling={styling} />;
}
