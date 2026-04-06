import fs from "node:fs";
import path from "node:path";
import rawSiteConfig from "@/site-config.json";

export type ThemeName =
  | "trade-blue"
  | "industrial-dark"
  | "slate-premium"
  | "electric-amber"
  | "graphite-red"
  | "construction-orange"
  | "stone-premium"
  | "clean-light";

export type SectionName =
  | "hero"
  | "trustBar"
  | "services"
  | "about"
  | "coverage"
  | "testimonials"
  | "faq"
  | "cta";

export type HeaderVariant = "header-a" | "header-b";
export type HeroVariant = "hero-a" | "hero-b" | "hero-c";
export type ServicesVariant = "services-a" | "services-b" | "services-c";
export type AboutVariant = "about-a" | "about-b";
export type CoverageVariant = "coverage-a" | "coverage-b";
export type TestimonialsVariant = "testimonials-a" | "testimonials-b";
export type FaqVariant = "faq-a" | "faq-b";
export type CtaVariant = "cta-a" | "cta-b" | "cta-c";
export type FooterVariant = "footer-a" | "footer-b";

export type ServiceItem = {
  slug: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  cta: string;
};

export type CoverageArea = {
  slug: string;
  name: string;
  summary: string;
  intro: string;
};

export type SiteConfig = {
  brand: {
    name: string;
    legalName?: string;
    industry: string;
    location: string;
    phone: string;
    email: string;
    tagline: string;
    eyebrow: string;
    badge: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonical: string;
  };
  layout: {
    theme: ThemeName;
    headerVariant: HeaderVariant;
    heroVariant: HeroVariant;
    servicesVariant: ServicesVariant;
    aboutVariant: AboutVariant;
    coverageVariant: CoverageVariant;
    testimonialsVariant: TestimonialsVariant;
    faqVariant: FaqVariant;
    ctaVariant: CtaVariant;
    footerVariant: FooterVariant;
    sectionOrder: SectionName[];
  };
  images: {
    folder: string;
    hero?: string;
    about?: string;
    contact?: string;
    services: string[];
  };
  trustBar: Array<{
    label: string;
    subtext: string;
  }>;
  hero: {
    eyebrow: string;
    badge: string;
    headline: string;
    highlight: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  servicesIntro: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  services: ServiceItem[];
  about: {
    eyebrow: string;
    heading: string;
    body: string;
    highlights: string[];
    cardEyebrow: string;
    cardTitle: string;
    cardBody: string;
  };
  coverage: {
    eyebrow: string;
    heading: string;
    body: string;
    areas: CoverageArea[];
  };
  testimonials: {
    eyebrow: string;
    heading: string;
    body: string;
    items: Array<{
      name: string;
      quote: string;
    }>;
  };
  faq: {
    eyebrow: string;
    heading: string;
    body: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    eyebrow: string;
    heading: string;
    body: string;
    button: string;
  };
  footer: {
    microcopy: string;
    copyright: string;
  };
};

const DEFAULT_SECTION_ORDER: SectionName[] = [
  "hero",
  "trustBar",
  "services",
  "about",
  "coverage",
  "testimonials",
  "faq",
  "cta"
];

const THEME_NAMES: ThemeName[] = [
  "trade-blue",
  "industrial-dark",
  "slate-premium",
  "electric-amber",
  "graphite-red",
  "construction-orange",
  "stone-premium",
  "clean-light"
];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function asOptionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.map((item) => asString(item)).filter(Boolean)
    : [];
}

export function toSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function normalizeTradeFolder(value: string) {
  const slug = toSlug(value || "generic");

  if (slug.includes("plumb")) return "plumbing";
  if (slug.includes("electric")) return "electrician";
  if (slug.includes("roof")) return "roofing";
  if (slug.includes("paint")) return "painter";
  if (slug.includes("plaster")) return "plasterer";
  if (slug.includes("construct") || slug.includes("builder")) return "construction";

  return slug || "generic";
}

function normalizeBrand(raw: unknown): SiteConfig["brand"] {
  const source = isObject(raw) ? raw : {};
  const industry = asString(source.industry, "Trade Services");
  const location = asString(source.location, "your local area");
  const name = asString(source.name, "Local Trade Business");

  return {
    name,
    legalName: asOptionalString(source.legalName),
    industry,
    location,
    phone: asString(source.phone, "01234 567890"),
    email: asString(source.email, "hello@example.com"),
    tagline: asString(source.tagline, `Trusted ${industry.toLowerCase()} services in ${location}`),
    eyebrow: asString(source.eyebrow, industry),
    badge: asString(source.badge, "Free Quotes")
  };
}

