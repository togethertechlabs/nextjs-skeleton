import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { Card, Container, PrimaryButton, SectionHeading } from "@/components/ui";
import { buildPageMetadata } from "@/lib/metadata";
import { getImagePath, getServiceBySlug, siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return siteConfig.services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return buildPageMetadata({
      title: `Service not found | ${siteConfig.brand.name}`,
      path: `/services/${slug}`
    });
  }

  return buildPageMetadata({
    title: `${service.title} | ${siteConfig.brand.name}`,
    description: service.description,
    path: `/services/${service.slug}`
  });
}

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const index = siteConfig.services.findIndex((item) => item.slug === slug);

  return (
    <PageShell>
      <section className="industry-section bg-white py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="overflow-hidden">
            <div className="relative min-h-[420px]">
              <Image src={getImagePath("services", index)} alt={service.title} fill className="object-cover" />
            </div>
          </Card>

          <div>
            <SectionHeading eyebrow="Service detail" title={service.title} description={service.description} />
            <p className="mt-8 text-lg leading-8 text-muted">{service.short}</p>

            <div className="mt-8 space-y-3">
              {service.bullets.map((bullet) => (
                <div key={bullet} className="industry-chip rounded-2xl border border-line bg-panel px-5 py-4 text-muted">
                  {bullet}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <PrimaryButton href="/contact">{service.cta}</PrimaryButton>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
