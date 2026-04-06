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
};

export type TestimonialsCompatibility = {
  variant: TestimonialsVariant;
  spacingClassName: string;
};

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

export function resolveHeaderCompatibility(options: {
  isHomePage: boolean;
  headerVariant: HeaderVariant;
  heroVariant: HeroVariant;
}): ResolvedHeaderCompatibility {
  const base = getHeaderMetadata(options.headerVariant);
  const hero = getHeroMetadata(options.heroVariant);

  if (!options.isHomePage) {
    return {
      ...base,
      mode: "solid",
      tone: "dark",
      overlaysHero: false,
      scrolledTone: "dark",
      scrolledMode: "solid"
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
    scrolledMode: "solid"
  };
}

export function getHeroPaddingClass(header: ResolvedHeaderCompatibility, hero: HeroMetadata) {
  if (!header.overlaysHero || !hero.needsExtraTopPadding) {
    return "";
  }

  return "pt-32 md:pt-36 lg:pt-40";
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

export function getTestimonialsCompatibility(previous: SectionMetadata | null, desired: TestimonialsVariant): TestimonialsCompatibility {
  const previousIsDarkOrHeavy =
    previous?.tone === "dark" || previous?.density === "dense";

  if (previousIsDarkOrHeavy) {
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
