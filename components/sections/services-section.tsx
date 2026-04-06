import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Card, Container, SectionHeading } from "@/components/ui";

export function ServicesSection() {
  const fallbackImage = siteConfig.images.services[0] || siteConfig.images.hero;

  return (
    <section className="bg-panel py-24">
      <Container>
        <SectionHeading
          eyebrow={siteConfig.servicesIntro?.eyebrow}
          title={siteConfig.servicesIntro?.heading || "Our Services"}
          description={siteConfig.servicesIntro?.body}
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
                <h3 className="text-3xl font-black text-ink">{service.title}</h3>
                <p className="mt-4 text-lg leading-8 text-muted">
                  {service.description}
                </p>
                <Link
                  className="mt-6 inline-flex font-semibold text-primary"
                  href={`/services/${service.slug}`}
                >
                  View service
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
