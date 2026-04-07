import Link from "next/link";
import { Container } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

function FooterA() {
  return (
    <footer className="industry-footer border-t border-white/10 bg-shell py-14 text-white">
      <Container className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <div className="industry-heading text-4xl font-black">{siteConfig.brand.name}</div>
          <div className="mt-2 text-sm uppercase tracking-[0.3em] text-white/55">{siteConfig.brand.location}</div>
        </div>

        <div className="space-y-3 text-white/75">
          <p>
            <a href={telHref(siteConfig.brand.phone)}>{siteConfig.brand.phone}</a>
          </p>
          <p>
            <a href={`mailto:${siteConfig.brand.email}`}>{siteConfig.brand.email}</a>
          </p>
        </div>

        <div className="space-y-3 text-white/75 md:text-right">
          <p>{siteConfig.footer.copyright}</p>
          <p>{siteConfig.footer.microcopy}</p>
          <div className="space-x-4">
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterB() {
  return (
    <footer className="industry-footer border-t border-line bg-white py-14 text-ink">
      <Container className="grid gap-8 md:grid-cols-[1.1fr_0.9fr_1fr]">
        <div>
          <div className="industry-heading text-3xl font-black">{siteConfig.brand.name}</div>
          <p className="mt-3 max-w-md text-muted">{siteConfig.brand.tagline}</p>
        </div>

        <div className="space-y-3 text-muted">
          <p>{siteConfig.footer.microcopy}</p>
          <p>{siteConfig.brand.location}</p>
        </div>

        <div className="space-y-3 text-muted md:text-right">
          <p>
            <a href={telHref(siteConfig.brand.phone)}>{siteConfig.brand.phone}</a>
          </p>
          <p>
            <a href={`mailto:${siteConfig.brand.email}`}>{siteConfig.brand.email}</a>
          </p>
          <p>{siteConfig.footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}

export function SiteFooter() {
  return siteConfig.layout.footerVariant === "footer-b" ? <FooterB /> : <FooterA />;
}
