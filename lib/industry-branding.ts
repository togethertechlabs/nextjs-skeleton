import type { SectionName, ThemeName } from "@/lib/site-config";

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

export type IndustryBranding = {
  key: IndustryKey;
  mood: IndustryMood;
  intensity: IndustryIntensity;
  heroEnergy: HeroEnergy;
  visualMode: VisualMode;
  heroComposition: HeroComposition;
  accentStyle: AccentStyle;
  visualSeed: number;
  panelStyle: PanelStyle;
  accentBehavior: AccentBehavior;
  ctaStyle: CtaStyle;
  textureProfile: TextureProfile;
  contentDensity: "airy" | "balanced" | "dense";
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
  folder?: string;
  theme?: ThemeName;
  seedSource?: string;
};

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function detectIndustryKey({ industry, folder }: BrandingInput): IndustryKey {
  const combined = `${industry} ${folder || ""}`.toLowerCase();

  if (combined.includes("transport") || combined.includes("hgv") || combined.includes("fleet") || combined.includes("mechanic") || combined.includes("mobile technical")) {
    return "transport";
  }
  if (combined.includes("electric")) return "electrician";
  if (combined.includes("roof")) return "roofing";
  if (combined.includes("plumb")) return "plumbing";
  if (combined.includes("heating") || combined.includes("boiler") || combined.includes("gas")) return "heating";
  if (combined.includes("construct") || combined.includes("builder")) return "construction";
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

type IndustryBrandingBase = Omit<
  IndustryBranding,
  "key" | "visualMode" | "heroComposition" | "accentStyle" | "visualSeed" | "sectionSpacingClassName"
>;

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

function getAllowedVisualModes(key: IndustryKey): readonly VisualMode[] {
  switch (key) {
    case "transport":
      return ["cinematic", "bold", "technical"];
    case "electrician":
      return ["technical", "bold", "cinematic"];
    case "construction":
    case "roofing":
      return ["bold", "cinematic", "technical"];
    case "plumbing":
    case "heating":
      return ["clean", "technical", "bold"];
    case "decorators":
      return ["minimal", "clean", "cinematic"];
    case "plasterer":
      return ["minimal", "clean", "bold"];
    default:
      return ["clean", "bold", "technical", "minimal"];
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

function getAllowedHeroCompositions(key: IndustryKey, visualMode: VisualMode): readonly HeroComposition[] {
  if (visualMode === "cinematic") return ["full-bleed", "split", "centered"];
  if (visualMode === "minimal") return ["centered", "stacked", "split"];
  if (key === "transport" || key === "electrician") return ["split", "full-bleed", "centered"];
  if (key === "decorators" || key === "plasterer") return ["centered", "stacked", "split"];

  return ["split", "centered", "stacked", "full-bleed"];
}

function getSectionSpacingClassName(contentDensity: IndustryBrandingBase["contentDensity"], visualMode: VisualMode) {
  if (visualMode === "minimal" || contentDensity === "airy") return "industry-section-space-relaxed";
  if (visualMode === "bold" || contentDensity === "dense") return "industry-section-space-compact";
  return "industry-section-space-balanced";
}

function getVariationCssVars(
  base: IndustryBrandingBase,
  visualMode: VisualMode,
  accentStyle: AccentStyle,
  seed: number
) {
  const radiusOptions = base.contentDensity === "airy"
    ? ["1.9rem", "2rem", "2.1rem"]
    : base.contentDensity === "dense"
      ? ["1.35rem", "1.5rem", "1.65rem"]
      : ["1.55rem", "1.7rem", "1.85rem"];
  const surfaceContrast = visualMode === "minimal" ? "0.82" : visualMode === "bold" ? "1.18" : visualMode === "cinematic" ? "1.12" : "1";
  const shadowDepth = base.heroEnergy === "high" ? "1.2" : base.heroEnergy === "medium" ? "1" : "0.82";
  const glowStrength = base.heroEnergy === "high"
    ? (visualMode === "cinematic" ? "1.2" : "1")
    : base.heroEnergy === "medium"
      ? "0.78"
      : "0.5";
  const vignetteOpacity = base.heroEnergy === "high" ? "0.62" : base.heroEnergy === "medium" ? "0.42" : "0.26";
  const sectionWashOpacity = base.heroEnergy === "high" ? "1" : base.heroEnergy === "medium" ? "0.86" : "0.72";
  const buttonPxOptions = ["1.45rem", "1.6rem", "1.8rem"];
  const buttonPyOptions = ["0.9rem", "1rem", "1.08rem"];
  const cardPaddingOptions = ["1.6rem", "1.85rem", "2.1rem"];
  const spacingOptions = ["4.5rem", "5.5rem", "6.5rem"];

  return {
    "--industry-card-radius": pickDeterministic(radiusOptions, seed, 1),
    "--industry-glow-strength": glowStrength,
    "--industry-vignette-opacity": vignetteOpacity,
    "--industry-surface-contrast": surfaceContrast,
    "--industry-shadow-depth": shadowDepth,
    "--industry-section-wash-opacity": sectionWashOpacity,
    "--industry-button-px": pickDeterministic(buttonPxOptions, seed, 2),
    "--industry-button-py": pickDeterministic(buttonPyOptions, seed, 3),
    "--industry-card-padding": pickDeterministic(cardPaddingOptions, seed, 4),
    "--industry-section-gap": pickDeterministic(spacingOptions, seed, 5),
    "--industry-accent-fill-mode": accentStyle
  };
}

const brandingMap: Record<IndustryKey, IndustryBrandingBase> = {
  construction: {
    mood: "industrial",
    intensity: "high",
    heroEnergy: "medium",
    panelStyle: "edged",
    accentBehavior: "warning",
    ctaStyle: "assertive",
    textureProfile: "grid",
    contentDensity: "dense",
    sectionEmphasis: createSectionEmphasis({ trustBar: "high", services: "high", cta: "high" }),
    shellClassName: "industry-shell industry-shell-industrial",
    heroContentClassName: "max-w-5xl",
    heroPanelClassName: "industry-panel-strong",
    heroMediaClassName: "industry-frame-hard",
    servicesGridClassName: "lg:grid-cols-3",
    cssVars: {
      "--industry-accent-strong": "#f59e0b",
      "--industry-accent-soft": "rgba(245, 158, 11, 0.14)",
      "--industry-accent-glow": "rgba(245, 158, 11, 0.42)",
      "--industry-frame-color": "rgba(245, 158, 11, 0.28)",
      "--industry-card-shadow": "0 18px 40px rgba(15, 23, 42, 0.14)",
      "--industry-button-shadow": "0 16px 32px rgba(245, 158, 11, 0.22)",
      "--industry-chip-bg": "rgba(245, 158, 11, 0.12)",
      "--industry-chip-border": "rgba(245, 158, 11, 0.3)",
      "--industry-divider": "rgba(245, 158, 11, 0.18)",
      "--industry-heading-weight": "920",
      "--industry-heading-spacing": "-0.045em",
      "--industry-card-radius": "1.55rem",
      "--industry-panel-overlay": "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(51,65,85,0.8))",
      "--industry-hero-light": "radial-gradient(circle at 18% 22%, rgba(245,158,11,0.2), transparent 42%)",
      "--industry-hero-tint": "linear-gradient(115deg, rgba(15,23,42,0.78), rgba(15,23,42,0.32) 48%, rgba(15,23,42,0.88))",
      "--industry-hero-vignette": "radial-gradient(circle at 50% 42%, transparent 32%, rgba(2,6,23,0.42) 100%)",
      "--industry-section-wash": "linear-gradient(180deg, rgba(245,158,11,0.06), transparent 28%, transparent 72%, rgba(15,23,42,0.08))",
      "--industry-surface-sheen": "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02) 28%, transparent 68%)",
      "--industry-surface-lowlight": "radial-gradient(circle at bottom right, rgba(15,23,42,0.18), transparent 46%)",
      "--industry-header-glow": "rgba(245, 158, 11, 0.18)"
    }
  },
  roofing: {
    mood: "industrial",
    intensity: "high",
    heroEnergy: "medium",
    panelStyle: "durable",
    accentBehavior: "signal",
    ctaStyle: "assertive",
    textureProfile: "strata",
    contentDensity: "dense",
    sectionEmphasis: createSectionEmphasis({ services: "high", testimonials: "high", cta: "high" }),
    shellClassName: "industry-shell industry-shell-rugged",
    heroContentClassName: "max-w-4xl",
    heroPanelClassName: "industry-panel-durable",
    heroMediaClassName: "industry-frame-rugged",
    servicesGridClassName: "lg:grid-cols-3",
    cssVars: {
      "--industry-accent-strong": "#ef4444",
      "--industry-accent-soft": "rgba(239, 68, 68, 0.12)",
      "--industry-accent-glow": "rgba(239, 68, 68, 0.36)",
      "--industry-frame-color": "rgba(100, 116, 139, 0.3)",
      "--industry-card-shadow": "0 18px 42px rgba(15, 23, 42, 0.16)",
      "--industry-button-shadow": "0 16px 32px rgba(239, 68, 68, 0.18)",
      "--industry-chip-bg": "rgba(148, 163, 184, 0.12)",
      "--industry-chip-border": "rgba(148, 163, 184, 0.26)",
      "--industry-divider": "rgba(100, 116, 139, 0.24)",
      "--industry-heading-weight": "900",
      "--industry-heading-spacing": "-0.042em",
      "--industry-card-radius": "1.45rem",
      "--industry-panel-overlay": "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(31,41,55,0.84))",
      "--industry-hero-light": "radial-gradient(circle at 78% 18%, rgba(239,68,68,0.14), transparent 44%)",
      "--industry-hero-tint": "linear-gradient(125deg, rgba(15,23,42,0.82), rgba(31,41,55,0.3) 46%, rgba(17,24,39,0.9))",
      "--industry-hero-vignette": "radial-gradient(circle at 50% 42%, transparent 28%, rgba(2,6,23,0.5) 100%)",
      "--industry-section-wash": "linear-gradient(180deg, rgba(100,116,139,0.08), transparent 22%, transparent 76%, rgba(15,23,42,0.08))",
      "--industry-surface-sheen": "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02) 24%, transparent 68%)",
      "--industry-surface-lowlight": "radial-gradient(circle at bottom right, rgba(15,23,42,0.2), transparent 48%)",
      "--industry-header-glow": "rgba(239, 68, 68, 0.14)"
    }
  },
  plumbing: {
    mood: "technical",
    intensity: "medium",
    heroEnergy: "medium",
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
      "--industry-accent-glow": "rgba(56, 189, 248, 0.3)",
      "--industry-frame-color": "rgba(56, 189, 248, 0.26)",
      "--industry-card-shadow": "0 16px 34px rgba(37, 99, 235, 0.1)",
      "--industry-button-shadow": "0 14px 28px rgba(56, 189, 248, 0.18)",
      "--industry-chip-bg": "rgba(56, 189, 248, 0.1)",
      "--industry-chip-border": "rgba(56, 189, 248, 0.24)",
      "--industry-divider": "rgba(56, 189, 248, 0.16)",
      "--industry-heading-weight": "880",
      "--industry-heading-spacing": "-0.035em",
      "--industry-card-radius": "1.7rem",
      "--industry-panel-overlay": "linear-gradient(135deg, rgba(15,23,42,0.94), rgba(30,64,175,0.72))",
      "--industry-hero-light": "radial-gradient(circle at 16% 18%, rgba(56,189,248,0.16), transparent 44%)",
      "--industry-hero-tint": "linear-gradient(120deg, rgba(15,23,42,0.7), rgba(30,64,175,0.18) 42%, rgba(15,23,42,0.82))",
      "--industry-hero-vignette": "radial-gradient(circle at 50% 40%, transparent 34%, rgba(15,23,42,0.36) 100%)",
      "--industry-section-wash": "linear-gradient(180deg, rgba(56,189,248,0.04), transparent 26%, transparent 74%, rgba(15,23,42,0.04))",
      "--industry-surface-sheen": "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.05) 28%, transparent 70%)",
      "--industry-surface-lowlight": "radial-gradient(circle at bottom right, rgba(30,64,175,0.08), transparent 50%)",
      "--industry-header-glow": "rgba(56, 189, 248, 0.14)"
    }
  },
  heating: {
    mood: "technical",
    intensity: "medium",
    heroEnergy: "medium",
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
      "--industry-accent-glow": "rgba(251, 146, 60, 0.32)",
      "--industry-frame-color": "rgba(251, 146, 60, 0.24)",
      "--industry-card-shadow": "0 16px 34px rgba(251, 146, 60, 0.12)",
      "--industry-button-shadow": "0 14px 28px rgba(249, 115, 22, 0.18)",
      "--industry-chip-bg": "rgba(251, 146, 60, 0.1)",
      "--industry-chip-border": "rgba(251, 146, 60, 0.24)",
      "--industry-divider": "rgba(251, 146, 60, 0.16)",
      "--industry-heading-weight": "890",
      "--industry-heading-spacing": "-0.036em",
      "--industry-card-radius": "1.65rem",
      "--industry-panel-overlay": "linear-gradient(135deg, rgba(30,41,59,0.95), rgba(154,52,18,0.68))",
      "--industry-hero-light": "radial-gradient(circle at 80% 18%, rgba(251,146,60,0.16), transparent 42%)",
      "--industry-hero-tint": "linear-gradient(120deg, rgba(30,41,59,0.74), rgba(154,52,18,0.12) 44%, rgba(30,41,59,0.84))",
      "--industry-hero-vignette": "radial-gradient(circle at 50% 42%, transparent 34%, rgba(15,23,42,0.36) 100%)",
      "--industry-section-wash": "linear-gradient(180deg, rgba(251,146,60,0.05), transparent 26%, transparent 72%, rgba(30,41,59,0.04))",
      "--industry-surface-sheen": "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04) 26%, transparent 68%)",
      "--industry-surface-lowlight": "radial-gradient(circle at bottom right, rgba(154,52,18,0.08), transparent 48%)",
      "--industry-header-glow": "rgba(251, 146, 60, 0.15)"
    }
  },
  electrician: {
    mood: "technical",
    intensity: "high",
    heroEnergy: "high",
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
      "--industry-accent-glow": "rgba(250, 204, 21, 0.46)",
      "--industry-frame-color": "rgba(250, 204, 21, 0.32)",
      "--industry-card-shadow": "0 18px 40px rgba(15, 23, 42, 0.16)",
      "--industry-button-shadow": "0 18px 34px rgba(250, 204, 21, 0.24)",
      "--industry-chip-bg": "rgba(250, 204, 21, 0.12)",
      "--industry-chip-border": "rgba(250, 204, 21, 0.32)",
      "--industry-divider": "rgba(250, 204, 21, 0.18)",
      "--industry-heading-weight": "910",
      "--industry-heading-spacing": "-0.04em",
      "--industry-card-radius": "1.55rem",
      "--industry-panel-overlay": "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(180,83,9,0.55))",
      "--industry-hero-light": "radial-gradient(circle at 82% 16%, rgba(250,204,21,0.22), transparent 40%)",
      "--industry-hero-tint": "linear-gradient(120deg, rgba(15,23,42,0.78), rgba(180,83,9,0.1) 40%, rgba(15,23,42,0.9))",
      "--industry-hero-vignette": "radial-gradient(circle at 50% 44%, transparent 30%, rgba(2,6,23,0.5) 100%)",
      "--industry-section-wash": "linear-gradient(180deg, rgba(250,204,21,0.06), transparent 24%, transparent 74%, rgba(15,23,42,0.08))",
      "--industry-surface-sheen": "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.05) 24%, transparent 66%)",
      "--industry-surface-lowlight": "radial-gradient(circle at bottom right, rgba(15,23,42,0.18), transparent 48%)",
      "--industry-header-glow": "rgba(250, 204, 21, 0.24)"
    }
  },
  transport: {
    mood: "performance",
    intensity: "high",
    heroEnergy: "high",
    panelStyle: "performance",
    accentBehavior: "glow",
    ctaStyle: "performance",
    textureProfile: "signal",
    contentDensity: "dense",
    sectionEmphasis: createSectionEmphasis({ hero: "high", trustBar: "high", services: "high", cta: "high" }),
    shellClassName: "industry-shell industry-shell-performance",
    heroContentClassName: "max-w-5xl",
    heroPanelClassName: "industry-panel-performance",
    heroMediaClassName: "industry-frame-performance",
    servicesGridClassName: "lg:grid-cols-3",
    cssVars: {
      "--industry-accent-strong": "#22d3ee",
      "--industry-accent-soft": "rgba(34, 211, 238, 0.16)",
      "--industry-accent-glow": "rgba(34, 211, 238, 0.42)",
      "--industry-frame-color": "rgba(34, 211, 238, 0.34)",
      "--industry-card-shadow": "0 22px 48px rgba(8, 15, 35, 0.24)",
      "--industry-button-shadow": "0 20px 36px rgba(34, 211, 238, 0.24)",
      "--industry-chip-bg": "rgba(34, 211, 238, 0.14)",
      "--industry-chip-border": "rgba(34, 211, 238, 0.34)",
      "--industry-divider": "rgba(34, 211, 238, 0.22)",
      "--industry-heading-weight": "930",
      "--industry-heading-spacing": "-0.05em",
      "--industry-card-radius": "1.45rem",
      "--industry-panel-overlay": "linear-gradient(135deg, rgba(2,6,23,0.98), rgba(14,116,144,0.58))",
      "--industry-hero-light": "radial-gradient(circle at 80% 20%, rgba(34,211,238,0.24), transparent 40%)",
      "--industry-hero-tint": "linear-gradient(122deg, rgba(2,6,23,0.88), rgba(14,116,144,0.18) 42%, rgba(2,6,23,0.92))",
      "--industry-hero-vignette": "radial-gradient(circle at 52% 42%, transparent 28%, rgba(2,6,23,0.56) 100%)",
      "--industry-section-wash": "linear-gradient(180deg, rgba(34,211,238,0.08), transparent 22%, transparent 72%, rgba(2,6,23,0.1))",
      "--industry-surface-sheen": "linear-gradient(180deg, rgba(255,255,255,0.24), rgba(255,255,255,0.05) 24%, transparent 64%)",
      "--industry-surface-lowlight": "radial-gradient(circle at bottom right, rgba(8,15,35,0.24), transparent 46%)",
      "--industry-header-glow": "rgba(34, 211, 238, 0.26)"
    }
  },
  decorators: {
    mood: "refined",
    intensity: "low",
    heroEnergy: "low",
    panelStyle: "refined",
    accentBehavior: "refined",
    ctaStyle: "refined",
    textureProfile: "soft-canvas",
    contentDensity: "airy",
    sectionEmphasis: createSectionEmphasis({ about: "high", testimonials: "high" }),
    shellClassName: "industry-shell industry-shell-refined",
    heroContentClassName: "max-w-4xl",
    heroPanelClassName: "industry-panel-refined",
    heroMediaClassName: "industry-frame-refined",
    servicesGridClassName: "lg:grid-cols-3",
    cssVars: {
      "--industry-accent-strong": "#f97316",
      "--industry-accent-soft": "rgba(249, 115, 22, 0.1)",
      "--industry-accent-glow": "rgba(249, 115, 22, 0.18)",
      "--industry-frame-color": "rgba(249, 115, 22, 0.18)",
      "--industry-card-shadow": "0 14px 28px rgba(148, 163, 184, 0.12)",
      "--industry-button-shadow": "0 12px 24px rgba(249, 115, 22, 0.12)",
      "--industry-chip-bg": "rgba(249, 115, 22, 0.08)",
      "--industry-chip-border": "rgba(249, 115, 22, 0.18)",
      "--industry-divider": "rgba(249, 115, 22, 0.12)",
      "--industry-heading-weight": "840",
      "--industry-heading-spacing": "-0.03em",
      "--industry-card-radius": "1.9rem",
      "--industry-panel-overlay": "linear-gradient(135deg, rgba(255,255,255,0.94), rgba(251,146,60,0.16))",
      "--industry-hero-light": "radial-gradient(circle at 18% 18%, rgba(249,115,22,0.12), transparent 42%)",
      "--industry-hero-tint": "linear-gradient(120deg, rgba(255,255,255,0.26), rgba(251,146,60,0.08) 42%, rgba(255,255,255,0.1))",
      "--industry-hero-vignette": "radial-gradient(circle at 50% 42%, transparent 40%, rgba(15,23,42,0.12) 100%)",
      "--industry-section-wash": "linear-gradient(180deg, rgba(249,115,22,0.03), transparent 28%, transparent 74%, rgba(148,163,184,0.04))",
      "--industry-surface-sheen": "linear-gradient(180deg, rgba(255,255,255,0.34), rgba(255,255,255,0.08) 30%, transparent 72%)",
      "--industry-surface-lowlight": "radial-gradient(circle at bottom right, rgba(249,115,22,0.05), transparent 50%)",
      "--industry-header-glow": "rgba(249, 115, 22, 0.12)"
    }
  },
  plasterer: {
    mood: "crafted",
    intensity: "medium",
    heroEnergy: "low",
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
      "--industry-accent-glow": "rgba(161, 98, 7, 0.2)",
      "--industry-frame-color": "rgba(120, 113, 108, 0.24)",
      "--industry-card-shadow": "0 16px 30px rgba(28, 25, 23, 0.12)",
      "--industry-button-shadow": "0 14px 26px rgba(161, 98, 7, 0.14)",
      "--industry-chip-bg": "rgba(161, 98, 7, 0.08)",
      "--industry-chip-border": "rgba(161, 98, 7, 0.18)",
      "--industry-divider": "rgba(120, 113, 108, 0.16)",
      "--industry-heading-weight": "860",
      "--industry-heading-spacing": "-0.032em",
      "--industry-card-radius": "1.8rem",
      "--industry-panel-overlay": "linear-gradient(135deg, rgba(68,64,60,0.95), rgba(214,211,209,0.52))",
      "--industry-hero-light": "radial-gradient(circle at 22% 18%, rgba(161,98,7,0.12), transparent 42%)",
      "--industry-hero-tint": "linear-gradient(120deg, rgba(68,64,60,0.72), rgba(214,211,209,0.08) 44%, rgba(68,64,60,0.78))",
      "--industry-hero-vignette": "radial-gradient(circle at 50% 42%, transparent 38%, rgba(28,25,23,0.18) 100%)",
      "--industry-section-wash": "linear-gradient(180deg, rgba(120,113,108,0.04), transparent 28%, transparent 74%, rgba(68,64,60,0.04))",
      "--industry-surface-sheen": "linear-gradient(180deg, rgba(255,255,255,0.24), rgba(255,255,255,0.06) 28%, transparent 70%)",
      "--industry-surface-lowlight": "radial-gradient(circle at bottom right, rgba(120,113,108,0.08), transparent 48%)",
      "--industry-header-glow": "rgba(161, 98, 7, 0.12)"
    }
  },
  generic: {
    mood: "balanced",
    intensity: "medium",
    heroEnergy: "medium",
    panelStyle: "clean",
    accentBehavior: "cool",
    ctaStyle: "practical",
    textureProfile: "none",
    contentDensity: "balanced",
    sectionEmphasis: createSectionEmphasis({ hero: "high", cta: "high" }),
    shellClassName: "industry-shell industry-shell-balanced",
    heroContentClassName: "max-w-4xl",
    heroPanelClassName: "industry-panel-clean",
    heroMediaClassName: "industry-frame-clean",
    servicesGridClassName: "lg:grid-cols-3",
    cssVars: {
      "--industry-accent-strong": "#2563eb",
      "--industry-accent-soft": "rgba(37, 99, 235, 0.1)",
      "--industry-accent-glow": "rgba(37, 99, 235, 0.24)",
      "--industry-frame-color": "rgba(37, 99, 235, 0.2)",
      "--industry-card-shadow": "0 16px 32px rgba(15, 23, 42, 0.1)",
      "--industry-button-shadow": "0 14px 28px rgba(37, 99, 235, 0.16)",
      "--industry-chip-bg": "rgba(37, 99, 235, 0.1)",
      "--industry-chip-border": "rgba(37, 99, 235, 0.2)",
      "--industry-divider": "rgba(37, 99, 235, 0.14)",
      "--industry-heading-weight": "880",
      "--industry-heading-spacing": "-0.035em",
      "--industry-card-radius": "1.75rem",
      "--industry-panel-overlay": "linear-gradient(135deg, rgba(15,23,42,0.94), rgba(59,130,246,0.38))",
      "--industry-hero-light": "radial-gradient(circle at 18% 18%, rgba(37,99,235,0.14), transparent 42%)",
      "--industry-hero-tint": "linear-gradient(120deg, rgba(15,23,42,0.74), rgba(59,130,246,0.08) 42%, rgba(15,23,42,0.82))",
      "--industry-hero-vignette": "radial-gradient(circle at 50% 42%, transparent 36%, rgba(15,23,42,0.26) 100%)",
      "--industry-section-wash": "linear-gradient(180deg, rgba(37,99,235,0.04), transparent 26%, transparent 74%, rgba(15,23,42,0.04))",
      "--industry-surface-sheen": "linear-gradient(180deg, rgba(255,255,255,0.24), rgba(255,255,255,0.05) 28%, transparent 72%)",
      "--industry-surface-lowlight": "radial-gradient(circle at bottom right, rgba(37,99,235,0.06), transparent 50%)",
      "--industry-header-glow": "rgba(37, 99, 235, 0.14)"
    }
  }
};

