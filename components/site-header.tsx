import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui";

function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function SiteHeader() {
  return (
    <>
      <div className="border-b border-white/10 bg-white text-sm font-semibold text-ink">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-3">
          <p>Call us now: <a href={telHref(siteConfig.brand.phone)}>{siteConfig.brand.phone}</a></p>
          <p>{siteConfig.brand.location} • {siteConfig.brand.industry}</p>
        </Container>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-shell/95 backdrop-blur">
        <Container className="flex items-center justify-between gap-6 py-6 text-white">
          <Link href="/" className="leading-none">
            <div className="text-3xl font-black tracking-tight md:text-4xl">{siteConfig.brand.name}</div>
            <div className="mt-1 text-sm uppercase tracking-[0.3em] text-white/60">
              {siteConfig.brand.industry}
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.2em] md:flex">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/coverage">Coverage</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a href={telHref(siteConfig.brand.phone)} className="rounded-2xl bg-white/5 px-5 py-3 shadow-glow">
              Call Now
            </a>
            <Link href="/contact" className="rounded-2xl border border-white/25 px-5 py-3">
              Get a Quote
            </Link>
          </div>
        </Container>
      </header>
    </>
  );
}
