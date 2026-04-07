import type { ContentDensity, DesignDominance } from "@/lib/industry-branding";
import type { SectionName } from "@/lib/site-config";

export type ModuleKey = SectionName;
export type SpacingLevel = "tight" | "normal" | "loose";
export type ModuleKind = "hero" | "trust" | "cards" | "text-media" | "list" | "cta";
export type ModuleWeight = "light" | "medium" | "heavy";

export type ModuleSpacingProfile = {
  top: SpacingLevel;
  bottom: SpacingLevel;
  inner: SpacingLevel;
  gap: SpacingLevel;
  card: SpacingLevel;
  lead: SpacingLevel;
};

export type ResolvedModuleSpacing = ModuleSpacingProfile & {
  wrapperClass: string;
  innerClass: string;
  gridClass: string;
  cardClass: string;
  leadClass: string;
};

type ModuleMetadata = {
  kind: ModuleKind;
  weight: ModuleWeight;
  baseline: ModuleSpacingProfile;
};

type ResolveModuleSpacingInput = {
  current: ModuleKey;
  previous?: ModuleKey | null;
  next?: ModuleKey | null;
  designDominance: DesignDominance;
  premiumMode: boolean;
  contentDensity: ContentDensity;
};

const spacingLevels: readonly SpacingLevel[] = ["tight", "normal", "loose"];

const moduleMetadata: Record<ModuleKey, ModuleMetadata> = {
  hero: {
    kind: "hero",
    weight: "heavy",
    baseline: { top: "loose", bottom: "loose", inner: "normal", gap: "normal", card: "normal", lead: "normal" }
  },
  trustBar: {
    kind: "trust",
    weight: "light",
    baseline: { top: "tight", bottom: "tight", inner: "tight", gap: "tight", card: "tight", lead: "tight" }
  },
  services: {
    kind: "cards",
    weight: "heavy",
    baseline: { top: "normal", bottom: "normal", inner: "normal", gap: "normal", card: "normal", lead: "normal" }
  },
  about: {
    kind: "text-media",
    weight: "medium",
    baseline: { top: "normal", bottom: "normal", inner: "normal", gap: "normal", card: "normal", lead: "normal" }
  },
  coverage: {
    kind: "list",
    weight: "medium",
    baseline: { top: "normal", bottom: "tight", inner: "tight", gap: "normal", card: "tight", lead: "normal" }
  },
  testimonials: {
    kind: "cards",
    weight: "medium",
    baseline: { top: "normal", bottom: "normal", inner: "normal", gap: "normal", card: "normal", lead: "normal" }
  },
  faq: {
    kind: "list",
    weight: "light",
    baseline: { top: "tight", bottom: "normal", inner: "tight", gap: "tight", card: "tight", lead: "normal" }
  },
  cta: {
    kind: "cta",
    weight: "medium",
    baseline: { top: "normal", bottom: "normal", inner: "normal", gap: "normal", card: "normal", lead: "normal" }
  }
};

function adjustLevel(level: SpacingLevel, delta: number): SpacingLevel {
  const nextIndex = Math.min(
    spacingLevels.length - 1,
    Math.max(0, spacingLevels.indexOf(level) + delta)
  );
  return spacingLevels[nextIndex];
}

function getDominanceKey(module: ModuleKey): DesignDominance {
  if (module === "trustBar" || module === "testimonials") return "trust";
  if (module === "hero" || module === "services" || module === "cta") return module;
  return "balanced";
}

function isDominantModule(module: ModuleKey, designDominance: DesignDominance) {
  return getDominanceKey(module) === designDominance;
}

function isSupportingModule(module: ModuleKey, designDominance: DesignDominance) {
  if (designDominance === "balanced") {
    return module === "coverage" || module === "faq";
  }

  if (module === "coverage" || module === "faq") return true;
  if (module === "about" || module === "testimonials") {
    return !isDominantModule(module, designDominance);
  }

  return false;
}

