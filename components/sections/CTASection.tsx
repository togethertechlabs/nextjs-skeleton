import { SiteConfig } from '@/lib/types';
import { getTheme } from '@/lib/theme';
import PrimaryButton from '@/components/ui/PrimaryButton';

export default function CTASection({ config }: { config: SiteConfig }) {
  const theme = getTheme(config.brand.theme);
  return (
    <section className="section-spacing bg-slate-50">
      <div className="section-shell">
        <div className="rounded-[2.2rem] px-10 py-12 text-white shadow-2xl" style={{ background: `linear-gradient(135deg, ${theme.secondary}, ${theme.surface})`, ['--primary' as string]: theme.primary }}>
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em]" style={{ color: theme.primary }}>Ready to get started?</div>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">{config.cta.heading}</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">{config.cta.body}</p>
            <div className="mt-8">
              <PrimaryButton label={config.cta.button} href={`tel:${config.brand.phone}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
