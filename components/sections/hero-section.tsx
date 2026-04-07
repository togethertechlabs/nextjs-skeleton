import Image from "next/image";
import { Container, PrimaryButton, SecondaryButton } from "@/components/ui";
import { resolveModuleSpacing, type ResolvedModuleSpacing } from "@/lib/module-spacing";
import { siteBranding } from "@/lib/site-branding";
import { getImagePath, siteConfig } from "@/lib/site-config";

function getHeroCompositionClasses() {
  switch (siteBranding.heroComposition) {
    case "full-bleed":
      return {
        container: "relative flex min-h-[var(--industry-hero-min-height)] items-center justify-center",
        content: "mx-auto max-w-4xl text-center",
        media: "hidden",
        mediaFirst: false,
        contentFirst: true
      };
    case "centered":
      return {
        container: "grid min-h-[calc(var(--industry-hero-min-height)-4vh)] justify-center gap-8",
        content: "mx-auto max-w-4xl text-center",
        media: "mx-auto w-full max-w-5xl",
        mediaFirst: false,
        contentFirst: true
      };
    case "stacked":
      return {
        container: "grid gap-6",
        content: "max-w-4xl",
        media: "order-first w-full",
        mediaFirst: true,
        contentFirst: false
      };
    default:
      return {
        container: "grid min-h-[var(--industry-hero-min-height)] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]",
        content: "",
        media: "",
        mediaFirst: false,
        contentFirst: true
      };
  }
}

