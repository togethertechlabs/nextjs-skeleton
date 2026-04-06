import Link from "next/link";
import { Card, Container, SectionHeading } from "@/components/ui";
import { getAreaName, getAreaSlug, getAreaSummary, siteConfig } from "@/lib/site-config";

function CoverageA() {
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
            <Card key={area.slug} className="p-8">
              <p className="text-sm uppercase tracking-[0.25em] text-muted">Service area</p>
              <h3 className="mt-5 text-4xl font-black text-ink">{getAreaName(area)}</h3>
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

function CoverageB() {
  return (
    <section className="bg-white py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
        <SectionHeading
          eyebrow={siteConfig.coverage.eyebrow}
          title={siteConfig.coverage.heading}
          description={siteConfig.coverage.body}
        />
        <div className="grid gap-4">
          {siteConfig.coverage.areas.map((area) => (
            <Link key={area.slug} href={`/areas/${getAreaSlug(area)}`} className="flex items-center justify-between rounded-[1.5rem] border border-line bg-panel px-6 py-5 shadow-soft">
              <div>
                <span className="block text-2xl font-black text-ink">{getAreaName(area)}</span>
                <span className="mt-2 block text-sm text-muted">{getAreaSummary(area)}</span>
              </div>
              <span className="text-sm uppercase tracking-[0.3em] text-primary">Explore</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CoverageSection() {
  return siteConfig.layout.coverageVariant === "coverage-b" ? <CoverageB /> : <CoverageA />;
}
