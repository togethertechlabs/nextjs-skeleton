"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, PrimaryButton } from "@/components/ui";
import type { ResolvedHeaderCompatibility } from "@/lib/layout-compat";
import type { HeaderVariant, SiteConfig } from "@/lib/site-config";

type SiteHeaderProps = {
  brand: SiteConfig["brand"];
  variant: HeaderVariant;
  compatibility: ResolvedHeaderCompatibility;
};

function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

function getHeaderSurfaceClass(tone: "light" | "dark", mode: "solid" | "glass", scrolled: boolean) {
  if (tone === "light") {
    if (mode === "glass" && !scrolled) {
      return "border-white/10 bg-slate-950/35 text-white backdrop-blur-xl";
    }

    return "border-white/10 bg-shell/95 text-white shadow-lg backdrop-blur";
  }

  if (mode === "glass" && !scrolled) {
    return "border-line/60 bg-white/80 text-ink backdrop-blur-xl";
  }

  return "border-line bg-white/95 text-ink shadow-sm backdrop-blur";
}

function getTopBarClass(overlaysHero: boolean, scrolled: boolean) {
  if (overlaysHero && !scrolled) {
    return "border-b border-white/10 bg-black/20 text-white backdrop-blur";
  }

  return "border-b border-line bg-white text-ink";
}

function HeaderA({ brand, compatibility, scrolled }: SiteHeaderProps & { scrolled: boolean }) {
  const tone = scrolled ? compatibility.scrolledTone : compatibility.tone;
  const mode = scrolled ? compatibility.scrolledMode : compatibility.mode;

  return (
    <>
      <div className={`transition-colors duration-300 ${getTopBarClass(compatibility.overlaysHero, scrolled)}`}>
        <Container className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm font-semibold">
          <p>
            Call us now: <a href={telHref(brand.phone)}>{brand.phone}</a>
          </p>
          <p>
            {brand.location} | {brand.industry}
          </p>
        </Container>
      </div>

      <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${getHeaderSurfaceClass(tone, mode, scrolled)}`}>
        <Container className="flex items-center justify-between gap-6 py-5">
          <Link href="/" className="leading-none">
            <div className="text-3xl font-black tracking-tight md:text-4xl">{brand.name}</div>
            <div className={`${tone === "light" && !scrolled ? "text-white/60" : "text-muted"} mt-1 text-sm uppercase tracking-[0.3em]`}>
              {brand.industry}
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
            <PrimaryButton href="/contact">Get a Quote</PrimaryButton>
          </div>
        </Container>
      </header>
    </>
  );
}

function HeaderB({ brand, compatibility, scrolled }: SiteHeaderProps & { scrolled: boolean }) {
  const tone = scrolled ? compatibility.scrolledTone : compatibility.tone;
  const mode = scrolled ? compatibility.scrolledMode : compatibility.mode;

  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${getHeaderSurfaceClass(tone, mode, scrolled)}`}>
      <Container className="flex flex-wrap items-center justify-between gap-6 py-5">
        <Link href="/" className="leading-none">
          <div className="text-3xl font-black tracking-tight">{brand.name}</div>
          <div className="mt-1 text-sm uppercase tracking-[0.3em] text-muted">{brand.location}</div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.2em] md:flex">
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/coverage">Coverage</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <a href={telHref(brand.phone)} className="hidden rounded-2xl border border-line px-5 py-3 text-sm font-semibold text-ink md:inline-flex">
            {brand.phone}
          </a>
          <PrimaryButton href="/contact">Free Quote</PrimaryButton>
        </div>
      </Container>
    </header>
  );
}

export function SiteHeader(props: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return props.variant === "header-b"
    ? <HeaderB {...props} scrolled={scrolled} />
    : <HeaderA {...props} scrolled={scrolled} />;
}
