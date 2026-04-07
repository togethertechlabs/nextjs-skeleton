import type {
  IntentBusinessIntent,
  IntentConversionStyle,
  PricePosition,
  SectionName,
  ServiceUrgency,
  ThemeName
} from "@/lib/site-config";

export type IndustryKey =
  | "construction"
  | "roofing"
  | "plumbing"
  | "heating"
  | "electrician"
  | "transport"
  | "decorators"
  | "plasterer"
  | "generic";

export type IndustryMood = "industrial" | "technical" | "performance" | "refined" | "crafted" | "balanced";
export type IndustryIntensity = "low" | "medium" | "high";
export type HeroEnergy = "low" | "medium" | "high";
export type PanelStyle = "clean" | "edged" | "durable" | "performance" | "refined" | "crafted";
export type AccentBehavior = "cool" | "signal" | "warning" | "glow" | "refined" | "stone";
export type CtaStyle = "practical" | "assertive" | "technical" | "performance" | "refined";
export type TextureProfile = "none" | "grid" | "strata" | "signal" | "soft-canvas" | "mineral";
export type SectionEmphasis = "standard" | "high";
export type VisualMode = "cinematic" | "clean" | "bold" | "minimal" | "technical";
export type HeroComposition = "split" | "full-bleed" | "centered" | "stacked";
export type AccentStyle = "glow" | "solid" | "outline" | "gradient";
export type SpacingScale = "normal" | "spacious";
export type DesignDominance = "hero" | "services" | "cta" | "trust" | "balanced";
export type SectionScaleValue = "sm" | "md" | "lg" | "xl";
export type ContrastProfile = "soft" | "balanced" | "high";
export type ContentDensity = "tight" | "balanced" | "spacious";

export type SectionScale = {
  hero: SectionScaleValue;
  trustBar: "sm" | "md" | "lg";
  about: "sm" | "md" | "lg";
  coverage: "sm" | "md" | "lg";
  services: SectionScaleValue;
  testimonials: "sm" | "md" | "lg";
  faq: "sm" | "md" | "lg";
  cta: SectionScaleValue;
};

export type IndustryBranding = {
  key: IndustryKey;
  mood: IndustryMood;
  intensity: IndustryIntensity;
  premiumMode: boolean;
  spacingScale: SpacingScale;
  designDominance: DesignDominance;
  sectionScale: SectionScale;
  contrastProfile: ContrastProfile;
  heroEnergy: HeroEnergy;
  visualMode: VisualMode;
  heroComposition: HeroComposition;
  accentStyle: AccentStyle;
  visualSeed: number;
  panelStyle: PanelStyle;
  accentBehavior: AccentBehavior;
  ctaStyle: CtaStyle;
  textureProfile: TextureProfile;
  contentDensity: ContentDensity;
  sectionEmphasis: Record<SectionName, SectionEmphasis>;
  sectionSpacingClassName: string;
  shellClassName: string;
  heroContentClassName: string;
  heroPanelClassName: string;
  heroMediaClassName: string;
  servicesGridClassName: string;
  cssVars: Record<string, string>;
};

type BrandingInput = {
  industry: string;
  subIndustry?: string;
  folder?: string;
  theme?: ThemeName;
  seedSource?: string;
  premiumMode?: boolean;
  businessIntent?: IntentBusinessIntent;
  conversionStyle?: IntentConversionStyle;
  serviceUrgency?: ServiceUrgency;
  pricePosition?: PricePosition;
  targetCustomer?: string[];
  tone?: string[];
  visualStyle?: string[];
  brandHeroEnergy?: HeroEnergy;
  brandCtaStyle?: "direct" | "consultative" | "urgent" | "premium";
};

function hashString(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash >>> 0);
}

function pickDeterministic<T>(options: readonly T[], seed: number, offset = 0): T {
  return options[(seed + offset) % options.length];
}

function normalizeTags(values?: string[]) {
  return (values || []).map((value) => value.toLowerCase().trim()).filter(Boolean);
}

function includesAny(values: string[], patterns: string[]) {
  return values.some((value) => patterns.some((pattern) => value.includes(pattern)));
}

