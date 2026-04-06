import Image from "next/image";
import { Container, PrimaryButton, SecondaryButton } from "@/components/ui";
import { getHeroMetadata, getHeroPaddingClass, resolveHeaderCompatibility } from "@/lib/layout-compat";
import { getImagePath, siteConfig } from "@/lib/site-config";

const heroCompatibility = getHeroMetadata(siteConfig.layout.heroVariant);
const headerCompatibility = resolveHeaderCompatibility({
  isHomePage: true,
  headerVariant: siteConfig.layout.headerVariant,
  heroVariant: siteConfig.layout.heroVariant
});
const heroTopPaddingClass = getHeroPaddingClass(headerCompatibility, heroCompatibility);

function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap gap-4">
      <PrimaryButton href="/contact">{siteConfig.hero.primaryCta}</PrimaryButton>
      <SecondaryButton href="/services">{siteConfig.hero.secondaryCta}</SecondaryButton>
    </div>
  );
}

function HeroA() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-shell text-white">
      <Container className={`grid min-h-[74vh] items-center gap-12 py-24 lg:grid-cols-[1.05fr_0.95fr] ${heroTopPaddingClass}`}>
        <div>
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.28em] text-white/70">
            <span>{siteConfig.hero.eyebrow}</span>
            <span className="rounded-full border border-primary/30 px-4 py-2 text-primary">{siteConfig.hero.badge}</span>
          </div>

          <h1 className="max-w-5xl text-5xl font-black leading-none tracking-tight md:text-7xl">{siteConfig.hero.headline}</h1>
          <p className="mt-4 max-w-4xl text-3xl font-black leading-tight text-primary md:text-5xl">{siteConfig.hero.highlight}</p>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-white/80">{siteConfig.hero.subheadline}</p>
          <HeroButtons />
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 shadow-glow">
          <Image src={getImagePath("hero")} alt={siteConfig.brand.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/70 via-slate-950/25 to-transparent" />
        </div>
      </Container>
    </section>
  );
}

function HeroB() {
  return (
    <section className="relative overflow-hidden bg-shell py-24 text-white">
      <Image src={getImagePath("hero")} alt={siteConfig.hero.headline} fill className="object-cover opacity-20" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/30" />
      <Container className={`relative ${heroTopPaddingClass}`}>
        <div className="max-w-4xl rounded-[2rem] border border-white/10 bg-black/25 p-8 backdrop-blur-xl lg:p-12">
          <div className="flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.28em] text-white/70">
            <span>{siteConfig.hero.eyebrow}</span>
            <span className="rounded-full border border-white/20 px-4 py-2 text-primary">{siteConfig.hero.badge}</span>
          </div>
          <h1 className="mt-8 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">{siteConfig.hero.headline}</h1>
          <p className="mt-5 text-3xl font-black text-primary">{siteConfig.hero.highlight}</p>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-200">{siteConfig.hero.subheadline}</p>
          <HeroButtons />
        </div>
      </Container>
    </section>
  );
}

function HeroC() {
  return (
    <section className="bg-panel py-16">
      <Container className={`grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] ${heroTopPaddingClass}`}>
        <div className="rounded-[2rem] bg-shell p-8 text-white shadow-glow lg:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-white/65">{siteConfig.hero.eyebrow}</p>
          <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl">{siteConfig.hero.headline}</h1>
          <p className="mt-6 text-3xl font-black text-accent">{siteConfig.hero.highlight}</p>
          <p className="mt-6 text-lg leading-8 text-white/75">{siteConfig.hero.subheadline}</p>
          <HeroButtons />
        </div>
        <div className="relative overflow-hidden rounded-[2.25rem] border border-line bg-white shadow-soft">
          <Image src={getImagePath("hero")} alt={siteConfig.hero.headline} width={1200} height={800} className="h-[560px] w-full object-cover" priority />
        </div>
      </Container>
    </section>
  );
}

export function HeroSection() {
  switch (siteConfig.layout.heroVariant) {
    case "hero-b":
      return <HeroB />;
    case "hero-c":
      return <HeroC />;
    default:
      return <HeroA />;
  }
}
