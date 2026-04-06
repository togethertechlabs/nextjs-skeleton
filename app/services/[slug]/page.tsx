import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { Card, Container, SectionHeading } from "@/components/ui";
import { siteConfig, getServiceBySlug } from "@/lib/site-config";

export function generateStaticParams() {
  return siteConfig.services.map((service) => ({ slug: service.slug }));
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
  const imageSrc = siteConfig.images.services[index] || siteConfig.images.services[0] || siteConfig.images.hero;

  return (
    <PageShell>
      <section className="bg-white py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="overflow-hidden">
            <div className="relative min-h-[380px]">
              <Image src={imageSrc} alt={service.title} fill className="object-cover" />
            </div>
          </Card>

          <div>
            <SectionHeading
              eyebrow="Service Detail"
              title={service.title}
              description={service.description}
            />

            <div className="mt-8 space-y-3">
              {(service.bullets || []).map((bullet) => (
                <div key={bullet} className="rounded-2xl border border-line bg-panel px-5 py-4 text-muted">
                  {bullet}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
