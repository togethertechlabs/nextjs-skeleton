import Link from "next/link";
import { Container, PrimaryButton } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

function HeaderA() {
  return (
    <>
      <div className="border-b border-white/10 bg-white text-sm font-semibold text-ink">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-3">
          <p>
            Call us now: <a href={telHref(siteConfig.brand.phone)}>{siteConfig.brand.phone}</a>
          </p>
          <p>
            {siteConfig.brand.location} | {siteConfig.brand.industry}
          </p>
        </Container>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-shell/95 backdrop-blur">
        <Container className="flex items-center justify-between gap-6 py-6 text-white">
          <Link href="/" className="leading-none">
            <div className="text-3xl font-black tracking-tight md:text-4xl">{siteConfig.brand.name}</div>
            <div className="mt-1 text-sm uppercase tracking-[0.3em] text-white/60">{siteConfig.brand.industry}</div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.2em] md:flex">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/coverage">Coverage</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <PrimaryButton href="/contact">Get a Quote</PrimaryButton>
          </div>
        </Container>
      </header>
    </>
  );
}

function HeaderB() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <Container className="flex flex-wrap items-center justify-between gap-6 py-5">
        <Link href="/" className="leading-none">
          <div className="text-3xl font-black tracking-tight text-ink">{siteConfig.brand.name}</div>
          <div className="mt-1 text-sm uppercase tracking-[0.3em] text-muted">{siteConfig.brand.location}</div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.2em] text-ink md:flex">
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/coverage">Coverage</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <a href={telHref(siteConfig.brand.phone)} className="hidden rounded-2xl border border-line px-5 py-3 text-sm font-semibold text-ink md:inline-flex">
            {siteConfig.brand.phone}
          </a>
          <PrimaryButton href="/contact">Free Quote</PrimaryButton>
        </div>
      </Container>
    </header>
  );
}

export function SiteHeader() {
  return siteConfig.layout.headerVariant === "header-b" ? <HeaderB /> : <HeaderA />;
}
