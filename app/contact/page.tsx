import { PageShell } from "@/components/page-shell";
import { Card, Container, PrimaryButton, SectionHeading } from "@/components/ui";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata(`Contact | ${siteConfig.brand.name}`, `Contact ${siteConfig.brand.name} in ${siteConfig.brand.location}.`, "/contact");

export default function ContactPage() {
  return (
    <PageShell>
      <section className="bg-white py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title={`Talk to ${siteConfig.brand.name}`}
              description="A dedicated contact page helps with trust, conversions and multi-page depth."
            />

            <div className="mt-8 space-y-4 text-lg text-muted">
              <p><strong>Phone:</strong> <a href={`tel:${siteConfig.brand.phone.replace(/[^+\d]/g, "")}`}>{siteConfig.brand.phone}</a></p>
              <p><strong>Email:</strong> <a href={`mailto:${siteConfig.brand.email}`}>{siteConfig.brand.email}</a></p>
              <p><strong>Location:</strong> {siteConfig.brand.location}</p>
            </div>
          </div>

          <Card className="p-8 md:p-10">
            <div className="grid gap-5 md:grid-cols-2">
              <input className="rounded-2xl border border-line px-5 py-4 outline-none" placeholder="Name" />
              <input className="rounded-2xl border border-line px-5 py-4 outline-none" placeholder="Phone" />
              <input className="rounded-2xl border border-line px-5 py-4 outline-none md:col-span-2" placeholder="Email" />
              <textarea className="min-h-40 rounded-2xl border border-line px-5 py-4 outline-none md:col-span-2" placeholder="Tell us about the job" />
            </div>

            <div className="mt-6">
              <PrimaryButton href={`mailto:${siteConfig.brand.email}`}>Send enquiry</PrimaryButton>
            </div>
          </Card>
        </Container>
      </section>
    </PageShell>
  );
}
