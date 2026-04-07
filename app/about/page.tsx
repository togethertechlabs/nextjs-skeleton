import Image from "next/image";
import { PageShell } from "@/components/page-shell";
import { Card, Container, SectionHeading } from "@/components/ui";
import { buildPageMetadata } from "@/lib/metadata";
import { getImagePath, siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: `About ${siteConfig.brand.name}`,
  description: siteConfig.about.body,
  path: "/about"
});

export default function AboutPage() {
  return (
    <PageShell>
      <section className="industry-section bg-white py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="overflow-hidden">
            <div className="relative min-h-[440px]">
              <Image src={getImagePath("about")} alt={siteConfig.about.heading} fill className="object-cover" />
            </div>
          </Card>

          <div>
            <SectionHeading
              eyebrow={siteConfig.about.eyebrow}
              title={siteConfig.about.heading}
              description={siteConfig.about.body}
            />

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {siteConfig.about.highlights.map((item) => (
                <Card key={item} className="industry-chip p-6 text-lg font-semibold text-ink">
                  {item}
                </Card>
              ))}
            </div>

            <Card className="mt-8 p-8">
              <p className="industry-eyebrow text-sm uppercase tracking-[0.28em] text-primary">{siteConfig.about.cardEyebrow}</p>
              <h2 className="industry-heading mt-4 text-3xl font-black text-ink md:text-4xl">{siteConfig.about.cardTitle}</h2>
              <p className="mt-5 text-lg leading-8 text-muted">{siteConfig.about.cardBody}</p>
            </Card>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