function detectIndustryKey(input: BrandingInput): IndustryKey {
  const combined = `${input.industry} ${input.subIndustry || ""} ${input.folder || ""}`.toLowerCase();

  if (combined.includes("transport") || combined.includes("hgv") || combined.includes("fleet") || combined.includes("mechanic") || combined.includes("mobile technical")) {
    return "transport";
  }
  if (combined.includes("electric")) return "electrician";
  if (combined.includes("roof")) return "roofing";
  if (combined.includes("plumb")) return "plumbing";
  if (combined.includes("heating") || combined.includes("boiler") || combined.includes("gas")) return "heating";
  if (combined.includes("construct") || combined.includes("builder") || combined.includes("design and build")) return "construction";
  if (combined.includes("decorat") || combined.includes("paint")) return "decorators";
  if (combined.includes("plaster") || combined.includes("render")) return "plasterer";

  return "generic";
}

function createSectionEmphasis(overrides: Partial<Record<SectionName, SectionEmphasis>> = {}): Record<SectionName, SectionEmphasis> {
  return {
    hero: "high",
    trustBar: "standard",
    services: "standard",
    about: "standard",
    coverage: "standard",
    testimonials: "standard",
    faq: "standard",
    cta: "standard",
    ...overrides
  };
}

type BrandingBase = Omit<
  IndustryBranding,
  | "premiumMode"
  | "spacingScale"
  | "designDominance"
  | "sectionScale"
  | "contrastProfile"
  | "heroEnergy"
  | "visualMode"
  | "accentStyle"
  | "heroComposition"
  | "visualSeed"
  | "sectionSpacingClassName"
>;

