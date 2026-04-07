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
export type HeroEnergy = "steady" | "confident" | "charged" | "dramatic";
export type PanelStyle = "clean" | "edged" | "durable" | "performance" | "refined" | "crafted";
export type AccentBehavior = "cool" | "signal" | "warning" | "glow" | "refined" | "stone";
export type CtaStyle = "practical" | "assertive" | "technical" | "performance" | "refined";
export type TextureProfile = "none" | "grid" | "strata" | "signal" | "soft-canvas" | "mineral";
export type SectionEmphasis = "standard" | "high";

export type IndustryBranding = {
  key: IndustryKey;
  mood: IndustryMood;
  intensity: IndustryIntensity;
  heroEnergy: HeroEnergy;
  panelStyle: PanelStyle;
  accentBehavior: AccentBehavior;
  ctaStyle: CtaStyle;
  textureProfile: TextureProfile;
  contentDensity: "airy" | "balanced" | "dense";
  sectionEmphasis: Record<SectionName, SectionEmphasis>;
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

const brandingMap: Record<IndustryKey, Omit<IndustryBranding, "key">> = {
  construction: {
    mood: "industrial",
    intensity: "high",
    heroEnergy: "confident",
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
      "--industry-frame-color": "rgba(245, 158, 11, 0.28)",
      "--industry-card-shadow": "0 18px 40px rgba(15, 23, 42, 0.14)",
      "--industry-button-shadow": "0 16px 32px rgba(245, 158, 11, 0.22)",
      "--industry-chip-bg": "rgba(245, 158, 11, 0.12)",
      "--industry-chip-border": "rgba(245, 158, 11, 0.3)",
      "--industry-divider": "rgba(245, 158, 11, 0.18)",
      "--industry-heading-weight": "920",
      "--industry-heading-spacing": "-0.045em",
      "--industry-card-radius": "1.55rem",
      "--industry-panel-overlay": "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(51,65,85,0.8))"
    }
  },
  roofing: {
    mood: "industrial",
    intensity: "high",
    heroEnergy: "steady",
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
      "--industry-frame-color": "rgba(100, 116, 139, 0.3)",
      "--industry-card-shadow": "0 18px 42px rgba(15, 23, 42, 0.16)",
      "--industry-button-shadow": "0 16px 32px rgba(239, 68, 68, 0.18)",
      "--industry-chip-bg": "rgba(148, 163, 184, 0.12)",
      "--industry-chip-border": "rgba(148, 163, 184, 0.26)",
      "--industry-divider": "rgba(100, 116, 139, 0.24)",
      "--industry-heading-weight": "900",
      "--industry-heading-spacing": "-0.042em",
      "--industry-card-radius": "1.45rem",
      "--industry-panel-overlay": "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(31,41,55,0.84))"
    }
  },
  plumbing: {
    mood: "technical",
    intensity: "medium",
    heroEnergy: "confident",
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
      "--industry-frame-color": "rgba(56, 189, 248, 0.26)",
      "--industry-card-shadow": "0 16px 34px rgba(37, 99, 235, 0.1)",
      "--industry-button-shadow": "0 14px 28px rgba(56, 189, 248, 0.18)",
      "--industry-chip-bg": "rgba(56, 189, 248, 0.1)",
      "--industry-chip-border": "rgba(56, 189, 248, 0.24)",
      "--industry-divider": "rgba(56, 189, 248, 0.16)",
      "--industry-heading-weight": "880",
      "--industry-heading-spacing": "-0.035em",
      "--industry-card-radius": "1.7rem",
      "--industry-panel-overlay": "linear-gradient(135deg, rgba(15,23,42,0.94), rgba(30,64,175,0.72))"
    }
  },
  heating: {
    mood: "technical",
    intensity: "medium",
    heroEnergy: "confident",
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
      "--industry-frame-color": "rgba(251, 146, 60, 0.24)",
      "--industry-card-shadow": "0 16px 34px rgba(251, 146, 60, 0.12)",
      "--industry-button-shadow": "0 14px 28px rgba(249, 115, 22, 0.18)",
      "--industry-chip-bg": "rgba(251, 146, 60, 0.1)",
      "--industry-chip-border": "rgba(251, 146, 60, 0.24)",
      "--industry-divider": "rgba(251, 146, 60, 0.16)",
      "--industry-heading-weight": "890",
      "--industry-heading-spacing": "-0.036em",
      "--industry-card-radius": "1.65rem",
      "--industry-panel-overlay": "linear-gradient(135deg, rgba(30,41,59,0.95), rgba(154,52,18,0.68))"
    }
  },
  electrician: {
    mood: "technical",
    intensity: "high",
    heroEnergy: "charged",
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
      "--industry-frame-color": "rgba(250, 204, 21, 0.32)",
      "--industry-card-shadow": "0 18px 40px rgba(15, 23, 42, 0.16)",
      "--industry-button-shadow": "0 18px 34px rgba(250, 204, 21, 0.24)",
      "--industry-chip-bg": "rgba(250, 204, 21, 0.12)",
      "--industry-chip-border": "rgba(250, 204, 21, 0.32)",
      "--industry-divider": "rgba(250, 204, 21, 0.18)",
      "--industry-heading-weight": "910",
      "--industry-heading-spacing": "-0.04em",
      "--industry-card-radius": "1.55rem",
      "--industry-panel-overlay": "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(180,83,9,0.55))"
    }
  },
  transport: {
    mood: "performance",
    intensity: "high",
    heroEnergy: "dramatic",
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
      "--industry-frame-color": "rgba(34, 211, 238, 0.34)",
      "--industry-card-shadow": "0 22px 48px rgba(8, 15, 35, 0.24)",
      "--industry-button-shadow": "0 20px 36px rgba(34, 211, 238, 0.24)",
      "--industry-chip-bg": "rgba(34, 211, 238, 0.14)",
      "--industry-chip-border": "rgba(34, 211, 238, 0.34)",
      "--industry-divider": "rgba(34, 211, 238, 0.22)",
      "--industry-heading-weight": "930",
      "--industry-heading-spacing": "-0.05em",
      "--industry-card-radius": "1.45rem",
      "--industry-panel-overlay": "linear-gradient(135deg, rgba(2,6,23,0.98), rgba(14,116,144,0.58))"
    }
  },
  decorators: {
    mood: "refined",
    intensity: "low",
    heroEnergy: "steady",
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
      "--industry-frame-color": "rgba(249, 115, 22, 0.18)",
      "--industry-card-shadow": "0 14px 28px rgba(148, 163, 184, 0.12)",
      "--industry-button-shadow": "0 12px 24px rgba(249, 115, 22, 0.12)",
      "--industry-chip-bg": "rgba(249, 115, 22, 0.08)",
      "--industry-chip-border": "rgba(249, 115, 22, 0.18)",
      "--industry-divider": "rgba(249, 115, 22, 0.12)",
      "--industry-heading-weight": "840",
      "--industry-heading-spacing": "-0.03em",
      "--industry-card-radius": "1.9rem",
      "--industry-panel-overlay": "linear-gradient(135deg, rgba(255,255,255,0.94), rgba(251,146,60,0.16))"
    }
  },
  plasterer: {
    mood: "crafted",
    intensity: "medium",
    heroEnergy: "steady",
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
      "--industry-frame-color": "rgba(120, 113, 108, 0.24)",
      "--industry-card-shadow": "0 16px 30px rgba(28, 25, 23, 0.12)",
      "--industry-button-shadow": "0 14px 26px rgba(161, 98, 7, 0.14)",
      "--industry-chip-bg": "rgba(161, 98, 7, 0.08)",
      "--industry-chip-border": "rgba(161, 98, 7, 0.18)",
      "--industry-divider": "rgba(120, 113, 108, 0.16)",
      "--industry-heading-weight": "860",
      "--industry-heading-spacing": "-0.032em",
      "--industry-card-radius": "1.8rem",
      "--industry-panel-overlay": "linear-gradient(135deg, rgba(68,64,60,0.95), rgba(214,211,209,0.52))"
    }
  },
  generic: {
    mood: "balanced",
    intensity: "medium",
    heroEnergy: "confident",
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
      "--industry-frame-color": "rgba(37, 99, 235, 0.2)",
      "--industry-card-shadow": "0 16px 32px rgba(15, 23, 42, 0.1)",
      "--industry-button-shadow": "0 14px 28px rgba(37, 99, 235, 0.16)",
      "--industry-chip-bg": "rgba(37, 99, 235, 0.1)",
      "--industry-chip-border": "rgba(37, 99, 235, 0.2)",
      "--industry-divider": "rgba(37, 99, 235, 0.14)",
      "--industry-heading-weight": "880",
      "--industry-heading-spacing": "-0.035em",
      "--industry-card-radius": "1.75rem",
      "--industry-panel-overlay": "linear-gradient(135deg, rgba(15,23,42,0.94), rgba(59,130,246,0.38))"
    }
  }
};

export function resolveIndustryBranding(input: BrandingInput): IndustryBranding {
  const key = detectIndustryKey(input);
  return {
    key,
    ...brandingMap[key]
  };
}

export function getIndustrySectionWrapperClass(
  branding: IndustryBranding,
  section: SectionName
) {
  const emphasis = branding.sectionEmphasis[section];
  return emphasis === "high"
    ? "industry-section industry-section-emphasis-high"
    : "industry-section industry-section-emphasis-standard";
}

export function getIndustryLabel(branding: IndustryBranding) {
  return normalizeKey(branding.key);
}