function applyContentDensity(profile: ModuleSpacingProfile, density: ContentDensity) {
  if (density === "tight") {
    profile.inner = adjustLevel(profile.inner, -1);
    profile.gap = adjustLevel(profile.gap, -1);
    profile.card = adjustLevel(profile.card, -1);
    return;
  }

  if (density === "spacious") {
    profile.inner = adjustLevel(profile.inner, 1);
    profile.gap = adjustLevel(profile.gap, 1);
    profile.lead = adjustLevel(profile.lead, 1);
  }
}

function applyDominance(profile: ModuleSpacingProfile, input: ResolveModuleSpacingInput) {
  const dominant = isDominantModule(input.current, input.designDominance);
  const supporting = isSupportingModule(input.current, input.designDominance);

  if (dominant) {
    profile.top = adjustLevel(profile.top, 1);
    profile.bottom = adjustLevel(profile.bottom, 1);
    profile.lead = adjustLevel(profile.lead, 1);
  }

  if (input.current === "services" && dominant) {
    profile.gap = adjustLevel(profile.gap, -1);
    profile.inner = adjustLevel(profile.inner, -1);
  }

  if (input.current === "cta" && dominant) {
    profile.card = adjustLevel(profile.card, 1);
  }

  if (input.current === "hero" && dominant) {
    profile.inner = adjustLevel(profile.inner, 1);
  }

  if (supporting) {
    profile.top = adjustLevel(profile.top, -1);
    profile.bottom = adjustLevel(profile.bottom, -1);
    profile.lead = adjustLevel(profile.lead, -1);
  }
}

function applyPremiumMode(profile: ModuleSpacingProfile, input: ResolveModuleSpacingInput) {
  if (!input.premiumMode) return;

  if (isDominantModule(input.current, input.designDominance) || input.current === "hero") {
    profile.top = adjustLevel(profile.top, 1);
    profile.bottom = adjustLevel(profile.bottom, 1);
  }

  if (input.current === "about" || input.current === "testimonials") {
    profile.inner = adjustLevel(profile.inner, 1);
  }

  if (input.current === "trustBar" || input.current === "faq") {
    profile.top = adjustLevel(profile.top, 0);
    profile.bottom = adjustLevel(profile.bottom, 0);
  }
}

function applyAdjacencyOverrides(profile: ModuleSpacingProfile, input: ResolveModuleSpacingInput) {
  const { current, previous, next, designDominance } = input;

  if (current === "hero" && next === "trustBar") {
    profile.bottom = "tight";
  }

  if (current === "trustBar" && previous === "hero") {
    profile.top = "tight";
  }

  if (current === "trustBar" && next === "services") {
    profile.bottom = "tight";
  }

  if (current === "services" && previous === "trustBar") {
    profile.top = "normal";
  }

  if (current === "coverage" && next === "faq") {
    profile.bottom = "tight";
  }

  if (current === "faq" && previous === "coverage") {
    profile.top = "tight";
  }

  if (!isDominantModule(current, designDominance) && previous && isDominantModule(previous, designDominance)) {
    profile.top = adjustLevel(profile.top, -1);
  }

  if (current === "cta" && !next) {
    profile.bottom = adjustLevel(profile.bottom, 1);
  }

  if (current === "about" && (previous === "services" || next === "coverage")) {
    profile.gap = adjustLevel(profile.gap, -1);
  }
}

export function getSpacingClasses(profile: ModuleSpacingProfile): ResolvedModuleSpacing {
  return {
    ...profile,
    wrapperClass: [
      `module-top-${profile.top}`,
      `module-bottom-${profile.bottom}`
    ].join(" "),
    innerClass: `module-inner-${profile.inner}`,
    gridClass: `module-gap-${profile.gap}`,
    cardClass: `module-card-${profile.card}`,
    leadClass: `module-lead-${profile.lead}`
  };
}

export function resolveModuleSpacing(input: ResolveModuleSpacingInput): ResolvedModuleSpacing {
  const profile: ModuleSpacingProfile = { ...moduleMetadata[input.current].baseline };

  applyContentDensity(profile, input.contentDensity);
  applyDominance(profile, input);
  applyPremiumMode(profile, input);
  applyAdjacencyOverrides(profile, input);

  return getSpacingClasses(profile);
}
