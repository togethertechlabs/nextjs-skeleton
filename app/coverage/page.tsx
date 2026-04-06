import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Card, Container, SectionHeading } from "@/components/ui";
import { buildPageMetadata } from "@/lib/metadata";
import { getAreaSlug, siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: `Coverage | ${siteConfig.brand.name}`,
  description: siteConfig.coverage.body,
  path: "/coverage"
});

export default function CoveragePage() {
  return (
    <PageShell>
      <section className="bg-panel py-24">
        <Container>
          <SectionHeading
            eyebrow={siteConfig.coverage.eyebrow}
            title={siteConfig.coverage.heading}
            description={siteConfig.coverage.body}
          />

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {siteConfig.coverage.areas.map((area) => (
              <Card key={area.slug} className="p-8">
                <p className="text-sm uppercase tracking-[0.25em] text-muted">Service area</p>
                <h2 className="mt-5 text-4xl font-black text-ink">{area.name}</h2>
                <p className="mt-4 text-muted">{area.summary}</p>
                <Link href={`/areas/${getAreaSlug(area)}`} className="mt-6 inline-flex font-semibold text-primary">
                  Open area page
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
