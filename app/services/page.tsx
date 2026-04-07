import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Card, Container, SectionHeading } from "@/components/ui";
import { buildPageMetadata } from "@/lib/metadata";
import { getImagePath, siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: `Services | ${siteConfig.brand.name}`,
  description: `Explore ${siteConfig.brand.name}'s services in ${siteConfig.brand.location}.`,
  path: "/services"
});

export default function ServicesPage() {
  return (
    <PageShell>
      <section className="industry-section bg-panel py-24">
        <Container>
          <SectionHeading
            eyebrow={siteConfig.servicesIntro.eyebrow}
            title={`Services from ${siteConfig.brand.name}`}
            description={siteConfig.servicesIntro.body}
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {siteConfig.services.map((service, index) => (
              <Card key={service.slug} className="industry-service-card overflow-hidden">
                <div className="relative h-56">
                  <Image src={getImagePath("services", index)} alt={service.title} fill className="object-cover" />
                </div>
                <div className="p-8">
                  <h2 className="industry-heading text-3xl font-black text-ink">{service.title}</h2>
                  <p className="mt-4 text-lg leading-8 text-muted">{service.description}</p>
                  <ul className="mt-6 space-y-2 text-sm uppercase tracking-[0.18em] text-muted">
                    {service.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <Link href={`/services/${service.slug}`} className="mt-8 inline-flex font-semibold text-primary">
                    View service
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
