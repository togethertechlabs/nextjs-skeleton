import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { Container, PrimaryButton, SecondaryButton } from "@/components/ui";

export function HeroSection() {
  const heroImage = siteConfig.images.hero || "/images/generic/hero-1.svg";

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-shell text-white">
      <Container className="grid min-h-[74vh] items-center gap-12 py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.28em] text-white/70">
            <span>{siteConfig.hero.eyebrow || siteConfig.brand.eyebrow}</span>
            <span className="rounded-full border border-primary/30 px-4 py-2 text-primary">
              {siteConfig.hero.badge || siteConfig.brand.badge}
            </span>
          </div>

          <h1 className="max-w-5xl text-5xl font-black leading-none tracking-tight md:text-7xl">
            {siteConfig.hero.headline}
          </h1>

          {siteConfig.hero.highlight ? (
            <p className="mt-4 max-w-4xl text-3xl font-black leading-tight text-primary md:text-5xl">
              {siteConfig.hero.highlight}
            </p>
          ) : null}

          <p className="mt-8 max-w-2xl text-xl leading-8 text-white/80">
            {siteConfig.hero.subheadline}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryButton href="/contact">{siteConfig.hero.primaryCta}</PrimaryButton>
            <SecondaryButton href="/services">{siteConfig.hero.secondaryCta}</SecondaryButton>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 shadow-glow">
          <Image src={heroImage} alt={siteConfig.brand.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/70 via-slate-950/25 to-transparent" />
        </div>
      </Container>
    </section>
  );
}
