import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { site } from "@/lib/site";
import { organizationLd, localBusinessLd } from "@/lib/jsonld";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DotField } from "@/components/ui/DotField";
import { CursorSystem } from "@/components/cursor/CursorSystem";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "WaverStudio | AI Automation & Custom Software in Miamisburg, Ohio",
    template: "%s | WaverStudio",
  },
  description: site.description,
  keywords: [
    "AI automation Miamisburg Ohio",
    "AI consulting Miamisburg",
    "AI automation Dayton Ohio",
    "business automation Dayton",
    "software developer Miamisburg",
    "Salesforce consultant Dayton Ohio",
    "workflow automation Dayton",
    "custom software Dayton Ohio",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "WaverStudio | AI Automation & Custom Software",
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "WaverStudio | AI Automation & Custom Software",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#050608",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="text-ink antialiased">
        <DotField />
        <CursorSystem />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-bg-card focus:px-4 focus:py-2 focus:text-sm focus:text-ink focus:ring-2 focus:ring-brand-violet"
        >
          Skip to content
        </a>
        {children}
        <StickyMobileCTA />
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
        />
      </body>
    </html>
  );
}