function normalizeSeo(raw: unknown, brand: SiteConfig["brand"]): SiteConfig["seo"] {
  const source = isObject(raw) ? raw : {};
  const canonical = asString(source.canonical, "https://example.com").replace(/\/$/, "");

  return {
    title: asString(source.title, `${brand.name} | ${brand.industry} in ${brand.location}`),
    description: asString(
      source.description,
      `${brand.name} provides ${brand.industry.toLowerCase()} services across ${brand.location}.`
    ),
    keywords: asStringArray(source.keywords),
    canonical
  };
}

function normalizeLayout(raw: unknown): SiteConfig["layout"] {
  const source = isObject(raw) ? raw : {};
  const sectionOrder = Array.isArray(source.sectionOrder)
    ? source.sectionOrder.filter((section): section is SectionName =>
        DEFAULT_SECTION_ORDER.includes(section as SectionName)
      )
    : [];

  return {
    theme: THEME_NAMES.includes(source.theme as ThemeName)
      ? (source.theme as ThemeName)
      : "trade-blue",
    headerVariant: (asString(source.headerVariant, "header-a") as HeaderVariant) || "header-a",
    heroVariant: (asString(source.heroVariant, "hero-a") as HeroVariant) || "hero-a",
    servicesVariant: (asString(source.servicesVariant, "services-a") as ServicesVariant) || "services-a",
    aboutVariant: (asString(source.aboutVariant, "about-a") as AboutVariant) || "about-a",
    coverageVariant: (asString(source.coverageVariant, "coverage-a") as CoverageVariant) || "coverage-a",
    testimonialsVariant:
      (asString(source.testimonialsVariant, "testimonials-a") as TestimonialsVariant) || "testimonials-a",
    faqVariant: (asString(source.faqVariant, "faq-a") as FaqVariant) || "faq-a",
    ctaVariant: (asString(source.ctaVariant, "cta-a") as CtaVariant) || "cta-a",
    footerVariant: (asString(source.footerVariant, "footer-a") as FooterVariant) || "footer-a",
    sectionOrder: [
      ...sectionOrder,
      ...DEFAULT_SECTION_ORDER.filter((section) => !sectionOrder.includes(section))
    ]
  };
}

function resolveExistingPublicPath(relativePath: string) {
  const segments = relativePath.replace(/^\/+/, "").split("/").filter(Boolean);
  let absolutePath = path.join(process.cwd(), "public");
  const resolvedSegments: string[] = [];

  for (const segment of segments) {
    if (!fs.existsSync(absolutePath)) return null;

    const entries = fs.readdirSync(absolutePath, { withFileTypes: true });
    const match = entries.find((entry) => entry.name.toLowerCase() === segment.toLowerCase());

    if (!match) return null;

    absolutePath = path.join(absolutePath, match.name);
    resolvedSegments.push(match.name);
  }

  return {
    publicPath: `/${resolvedSegments.join("/")}`,
    absolutePath
  };
}

function listAssetFiles(relativeDirectory: string) {
  const resolved = resolveExistingPublicPath(relativeDirectory);

  if (!resolved || !fs.existsSync(resolved.absolutePath) || !fs.statSync(resolved.absolutePath).isDirectory()) {
    return [];
  }

  return fs
    .readdirSync(resolved.absolutePath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => `${resolved.publicPath}/${entry.name}`)
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));
}

