import type { Metadata } from "next";
import "./globals.css";
import { getThemeClass, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  alternates: {
    canonical: siteConfig.seo.canonical
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={getThemeClass(siteConfig.layout.theme)}>
        {children}
      </body>
    </html>
  );
}
