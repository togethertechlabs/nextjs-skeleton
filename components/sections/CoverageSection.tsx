import { SiteConfig } from '@/lib/types';
import SectionHeading from '@/components/ui/SectionHeading';

export default function CoverageSection({ config }: { config: SiteConfig }) {
  return (
    <section id="coverage" className="section-spacing bg-slate-50">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Coverage"
          title={config.coverage.heading}
          description="Local confidence matters. This section reinforces service area and helps with local SEO intent."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {config.coverage.areas.map((area) => (
            <div key={area} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-sm uppercase tracking-[0.24em] text-slate-500">Service area</div>
              <div className="mt-3 text-3xl font-bold text-slate-950">{area}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
