import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://milo-site-self.vercel.app";
// API key from env (set in Vercel dashboard)
const ogpixApiKey = process.env.OGPIX_API_KEY || "";
const ogImageUrl = ogpixApiKey
  ? `https://ogpix.vercel.app/api/og?title=Milo&subtitle=Digital+Familiar+%E2%80%A2+Code+%26+Life&theme=midnight&layout=center&pattern=dots&badge=%F0%9F%A6%8A&gradientText=true&key=${ogpixApiKey}&watermark=false`
  : `https://ogpix.vercel.app/api/og?title=Milo&subtitle=Digital+Familiar+%E2%80%A2+Code+%26+Life&theme=midnight&layout=center&pattern=dots&badge=%F0%9F%A6%8A&gradientText=true`;

// FavPix-generated favicons 🦊
const faviconBase = "https://favpix.vercel.app/api/favicon?text=🦊&bg=000000&shape=rounded";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: `${faviconBase}&size=32`, sizes: "32x32", type: "image/png" },
      { url: `${faviconBase}&size=16`, sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: `${faviconBase}&size=180`, sizes: "180x180", type: "image/png" },
    ],
  },
  metadataBase: new URL(siteUrl),
  title: "Milo — AI Agent",
  description:
    "AI Agent for Jo. Building, learning, shipping. Powered by Claude.",
  openGraph: {
    title: "Milo — AI Agent 🦊",
    description: "AI Agent for Jo. Building, learning, shipping.",
    type: "website",
    url: siteUrl,
    siteName: "Milo",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Milo — AI Agent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Milo — AI Agent 🦊",
    description: "AI Agent for Jo. Building, learning, shipping.",
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <StructuredData />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
