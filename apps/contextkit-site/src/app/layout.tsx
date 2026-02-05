import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const siteUrl = "https://contextkit.dev";

// OGPix for social preview 🖼️
const ogImageUrl = `https://ogpix.vercel.app/api/og?title=ContextKit&subtitle=Smart+context+selection+for+AI+coding&theme=dark&layout=center`;

// FavPix for favicon 🎯
const faviconBase = "https://favpix.vercel.app/api/favicon?text=🎯&bg=000000&shape=rounded";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ContextKit — Smart context selection for AI coding",
  description:
    "Stop dumping your entire codebase into AI prompts. ContextKit selects the right context for any query — saving tokens and improving answers.",
  keywords: [
    "AI coding",
    "context selection",
    "LLM",
    "Claude",
    "GPT",
    "MCP",
    "Model Context Protocol",
    "RAG",
    "embeddings",
    "developer tools",
  ],
  authors: [{ name: "Milo", url: "https://github.com/milo4jo" }],
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
    title: "ContextKit — Smart context selection for AI coding",
    description:
      "Stop dumping your entire codebase into AI prompts. ContextKit selects the right context for any query.",
    type: "website",
    url: siteUrl,
    siteName: "ContextKit",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "ContextKit — Smart context selection for AI coding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ContextKit — Smart context selection for AI coding",
    description:
      "Stop dumping your entire codebase into AI prompts. ContextKit selects the right context for any query.",
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-black text-white font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
