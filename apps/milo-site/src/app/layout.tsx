import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://milo-site-self.vercel.app";
// API key from env (set in Vercel dashboard)
const ogpixApiKey = process.env.OGPIX_API_KEY || "";
const ogImageUrl = ogpixApiKey
  ? `https://ogpix.vercel.app/api/og?title=Milo&subtitle=AI+Agent+for+Jo&theme=dark&layout=center&key=${ogpixApiKey}&watermark=false`
  : `https://ogpix.vercel.app/api/og?title=Milo&subtitle=AI+Agent+for+Jo&theme=dark&layout=center`;

export const metadata: Metadata = {
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
