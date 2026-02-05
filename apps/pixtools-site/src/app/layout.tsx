import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PixTools - Developer tools that just work",
  description: "Open Graph images, favicons, and AI context selection. Simple tools for developers.",
  openGraph: {
    title: "PixTools",
    description: "Developer tools that just work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