function HeroButtons({ centered = false }: { centered?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-4 ${centered ? "justify-center" : ""}`}>
      <PrimaryButton href="/contact">{siteConfig.hero.primaryCta}</PrimaryButton>
      <SecondaryButton href="/services">{siteConfig.hero.secondaryCta}</SecondaryButton>
    </div>
  );
}

function getDefaultHeroSpacing() {
  return resolveModuleSpacing({
    current: "hero",
    designDominance: siteBranding.designDominance,
    premiumMode: siteBranding.premiumMode,
    contentDensity: siteBranding.contentDensity
  });
}

function HeroA({
  topPaddingClass,
  spacing
}: {
  topPaddingClass?: string;
  spacing: ResolvedModuleSpacing;
}) {
  const composition = getHeroCompositionClasses();
  const centered = siteBranding.heroComposition === "centered" || siteBranding.heroComposition === "full-bleed";

  return (
    <section className={`module-section ${spacing.wrapperClass} industry-hero premium-hero relative overflow-hidden border-b border-white/10 bg-shell text-white`}>
      {siteBranding.heroComposition === "full-bleed" ? (
        <div className="industry-hero-media absolute inset-0">
          <Image src={getImagePath("hero")} alt={siteConfig.brand.name} fill className="object-cover opacity-40" priority />
        </div>
      ) : null}
      <Container className={`${composition.container} ${topPaddingClass}`}>
        <div className={`${siteBranding.heroContentClassName} ${composition.content} ${composition.contentFirst ? "order-1" : "order-2"}`}>
          <div className={`mb-5 flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.28em] text-white/70 ${centered ? "justify-center" : ""}`}>
            <span>{siteConfig.hero.eyebrow}</span>
            <span className="industry-chip rounded-full border border-primary/30 px-4 py-2 text-primary">{siteConfig.hero.badge}</span>
          </div>
          <div className={`module-stack ${spacing.innerClass} ${centered ? "items-center" : ""}`}>
            <h1 className="industry-heading max-w-5xl text-5xl font-black leading-none tracking-tight md:text-7xl">{siteConfig.hero.headline}</h1>
            <p className="max-w-4xl text-3xl font-black leading-tight text-primary md:text-5xl">{siteConfig.hero.highlight}</p>
            <p className="max-w-2xl text-lg leading-8 text-white/80 md:text-xl">{siteConfig.hero.subheadline}</p>
            <HeroButtons centered={centered} />
          </div>
        </div>

        <div className={`industry-hero-media relative min-h-[390px] overflow-hidden rounded-[2rem] border border-white/10 shadow-glow ${siteBranding.heroMediaClassName} ${composition.media} ${composition.mediaFirst ? "order-1" : "order-2"}`}>
          <Image src={getImagePath("hero")} alt={siteConfig.brand.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/70 via-slate-950/25 to-transparent" />
        </div>
      </Container>
    </section>
  );
}

function HeroB({
  topPaddingClass,
  spacing
}: {
  topPaddingClass?: string;
  spacing: ResolvedModuleSpacing;
}) {
  const centered = siteBranding.heroComposition === "centered" || siteBranding.heroComposition === "full-bleed";
  const alignClass = centered ? "mx-auto text-center" : siteBranding.heroComposition === "stacked" ? "max-w-4xl" : "max-w-4xl";

  return (
    <section className={`module-section ${spacing.wrapperClass} industry-hero premium-hero relative overflow-hidden bg-shell text-white`}>
      <Image src={getImagePath("hero")} alt={siteConfig.hero.headline} fill className="object-cover opacity-20" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/30" />
      <Container className={`relative ${topPaddingClass}`}>
        <div className={`industry-hero-panel ${spacing.cardClass} module-card-pad rounded-[2rem] border border-white/10 bg-black/25 backdrop-blur-xl ${siteBranding.heroPanelClassName} ${siteBranding.heroContentClassName} ${alignClass}`}>
          <div className={`flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.28em] text-white/70 ${centered ? "justify-center" : ""}`}>
            <span>{siteConfig.hero.eyebrow}</span>
            <span className="industry-chip rounded-full border border-white/20 px-4 py-2 text-primary">{siteConfig.hero.badge}</span>
          </div>
          <div className={`module-stack ${spacing.innerClass} ${spacing.leadClass} ${centered ? "items-center" : ""}`}>
            <h1 className="industry-heading text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">{siteConfig.hero.headline}</h1>
            <p className="text-3xl font-black text-primary">{siteConfig.hero.highlight}</p>
            <p className="max-w-3xl text-lg leading-8 text-slate-200 md:text-xl md:leading-9">{siteConfig.hero.subheadline}</p>
            <HeroButtons centered={centered} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroC({
  topPaddingClass,
  spacing
}: {
  topPaddingClass?: string;
  spacing: ResolvedModuleSpacing;
}) {
  const composition = getHeroCompositionClasses();
  const centered = siteBranding.heroComposition === "centered" || siteBranding.heroComposition === "full-bleed";

  return (
    <section className={`module-section ${spacing.wrapperClass} industry-hero premium-hero bg-panel`}>
      {siteBranding.heroComposition === "full-bleed" ? (
        <div className="industry-hero-media absolute inset-0">
          <Image src={getImagePath("hero")} alt={siteConfig.hero.headline} fill className="object-cover opacity-30" priority />
        </div>
      ) : null}
      <Container className={`${composition.container} ${topPaddingClass}`}>
        <div className={`industry-hero-panel ${spacing.cardClass} module-card-pad rounded-[2rem] bg-shell text-white shadow-glow ${siteBranding.heroPanelClassName} ${siteBranding.heroContentClassName} ${composition.content} ${composition.contentFirst ? "order-1" : "order-2"}`}>
          <p className="text-sm uppercase tracking-[0.35em] text-white/65">{siteConfig.hero.eyebrow}</p>
          <div className={`module-stack ${spacing.innerClass} ${spacing.leadClass} ${centered ? "items-center" : ""}`}>
            <h1 className="industry-heading text-5xl font-black tracking-tight sm:text-6xl">{siteConfig.hero.headline}</h1>
            <p className="text-3xl font-black text-accent">{siteConfig.hero.highlight}</p>
            <p className="text-lg leading-8 text-white/75">{siteConfig.hero.subheadline}</p>
            <HeroButtons centered={centered} />
          </div>
        </div>
        <div className={`industry-hero-media relative overflow-hidden rounded-[2.25rem] border border-line bg-white shadow-soft ${siteBranding.heroMediaClassName} ${composition.media} ${composition.mediaFirst ? "order-1" : "order-2"}`}>
          <Image src={getImagePath("hero")} alt={siteConfig.hero.headline} width={1200} height={800} className="h-[560px] w-full object-cover" priority />
        </div>
      </Container>
    </section>
  );
}

export function HeroSection({
  topPaddingClass = "",
  spacing = getDefaultHeroSpacing()
}: {
  topPaddingClass?: string;
  spacing?: ResolvedModuleSpacing;
}) {
  switch (siteConfig.layout.heroVariant) {
    case "hero-b":
      return <HeroB spacing={spacing} topPaddingClass={topPaddingClass} />;
    case "hero-c":
      return <HeroC spacing={spacing} topPaddingClass={topPaddingClass} />;
    default:
      return <HeroA spacing={spacing} topPaddingClass={topPaddingClass} />;
  }
}
