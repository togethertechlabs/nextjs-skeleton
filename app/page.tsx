import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  return (
    <main>
      <Hero hero={siteConfig.hero} siteName={siteConfig.siteName} />
      <Services services={siteConfig.services} />
      <CTA text={siteConfig.cta.text} />
      <Footer siteName={siteConfig.siteName} location={siteConfig.location} />
    </main>
  );
}
