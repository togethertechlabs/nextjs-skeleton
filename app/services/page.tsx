import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Card, Container, SectionHeading } from "@/components/ui";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata(`Services | ${siteConfig.brand.name}`, `Explore services from ${siteConfig.brand.name}.`, "/services");

export default function ServicesPage() {
  const fallbackImage = siteConfig.images.services[0] || siteConfig.images.hero;

  return (
    <PageShell>
      <section className="bg-panel py-24">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title={`Services from ${siteConfig.brand.name}`}
            description="A dedicated services page gives the generated site more depth, more crawlable content and more room for internal links."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {siteConfig.services.map((service, index) => (
              <Card key={service.slug || `${service.title}-${index}`} className="overflow-hidden">
                <div className="relative h-56">
                  <Image
                    src={siteConfig.images.services[index] || fallbackImage}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-black">{service.title}</h2>
                  <p className="mt-4 text-muted">{service.description}</p>
                  <Link href={`/services/${service.slug}`} className="mt-6 inline-flex font-semibold text-primary">
                    Read more
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
