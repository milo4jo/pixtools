import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

const siteUrl = "https://favpix.vercel.app";

// OGPix-generated OG image
const ogImageUrl = "https://ogpix.vercel.app/api/og?title=Favicons.&subtitle=One+API.&theme=dark&fontSize=xl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "FavPix — Instant Favicon API",
  description: "Generate beautiful favicons with a single API call. Text, emoji, all sizes. Free to use.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "FavPix — Instant Favicon API",
    description: "Generate beautiful favicons with a single API call. Text, emoji, all sizes.",
    type: "website",
    url: siteUrl,
    siteName: "FavPix",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "FavPix — Instant Favicon API",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FavPix — Instant Favicon API",
    description: "Generate beautiful favicons with a single API call. Free to use.",
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <StructuredData />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