const brandingMap: Record<IndustryKey, BrandingBase> = {
  construction: {
    key: "construction",
    mood: "industrial",
    intensity: "high",
    panelStyle: "edged",
    accentBehavior: "warning",
    ctaStyle: "assertive",
    textureProfile: "grid",
    contentDensity: "tight",
    sectionEmphasis: createSectionEmphasis({ trustBar: "high", services: "high", cta: "high" }),
    shellClassName: "industry-shell industry-shell-industrial",
    heroContentClassName: "max-w-5xl",
    heroPanelClassName: "industry-panel-strong",
    heroMediaClassName: "industry-frame-hard",
    servicesGridClassName: "lg:grid-cols-3",
    cssVars: {
      "--industry-accent-strong": "#ea580c",
      "--industry-accent-soft": "rgba(234, 88, 12, 0.12)",
      "--industry-accent-glow": "rgba(234, 88, 12, 0.26)",
      "--industry-frame-color": "rgba(234, 88, 12, 0.24)",
      "--industry-header-glow": "rgba(234, 88, 12, 0.18)"
    }
  },
  roofing: {
    key: "roofing",
    mood: "industrial",
    intensity: "high",
    panelStyle: "durable",
    accentBehavior: "warning",
    ctaStyle: "assertive",
    textureProfile: "strata",
    contentDensity: "tight",
    sectionEmphasis: createSectionEmphasis({ trustBar: "high", services: "high" }),
    shellClassName: "industry-shell industry-shell-rugged",
    heroContentClassName: "max-w-5xl",
    heroPanelClassName: "industry-panel-durable",
    heroMediaClassName: "industry-frame-rugged",
    servicesGridClassName: "lg:grid-cols-3",
    cssVars: {
      "--industry-accent-strong": "#dc2626",
      "--industry-accent-soft": "rgba(220, 38, 38, 0.12)",
      "--industry-accent-glow": "rgba(220, 38, 38, 0.24)",
      "--industry-frame-color": "rgba(220, 38, 38, 0.22)",
      "--industry-header-glow": "rgba(220, 38, 38, 0.16)"
    }
  },
  plumbing: {
    key: "plumbing",
    mood: "technical",
    intensity: "medium",
    panelStyle: "clean",
    accentBehavior: "cool",
    ctaStyle: "practical",
    textureProfile: "grid",
    contentDensity: "balanced",
    sectionEmphasis: createSectionEmphasis({ hero: "high", cta: "high" }),
    shellClassName: "industry-shell industry-shell-clean",
    heroContentClassName: "max-w-4xl",
    heroPanelClassName: "industry-panel-clean",
    heroMediaClassName: "industry-frame-clean",
    servicesGridClassName: "lg:grid-cols-3",
    cssVars: {
      "--industry-accent-strong": "#38bdf8",
      "--industry-accent-soft": "rgba(56, 189, 248, 0.12)",
      "--industry-accent-glow": "rgba(56, 189, 248, 0.28)",
      "--industry-frame-color": "rgba(56, 189, 248, 0.22)",
      "--industry-header-glow": "rgba(56, 189, 248, 0.16)"
    }
  },
  heating: {
    key: "heating",
    mood: "technical",
    intensity: "medium",
    panelStyle: "clean",
    accentBehavior: "warning",
    ctaStyle: "technical",
    textureProfile: "grid",
    contentDensity: "balanced",
    sectionEmphasis: createSectionEmphasis({ hero: "high", services: "high", cta: "high" }),
    shellClassName: "industry-shell industry-shell-technical",
    heroContentClassName: "max-w-4xl",
    heroPanelClassName: "industry-panel-clean",
    heroMediaClassName: "industry-frame-clean",
    servicesGridClassName: "lg:grid-cols-3",
    cssVars: {
      "--industry-accent-strong": "#fb923c",
      "--industry-accent-soft": "rgba(251, 146, 60, 0.12)",
      "--industry-accent-glow": "rgba(251, 146, 60, 0.28)",
      "--industry-frame-color": "rgba(251, 146, 60, 0.22)",
      "--industry-header-glow": "rgba(251, 146, 60, 0.16)"
    }
  },
  electrician: {
    key: "electrician",
    mood: "technical",
    intensity: "high",
    panelStyle: "edged",
    accentBehavior: "glow",
    ctaStyle: "technical",
    textureProfile: "signal",
    contentDensity: "balanced",
    sectionEmphasis: createSectionEmphasis({ hero: "high", services: "high", cta: "high" }),
    shellClassName: "industry-shell industry-shell-electric",
    heroContentClassName: "max-w-5xl",
    heroPanelClassName: "industry-panel-charged",
    heroMediaClassName: "industry-frame-electric",
    servicesGridClassName: "lg:grid-cols-3",
    cssVars: {
      "--industry-accent-strong": "#facc15",
      "--industry-accent-soft": "rgba(250, 204, 21, 0.16)",
      "--industry-accent-glow": "rgba(250, 204, 21, 0.4)",
      "--industry-frame-color": "rgba(250, 204, 21, 0.28)",
      "--industry-header-glow": "rgba(250, 204, 21, 0.24)"
    }
  },
  transport: {
    key: "transport",
    mood: "performance",
    intensity: "high",
    panelStyle: "performance",
    accentBehavior: "glow",
    ctaStyle: "performance",
    textureProfile: "signal",
    contentDensity: "tight",
    sectionEmphasis: createSectionEmphasis({ hero: "high", trustBar: "high", services: "high", cta: "high" }),
    shellClassName: "industry-shell industry-shell-performance",
    heroContentClassName: "max-w-5xl",
    heroPanelClassName: "industry-panel-performance",
    heroMediaClassName: "industry-frame-performance",
    servicesGridClassName: "lg:grid-cols-3",
    cssVars: {
      "--industry-accent-strong": "#22d3ee",
      "--industry-accent-soft": "rgba(34, 211, 238, 0.16)",
      "--industry-accent-glow": "rgba(34, 211, 238, 0.38)",
      "--industry-frame-color": "rgba(34, 211, 238, 0.3)",
      "--industry-header-glow": "rgba(34, 211, 238, 0.24)"
    }
  },
  decorators: {
    key: "decorators",
    mood: "refined",
    intensity: "low",
    panelStyle: "refined",
    accentBehavior: "refined",
    ctaStyle: "refined",
    textureProfile: "soft-canvas",
    contentDensity: "spacious",
    sectionEmphasis: createSectionEmphasis({ about: "high", testimonials: "high" }),
    shellClassName: "industry-shell industry-shell-refined",
    heroContentClassName: "max-w-4xl",
    heroPanelClassName: "industry-panel-refined",
    heroMediaClassName: "industry-frame-refined",
    servicesGridClassName: "lg:grid-cols-3",
    cssVars: {
      "--industry-accent-strong": "#f97316",
      "--industry-accent-soft": "rgba(249, 115, 22, 0.1)",
      "--industry-accent-glow": "rgba(249, 115, 22, 0.16)",
      "--industry-frame-color": "rgba(249, 115, 22, 0.18)",
      "--industry-header-glow": "rgba(249, 115, 22, 0.12)"
    }
  },
  plasterer: {
    key: "plasterer",
    mood: "crafted",
    intensity: "medium",
    panelStyle: "crafted",
    accentBehavior: "stone",
    ctaStyle: "practical",
    textureProfile: "mineral",
    contentDensity: "balanced",
    sectionEmphasis: createSectionEmphasis({ about: "high", services: "high" }),
    shellClassName: "industry-shell industry-shell-crafted",
    heroContentClassName: "max-w-4xl",
    heroPanelClassName: "industry-panel-crafted",
    heroMediaClassName: "industry-frame-crafted",
    servicesGridClassName: "lg:grid-cols-3",
    cssVars: {
      "--industry-accent-strong": "#a16207",
      "--industry-accent-soft": "rgba(161, 98, 7, 0.1)",
      "--industry-accent-glow": "rgba(161, 98, 7, 0.18)",
      "--industry-frame-color": "rgba(161, 98, 7, 0.18)",
      "--industry-header-glow": "rgba(161, 98, 7, 0.12)"
    }
  },
  generic: {
    key: "generic",
    mood: "balanced",
    intensity: "medium",
    panelStyle: "clean",
    accentBehavior: "cool",
    ctaStyle: "practical",
    textureProfile: "none",
    contentDensity: "balanced",
    sectionEmphasis: createSectionEmphasis({ hero: "high", cta: "high" }),
    shellClassName: "industry-shell industry-shell-clean",
    heroContentClassName: "max-w-4xl",
    heroPanelClassName: "industry-panel-clean",
    heroMediaClassName: "industry-frame-clean",
    servicesGridClassName: "lg:grid-cols-3",
    cssVars: {
      "--industry-accent-strong": "#2563eb",
      "--industry-accent-soft": "rgba(37, 99, 235, 0.1)",
      "--industry-accent-glow": "rgba(37, 99, 235, 0.24)",
      "--industry-frame-color": "rgba(37, 99, 235, 0.2)",
      "--industry-header-glow": "rgba(37, 99, 235, 0.14)"
    }
  }
};

