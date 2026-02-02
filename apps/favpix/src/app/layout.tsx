import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://favpix.vercel.app";

// OGPix-generated OG image
const ogImageUrl = "https://ogpix.vercel.app/api/og?title=Favicons.&subtitle=One+API.&theme=dark&fontSize=xl";

// FavPix-generated favicons (using our own tool!)
const faviconBase = `${siteUrl}/api/favicon?text=🎨&bg=7c3aed&shape=rounded`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "FavPix — Instant Favicon API",
  description: "Generate beautiful favicons with a single API call. Text, emoji, all sizes. Free to use.",
  icons: {
    icon: [
      { url: `${faviconBase}&size=32`, sizes: "32x32", type: "image/png" },
      { url: `${faviconBase}&size=16`, sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: `${faviconBase}&size=180`, sizes: "180x180", type: "image/png" },
    ],
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
        {children}
      </body>
    </html>
  );
}
