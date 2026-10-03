import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Mono, Atkinson_Hyperlegible_Next, Bricolage_Grotesque } from "next/font/google";
import { ViewTransition } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import MobileBar from "@/components/MobileBar";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["wdth"],
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  variable: "--font-atkinson",
  display: "swap",
  adjustFontFallback: false,
});

const atkinsonMono = Atkinson_Hyperlegible_Mono({
  subsets: ["latin"],
  variable: "--font-atkinson-mono",
  weight: ["400", "700"],
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#0b2a2a",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Denver Plumber, Upfront Prices, 24/7`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: { icon: { url: asset("/icon.svg"), type: "image/svg+xml" } },
  openGraph: {
    title: site.name,
    description: site.description,
    locale: site.locale,
    type: "website",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${atkinson.variable} ${atkinsonMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-chalk font-sans text-ink">
        <JsonLd />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <aside aria-label="Concept project notice" className="border-b border-line bg-mint-soft text-ink">
          <p className="wrap py-2 text-sm leading-5 text-pretty">
            Concept project: a sample site built by 5280 Web Solutions. Headgate Plumbing &amp; Drain is not a real
            company.{" "}
            <a href="https://5280webs.com" className="font-bold whitespace-nowrap text-patina-deep underline underline-offset-4 hover:text-ink">
              See more at 5280webs.com
            </a>
          </p>
        </aside>
        <Header />
        <ViewTransition>
          <main id="main">{children}</main>
        </ViewTransition>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
