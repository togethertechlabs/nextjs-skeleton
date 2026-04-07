import Image from "next/image";
import { Card, Container, SectionHeading } from "@/components/ui";
import { resolveModuleSpacing, type ResolvedModuleSpacing } from "@/lib/module-spacing";
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

function AboutA({ spacing }: { spacing: ResolvedModuleSpacing }) {
  return (
    <section className={`module-section ${spacing.wrapperClass} bg-white`}>
      <Container className={`module-grid grid items-start lg:grid-cols-[1fr_0.9fr] ${spacing.gridClass}`}>
        <div className="self-start">
          <SectionHeading
            eyebrow={siteConfig.about.eyebrow}
            title={siteConfig.about.heading}
            description={siteConfig.about.body}
          />

          <div className={`module-grid ${spacing.gridClass} ${spacing.leadClass} grid md:grid-cols-3`}>
            {siteConfig.about.highlights.map((item) => (
              <Card key={item} className={`industry-chip ${spacing.cardClass} module-card-pad text-lg font-semibold text-ink`}>
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

          <div className={`industry-cta-panel premium-cta ${spacing.cardClass} module-card-pad rounded-[2rem] bg-gradient-to-r from-slate-800 to-slate-300 text-white shadow-glow ${siteBranding.heroPanelClassName}`}>
            <p className="industry-eyebrow text-sm uppercase tracking-[0.28em] text-primary">{siteConfig.about.cardEyebrow}</p>
            <h3 className="industry-heading mt-4 text-5xl font-black leading-tight">{siteConfig.about.cardTitle}</h3>
            <p className="mt-6 text-lg leading-8 text-white/75">{siteConfig.about.cardBody}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function AboutB({ spacing }: { spacing: ResolvedModuleSpacing }) {
  return (
    <section className={`module-section ${spacing.wrapperClass} bg-panel`}>
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
          />

          <div className={`module-grid ${spacing.gridClass} grid sm:grid-cols-2`}>
            {siteConfig.about.highlights.map((item) => (
              <div key={item} className={`industry-chip ${spacing.cardClass} module-card-pad rounded-[1.5rem] border border-line bg-white text-lg font-semibold text-ink shadow-soft`}>
                {item}
              </div>
            ))}
          </div>

          <Card className={`${spacing.cardClass} module-card-pad`}>
            <p className="industry-eyebrow text-sm uppercase tracking-[0.28em] text-primary">{siteConfig.about.cardEyebrow}</p>
            <h3 className="industry-heading mt-4 text-3xl font-black text-ink">{siteConfig.about.cardTitle}</h3>
            <p className="mt-4 text-lg leading-8 text-muted">{siteConfig.about.cardBody}</p>
          </Card>
        </div>
      </Container>
    </section>
  );
}

export function AboutSection({ spacing = getDefaultAboutSpacing() }: { spacing?: ResolvedModuleSpacing }) {
  return siteConfig.layout.aboutVariant === "about-b" ? <AboutB spacing={spacing} /> : <AboutA spacing={spacing} />;
}