function resolveImageFromConfig(value: unknown) {
  const imagePath = asOptionalString(value);

  if (!imagePath) return undefined;
  if (/^https?:\/\//i.test(imagePath)) return imagePath;

  return resolveExistingPublicPath(imagePath)?.publicPath;
}

function getImageDirectoryCandidates(
  folder: string,
  section: "hero" | "about" | "services" | "contact"
): string[] {
  const normalizedFolder = normalizeTradeFolder(folder);

  const candidates =
    section === "hero"
      ? [`images/${normalizedFolder}/Hero`, `images/hero/${normalizedFolder}`, `images/${normalizedFolder}`]
      : section === "about"
        ? [
            `images/${normalizedFolder}/About`,
            `images/hero/${normalizedFolder}/About`,
            `images/${normalizedFolder}`
          ]
        : section === "contact"
          ? [
              `images/${normalizedFolder}/Contact`,
              `images/hero/${normalizedFolder}/Contact`,
              `images/${normalizedFolder}`
            ]
          : [
              `images/${normalizedFolder}/Services`,
              `images/hero/${normalizedFolder}/Services`,
              `images/${normalizedFolder}`
            ];

  return [
    ...candidates,
    ...(normalizedFolder === "generic" ? [] : getImageDirectoryCandidates("generic", section))
  ];
}

function resolveFallbackImage(
  folder: string,
  section: "hero" | "about" | "services" | "contact",
  index = 0
) {
  const files = getImageDirectoryCandidates(folder, section)
    .flatMap((directory) => listAssetFiles(directory))
    .filter((file, fileIndex, allFiles) => allFiles.indexOf(file) === fileIndex);

  if (!files.length) return "/images/hero/industrial-dark.svg";

  return files[index] || files[0];
}

function normalizeImages(raw: unknown, brand: SiteConfig["brand"], serviceCount: number): SiteConfig["images"] {
  const source = isObject(raw) ? raw : {};
  const folder = normalizeTradeFolder(asString(source.folder, brand.industry || brand.name || "generic"));
  const configuredServices = Array.isArray(source.services)
    ? source.services
        .map(resolveImageFromConfig)
        .filter((value): value is string => Boolean(value))
    : [];

  return {
    folder,
    hero: resolveImageFromConfig(source.hero),
    about: resolveImageFromConfig(source.about),
    contact: resolveImageFromConfig(source.contact),
    services:
      configuredServices.length >= serviceCount
        ? configuredServices.slice(0, serviceCount)
        : Array.from({ length: Math.max(serviceCount, 3) }, (_, index) => configuredServices[index]).filter(
            (value): value is string => Boolean(value)
          )
  };
}

function normalizeServices(raw: unknown, brand: SiteConfig["brand"]): ServiceItem[] {
  const items = Array.isArray(raw) ? raw : [];

  if (!items.length) {
    return [
      {
        slug: "core-service",
        title: `${brand.industry} Services`,
        short: `Trusted ${brand.industry.toLowerCase()} support across ${brand.location}.`,
        description: `${brand.name} delivers dependable ${brand.industry.toLowerCase()} work with clear communication and strong presentation.`,
        bullets: ["Fast turnaround", "Clear pricing", "Reliable workmanship"],
        cta: "Request a quote"
      }
    ];
  }

  return items.map((item, index) => {
    const source = isObject(item) ? item : {};
    const title = asString(source.title, `Service ${index + 1}`);
    const description = asString(
      source.description,
      asString(source.short, `${brand.name} provides ${title.toLowerCase()} in ${brand.location}.`)
    );
    const short = asString(source.short, description);
    const bullets = asStringArray(source.bullets);

    return {
      slug: asString(source.slug, toSlug(title)),
      title,
      short,
      description,
      bullets: bullets.length ? bullets : ["Experienced team", "Transparent advice", "Quality finish"],
      cta: asString(source.cta, `Book ${title.toLowerCase()}`)
    };
  });
}

function normalizeAbout(raw: unknown, brand: SiteConfig["brand"]): SiteConfig["about"] {
  const source = isObject(raw) ? raw : {};
  const highlights = [...asStringArray(source.highlights), ...asStringArray(source.bullets)].filter(
    (item, index, items) => items.indexOf(item) === index
  );

  return {
    eyebrow: asString(source.eyebrow, "About"),
    heading: asString(source.heading, `About ${brand.name}`),
    body: asString(
      source.body,
      `${brand.name} is known for dependable ${brand.industry.toLowerCase()} work, strong communication and a finish that builds trust.`
    ),
    highlights: highlights.length
      ? highlights
      : ["Locally trusted", "Clear communication", "Professional finish"],
    cardEyebrow: asString(source.cardEyebrow, "Why clients choose us"),
    cardTitle: asString(source.cardTitle, "Reliable service with a premium presentation."),
    cardBody: asString(
      source.cardBody,
      "The template is designed to feel credible, polished and ready to deploy even before bespoke refinements."
    )
  };
}

function normalizeCoverage(raw: unknown, brand: SiteConfig["brand"]): SiteConfig["coverage"] {
  const source = isObject(raw) ? raw : {};
  const rawAreas = Array.isArray(source.areas) ? source.areas : [];
  const areas = rawAreas.map((item) => {
    if (typeof item === "string") {
      return {
        slug: toSlug(item),
        name: item,
        summary: `${brand.name} provides trusted ${brand.industry.toLowerCase()} services in ${item}.`,
        intro: `${brand.name} supports customers in ${item} with responsive service and a professional finish.`
      };
    }

    const area = isObject(item) ? item : {};
    const name = asString(area.name, brand.location);

    return {
      slug: asString(area.slug, toSlug(name)),
      name,
      summary: asString(
        area.summary,
        `${brand.name} provides trusted ${brand.industry.toLowerCase()} services in ${name}.`
      ),
      intro: asString(
        area.intro,
        `${brand.name} supports customers in ${name} with responsive service and a professional finish.`
      )
    };
  });

  return {
    eyebrow: asString(source.eyebrow, "Coverage"),
    heading: asString(source.heading, `Areas served by ${brand.name}`),
    body: asString(
      source.body,
      `We cover ${brand.location} and surrounding areas with dependable ${brand.industry.toLowerCase()} support.`
    ),
    areas: areas.length
      ? areas
      : [
          {
            slug: toSlug(brand.location),
            name: brand.location,
            summary: `${brand.name} provides trusted ${brand.industry.toLowerCase()} services in ${brand.location}.`,
            intro: `${brand.name} supports customers in ${brand.location} with responsive service and a professional finish.`
          }
        ]
  };
}

function normalizeTestimonials(raw: unknown): SiteConfig["testimonials"] {
  const source = isObject(raw) ? raw : {};
  const rawItems = Array.isArray(source.items) ? source.items : Array.isArray(raw) ? raw : [];
  const items = rawItems
    .map((item) => {
      const testimonial = isObject(item) ? item : {};
      const name = asString(testimonial.name);
      const quote = asString(testimonial.quote);

      return name && quote ? { name, quote } : null;
    })
    .filter(Boolean) as SiteConfig["testimonials"]["items"];

  return {
    eyebrow: asString(source.eyebrow, "Testimonials"),
    heading: asString(source.heading, "Proof that builds trust quickly"),
    body: asString(source.body, "Short, credible testimonials make the site feel established from day one."),
    items: items.length
      ? items
      : [
          {
            name: "Verified Customer",
            quote: "Professional from first contact to completion, with clear communication throughout."
          },
          {
            name: "Local Client",
            quote: "Fast response, tidy workmanship and a much smoother experience than we expected."
          }
        ]
  };
}

function normalizeFaq(raw: unknown): SiteConfig["faq"] {
  const source = isObject(raw) ? raw : {};
  const rawItems = Array.isArray(source.items) ? source.items : Array.isArray(raw) ? raw : [];
  const items = rawItems
    .map((item) => {
      const faqItem = isObject(item) ? item : {};
      const question = asString(faqItem.question);
      const answer = asString(faqItem.answer);

      return question && answer ? { question, answer } : null;
    })
    .filter(Boolean) as SiteConfig["faq"]["items"];

  return {
    eyebrow: asString(source.eyebrow, "FAQ"),
    heading: asString(source.heading, "Answers that reduce friction"),
    body: asString(source.body, "Built-in FAQ helps with trust, conversion confidence and SEO depth."),
    items: items.length
      ? items
      : [
          {
            question: "What services do you offer?",
            answer: "We handle both planned work and urgent callouts across our local coverage area."
          },
          {
            question: "How quickly can you respond?",
            answer: "Response times depend on workload and urgency, but we aim to be clear and responsive from the first call."
          },
          {
            question: "Do you provide quotes?",
            answer: "Yes. We provide clear quotes and transparent advice before work begins."
          }
        ]
  };
}

function normalizeCta(raw: unknown, brand: SiteConfig["brand"]): SiteConfig["cta"] {
  const source = isObject(raw) ? raw : {};

  return {
    eyebrow: asString(source.eyebrow, "Ready to get started?"),
    heading: asString(source.heading, `Talk to ${brand.name} today`),
    body: asString(
      source.body,
      `Get in touch for dependable ${brand.industry.toLowerCase()} support in ${brand.location}.`
    ),
    button: asString(source.button, "Get a quote")
  };
}

function normalizeFooter(raw: unknown, brand: SiteConfig["brand"]): SiteConfig["footer"] {
  const source = isObject(raw) ? raw : {};

  return {
    microcopy: asString(source.microcopy, `${brand.industry} services in ${brand.location}`),
    copyright: asString(
      source.copyright,
      `(c) ${new Date().getFullYear()} ${brand.legalName || brand.name}. All rights reserved.`
    )
  };
}

function normalizeTrustBar(raw: unknown, brand: SiteConfig["brand"]) {
  const items = Array.isArray(raw) ? raw : [];
  const normalized = items
    .map((item) => {
      const source = isObject(item) ? item : {};
      const label = asString(source.label);
      const subtext = asString(source.subtext);

      return label ? { label, subtext: subtext || brand.tagline } : null;
    })
    .filter(Boolean) as SiteConfig["trustBar"];

  return normalized.length
    ? normalized
    : [
        { label: "Fast response", subtext: "Clear communication from first enquiry" },
        { label: "Local expertise", subtext: `Trusted across ${brand.location}` },
        { label: "Quality finish", subtext: "Work completed with care and professionalism" },
        { label: "Free quotes", subtext: "Straightforward advice before work begins" }
      ];
}

function normalizeHero(raw: unknown, brand: SiteConfig["brand"]): SiteConfig["hero"] {
  const source = isObject(raw) ? raw : {};

  return {
    eyebrow: asString(source.eyebrow, brand.eyebrow),
    badge: asString(source.badge, brand.badge),
    headline: asString(source.headline, `${brand.name} in ${brand.location}`),
    highlight: asString(source.highlight, brand.tagline),
    subheadline: asString(
      source.subheadline,
      `${brand.name} provides dependable ${brand.industry.toLowerCase()} services with strong communication and a professional finish.`
    ),
    primaryCta: asString(source.primaryCta, "Call now"),
    secondaryCta: asString(source.secondaryCta, "Get a quote")
  };
}

function normalizeServicesIntro(raw: unknown): SiteConfig["servicesIntro"] {
  const source = isObject(raw) ? raw : {};

  return {
    eyebrow: asString(source.eyebrow, "Services"),
    heading: asString(source.heading, "Services designed to build trust and conversion confidence"),
    body: asString(
      source.body,
      "A dedicated services section gives each generated site more structure, depth and space for stronger positioning."
    )
  };
}

function normalizeSiteConfig(raw: unknown): SiteConfig {
  const source = isObject(raw) ? raw : {};
  const brand = normalizeBrand(source.brand);
  const services = normalizeServices(source.services, brand);
  const images = normalizeImages(source.images, brand, services.length);

  return {
    brand,
    seo: normalizeSeo(source.seo, brand),
    layout: normalizeLayout(source.layout),
    images,
    trustBar: normalizeTrustBar(source.trustBar, brand),
    hero: normalizeHero(source.hero, brand),
    servicesIntro: normalizeServicesIntro(source.servicesIntro),
    services,
    about: normalizeAbout(source.about, brand),
    coverage: normalizeCoverage(source.coverage, brand),
    testimonials: normalizeTestimonials(source.testimonials),
    faq: normalizeFaq(source.faq),
    cta: normalizeCta(source.cta, brand),
    footer: normalizeFooter(source.footer, brand)
  };
}

export const siteConfig = normalizeSiteConfig(rawSiteConfig);

export function getServiceBySlug(slug: string) {
  return siteConfig.services.find((service) => service.slug === slug);
}

export function getAreaSlug(area: CoverageArea) {
  return area.slug;
}

export function getAreaName(area: CoverageArea) {
  return area.name;
}

export function getAreaSummary(area: CoverageArea) {
  return area.summary;
}

export function getAreaIntro(area: CoverageArea) {
  return area.intro;
}

export function getAreaBySlug(slug: string) {
  return siteConfig.coverage.areas.find((area) => area.slug === slug);
}

export function getCanonical(pathname = "") {
  const base = siteConfig.seo.canonical.replace(/\/$/, "");
  return pathname ? `${base}/${pathname.replace(/^\//, "")}` : base;
}

export function getThemeClass(theme: ThemeName) {
  return `theme-${theme}`;
}

export function getImagePath(section: "hero" | "about" | "services" | "contact", index = 0) {
  if (section === "hero" && siteConfig.images.hero) return siteConfig.images.hero;
  if (section === "about" && siteConfig.images.about) return siteConfig.images.about;
  if (section === "contact" && siteConfig.images.contact) return siteConfig.images.contact;
  if (section === "services") {
    const configuredImage = siteConfig.images.services[index];

    if (configuredImage) return configuredImage;
  }

  return resolveFallbackImage(siteConfig.images.folder, section, index);
}
