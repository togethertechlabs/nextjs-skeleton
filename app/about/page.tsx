import Image from "next/image";
import { PageShell } from "@/components/page-shell";
import { Card, Container, SectionHeading } from "@/components/ui";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata(`About | ${siteConfig.brand.name}`, siteConfig.about.body, "/about");

export default function AboutPage() {
  const aboutImage = siteConfig.images.about || siteConfig.images.hero;

  return (
    <PageShell>
      <section className="bg-white py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="overflow-hidden">
            <div className="relative min-h-[420px]">
              <Image src={aboutImage} alt={siteConfig.about.heading} fill className="object-cover" />
            </div>
          </Card>

          <div>
            <SectionHeading
              eyebrow={siteConfig.about.eyebrow}
              title={siteConfig.about.heading}
              description={siteConfig.about.body}
            />

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {(siteConfig.about.highlights || []).map((item) => (
                <Card key={item} className="p-6 text-lg font-semibold">{item}</Card>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
