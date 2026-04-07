import Image from "next/image";
import { Container, PrimaryButton, SecondaryButton } from "@/components/ui";
import { resolveModuleSpacing, type ResolvedModuleSpacing } from "@/lib/module-spacing";
import { resolveModuleStyling, type ResolvedModuleStyling } from "@/lib/module-styling";
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

function getDefaultHeroStyling() {
  return resolveModuleStyling({
    current: "hero",
    branding: siteBranding
  });
}

function HeroA({
  topPaddingClass,
  spacing,
  styling
}: {
  topPaddingClass?: string;
  spacing: ResolvedModuleSpacing;
  styling: ResolvedModuleStyling;
}) {
  const composition = getHeroCompositionClasses();
  const centered = siteBranding.heroComposition === "centered" || siteBranding.heroComposition === "full-bleed";

  return (
    <section className={`module-section ${spacing.wrapperClass} ${styling.sectionClass} industry-hero premium-hero relative overflow-hidden border-b border-white/10`}>
      {siteBranding.heroComposition === "full-bleed" ? (
        <div className="industry-hero-media absolute inset-0">
          <Image src={getImagePath("hero")} alt={siteConfig.brand.name} fill className="object-cover opacity-40" priority />
        </div>
      ) : null}
      <Container className={`${composition.container} ${topPaddingClass}`}>
        <div className={`${siteBranding.heroContentClassName} ${composition.content} ${composition.contentFirst ? "order-1" : "order-2"}`}>
          <div className={`module-text-muted mb-5 flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.28em] ${centered ? "justify-center" : ""}`}>
            <span>{siteConfig.hero.eyebrow}</span>
            <span className={`industry-chip ${styling.badgeClass} rounded-full px-4 py-2`}>{siteConfig.hero.badge}</span>
          </div>
          <div className={`module-stack ${spacing.innerClass} ${centered ? "items-center" : ""}`}>
            <h1 className={`industry-heading ${styling.titleClass} max-w-5xl text-5xl font-black leading-none tracking-tight md:text-7xl`}>{siteConfig.hero.headline}</h1>
            <p className={`${styling.accentClass} max-w-4xl text-3xl font-black leading-tight md:text-5xl`}>{siteConfig.hero.highlight}</p>
            <p className={`${styling.bodyClass} max-w-2xl text-lg leading-8 md:text-xl`}>{siteConfig.hero.subheadline}</p>
            <HeroButtons centered={centered} />
          </div>
        </div>

        <div className={`industry-hero-media relative min-h-[390px] overflow-hidden rounded-[2rem] border border-white/10 shadow-glow ${siteBranding.heroMediaClassName} ${composition.media} ${composition.mediaFirst ? "order-1" : "order-2"}`}>
          <Image src={getImagePath("hero")} alt={siteConfig.brand.name} fill className="object-cover" priority />
          <div className={`absolute inset-0 ${styling.overlayClass}`} />
        </div>
      </Container>
    </section>
  );
}

