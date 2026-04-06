import type {
  AboutVariant,
  CoverageVariant,
  CtaVariant,
  FaqVariant,
  HeaderVariant,
  HeroVariant,
  ServicesVariant,
  TestimonialsVariant
} from "@/lib/site-config";

export type Tone = "light" | "dark" | "mixed";
export type Density = "airy" | "balanced" | "dense";
export type PageKind = "home" | "interior";

export type HeaderMetadata = {
  mode: "solid" | "glass";
  tone: "light" | "dark";
  overlaysHero: boolean;
};

export type HeroMetadata = {
  tone: Tone;
  busyImage: boolean;
  needsExtraTopPadding: boolean;
};

export type SectionMetadata = {
  tone: Tone;
  density: Density;
};

export type ResolvedHeaderCompatibility = HeaderMetadata & {
  scrolledTone: "light" | "dark";
  scrolledMode: "solid" | "glass";
  contrastLayer: "none" | "soft-dark" | "soft-light" | "strong-dark";
};

export type TestimonialsCompatibility = {
  variant: TestimonialsVariant;
  spacingClassName: string;
};

export type VariantValidationIssue =
  | "overlay-disabled-for-busy-hero"
  | "interior-pages-do-not-overlay-hero"
  | "hero-padding-disabled-without-overlay"
  | "dark-heavy-section-before-testimonials";

export type LayoutValidationResult = {
  issues: VariantValidationIssue[];
};

export type PageCompatibilityPlan = {
  pageKind: PageKind;
  header: ResolvedHeaderCompatibility;
  hero: HeroMetadata;
  validation: LayoutValidationResult;
};

function dedupeIssues(issues: VariantValidationIssue[]): VariantValidationIssue[] {
  return issues.filter((issue, index) => issues.indexOf(issue) === index);
}

export function getHeaderMetadata(variant: HeaderVariant): HeaderMetadata {
  if (variant === "header-b") {
    return {
      mode: "solid",
      tone: "dark",
      overlaysHero: false
    };
  }

  return {
    mode: "glass",
    tone: "light",
    overlaysHero: true
  };
}

export function getHeroMetadata(variant: HeroVariant): HeroMetadata {
  switch (variant) {
    case "hero-b":
      return {
        tone: "dark",
        busyImage: true,
        needsExtraTopPadding: true
      };
    case "hero-c":
      return {
        tone: "mixed",
        busyImage: false,
        needsExtraTopPadding: false
      };
    default:
      return {
        tone: "dark",
        busyImage: false,
        needsExtraTopPadding: true
      };
  }
}

export function validateVariantCombination(options: {
  pageKind: PageKind;
  headerVariant: HeaderVariant;
  heroVariant: HeroVariant;
  previousSection?: SectionMetadata | null;
}): LayoutValidationResult {
  const issues: VariantValidationIssue[] = [];
  const header = getHeaderMetadata(options.headerVariant);
  const hero = getHeroMetadata(options.heroVariant);

  if (header.overlaysHero && hero.busyImage) {
    issues.push("overlay-disabled-for-busy-hero");
  }

  if (options.pageKind === "interior" && header.overlaysHero) {
    issues.push("interior-pages-do-not-overlay-hero");
  }

  if (!header.overlaysHero && hero.needsExtraTopPadding) {
    issues.push("hero-padding-disabled-without-overlay");
  }

  if (options.previousSection && (options.previousSection.tone === "dark" || options.previousSection.density === "dense")) {
    issues.push("dark-heavy-section-before-testimonials");
  }

  return {
    issues: dedupeIssues(issues)
  };
}

function getContrastLayer(options: {
  headerMode: "solid" | "glass";
  headerTone: "light" | "dark";
  heroTone: Tone;
  heroBusyImage: boolean;
  overlaysHero: boolean;
}): ResolvedHeaderCompatibility["contrastLayer"] {
  if (!options.overlaysHero) {
    return options.headerTone === "light" ? "soft-dark" : "soft-light";
  }

  if (options.heroBusyImage) {
    return "strong-dark";
  }

  if (options.headerMode === "glass" && options.heroTone !== "light") {
    return "soft-dark";
  }

  if (options.headerMode === "glass" && options.heroTone === "light") {
    return "soft-light";
  }

  return "none";
}

export function resolveHeaderCompatibility(options: {
  pageKind: PageKind;
  headerVariant: HeaderVariant;
  heroVariant: HeroVariant;
}): ResolvedHeaderCompatibility {
  const base = getHeaderMetadata(options.headerVariant);
  const hero = getHeroMetadata(options.heroVariant);
  const validation = validateVariantCombination(options);

  if (options.pageKind !== "home") {
    return {
      ...base,
      mode: "solid",
      tone: "dark",
      overlaysHero: false,
      scrolledTone: "dark",
      scrolledMode: "solid",
      contrastLayer: "soft-light"
    };
  }

  const overlaysHero = base.overlaysHero && !hero.busyImage;
  const mode = overlaysHero ? base.mode : "solid";
  const tone = overlaysHero ? (hero.tone === "light" ? "dark" : "light") : "dark";

  return {
    mode,
    tone,
    overlaysHero,
    scrolledTone: "dark",
    scrolledMode: "solid",
    contrastLayer: getContrastLayer({
      headerMode: mode,
      headerTone: tone,
      heroTone: hero.tone,
      heroBusyImage: hero.busyImage,
      overlaysHero
    })
  };
}

