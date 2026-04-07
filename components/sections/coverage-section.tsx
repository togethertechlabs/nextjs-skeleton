import Link from "next/link";
import { Card, Container, SectionHeading } from "@/components/ui";
import { resolveModuleSpacing, type ResolvedModuleSpacing } from "@/lib/module-spacing";
import { siteBranding } from "@/lib/site-branding";
import { getAreaName, getAreaSlug, getAreaSummary, siteConfig } from "@/lib/site-config";

function getDefaultCoverageSpacing() {
  return resolveModuleSpacing({
    current: "coverage",
    designDominance: siteBranding.designDominance,
    premiumMode: siteBranding.premiumMode,
    contentDensity: siteBranding.contentDensity
  });
}

function CoverageA({ spacing }: { spacing: ResolvedModuleSpacing }) {
  return (
    <section className={`module-section ${spacing.wrapperClass} bg-panel`}>
      <Container>
        <SectionHeading
          eyebrow={siteConfig.coverage.eyebrow}
          title={siteConfig.coverage.heading}
          description={siteConfig.coverage.body}
        />

        <div className={`module-grid ${spacing.gridClass} ${spacing.leadClass} grid md:grid-cols-3`}>
          {siteConfig.coverage.areas.map((area) => (
            <Card key={area.slug} className={`${spacing.cardClass} module-card-pad`}>
              <p className="text-sm uppercase tracking-[0.25em] text-muted">Service area</p>
              <h3 className="mt-4 text-4xl font-black text-ink">{getAreaName(area)}</h3>
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

function CoverageB({ spacing }: { spacing: ResolvedModuleSpacing }) {
  return (
    <section className={`module-section ${spacing.wrapperClass} bg-white`}>
      <Container className={`module-grid ${spacing.gridClass} grid lg:grid-cols-[0.4fr_0.6fr]`}>
        <SectionHeading
          eyebrow={siteConfig.coverage.eyebrow}
          title={siteConfig.coverage.heading}
          description={siteConfig.coverage.body}
        />
        <div className={`module-grid ${spacing.gridClass} grid`}>
          {siteConfig.coverage.areas.map((area) => (
            <Link key={area.slug} href={`/areas/${getAreaSlug(area)}`} className={`module-card-pad ${spacing.cardClass} flex items-center justify-between rounded-[1.5rem] border border-line bg-panel shadow-soft`}>
              <div>
                <span className="block text-2xl font-black text-ink">{getAreaName(area)}</span>
                <span className="mt-1.5 block text-sm text-muted">{getAreaSummary(area)}</span>
              </div>
              <span className="text-sm uppercase tracking-[0.3em] text-primary">Explore</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CoverageSection({ spacing = getDefaultCoverageSpacing() }: { spacing?: ResolvedModuleSpacing }) {
  return siteConfig.layout.coverageVariant === "coverage-b" ? <CoverageB spacing={spacing} /> : <CoverageA spacing={spacing} />;
}
