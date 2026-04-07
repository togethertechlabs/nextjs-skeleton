import type {
  ContrastProfile,
  DesignDominance,
  IndustryBranding
} from "@/lib/industry-branding";
import type { SectionName } from "@/lib/site-config";

export type ModuleKey = SectionName;
export type SurfaceStyle = "light" | "dark" | "gradient" | "glass" | "mixed";
export type AccentUsage = "minimal" | "balanced" | "strong";
export type CardStyle = "flat" | "bordered" | "elevated" | "glass";
export type ModuleEmphasis = "text" | "accent" | "mixed";
export type BackgroundStyle = "flat" | "subtle-gradient" | "premium-glow";
export type ModuleVisualWeight = "light" | "medium" | "heavy";
export type ModuleKind = "hero" | "trust" | "cards" | "text-media" | "list" | "cta";

export type ModuleStylingProfile = {
  surface: SurfaceStyle;
  accentUsage: AccentUsage;
  contrast: ContrastProfile;
  cardStyle: CardStyle;
  emphasis: ModuleEmphasis;
  backgroundStyle: BackgroundStyle;
};

export type ResolvedModuleStyling = ModuleStylingProfile & {
  sectionClass: string;
  panelClass: string;
  cardClass: string;
  shellClass: string;
  badgeClass: string;
  eyebrowClass: string;
  titleClass: string;
  bodyClass: string;
  mutedClass: string;
  accentClass: string;
  linkClass: string;
  overlayClass: string;
};

type ResolveModuleStylingInput = {
  current: ModuleKey;
  previous?: ModuleKey | null;
  next?: ModuleKey | null;
  branding: IndustryBranding;
};

type ModuleMetadata = {
  kind: ModuleKind;
  visualWeight: ModuleVisualWeight;
  baseline: ModuleStylingProfile;
};

const moduleMetadata: Record<ModuleKey, ModuleMetadata> = {
  hero: {
    kind: "hero",
    visualWeight: "heavy",
    baseline: {
      surface: "gradient",
      accentUsage: "strong",
      contrast: "high",
      cardStyle: "glass",
      emphasis: "mixed",
      backgroundStyle: "premium-glow"
    }
  },
  trustBar: {
    kind: "trust",
    visualWeight: "light",
    baseline: {
      surface: "dark",
      accentUsage: "minimal",
      contrast: "balanced",
      cardStyle: "bordered",
      emphasis: "text",
      backgroundStyle: "subtle-gradient"
    }
  },
  services: {
    kind: "cards",
    visualWeight: "heavy",
    baseline: {
      surface: "light",
      accentUsage: "balanced",
      contrast: "balanced",
      cardStyle: "elevated",
      emphasis: "text",
      backgroundStyle: "flat"
    }
  },
  about: {
    kind: "text-media",
    visualWeight: "medium",
    baseline: {
      surface: "mixed",
      accentUsage: "balanced",
      contrast: "balanced",
      cardStyle: "bordered",
      emphasis: "mixed",
      backgroundStyle: "subtle-gradient"
    }
  },
  coverage: {
    kind: "list",
    visualWeight: "light",
    baseline: {
      surface: "light",
      accentUsage: "minimal",
      contrast: "soft",
      cardStyle: "bordered",
      emphasis: "text",
      backgroundStyle: "flat"
    }
  },
  testimonials: {
    kind: "cards",
    visualWeight: "medium",
    baseline: {
      surface: "dark",
      accentUsage: "minimal",
      contrast: "balanced",
      cardStyle: "elevated",
      emphasis: "text",
      backgroundStyle: "subtle-gradient"
    }
  },
  faq: {
    kind: "list",
    visualWeight: "light",
    baseline: {
      surface: "light",
      accentUsage: "minimal",
      contrast: "soft",
      cardStyle: "flat",
      emphasis: "text",
      backgroundStyle: "flat"
    }
  },
  cta: {
    kind: "cta",
    visualWeight: "medium",
    baseline: {
      surface: "mixed",
      accentUsage: "strong",
      contrast: "high",
      cardStyle: "elevated",
      emphasis: "accent",
      backgroundStyle: "premium-glow"
    }
  }
};

function getDominanceKey(module: ModuleKey): DesignDominance {
  if (module === "trustBar" || module === "testimonials") return "trust";
  if (module === "hero" || module === "services" || module === "cta") return module;
  return "balanced";
}

function isDominantModule(module: ModuleKey, designDominance: DesignDominance) {
  return getDominanceKey(module) === designDominance;
}

function isDarkCluster(module?: ModuleKey | null) {
  return module === "hero" || module === "trustBar" || module === "testimonials" || module === "cta";
}

function resolveDominanceProfile(
  current: ModuleKey,
  profile: ModuleStylingProfile,
  designDominance: DesignDominance
) {
  if (!isDominantModule(current, designDominance)) return;

  if (current === "hero") {
    profile.surface = "gradient";
    profile.accentUsage = "strong";
    profile.emphasis = "mixed";
    return;
  }

  if (current === "services") {
    profile.surface = "light";
    profile.accentUsage = "minimal";
    profile.cardStyle = "elevated";
    profile.emphasis = "text";
    return;
  }

  if (current === "cta") {
    profile.surface = "mixed";
    profile.accentUsage = "strong";
    profile.contrast = "high";
    profile.backgroundStyle = "premium-glow";
    profile.emphasis = "accent";
    return;
  }

  if (current === "trustBar" || current === "testimonials") {
    profile.surface = "dark";
    profile.accentUsage = "minimal";
    profile.emphasis = "text";
    profile.cardStyle = "elevated";
  }
}

