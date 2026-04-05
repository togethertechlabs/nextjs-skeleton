import { SiteConfig } from '@/lib/types';
import SectionHeading from '@/components/ui/SectionHeading';
import { getTheme } from '@/lib/theme';

export default function AboutSection({ config }: { config: SiteConfig }) {
  const theme = getTheme(config.brand.theme);
  return (
    <section id="about" className="section-spacing bg-white">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <SectionHeading eyebrow="About" title={config.about.heading} description={config.about.body} />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {config.about.bullets.map((bullet) => (
              <div key={bullet} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 font-semibold text-slate-800">
                {bullet}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] p-8 text-white shadow-2xl" style={{ background: `linear-gradient(135deg, ${theme.secondary}, ${theme.surface})` }}>
          <div className="text-sm uppercase tracking-[0.24em]" style={{ color: theme.primary }}>Why clients choose us</div>
          <div className="mt-4 text-4xl font-black">Fast response. Clear communication. Strong presentation.</div>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            This section is designed to feel substantial, premium and highly credible even before bespoke edits are added.
          </p>
        </div>
      </div>
    </section>
  );
}
