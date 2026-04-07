import Image from "next/image";
import { Card, Container, SectionHeading } from "@/components/ui";
import { siteBranding } from "@/lib/site-branding";
import { getImagePath, siteConfig } from "@/lib/site-config";

function AboutA() {
  return (
    <section className="bg-white py-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <SectionHeading
            eyebrow={siteConfig.about.eyebrow}
            title={siteConfig.about.heading}
            description={siteConfig.about.body}
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {siteConfig.about.highlights.map((item) => (
              <Card key={item} className="industry-chip p-[calc(var(--industry-card-padding)-0.35rem)] text-lg font-semibold text-ink">
                {item}
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="relative h-72">
              <Image src={getImagePath("about")} alt={siteConfig.about.heading} fill className="object-cover" />
            </div>
          </Card>

          <div className={`industry-cta-panel premium-cta rounded-[2rem] bg-gradient-to-r from-slate-800 to-slate-300 p-[var(--industry-card-padding)] text-white shadow-glow ${siteBranding.heroPanelClassName}`}>
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
    <section className="bg-panel py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="overflow-hidden">
          <div className="relative min-h-[480px]">
            <Image src={getImagePath("about")} alt={siteConfig.about.heading} fill className="object-cover" />
          </div>
        </Card>

        <div>
          <SectionHeading
            eyebrow={siteConfig.about.eyebrow}
            title={siteConfig.about.heading}
            description={siteConfig.about.body}
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {siteConfig.about.highlights.map((item) => (
              <div key={item} className="industry-chip rounded-[1.5rem] border border-line bg-white px-[calc(var(--industry-card-padding)-0.35rem)] py-[calc(var(--industry-card-padding)-0.55rem)] text-lg font-semibold text-ink shadow-soft">
                {item}
              </div>
            ))}
          </div>

          <Card className="mt-8 p-[var(--industry-card-padding)]">
            <p className="industry-eyebrow text-sm uppercase tracking-[0.28em] text-primary">{siteConfig.about.cardEyebrow}</p>
            <h3 className="industry-heading mt-4 text-3xl font-black text-ink">{siteConfig.about.cardTitle}</h3>
            <p className="mt-5 text-lg leading-8 text-muted">{siteConfig.about.cardBody}</p>
          </Card>
        </div>
      </Container>
    </section>
  );
}

export function AboutSection() {
  return siteConfig.layout.aboutVariant === "about-b" ? <AboutB /> : <AboutA />;
}
