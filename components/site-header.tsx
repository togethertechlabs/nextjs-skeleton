"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, PrimaryButton } from "@/components/ui";
import {
  getHeaderContrastClass,
  getHeaderSurfaceClass,
  getTopBarClass,
  type ResolvedHeaderCompatibility
} from "@/lib/layout-compat";
import type { IndustryBranding } from "@/lib/industry-branding";
import type { HeaderVariant, SiteConfig } from "@/lib/site-config";

type SiteHeaderProps = {
  brand: SiteConfig["brand"];
  variant: HeaderVariant;
  compatibility: ResolvedHeaderCompatibility;
  branding: IndustryBranding;
};

function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

function getHeaderTextTone(compatibility: ResolvedHeaderCompatibility, scrolled: boolean) {
  return scrolled ? compatibility.scrolledTone : compatibility.tone;
}

function HeaderA({ brand, compatibility, branding, scrolled }: SiteHeaderProps & { scrolled: boolean }) {
  const tone = getHeaderTextTone(compatibility, scrolled);
  const contrastClass = getHeaderContrastClass(compatibility, scrolled);

  return (
    <>
      <div className={`industry-topbar transition-colors duration-300 ${getTopBarClass(compatibility, scrolled)}`}>
        <Container className="flex flex-wrap items-center justify-between gap-3 py-2.5 text-sm font-semibold">
          <p>
            Call us now: <a href={telHref(brand.phone)}>{brand.phone}</a>
          </p>
          <p>
            {brand.location} | {brand.industry}
          </p>
        </Container>
      </div>

      <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${getHeaderSurfaceClass(compatibility, scrolled)} industry-header industry-header-${branding.key}`}>
        <div className={`relative ${contrastClass}`}>
          <Container className="relative z-10 flex items-center justify-between gap-6 py-4">
            <Link href="/" className="leading-none">
              <div className="industry-heading text-3xl font-black tracking-tight md:text-4xl">{brand.name}</div>
              <div className={`${tone === "light" ? "text-white/68" : "text-muted"} mt-1 text-sm uppercase tracking-[0.3em]`}>
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
        </div>
      </header>
    </>
  );
}

function HeaderB({ brand, compatibility, branding, scrolled }: SiteHeaderProps & { scrolled: boolean }) {
  const tone = getHeaderTextTone(compatibility, scrolled);
  const contrastClass = getHeaderContrastClass(compatibility, scrolled);

  return (
      <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${getHeaderSurfaceClass(compatibility, scrolled)} industry-header industry-header-${branding.key}`}>
      <div className={`relative ${contrastClass}`}>
        <Container className="relative z-10 flex flex-wrap items-center justify-between gap-5 py-4">
          <Link href="/" className="leading-none">
            <div className="industry-heading text-3xl font-black tracking-tight">{brand.name}</div>
            <div className={`mt-1 text-sm uppercase tracking-[0.3em] ${tone === "light" ? "text-white/68" : "text-muted"}`}>{brand.location}</div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.2em] md:flex">
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/coverage">Coverage</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <a href={telHref(brand.phone)} className={`industry-chip hidden rounded-2xl border border-line px-5 py-2.5 text-sm font-semibold md:inline-flex ${tone === "light" ? "text-white" : "text-ink"}`}>
              {brand.phone}
            </a>
            <PrimaryButton href="/contact">Free Quote</PrimaryButton>
          </div>
        </Container>
      </div>
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