function getAllowedVisualModes(key: IndustryKey, premiumMode: boolean): readonly VisualMode[] {
  switch (key) {
    case "transport":
      return premiumMode ? ["cinematic", "bold", "technical"] : ["bold", "technical", "cinematic"];
    case "electrician":
      return premiumMode ? ["cinematic", "technical", "bold"] : ["technical", "bold", "cinematic"];
    case "construction":
    case "roofing":
      return premiumMode ? ["cinematic", "bold", "technical"] : ["bold", "technical", "cinematic"];
    case "plumbing":
    case "heating":
      return premiumMode ? ["cinematic", "clean", "technical"] : ["clean", "technical", "bold"];
    case "decorators":
    case "plasterer":
      return premiumMode ? ["cinematic", "minimal", "clean"] : ["minimal", "clean", "cinematic"];
    default:
      return premiumMode ? ["cinematic", "bold", "clean", "technical"] : ["clean", "bold", "technical", "minimal"];
  }
}

function getAllowedAccentStyles(visualMode: VisualMode): readonly AccentStyle[] {
  switch (visualMode) {
    case "cinematic":
      return ["gradient", "glow"];
    case "bold":
      return ["solid", "gradient"];
    case "minimal":
      return ["outline", "solid"];
    case "technical":
      return ["outline", "solid", "gradient"];
    default:
      return ["solid", "outline", "gradient"];
  }
}

