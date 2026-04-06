import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { Card, Container, SectionHeading } from "@/components/ui";

export function AboutSection() {
  const aboutImage = siteConfig.images.about || siteConfig.images.hero;

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
            {(siteConfig.about.highlights || []).map((item) => (
              <Card key={item} className="p-6 text-lg font-semibold text-ink">
                {item}
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="relative h-72">
              <Image src={aboutImage} alt={siteConfig.about.heading} fill className="object-cover" />
            </div>
          </Card>

          <div className="rounded-[2rem] bg-gradient-to-r from-slate-800 to-slate-300 p-8 text-white shadow-glow">
            <p className="text-sm uppercase tracking-[0.28em] text-primary">
              {siteConfig.about.cardEyebrow}
            </p>
            <h3 className="mt-4 text-5xl font-black leading-tight">
              {siteConfig.about.cardTitle}
            </h3>
            <p className="mt-6 text-lg leading-8 text-white/75">
              {siteConfig.about.cardBody}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
