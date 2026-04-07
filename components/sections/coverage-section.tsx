import Link from "next/link";
import { Card, Container, SectionHeading } from "@/components/ui";
import { resolveModuleSpacing, type ResolvedModuleSpacing } from "@/lib/module-spacing";
import { resolveModuleStyling, type ResolvedModuleStyling } from "@/lib/module-styling";
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

function getDefaultCoverageStyling() {
  return resolveModuleStyling({
    current: "coverage",
    branding: siteBranding
  });
}

function CoverageA({
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
          eyebrow={siteConfig.coverage.eyebrow}
          title={siteConfig.coverage.heading}
          description={siteConfig.coverage.body}
          eyebrowClassName={styling.eyebrowClass}
          titleClassName={styling.titleClass}
          descriptionClassName={styling.bodyClass}
        />

        <div className={`module-grid ${spacing.gridClass} ${spacing.leadClass} grid md:grid-cols-3`}>
          {siteConfig.coverage.areas.map((area) => (
            <Card key={area.slug} className={`${styling.cardClass} ${spacing.cardClass} module-card-pad`}>
              <p className={`${styling.mutedClass} text-sm uppercase tracking-[0.25em]`}>Service area</p>
              <h3 className={`${styling.titleClass} mt-4 text-4xl font-black`}>{getAreaName(area)}</h3>
              <p className={`${styling.bodyClass} mt-4`}>{getAreaSummary(area)}</p>
              <Link href={`/areas/${getAreaSlug(area)}`} className={`module-link mt-6 inline-flex font-semibold ${styling.linkClass}`}>
                View area page
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CoverageB({
  spacing,
  styling
}: {
  spacing: ResolvedModuleSpacing;
  styling: ResolvedModuleStyling;
}) {
  return (
    <section className={`module-section ${spacing.wrapperClass} ${styling.sectionClass}`}>
      <Container className={`module-grid ${spacing.gridClass} grid lg:grid-cols-[0.4fr_0.6fr]`}>
        <SectionHeading
          eyebrow={siteConfig.coverage.eyebrow}
          title={siteConfig.coverage.heading}
          description={siteConfig.coverage.body}
          eyebrowClassName={styling.eyebrowClass}
          titleClassName={styling.titleClass}
          descriptionClassName={styling.bodyClass}
        />
        <div className={`module-grid ${spacing.gridClass} grid`}>
          {siteConfig.coverage.areas.map((area) => (
            <Link key={area.slug} href={`/areas/${getAreaSlug(area)}`} className={`module-card ${styling.cardClass} module-card-pad ${spacing.cardClass} flex items-center justify-between rounded-[1.5rem] border shadow-soft`}>
              <div>
                <span className={`${styling.titleClass} block text-2xl font-black`}>{getAreaName(area)}</span>
                <span className={`${styling.bodyClass} mt-1.5 block text-sm`}>{getAreaSummary(area)}</span>
              </div>
              <span className={`${styling.accentClass} text-sm uppercase tracking-[0.3em]`}>Explore</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CoverageSection({
  spacing = getDefaultCoverageSpacing(),
  styling = getDefaultCoverageStyling()
}: {
  spacing?: ResolvedModuleSpacing;
  styling?: ResolvedModuleStyling;
}) {
  return siteConfig.layout.coverageVariant === "coverage-b"
    ? <CoverageB spacing={spacing} styling={styling} />
    : <CoverageA spacing={spacing} styling={styling} />;
}