function getAllowedHeroCompositions(key: IndustryKey, visualMode: VisualMode, premiumMode: boolean): readonly HeroComposition[] {
  if (premiumMode && visualMode === "cinematic") return ["full-bleed", "centered", "split"];
  if (key === "transport" || key === "electrician") return ["split", "full-bleed", "centered", "stacked"];
  if (key === "decorators" || key === "plasterer") return ["centered", "stacked", "split", "full-bleed"];
  return ["split", "centered", "full-bleed", "stacked"];
}

function getAllowedDesignDominance(
  key: IndustryKey,
  premiumMode: boolean,
  visualMode: VisualMode,
  heroEnergy: HeroEnergy
): readonly DesignDominance[] {
  if (key === "transport") return premiumMode ? ["hero", "cta", "services", "balanced"] : ["hero", "services", "cta", "balanced"];
  if (key === "electrician") return premiumMode ? ["hero", "cta", "services", "balanced"] : ["cta", "services", "hero", "balanced"];
  if (key === "construction") return premiumMode ? ["services", "trust", "hero", "balanced"] : ["services", "trust", "balanced", "hero"];
  if (key === "roofing") return premiumMode ? ["trust", "services", "cta", "balanced"] : ["trust", "services", "balanced", "cta"];
  if (key === "plumbing" || key === "heating") return premiumMode ? ["cta", "services", "trust", "balanced"] : ["cta", "trust", "services", "balanced"];
  if (key === "decorators") return premiumMode ? ["hero", "balanced", "services"] : ["balanced", "hero", "services"];
  if (key === "plasterer") return premiumMode ? ["services", "balanced", "trust"] : ["balanced", "services", "trust"];
  if (visualMode === "cinematic" || heroEnergy === "high") return ["hero", "balanced", "services", "cta"];
  return ["balanced", "services", "cta", "trust", "hero"];
}

function resolveIntentContentDensity(current: ContentDensity, input: BrandingInput): ContentDensity {
  if (input.businessIntent === "high-end-brand" || input.businessIntent === "portfolio-showcase" || input.pricePosition === "luxury") {
    return "spacious";
  }
  if (input.businessIntent === "emergency-service" || input.serviceUrgency === "high") {
    return "tight";
  }
  return current;
}

function resolveContrastProfile(
  key: IndustryKey,
  premiumMode: boolean,
  visualMode: VisualMode,
  intensity: IndustryIntensity,
  input: BrandingInput
): ContrastProfile {
  if (input.businessIntent === "emergency-service" || input.serviceUrgency === "high") return "high";
  if (input.businessIntent === "authority-trust") return "balanced";
  if (input.conversionStyle === "soft") return "soft";
  if (key === "transport" || key === "electrician") return "high";
  if (visualMode === "bold" || (premiumMode && visualMode === "cinematic")) return "high";
  if (key === "decorators" || key === "plasterer" || visualMode === "minimal") return "soft";
  if (intensity === "high") return "high";
  return "balanced";
}

function getDefaultSectionScale(): SectionScale {
  return {
    hero: "lg",
    trustBar: "md",
    about: "md",
    coverage: "md",
    services: "lg",
    testimonials: "md",
    faq: "sm",
    cta: "lg"
  };
}

function resolveSectionScale(
  dominance: DesignDominance,
  premiumMode: boolean,
  density: ContentDensity,
  input: BrandingInput
): SectionScale {
  const scale = getDefaultSectionScale();

  if (premiumMode) {
    scale.hero = "xl";
  }

  if (density === "tight") {
    scale.trustBar = "sm";
    scale.about = "sm";
    scale.testimonials = "sm";
  }

  if (density === "spacious") {
    scale.about = "lg";
    scale.testimonials = "lg";
    scale.faq = "md";
  }

  if (input.businessIntent === "emergency-service" || input.serviceUrgency === "high") {
    scale.cta = premiumMode ? "xl" : "lg";
  }

  if (input.businessIntent === "authority-trust") {
    scale.trustBar = "lg";
    scale.testimonials = "lg";
    scale.cta = "md";
  }

  switch (dominance) {
    case "hero":
      scale.hero = premiumMode ? "xl" : "lg";
      scale.testimonials = "sm";
      scale.faq = "sm";
      break;
    case "services":
      scale.services = premiumMode ? "xl" : "lg";
      scale.testimonials = "sm";
      break;
    case "cta":
      scale.cta = premiumMode ? "xl" : "lg";
      scale.about = "sm";
      scale.testimonials = "sm";
      break;
    case "trust":
      scale.trustBar = "lg";
      scale.testimonials = "lg";
      scale.cta = "md";
      break;
    default:
      break;
  }

  return scale;
}