function applyContextOverrides(
  current: ModuleKey,
  previous: ModuleKey | null | undefined,
  next: ModuleKey | null | undefined,
  profile: ModuleStylingProfile,
  designDominance: DesignDominance
) {
  if (current === "trustBar" && previous === "hero") {
    profile.surface = "dark";
    profile.accentUsage = "minimal";
    profile.backgroundStyle = "subtle-gradient";
  }

  if (current === "testimonials" && isDarkCluster(previous)) {
    profile.surface = "dark";
    profile.accentUsage = "minimal";
  }

  if (current === "coverage" && isDarkCluster(previous)) {
    profile.surface = "light";
    profile.accentUsage = "minimal";
    profile.contrast = "soft";
  }

  if (current === "faq" && previous === "coverage") {
    profile.surface = "light";
    profile.accentUsage = "minimal";
    profile.backgroundStyle = "flat";
  }

  if (current === "hero" && next === "trustBar") {
    profile.backgroundStyle = "premium-glow";
  }

  if (!isDominantModule(current, designDominance) && previous && isDominantModule(previous, designDominance)) {
    profile.accentUsage = profile.accentUsage === "strong" ? "balanced" : "minimal";
    if (profile.surface === "gradient") {
      profile.surface = "mixed";
    }
  }

  if (current === "cta" && !next) {
    profile.backgroundStyle = "premium-glow";
    profile.contrast = "high";
  }
}

function applyBrandingBias(
  current: ModuleKey,
  profile: ModuleStylingProfile,
  branding: IndustryBranding
) {
  if (branding.visualMode === "minimal") {
    profile.accentUsage = "minimal";
    profile.backgroundStyle = profile.backgroundStyle === "premium-glow" ? "subtle-gradient" : "flat";
    profile.cardStyle = profile.cardStyle === "glass" ? "bordered" : "flat";
  }

  if (branding.visualMode === "cinematic" && (current === "hero" || current === "cta" || current === "testimonials")) {
    profile.surface = current === "hero" ? "gradient" : "dark";
    profile.backgroundStyle = "premium-glow";
  }

  if (branding.visualMode === "technical") {
    profile.cardStyle = profile.cardStyle === "flat" ? "bordered" : profile.cardStyle;
    profile.contrast = branding.contrastProfile === "high" ? "high" : "balanced";
    if (current === "services") {
      profile.emphasis = "text";
      profile.accentUsage = "minimal";
    }
  }

  if (branding.contentDensity === "tight") {
    profile.accentUsage = profile.accentUsage === "strong" ? "balanced" : "minimal";
    profile.backgroundStyle = profile.backgroundStyle === "premium-glow" ? "subtle-gradient" : profile.backgroundStyle;
  }

  if (branding.contentDensity === "spacious" && (current === "hero" || current === "about" || current === "cta")) {
    profile.backgroundStyle = profile.backgroundStyle === "flat" ? "subtle-gradient" : profile.backgroundStyle;
  }

  if (branding.key === "decorators" || branding.key === "plasterer") {
    profile.accentUsage = profile.accentUsage === "strong" ? "balanced" : profile.accentUsage;
    profile.contrast = profile.contrast === "high" ? "balanced" : profile.contrast;
  }

  if ((branding.key === "transport" || branding.key === "electrician") && (current === "hero" || current === "cta")) {
    profile.accentUsage = "strong";
    profile.contrast = "high";
  }

  if (branding.premiumMode && (current === "hero" || current === "cta" || current === "testimonials")) {
    profile.backgroundStyle = profile.backgroundStyle === "flat" ? "subtle-gradient" : profile.backgroundStyle;
    profile.cardStyle = profile.cardStyle === "bordered" ? "elevated" : profile.cardStyle;
  }
}

export function getModuleStylingClasses(profile: ModuleStylingProfile): ResolvedModuleStyling {
  return {
    ...profile,
    sectionClass: [
      "module-styling",
      "module-theme-section",
      `module-surface-${profile.surface}`,
      `module-accent-${profile.accentUsage}`,
      `module-contrast-${profile.contrast}`,
      `module-cardstyle-${profile.cardStyle}`,
      `module-emphasis-${profile.emphasis}`,
      `module-bg-${profile.backgroundStyle}`
    ].join(" "),
    panelClass: "module-panel",
    cardClass: "module-card",
    shellClass: "module-shell",
    badgeClass: "module-badge",
    eyebrowClass: "module-text-eyebrow",
    titleClass: "module-text-title",
    bodyClass: "module-text-body",
    mutedClass: "module-text-muted",
    accentClass: "module-text-accent",
    linkClass: "module-link",
    overlayClass: "module-overlay"
  };
}

export function resolveModuleStyling(input: ResolveModuleStylingInput): ResolvedModuleStyling {
  const profile: ModuleStylingProfile = { ...moduleMetadata[input.current].baseline };

  resolveDominanceProfile(input.current, profile, input.branding.designDominance);
  applyContextOverrides(input.current, input.previous, input.next, profile, input.branding.designDominance);
  applyBrandingBias(input.current, profile, input.branding);

  return getModuleStylingClasses(profile);
}
