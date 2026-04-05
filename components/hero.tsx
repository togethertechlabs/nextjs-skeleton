import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-grid bg-[size:42px_42px] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#061032] via-[#071544]/90 to-[#040814]/80" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
        <div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm uppercase tracking-[0.3em] text-white/80">{siteConfig.hero.eyebrow}</span>
            <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              {siteConfig.hero.badge}
            </span>
          </div>
          <h1 className="mt-8 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            {siteConfig.hero.headline}
          </h1>
          <p className="mt-6 text-3xl font-black text-blue-500 sm:text-4xl">{siteConfig.hero.highlight}</p>
          <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-200">{siteConfig.hero.subheadline}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={`tel:${siteConfig.brand.phone.replace(/\s+/g, '')}`}
              className="rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-glow transition hover:bg-blue-500"
            >
              {siteConfig.hero.primaryCta}
            </a>
            <Link
              href="/contact"
              className="rounded-2xl border border-white/20 px-8 py-4 font-semibold text-white transition hover:border-white/50"
            >
              {siteConfig.hero.secondaryCta}
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-blue-500/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-soft">
            <Image
              src={siteConfig.images.hero}
              alt={siteConfig.hero.headline}
              width={900}
              height={900}
              className="h-[520px] w-full rounded-[1.5rem] object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