export function resolvePageCompatibility(options: {
  pageKind: PageKind;
  headerVariant: HeaderVariant;
  heroVariant: HeroVariant;
}): PageCompatibilityPlan {
  return {
    pageKind: options.pageKind,
    header: resolveHeaderCompatibility(options),
    hero: getHeroMetadata(options.heroVariant),
    validation: validateVariantCombination(options)
  };
}

export function getHeroSectionMetadata(variant: HeroVariant): SectionMetadata {
  return {
    tone: getHeroMetadata(variant).tone,
    density: "balanced"
  };
}

export function getHeroPaddingClass(plan: PageCompatibilityPlan) {
  if (!plan.header.overlaysHero || !plan.hero.needsExtraTopPadding) {
    return "";
  }

  return "pt-32 md:pt-36 lg:pt-40";
}

export function getInteriorContentOffsetClass(plan: PageCompatibilityPlan) {
  if (plan.header.overlaysHero) {
    return "pt-32 md:pt-36";
  }

  return "";
}

export function getHeaderSurfaceClass(
  compatibility: ResolvedHeaderCompatibility,
  scrolled: boolean
) {
  const tone = scrolled ? compatibility.scrolledTone : compatibility.tone;
  const mode = scrolled ? compatibility.scrolledMode : compatibility.mode;

  if (tone === "light") {
    if (mode === "glass" && !scrolled) {
      return "border-white/10 bg-slate-950/35 text-white backdrop-blur-xl";
    }

    return "border-white/10 bg-shell/95 text-white shadow-lg backdrop-blur";
  }

  if (mode === "glass" && !scrolled) {
    return "border-line/60 bg-white/80 text-ink backdrop-blur-xl";
  }

  return "border-line bg-white/95 text-ink shadow-sm backdrop-blur";
}

export function getHeaderContrastClass(compatibility: ResolvedHeaderCompatibility, scrolled: boolean) {
  if (scrolled) {
    return "";
  }

  switch (compatibility.contrastLayer) {
    case "strong-dark":
      return "after:absolute after:inset-0 after:bg-slate-950/55 after:backdrop-blur-md after:content-['']";
    case "soft-dark":
      return "after:absolute after:inset-0 after:bg-slate-950/24 after:content-['']";
    case "soft-light":
      return "after:absolute after:inset-0 after:bg-white/12 after:content-['']";
    default:
      return "";
  }
}

export function getTopBarClass(compatibility: ResolvedHeaderCompatibility, scrolled: boolean) {
  if (compatibility.overlaysHero && !scrolled) {
    return "border-b border-white/10 bg-black/20 text-white backdrop-blur";
  }

  return "border-b border-line bg-white text-ink";
}

export function getServicesSectionMetadata(variant: ServicesVariant): SectionMetadata {
  switch (variant) {
    case "services-c":
      return { tone: "dark", density: "dense" };
    case "services-b":
      return { tone: "light", density: "balanced" };
    default:
      return { tone: "light", density: "balanced" };
  }
}

export function getAboutSectionMetadata(variant: AboutVariant): SectionMetadata {
  return variant === "about-b"
    ? { tone: "light", density: "balanced" }
    : { tone: "mixed", density: "balanced" };
}

export function getCoverageSectionMetadata(variant: CoverageVariant): SectionMetadata {
  return variant === "coverage-b"
    ? { tone: "light", density: "airy" }
    : { tone: "light", density: "balanced" };
}

export function getFaqSectionMetadata(_variant: FaqVariant): SectionMetadata {
  return { tone: "light", density: "balanced" };
}

export function getCtaSectionMetadata(variant: CtaVariant): SectionMetadata {
  switch (variant) {
    case "cta-b":
      return { tone: "dark", density: "dense" };
    case "cta-c":
      return { tone: "mixed", density: "balanced" };
    default:
      return { tone: "mixed", density: "balanced" };
  }
}

export function getTrustBarSectionMetadata(): SectionMetadata {
  return { tone: "dark", density: "dense" };
}

export function getTestimonialsSectionMetadata(variant: TestimonialsVariant): SectionMetadata {
  return variant === "testimonials-b"
    ? { tone: "light", density: "balanced" }
    : { tone: "dark", density: "balanced" };
}

export function getSectionTransitionClass(previous: SectionMetadata | null, current: SectionMetadata) {
  if (!previous) return "";

  const changedTone = previous.tone !== current.tone;
  const denseStack = previous.density === "dense" && current.density !== "airy";

  if (changedTone && (previous.tone === "dark" || current.tone === "dark")) {
    return "pt-8 md:pt-10";
  }

  if (denseStack) {
    return "pt-6 md:pt-8";
  }

  return "";
}

export function getTestimonialsCompatibility(
  previous: SectionMetadata | null,
  desired: TestimonialsVariant
): TestimonialsCompatibility {
  const validation = validateVariantCombination({
    pageKind: "home",
    headerVariant: "header-a",
    heroVariant: "hero-a",
    previousSection: previous
  });

  if (validation.issues.includes("dark-heavy-section-before-testimonials")) {
    return {
      variant: "testimonials-b",
      spacingClassName: "pt-10 md:pt-14"
    };
  }

  return {
    variant: desired,
    spacingClassName: "pt-4 md:pt-6"
  };
}