function HeroB({
  topPaddingClass,
  spacing,
  styling
}: {
  topPaddingClass?: string;
  spacing: ResolvedModuleSpacing;
  styling: ResolvedModuleStyling;
}) {
  const centered = siteBranding.heroComposition === "centered" || siteBranding.heroComposition === "full-bleed";
  const alignClass = centered ? "mx-auto text-center" : siteBranding.heroComposition === "stacked" ? "max-w-4xl" : "max-w-4xl";

  return (
    <section className={`module-section ${spacing.wrapperClass} ${styling.sectionClass} industry-hero premium-hero relative overflow-hidden`}>
      <Image src={getImagePath("hero")} alt={siteConfig.hero.headline} fill className="object-cover opacity-20" priority />
      <div className={`absolute inset-0 ${styling.overlayClass}`} />
      <Container className={`relative ${topPaddingClass}`}>
        <div className={`industry-hero-panel ${styling.panelClass} ${spacing.cardClass} module-card-pad rounded-[2rem] backdrop-blur-xl ${siteBranding.heroPanelClassName} ${siteBranding.heroContentClassName} ${alignClass}`}>
          <div className={`module-text-muted flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.28em] ${centered ? "justify-center" : ""}`}>
            <span>{siteConfig.hero.eyebrow}</span>
            <span className={`industry-chip ${styling.badgeClass} rounded-full px-4 py-2`}>{siteConfig.hero.badge}</span>
          </div>
          <div className={`module-stack ${spacing.innerClass} ${spacing.leadClass} ${centered ? "items-center" : ""}`}>
            <h1 className={`industry-heading ${styling.titleClass} text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl`}>{siteConfig.hero.headline}</h1>
            <p className={`${styling.accentClass} text-3xl font-black`}>{siteConfig.hero.highlight}</p>
            <p className={`${styling.bodyClass} max-w-3xl text-lg leading-8 md:text-xl md:leading-9`}>{siteConfig.hero.subheadline}</p>
            <HeroButtons centered={centered} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroC({
  topPaddingClass,
  spacing,
  styling
}: {
  topPaddingClass?: string;
  spacing: ResolvedModuleSpacing;
  styling: ResolvedModuleStyling;
}) {
  const composition = getHeroCompositionClasses();
  const centered = siteBranding.heroComposition === "centered" || siteBranding.heroComposition === "full-bleed";

  return (
    <section className={`module-section ${spacing.wrapperClass} ${styling.sectionClass} industry-hero premium-hero`}>
      {siteBranding.heroComposition === "full-bleed" ? (
        <div className="industry-hero-media absolute inset-0">
          <Image src={getImagePath("hero")} alt={siteConfig.hero.headline} fill className="object-cover opacity-30" priority />
        </div>
      ) : null}
      <Container className={`${composition.container} ${topPaddingClass}`}>
        <div className={`industry-hero-panel ${styling.panelClass} ${spacing.cardClass} module-card-pad rounded-[2rem] shadow-glow ${siteBranding.heroPanelClassName} ${siteBranding.heroContentClassName} ${composition.content} ${composition.contentFirst ? "order-1" : "order-2"}`}>
          <p className={`${styling.mutedClass} text-sm uppercase tracking-[0.35em]`}>{siteConfig.hero.eyebrow}</p>
          <div className={`module-stack ${spacing.innerClass} ${spacing.leadClass} ${centered ? "items-center" : ""}`}>
            <h1 className={`industry-heading ${styling.titleClass} text-5xl font-black tracking-tight sm:text-6xl`}>{siteConfig.hero.headline}</h1>
            <p className={`${styling.accentClass} text-3xl font-black`}>{siteConfig.hero.highlight}</p>
            <p className={`${styling.bodyClass} text-lg leading-8`}>{siteConfig.hero.subheadline}</p>
            <HeroButtons centered={centered} />
          </div>
        </div>
        <div className={`industry-hero-media ${styling.cardClass} relative overflow-hidden rounded-[2.25rem] border shadow-soft ${siteBranding.heroMediaClassName} ${composition.media} ${composition.mediaFirst ? "order-1" : "order-2"}`}>
          <Image src={getImagePath("hero")} alt={siteConfig.hero.headline} width={1200} height={800} className="h-[560px] w-full object-cover" priority />
        </div>
      </Container>
    </section>
  );
}

export function HeroSection({
  topPaddingClass = "",
  spacing = getDefaultHeroSpacing(),
  styling = getDefaultHeroStyling()
}: {
  topPaddingClass?: string;
  spacing?: ResolvedModuleSpacing;
  styling?: ResolvedModuleStyling;
}) {
  switch (siteConfig.layout.heroVariant) {
    case "hero-b":
      return <HeroB spacing={spacing} styling={styling} topPaddingClass={topPaddingClass} />;
    case "hero-c":
      return <HeroC spacing={spacing} styling={styling} topPaddingClass={topPaddingClass} />;
    default:
      return <HeroA spacing={spacing} styling={styling} topPaddingClass={topPaddingClass} />;
  }
}
