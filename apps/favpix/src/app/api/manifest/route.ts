import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

/**
 * Generate a PWA manifest.json with favicon references
 * 
 * Query params:
 * - name: App name (default: "My App")
 * - short_name: Short name (default: name)
 * - theme: Theme color (default: "000000")
 * - bg: Background color (default: theme)
 * - text: Favicon text (for icon URLs)
 * - color: Favicon text color (default: "ffffff")
 * - shape: Favicon shape (default: "rounded")
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  
  const name = params.get("name") || "My App";
  const shortName = params.get("short_name") || name;
  const themeColor = (params.get("theme") || "000000").replace("#", "");
  const bgColor = (params.get("bg") || themeColor).replace("#", "");
  const faviconText = params.get("text") || name.charAt(0).toUpperCase();
  const faviconColor = (params.get("color") || "ffffff").replace("#", "");
  const faviconShape = params.get("shape") || "rounded";
  
  // Base URL for favicon API
  const baseUrl = new URL(request.url).origin;
  const faviconBase = `${baseUrl}/api/favicon?text=${encodeURIComponent(faviconText)}&bg=${bgColor}&color=${faviconColor}&shape=${faviconShape}`;
  
  const manifest = {
    name,
    short_name: shortName,
    description: `${name} - Progressive Web App`,
    start_url: "/",
    display: "standalone",
    background_color: `#${bgColor}`,
    theme_color: `#${themeColor}`,
    icons: [
      {
        src: `${faviconBase}&size=192`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: `${faviconBase}&size=512`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
  
  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
