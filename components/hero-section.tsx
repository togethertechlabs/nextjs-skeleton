import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap gap-4">
      <a
        href={`tel:${siteConfig.brand.phone.replace(/\s+/g, '')}`}
        className="rounded-2xl px-8 py-4 font-semibold text-white shadow-premium"
        style={{ background: 'var(--primary)' }}
      >
        {siteConfig.hero.primaryCta}
      </a>
      <Link
        href="/contact"
        className="rounded-2xl border px-8 py-4 font-semibold text-white"
        style={{ borderColor: 'rgba(255,255,255,0.18)' }}
      >
        {siteConfig.hero.secondaryCta}
      </Link>
    </div>
  );
}

function HeroA() {
  return (
    <section className="relative overflow-hidden panel text-white">
      <div className="absolute inset-0 bg-grid bg-[size:42px_42px] opacity-20" />
      <div className="absolute inset-0 hero-overlay" />
      <div className="section-shell relative grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm uppercase tracking-[0.3em] text-white/80">{siteConfig.hero.eyebrow}</span>
            <span className="rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em]" style={{ borderColor: 'color-mix(in srgb, var(--primary) 40%, transparent)', color: 'var(--primary)', background: 'color-mix(in srgb, var(--primary) 12%, transparent)' }}>
              {siteConfig.hero.badge}
            </span>
          </div>
          <h1 className="mt-8 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">{siteConfig.hero.headline}</h1>
          <p className="mt-6 text-3xl font-black sm:text-4xl" style={{ color: 'var(--primary)' }}>{siteConfig.hero.highlight}</p>
          <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-200">{siteConfig.hero.subheadline}</p>
          <HeroButtons />
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] blur-3xl" style={{ background: 'color-mix(in srgb, var(--primary) 16%, transparent)' }} />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-premium">
            <Image src={siteConfig.images.hero} alt={siteConfig.hero.headline} width={900} height={900} className="h-[520px] w-full rounded-[1.5rem] object-cover" priority />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroB() {
  return (
    <section className="relative overflow-hidden panel text-white">
      <Image src={siteConfig.images.hero} alt={siteConfig.hero.headline} fill className="object-cover opacity-20" priority />
      <div className="absolute inset-0 hero-overlay" />
      <div className="section-shell relative py-24 lg:py-32">
        <div className="max-w-4xl rounded-[2rem] border border-white/10 bg-[rgba(8,12,28,0.45)] p-8 backdrop-blur-xl lg:p-12">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm uppercase tracking-[0.3em] text-white/80">{siteConfig.hero.eyebrow}</span>
            <span className="rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em]" style={{ borderColor: 'color-mix(in srgb, var(--accent) 40%, transparent)', color: 'var(--accent)' }}>
              {siteConfig.hero.badge}
            </span>
          </div>
          <h1 className="mt-8 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">{siteConfig.hero.headline}</h1>
          <p className="mt-5 text-3xl font-black" style={{ color: 'var(--primary)' }}>{siteConfig.hero.highlight}</p>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-200">{siteConfig.hero.subheadline}</p>
          <HeroButtons />
        </div>
      </div>
    </section>
  );
}

function HeroC() {
  return (
    <section className="surface py-16 lg:py-20">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[2rem] panel p-8 text-white shadow-premium lg:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-white/65">{siteConfig.hero.eyebrow}</p>
          <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl">{siteConfig.hero.headline}</h1>
          <p className="mt-6 text-3xl font-black" style={{ color: 'var(--accent)' }}>{siteConfig.hero.highlight}</p>
          <p className="mt-6 text-lg leading-8 text-white/75">{siteConfig.hero.subheadline}</p>
          <HeroButtons />
        </div>
        <div className="relative overflow-hidden rounded-[2.25rem] border line surface shadow-premium">
          <Image src={siteConfig.images.hero} alt={siteConfig.hero.headline} width={1200} height={800} className="h-[560px] w-full object-cover" priority />
        </div>
      </div>
    </section>
  );
}

export function HeroSection() {
  switch (siteConfig.layout.heroVariant) {
    case 'hero-b':
      return <HeroB />;
    case 'hero-c':
      return <HeroC />;
    default:
      return <HeroA />;
  }
}
