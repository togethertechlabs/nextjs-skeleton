import type { Metadata } from 'next';
import './globals.css';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { buildMetadata } from '@/lib/metadata';
import { getThemeClass, siteConfig } from '@/lib/site-config';

export const metadata: Metadata = buildMetadata();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={getThemeClass(siteConfig.layout.theme)}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: siteConfig.brand.name,
              areaServed: siteConfig.coverage.areas,
              telephone: siteConfig.brand.phone,
              email: siteConfig.brand.email,
              address: {
                '@type': 'PostalAddress',
                addressLocality: siteConfig.brand.location,
                addressCountry: 'GB'
              }
            })
          }}
        />
      </body>
    </html>
  );
}