function getSectionSpacingClassName(density: ContentDensity, visualMode: VisualMode, premiumMode: boolean) {
  if (premiumMode && density === "spacious") return "industry-section-space-premium";
  if (density === "spacious" || visualMode === "minimal") return "industry-section-space-relaxed";
  if (density === "tight" || visualMode === "bold") return "industry-section-space-compact";
  return "industry-section-space-balanced";
}

function getVariationCssVars(
  contentDensity: ContentDensity,
  heroEnergy: HeroEnergy,
  visualMode: VisualMode,
  accentStyle: AccentStyle,
  premiumMode: boolean,
  seed: number
) {
  const radiusOptions = contentDensity === "spacious"
    ? ["1.9rem", "2rem", "2.1rem"]
    : contentDensity === "tight"
      ? ["1.35rem", "1.5rem", "1.65rem"]
      : ["1.55rem", "1.7rem", "1.85rem"];
  const buttonPxOptions = premiumMode ? ["1.7rem", "1.9rem", "2.1rem"] : ["1.45rem", "1.6rem", "1.8rem"];
  const buttonPyOptions = premiumMode ? ["1rem", "1.08rem", "1.18rem"] : ["0.9rem", "1rem", "1.08rem"];
  const cardPaddingOptions = premiumMode ? ["2rem", "2.25rem", "2.5rem"] : ["1.6rem", "1.85rem", "2.1rem"];
  const spacingOptions = premiumMode ? ["6rem", "7rem", "8rem"] : ["4.5rem", "5.5rem", "6.5rem"];

  return {
    "--industry-card-radius": pickDeterministic(radiusOptions, seed, 1),
    "--industry-button-px": pickDeterministic(buttonPxOptions, seed, 2),
    "--industry-button-py": pickDeterministic(buttonPyOptions, seed, 3),
    "--industry-card-padding": pickDeterministic(cardPaddingOptions, seed, 4),
    "--industry-section-gap": pickDeterministic(spacingOptions, seed, 5),
    "--industry-glow-strength": heroEnergy === "high" ? (premiumMode ? "1.18" : "0.96") : heroEnergy === "medium" ? "0.78" : "0.56",
    "--industry-vignette-opacity": heroEnergy === "high" ? "0.62" : heroEnergy === "medium" ? "0.42" : "0.28",
    "--industry-surface-contrast": visualMode === "minimal" ? "0.92" : visualMode === "bold" ? "1.18" : "1.04",
    "--industry-shadow-depth": heroEnergy === "high" ? "1.18" : heroEnergy === "medium" ? "1" : "0.84",
    "--industry-section-wash-opacity": visualMode === "cinematic" ? "0.94" : "0.82",
    "--industry-hero-min-height": premiumMode ? "80vh" : "74vh",
    "--industry-heading-scale": premiumMode ? "1.08" : "1",
    "--industry-density-scale": contentDensity === "spacious" ? "1.08" : contentDensity === "tight" ? "0.92" : "1",
    "--industry-accent-fill-mode": accentStyle
  };
}