export function resolveIndustryBranding(input: BrandingInput): IndustryBranding {
  const key = detectIndustryKey(input);
  const base = brandingMap[key];
  const seed = hashString(`${input.seedSource || ""}|${input.industry}|${input.folder || ""}|${input.theme || ""}|${key}`);
  const visualMode = pickDeterministic(getAllowedVisualModes(key), seed, 0);
  const accentStyle = pickDeterministic(getAllowedAccentStyles(visualMode), seed, 1);
  const heroComposition = pickDeterministic(getAllowedHeroCompositions(key, visualMode), seed, 2);

  return {
    key,
    ...base,
    visualMode,
    accentStyle,
    heroComposition,
    visualSeed: seed,
    sectionSpacingClassName: getSectionSpacingClassName(base.contentDensity, visualMode),
    shellClassName: [
      base.shellClassName,
      `industry-visual-${visualMode}`,
      `industry-accent-${accentStyle}`,
      `industry-composition-${heroComposition}`
    ].join(" "),
    cssVars: {
      ...base.cssVars,
      ...getVariationCssVars(base, visualMode, accentStyle, seed)
    }
  };
}

export function getIndustrySectionWrapperClass(
  branding: IndustryBranding,
  section: SectionName
) {
  const emphasis = branding.sectionEmphasis[section];
  return [
    "industry-section",
    emphasis === "high" ? "industry-section-emphasis-high" : "industry-section-emphasis-standard",
    branding.sectionSpacingClassName
  ].join(" ");
}

export function getIndustryLabel(branding: IndustryBranding) {
  return normalizeKey(branding.key);
}
