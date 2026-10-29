import type { Metadata, Viewport } from "next";
import { event } from "@/content/event";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const title = event.identity.name;

export const metadata: Metadata = {
  // Canonical and absolute OG URLs only once the production domain is known.
  ...(siteConfig.siteUrl && {
    metadataBase: siteConfig.siteUrl,
    alternates: { canonical: "/" },
  }),
  title,
  description: event.identity.description,
  applicationName: event.identity.name,
  openGraph: {
    type: "website",
    title,
    description: event.identity.description,
    siteName: event.identity.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: event.identity.description,
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#F5F0E6",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>
        <div className="scroll-progress" aria-hidden="true" />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
