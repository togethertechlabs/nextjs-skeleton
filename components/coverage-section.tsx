import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { siteConfig } from '@/lib/site-config';

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function CoverageA() {
  return (
    <section className="surface py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="Coverage" title={siteConfig.coverage.heading} description="Local confidence matters. This section reinforces service area and helps with local SEO intent." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {siteConfig.coverage.areas.map((area) => (
            <Link key={area} href={`/areas/${slugify(area)}`} className="rounded-[2rem] border line surface-2 p-8 shadow-premium">
              <p className="text-sm uppercase tracking-[0.3em] text-muted">Service area</p>
              <h3 className="mt-4 text-4xl font-black" style={{ color: 'var(--text)' }}>{area}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoverageB() {
  return (
    <section className="surface-2 py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.45fr_0.55fr]">
        <SectionHeading eyebrow="Coverage" title={siteConfig.coverage.heading} description="Use this variant when you want the service area content to feel more editorial and less card-grid based." />
        <div className="grid gap-4">
          {siteConfig.coverage.areas.map((area) => (
            <Link key={area} href={`/areas/${slugify(area)}`} className="flex items-center justify-between rounded-[1.5rem] border line surface px-6 py-5 shadow-premium">
              <span className="text-2xl font-black" style={{ color: 'var(--text)' }}>{area}</span>
              <span className="text-sm uppercase tracking-[0.3em]" style={{ color: 'var(--primary)' }}>Explore</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CoverageSection() {
  return siteConfig.layout.coverageVariant === 'coverage-b' ? <CoverageB /> : <CoverageA />;
}
