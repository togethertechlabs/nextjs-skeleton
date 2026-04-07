import Image from "next/image";
import { Card, Container, SectionHeading } from "@/components/ui";
import { siteBranding } from "@/lib/site-branding";
import { getImagePath, siteConfig } from "@/lib/site-config";

function AboutA() {
  return (
    <section className="bg-white py-20">
      <Container className="grid items-start gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="self-start">
          <SectionHeading
            eyebrow={siteConfig.about.eyebrow}
            title={siteConfig.about.heading}
            description={siteConfig.about.body}
          />

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {siteConfig.about.highlights.map((item) => (
              <Card key={item} className="industry-chip p-[calc(var(--section-card-padding,var(--industry-card-padding))-0.35rem)] text-lg font-semibold text-ink">
                {item}
              </Card>
            ))}
          </div>
        </div>

        <div className="self-start space-y-5">
          <Card className="overflow-hidden">
            <div className="relative h-72 md:h-[19rem]">
              <Image src={getImagePath("about")} alt={siteConfig.about.heading} fill className="object-cover" />
            </div>
          </Card>

          <div className={`industry-cta-panel premium-cta rounded-[2rem] bg-gradient-to-r from-slate-800 to-slate-300 p-[var(--section-card-padding,var(--industry-card-padding))] text-white shadow-glow ${siteBranding.heroPanelClassName}`}>
            <p className="industry-eyebrow text-sm uppercase tracking-[0.28em] text-primary">{siteConfig.about.cardEyebrow}</p>
            <h3 className="industry-heading mt-4 text-5xl font-black leading-tight">{siteConfig.about.cardTitle}</h3>
            <p className="mt-6 text-lg leading-8 text-white/75">{siteConfig.about.cardBody}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function AboutB() {
  return (
    <section className="bg-panel py-20">
      <Container className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="overflow-hidden">
          <div className="relative min-h-[440px]">
            <Image src={getImagePath("about")} alt={siteConfig.about.heading} fill className="object-cover" />
          </div>
        </Card>

        <div className="self-start">
          <SectionHeading
            eyebrow={siteConfig.about.eyebrow}
            title={siteConfig.about.heading}
            description={siteConfig.about.body}
          />

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {siteConfig.about.highlights.map((item) => (
              <div key={item} className="industry-chip rounded-[1.5rem] border border-line bg-white px-[calc(var(--section-card-padding,var(--industry-card-padding))-0.35rem)] py-[calc(var(--section-card-padding,var(--industry-card-padding))-0.55rem)] text-lg font-semibold text-ink shadow-soft">
                {item}
              </div>
            ))}
          </div>

          <Card className="mt-7 p-[var(--section-card-padding,var(--industry-card-padding))]">
            <p className="industry-eyebrow text-sm uppercase tracking-[0.28em] text-primary">{siteConfig.about.cardEyebrow}</p>
            <h3 className="industry-heading mt-4 text-3xl font-black text-ink">{siteConfig.about.cardTitle}</h3>
            <p className="mt-4 text-lg leading-8 text-muted">{siteConfig.about.cardBody}</p>
          </Card>
        </div>
      </Container>
    </section>
  );
}

export function AboutSection() {
  return siteConfig.layout.aboutVariant === "about-b" ? <AboutB /> : <AboutA />;
}