export function resolveIndustryBranding(input: BrandingInput): IndustryBranding {
  const key = detectIndustryKey(input);
  const base = brandingMap[key];
  const tone = normalizeTags(input.tone);
  const visualStyle = normalizeTags(input.visualStyle);
  const seed = hashString(
    [
      input.seedSource || "",
      input.industry,
      input.subIndustry || "",
      input.folder || "",
      input.theme || "",
      input.businessIntent || "",
      input.conversionStyle || "",
      input.serviceUrgency || "",
      input.pricePosition || "",
      ...tone,
      ...visualStyle
    ].join("|")
  );

  const premiumMode = input.premiumMode ?? (input.pricePosition === "premium" || input.pricePosition === "luxury");
  const heroEnergy: HeroEnergy = input.serviceUrgency || input.brandHeroEnergy || (base.intensity === "high" ? "high" : "medium");
  let visualMode = pickDeterministic(getAllowedVisualModes(key, premiumMode), seed, 0);
  let accentStyle = pickDeterministic(getAllowedAccentStyles(visualMode), seed, 1);
  let heroComposition = pickDeterministic(getAllowedHeroCompositions(key, visualMode, premiumMode), seed, 2);
  let contentDensity = resolveIntentContentDensity(base.contentDensity, input);

  if (includesAny(tone, ["premium", "luxury", "bespoke"]) || includesAny(visualStyle, ["editorial", "cinematic"])) {
    visualMode = "cinematic";
  }
  if (input.businessIntent === "emergency-service") {
    accentStyle = "solid";
  }
  if (input.businessIntent === "high-end-brand" || input.businessIntent === "portfolio-showcase") {
    heroComposition = pickDeterministic(["full-bleed", "centered", "split"], seed, 6);
  }
  if (input.conversionStyle === "soft") {
    accentStyle = "outline";
  }

  let designDominance = pickDeterministic(getAllowedDesignDominance(key, premiumMode, visualMode, heroEnergy), seed, 3);
  if (input.businessIntent === "emergency-service") designDominance = "cta";
  if (input.businessIntent === "high-end-brand" || input.businessIntent === "portfolio-showcase") designDominance = "hero";
  if (input.businessIntent === "authority-trust") designDominance = "trust";
  if (input.serviceUrgency === "high" && designDominance === "balanced") designDominance = "cta";

  const contrastProfile = resolveContrastProfile(key, premiumMode, visualMode, base.intensity, input);
  const sectionScale = resolveSectionScale(designDominance, premiumMode, contentDensity, input);
  const ctaStyle: CtaStyle =
    input.brandCtaStyle === "urgent"
      ? "assertive"
      : input.brandCtaStyle === "premium"
        ? "refined"
        : input.brandCtaStyle === "consultative"
          ? "technical"
          : base.ctaStyle;

  return {
    ...base,
    premiumMode,
    spacingScale: premiumMode ? "spacious" : "normal",
    designDominance,
    sectionScale,
    contrastProfile,
    heroEnergy,
    visualMode,
    heroComposition,
    accentStyle,
    visualSeed: seed,
    ctaStyle,
    contentDensity,
    sectionSpacingClassName: getSectionSpacingClassName(contentDensity, visualMode, premiumMode),
    shellClassName: [
      base.shellClassName,
      premiumMode ? "premium-shell" : "",
      `industry-visual-${visualMode}`,
      `industry-accent-${accentStyle}`,
      `industry-composition-${heroComposition}`
    ].filter(Boolean).join(" "),
    cssVars: {
      ...base.cssVars,
      ...getVariationCssVars(contentDensity, heroEnergy, visualMode, accentStyle, premiumMode, seed)
    }
  };
}

export function getIndustrySectionWrapperClass(branding: IndustryBranding, section: SectionName) {
  const emphasis = branding.sectionEmphasis[section];
  const sectionScale = branding.sectionScale[section];
  const sectionDominanceKey =
    section === "trustBar" || section === "testimonials"
      ? "trust"
      : section === "hero" || section === "services" || section === "cta"
        ? section
        : "balanced";
  const dominanceClass = branding.designDominance === sectionDominanceKey
    ? `dominant-${sectionDominanceKey}`
    : `supporting-${sectionDominanceKey}`;

  return [
    "industry-section",
    branding.premiumMode ? "premium-section" : "",
    emphasis === "high" ? "industry-section-emphasis-high" : "industry-section-emphasis-standard",
    branding.sectionSpacingClassName,
    `scale-${sectionScale}`,
    `density-${branding.contentDensity}`,
    `contrast-${branding.contrastProfile}`,
    dominanceClass
  ].filter(Boolean).join(" ");
}
