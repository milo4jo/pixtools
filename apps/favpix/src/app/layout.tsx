import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FavPix — Instant Favicon API",
  description: "Generate beautiful favicons with a single API call. All formats included.",
  openGraph: {
    title: "FavPix — Instant Favicon API",
    description: "Generate beautiful favicons with a single API call. All formats included.",
    type: "website",
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
