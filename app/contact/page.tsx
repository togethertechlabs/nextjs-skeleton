import Image from "next/image";
import { PageShell } from "@/components/page-shell";
import { Card, Container, PrimaryButton, SectionHeading } from "@/components/ui";
import { buildPageMetadata } from "@/lib/metadata";
import { getImagePath, siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: `Contact | ${siteConfig.brand.name}`,
  description: `Contact ${siteConfig.brand.name} in ${siteConfig.brand.location}.`,
  path: "/contact"
});

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export default function ContactPage() {
  return (
    <PageShell>
      <section className="industry-section bg-white py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title={`Talk to ${siteConfig.brand.name}`}
              description={`Reach out for ${siteConfig.brand.industry.toLowerCase()} support in ${siteConfig.brand.location}.`}
            />

            <div className="mt-8 space-y-4 text-lg text-muted">
              <p>
                <strong>Phone:</strong> <a href={phoneHref(siteConfig.brand.phone)}>{siteConfig.brand.phone}</a>
              </p>
              <p>
                <strong>Email:</strong> <a href={`mailto:${siteConfig.brand.email}`}>{siteConfig.brand.email}</a>
              </p>
              <p>
                <strong>Location:</strong> {siteConfig.brand.location}
              </p>
            </div>

            <Card className="mt-8 overflow-hidden">
              <div className="relative min-h-[320px]">
                <Image src={getImagePath("contact")} alt={siteConfig.brand.name} fill className="object-cover" />
              </div>
            </Card>
          </div>

          <Card className="industry-cta-panel p-8 md:p-10">
            <div className="grid gap-5 md:grid-cols-2">
              <input className="rounded-2xl border border-line px-5 py-4 outline-none" placeholder="Name" />
              <input className="rounded-2xl border border-line px-5 py-4 outline-none" placeholder="Phone" />
              <input className="rounded-2xl border border-line px-5 py-4 outline-none md:col-span-2" placeholder="Email" />
              <textarea className="min-h-40 rounded-2xl border border-line px-5 py-4 outline-none md:col-span-2" placeholder="Tell us about the job" />
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <PrimaryButton href={`mailto:${siteConfig.brand.email}`}>Send enquiry</PrimaryButton>
              <PrimaryButton href={phoneHref(siteConfig.brand.phone)}>Call now</PrimaryButton>
            </div>
          </Card>
        </Container>
      </section>
    </PageShell>
  );
}
