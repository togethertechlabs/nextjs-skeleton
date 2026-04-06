import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui";

function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-shell py-14 text-white">
      <Container className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <div className="text-4xl font-black">{siteConfig.brand.name}</div>
          <div className="mt-2 text-sm uppercase tracking-[0.3em] text-white/55">
            {siteConfig.brand.location}
          </div>
        </div>

        <div className="space-y-3 text-white/75">
          <p><a href={telHref(siteConfig.brand.phone)}>{siteConfig.brand.phone}</a></p>
          <p><a href={`mailto:${siteConfig.brand.email}`}>{siteConfig.brand.email}</a></p>
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
