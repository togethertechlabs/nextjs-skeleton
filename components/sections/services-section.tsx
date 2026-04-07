import Image from "next/image";
import Link from "next/link";
import { Card, Container, SectionHeading } from "@/components/ui";
import { siteBranding } from "@/lib/site-branding";
import { getImagePath, siteConfig } from "@/lib/site-config";

function ServiceLink({ slug }: { slug: string }) {
  return (
    <Link href={`/services/${slug}`} className="mt-6 inline-flex font-semibold text-primary">
      View service
    </Link>
  );
}

function ServicesA() {
  return (
    <section className="bg-panel py-24">
      <Container>
        <SectionHeading
          eyebrow={siteConfig.servicesIntro.eyebrow}
          title={siteConfig.servicesIntro.heading}
          description={siteConfig.servicesIntro.body}
        />
        <div className={`mt-16 grid gap-8 ${siteBranding.servicesGridClassName}`}>
          {siteConfig.services.map((service, index) => (
            <Card key={service.slug} className="industry-service-card overflow-hidden">
              <div className="relative h-56">
                <Image src={getImagePath("services", index)} alt={service.title} fill className="object-cover" />
              </div>
              <div className="p-[var(--industry-card-padding)]">
                <h3 className="industry-heading text-3xl font-black text-ink">{service.title}</h3>
                <p className="mt-4 text-lg leading-8 text-muted">{service.description}</p>
                <ServiceLink slug={service.slug} />
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServicesB() {
  return (
    <section className="bg-white py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.35fr_0.65fr]">
        <div>
          <SectionHeading
            eyebrow={siteConfig.servicesIntro.eyebrow}
            title={siteConfig.servicesIntro.heading}
            description={siteConfig.servicesIntro.body}
          />
        </div>

        <div className="grid gap-6">
          {siteConfig.services.map((service, index) => (
            <Card key={service.slug} className="industry-service-card grid overflow-hidden md:grid-cols-[0.36fr_0.64fr]">
              <div className="relative min-h-[240px]">
                <Image src={getImagePath("services", index)} alt={service.title} fill className="object-cover" />
              </div>
              <div className="p-[var(--industry-card-padding)]">
                <p className="industry-eyebrow text-xs uppercase tracking-[0.3em] text-primary">Featured service</p>
                <h3 className="industry-heading mt-4 text-3xl font-black text-ink">{service.title}</h3>
                <p className="mt-4 text-lg leading-8 text-muted">{service.short}</p>
                <ul className="mt-6 space-y-2 text-sm uppercase tracking-[0.18em] text-muted">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <ServiceLink slug={service.slug} />
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServicesC() {
  return (
    <section className="bg-panel py-24">
      <Container>
        <SectionHeading
          eyebrow={siteConfig.servicesIntro.eyebrow}
          title={siteConfig.servicesIntro.heading}
          description={siteConfig.servicesIntro.body}
        />

        <div className={`mt-14 grid gap-6 ${siteBranding.servicesGridClassName}`}>
          {siteConfig.services.map((service, index) => (
            <article key={service.slug} className="industry-service-card rounded-[2rem] border border-line bg-shell p-[calc(var(--industry-card-padding)-0.35rem)] text-white shadow-glow">
              <div className="overflow-hidden rounded-[1.5rem]">
                <Image src={getImagePath("services", index)} alt={service.title} width={800} height={500} className="h-48 w-full object-cover" />
              </div>
              <div className="px-2 pb-2 pt-6">
                <p className="industry-eyebrow text-xs uppercase tracking-[0.3em] text-accent">Core service</p>
                <h3 className="industry-heading mt-3 text-2xl font-black">{service.title}</h3>
                <p className="mt-3 text-base leading-8 text-white/75">{service.description}</p>
                <ServiceLink slug={service.slug} />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ServicesSection() {
  switch (siteConfig.layout.servicesVariant) {
    case "services-b":
      return <ServicesB />;
    case "services-c":
      return <ServicesC />;
    default:
      return <ServicesA />;
  }
}
