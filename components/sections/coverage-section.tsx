import Link from "next/link";
import { getAreaName, getAreaSlug, getAreaSummary, siteConfig } from "@/lib/site-config";
import { Card, Container, SectionHeading } from "@/components/ui";

export function CoverageSection() {
  return (
    <section className="bg-panel py-24">
      <Container>
        <SectionHeading
          eyebrow={siteConfig.coverage.eyebrow}
          title={siteConfig.coverage.heading}
          description={siteConfig.coverage.body}
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {siteConfig.coverage.areas.map((area) => (
            <Card key={getAreaSlug(area)} className="p-8">
              <p className="text-sm uppercase tracking-[0.25em] text-muted">Service area</p>
              <h3 className="mt-5 text-5xl font-black text-ink">{getAreaName(area)}</h3>
              <p className="mt-4 text-muted">{getAreaSummary(area)}</p>
              <Link href={`/areas/${getAreaSlug(area)}`} className="mt-6 inline-flex font-semibold text-primary">
                View area page
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
