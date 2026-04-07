type ResolveIndustryBrandingInput = {
  industry?: string;
  subIndustry?: string;
  location?: string;
  pricePosition?: string;
  targetCustomer?: string[];
  tone?: string[];
  visualStyle?: string[];
  heroEnergy?: string;
  ctaStyle?: string;
  businessIntent?: string;
  conversionStyle?: string;
  serviceUrgency?: string;
  premiumMode?: boolean;
  layout?: Record<string, any>;
  images?: Record<string, any>;
};

function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick<T>(list: T[], seed: number, offset = 0): T {
  return list[(seed + offset) % list.length];
}

export function resolveIndustryBranding(input: ResolveIndustryBrandingInput) {
  const industry = String(input.industry || "").toLowerCase();
  const subIndustry = String(input.subIndustry || "").toLowerCase();
  const premiumMode = input.premiumMode ?? true;

  const seed = hashString(
    [
      input.industry || "",
      input.subIndustry || "",
      input.location || "",
      input.pricePosition || "",
      input.businessIntent || "",
      input.conversionStyle || "",
      String(premiumMode)
    ].join("|")
  );

  let mood = "balanced";
  let intensity = "medium";
  let heroEnergy = input.heroEnergy || "medium";
  let panelStyle = "elevated";
  let accentBehavior = "balanced";
  let ctaStyle = input.ctaStyle || "consultative";
  let textureProfile = "subtle";
  let contentDensity: "tight" | "balanced" | "spacious" = "balanced";
  let contrastProfile: "soft" | "balanced" | "high" = "balanced";
  let visualMode: "cinematic" | "clean" | "bold" | "minimal" | "technical" =
    pick(["cinematic", "clean", "bold", "minimal", "technical"], seed, 0);
  let accentStyle: "glow" | "solid" | "outline" | "gradient" =
    pick(["glow", "solid", "outline", "gradient"], seed, 1);
  let heroComposition: "split" | "full-bleed" | "centered" | "stacked" =
    pick(["split", "full-bleed", "centered", "stacked"], seed, 2);

  let designDominance: "hero" | "services" | "cta" | "trust" | "balanced" = "balanced";

  let sectionScale = {
    hero: "lg",
    trustBar: "md",
    about: "md",
    coverage: "sm",
    services: "lg",
    testimonials: "md",
    faq: "sm",
    cta: "lg"
  } as const;

  // Industry baselines
  if (industry.includes("construct") || industry.includes("builder") || industry.includes("building")) {
    mood = "industrial";
    intensity = "medium";
    panelStyle = "hard-depth";
    accentBehavior = "controlled";
    textureProfile = "hard-lines";
    designDominance = pick(["services", "trust"], seed, 3);
    contrastProfile = "balanced";
  }

  if (industry.includes("roof")) {
    mood = "rugged";
    intensity = "medium";
    panelStyle = "durable";
    accentBehavior = "controlled";
    textureProfile = "slate";
    contrastProfile = "high";
  }

  if (industry.includes("plumb") || industry.includes("boiler") || industry.includes("heating") || industry.includes("gas")) {
    mood = "technical-clean";
    intensity = "medium";
    panelStyle = "clean-depth";
    accentBehavior = "controlled";
    designDominance = "cta";
    contrastProfile = "balanced";
  }

  if (industry.includes("electric") || industry.includes("rewire") || industry.includes("fuse") || industry.includes("lighting")) {
    mood = "technical-energetic";
    intensity = "high";
    panelStyle = "sharp-depth";
    accentBehavior = "signal";
    designDominance = pick(["hero", "cta"], seed, 4);
    contrastProfile = "high";
  }

  if (industry.includes("paint") || industry.includes("decorat") || industry.includes("interior")) {
    mood = "refined";
    intensity = "soft";
    panelStyle = "soft-depth";
    accentBehavior = "restrained";
    designDominance = pick(["hero", "balanced"], seed, 5);
    contentDensity = "spacious";
    contrastProfile = "soft";
  }

  if (industry.includes("plaster") || industry.includes("render")) {
    mood = "crafted";
    intensity = "soft";
    panelStyle = "stone-depth";
    accentBehavior = "restrained";
    contentDensity = "balanced";
    contrastProfile = "soft";
  }

  // Premium bias
  if (premiumMode) {
    contentDensity = contentDensity === "tight" ? "balanced" : contentDensity;
    if (visualMode === "clean") visualMode = "cinematic";
    if (heroComposition === "split") heroComposition = pick(["full-bleed", "centered", "split"], seed, 6);
  }

  // Intent-driven overrides
  if (input.businessIntent === "emergency-service") {
    designDominance = "cta";
    heroEnergy = "high";
    contrastProfile = "high";
    accentStyle = "solid";
    sectionScale = {
      ...sectionScale,
      cta: "xl"
    } as const;
  }

  if (input.businessIntent === "high-end-brand") {
    designDominance = "hero";
    contentDensity = "spacious";
    if (visualMode === "clean") visualMode = "cinematic";
  }

  if (input.businessIntent === "authority-trust") {
    designDominance = "trust";
    contrastProfile = contrastProfile === "soft" ? "balanced" : contrastProfile;
  }

  if (input.businessIntent === "portfolio-showcase") {
    designDominance = "hero";
    contentDensity = "spacious";
  }

  if (input.conversionStyle === "urgent") {
    accentStyle = "solid";
    contrastProfile = "high";
    sectionScale = {
      ...sectionScale,
      cta: "xl"
    } as const;
  }

  if (input.conversionStyle === "consultative") {
    if (accentStyle === "solid") accentStyle = "gradient";
  }

  if (input.conversionStyle === "soft") {
    accentStyle = "outline";
    contrastProfile = "soft";
  }

  if (input.serviceUrgency === "high") {
    sectionScale = {
      ...sectionScale,
      cta: "xl"
    } as const;
    if (designDominance === "balanced") {
      designDominance = "cta";
    }
  }

  if (input.pricePosition === "luxury") {
    contentDensity = "spacious";
    visualMode = visualMode === "technical" ? "cinematic" : visualMode;
  }

  // Dominance scaling
  if (designDominance === "hero") {
    sectionScale = {
      ...sectionScale,
      hero: "xl",
      testimonials: "sm",
      faq: "sm"
    } as const;
  }

  if (designDominance === "services") {
    sectionScale = {
      ...sectionScale,
      services: "xl",
      faq: "sm"
    } as const;
  }

  if (designDominance === "cta") {
    sectionScale = {
      ...sectionScale,
      cta: "xl",
      about: "sm",
      testimonials: "sm"
    } as const;
  }

  if (designDominance === "trust") {
    sectionScale = {
      ...sectionScale,
      trustBar: "lg",
      testimonials: "lg",
      cta: "md"
    } as const;
  }

  return {
    mood,
    intensity,
    heroEnergy,
    panelStyle,
    accentBehavior,
    ctaStyle,
    textureProfile,
    contentDensity,
    contrastProfile,
    visualMode,
    accentStyle,
    heroComposition,
    designDominance,
    sectionScale
  };
}