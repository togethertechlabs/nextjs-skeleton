import './globals.css';
import { getSiteConfig } from '@/lib/site-config';
import { buildMetadata } from '@/lib/seo';
import { buildLocalBusinessSchema } from '@/lib/schema';

export async function generateMetadata() {
  const config = await getSiteConfig();
  return buildMetadata(config);
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const config = await getSiteConfig();
  const schema = buildLocalBusinessSchema(config);

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {children}
      </body>
    </html>
  );
}
