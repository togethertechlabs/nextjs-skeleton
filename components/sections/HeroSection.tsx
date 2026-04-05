import Image from 'next/image';
import { SiteConfig } from '@/lib/types';
import { getTheme } from '@/lib/theme';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';

export default function HeroSection({ config }: { config: SiteConfig }) {
  const theme = getTheme(config.brand.theme);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-slate-950 text-white"
      style={{
        ['--primary' as string]: theme.primary,
      }}
    >
      <div className="absolute inset-0">
        <Image src={config.hero.backgroundImage} alt="Hero background" fill className="object-cover" priority />
        <div className="absolute inset-0" style={{ backgroundColor: theme.heroOverlay }} />
        <div className="absolute inset-0 bg-grid-dark grid-lines opacity-20" />
      </div>

      <div className="section-shell relative py-24 md:py-32 lg:py-36">
        <div className="max-w-4xl">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
            <span>{config.hero.eyebrow}</span>
            <span className="rounded-full border px-4 py-2" style={{ borderColor: `${theme.primary}66`, color: theme.primary }}>
              {config.hero.badge}
            </span>
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
            {config.hero.headline}
          </h1>
          <div className="mt-3 text-3xl font-bold md:text-5xl" style={{ color: theme.primary }}>
            {config.hero.highlight}
          </div>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-300 md:text-2xl">
            {config.hero.subheadline}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryButton label={`${config.hero.primaryCta}: ${config.brand.phone}`} href={`tel:${config.brand.phone}`} />
            <SecondaryButton label={config.hero.secondaryCta} href="#contact" />
          </div>
        </div>
      </div>
    </section>
  );
}
