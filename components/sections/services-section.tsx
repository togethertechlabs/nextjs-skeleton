import Image from "next/image";
import Link from "next/link";
import { Card, Container, SectionHeading } from "@/components/ui";
import { resolveModuleSpacing, type ResolvedModuleSpacing } from "@/lib/module-spacing";
import { resolveModuleStyling, type ResolvedModuleStyling } from "@/lib/module-styling";
import { siteBranding } from "@/lib/site-branding";
import { getImagePath, siteConfig } from "@/lib/site-config";

function ServiceLink({ slug, className = "" }: { slug: string; className?: string }) {
  return (
    <Link href={`/services/${slug}`} className={`module-link mt-6 inline-flex font-semibold ${className}`}>
      View service
    </Link>
  );
}

function getDefaultServicesSpacing() {
  return resolveModuleSpacing({
    current: "services",
    designDominance: siteBranding.designDominance,
    premiumMode: siteBranding.premiumMode,
    contentDensity: siteBranding.contentDensity
  });
}

function getDefaultServicesStyling() {
  return resolveModuleStyling({
    current: "services",
    branding: siteBranding
  });
}

function ServicesA({
  spacing,
  styling
}: {
  spacing: ResolvedModuleSpacing;
  styling: ResolvedModuleStyling;
}) {
  return (
    <section className={`module-section ${spacing.wrapperClass} ${styling.sectionClass}`}>
      <Container>
        <SectionHeading
          eyebrow={siteConfig.servicesIntro.eyebrow}
          title={siteConfig.servicesIntro.heading}
          description={siteConfig.servicesIntro.body}
          eyebrowClassName={styling.eyebrowClass}
          titleClassName={styling.titleClass}
          descriptionClassName={styling.bodyClass}
        />
        <div className={`module-grid ${spacing.gridClass} ${spacing.leadClass} grid ${siteBranding.servicesGridClassName}`}>
          {siteConfig.services.map((service, index) => (
            <Card key={service.slug} className={`industry-service-card ${styling.cardClass} overflow-hidden`}>
              <div className="relative h-56">
                <Image src={getImagePath("services", index)} alt={service.title} fill className="object-cover" />
              </div>
              <div className={`${spacing.cardClass} module-card-pad`}>
                <h3 className={`industry-heading ${styling.titleClass} text-3xl font-black`}>{service.title}</h3>
                <p className={`${styling.bodyClass} mt-4 text-lg leading-8`}>{service.description}</p>
                <ServiceLink slug={service.slug} className={styling.linkClass} />
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServicesB({
  spacing,
  styling
}: {
  spacing: ResolvedModuleSpacing;
  styling: ResolvedModuleStyling;
}) {
  return (
    <section className={`module-section ${spacing.wrapperClass} ${styling.sectionClass}`}>
      <Container className={`module-grid ${spacing.gridClass} grid lg:grid-cols-[0.35fr_0.65fr]`}>
        <div>
          <SectionHeading
            eyebrow={siteConfig.servicesIntro.eyebrow}
            title={siteConfig.servicesIntro.heading}
            description={siteConfig.servicesIntro.body}
            eyebrowClassName={styling.eyebrowClass}
            titleClassName={styling.titleClass}
            descriptionClassName={styling.bodyClass}
          />
        </div>

        <div className={`module-grid ${spacing.gridClass} grid`}>
          {siteConfig.services.map((service, index) => (
            <Card key={service.slug} className={`industry-service-card ${styling.cardClass} grid overflow-hidden md:grid-cols-[0.36fr_0.64fr]`}>
              <div className="relative min-h-[240px]">
                <Image src={getImagePath("services", index)} alt={service.title} fill className="object-cover" />
              </div>
              <div className={`${spacing.cardClass} module-card-pad`}>
                <p className={`industry-eyebrow ${styling.eyebrowClass} text-xs uppercase tracking-[0.3em]`}>Featured service</p>
                <h3 className={`industry-heading ${styling.titleClass} mt-4 text-3xl font-black`}>{service.title}</h3>
                <p className={`${styling.bodyClass} mt-4 text-lg leading-8`}>{service.short}</p>
                <ul className={`${styling.mutedClass} mt-6 space-y-2 text-sm uppercase tracking-[0.18em]`}>
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <ServiceLink slug={service.slug} className={styling.linkClass} />
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServicesC({
  spacing,
  styling
}: {
  spacing: ResolvedModuleSpacing;
  styling: ResolvedModuleStyling;
}) {
  return (
    <section className={`module-section ${spacing.wrapperClass} ${styling.sectionClass}`}>
      <Container>
        <SectionHeading
          eyebrow={siteConfig.servicesIntro.eyebrow}
          title={siteConfig.servicesIntro.heading}
          description={siteConfig.servicesIntro.body}
          eyebrowClassName={styling.eyebrowClass}
          titleClassName={styling.titleClass}
          descriptionClassName={styling.bodyClass}
        />

        <div className={`module-grid ${spacing.gridClass} ${spacing.leadClass} grid ${siteBranding.servicesGridClassName}`}>
          {siteConfig.services.map((service, index) => (
            <article key={service.slug} className={`industry-service-card ${styling.panelClass} ${styling.cardClass} ${spacing.cardClass} module-card-pad rounded-[2rem] border shadow-glow`}>
              <div className="overflow-hidden rounded-[1.5rem]">
                <Image src={getImagePath("services", index)} alt={service.title} width={800} height={500} className="h-48 w-full object-cover" />
              </div>
              <div className="px-2 pb-2 pt-5">
                <p className={`industry-eyebrow ${styling.eyebrowClass} text-xs uppercase tracking-[0.3em]`}>Core service</p>
                <h3 className={`industry-heading ${styling.titleClass} mt-3 text-2xl font-black`}>{service.title}</h3>
                <p className={`${styling.bodyClass} mt-3 text-base leading-8`}>{service.description}</p>
                <ServiceLink slug={service.slug} className={styling.linkClass} />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ServicesSection({
  spacing = getDefaultServicesSpacing(),
  styling = getDefaultServicesStyling()
}: {
  spacing?: ResolvedModuleSpacing;
  styling?: ResolvedModuleStyling;
}) {
  switch (siteConfig.layout.servicesVariant) {
    case "services-b":
      return <ServicesB spacing={spacing} styling={styling} />;
    case "services-c":
      return <ServicesC spacing={spacing} styling={styling} />;
    default:
      return <ServicesA spacing={spacing} styling={styling} />;
  }
}
