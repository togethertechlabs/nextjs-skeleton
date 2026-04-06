import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Card, Container, SectionHeading } from "@/components/ui";
import { buildMetadata } from "@/lib/metadata";
import { getAreaName, getAreaSlug, getAreaSummary, siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata(`Coverage | ${siteConfig.brand.name}`, `Areas covered by ${siteConfig.brand.name}.`, "/coverage");

export default function CoveragePage() {
  return (
    <PageShell>
      <section className="bg-panel py-24">
        <Container>
          <SectionHeading
            eyebrow={siteConfig.coverage.eyebrow}
            title={siteConfig.coverage.heading}
            description="Coverage pages add useful location depth and strengthen internal linking."
          />

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {siteConfig.coverage.areas.map((area) => (
              <Card key={getAreaSlug(area)} className="p-8">
                <p className="text-sm uppercase tracking-[0.25em] text-muted">Service area</p>
                <h2 className="mt-5 text-5xl font-black">{getAreaName(area)}</h2>
                <p className="mt-4 text-muted">{getAreaSummary(area)}</p>
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
