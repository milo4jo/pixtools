import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

interface FaviconParams {
  text: string;
  bg: string;
  color: string;
  size: number;
  shape: "square" | "circle" | "rounded";
  radius: number;
  fontSize: number;
}

// Cache the font data
let interBoldFont: ArrayBuffer | null = null;

async function getInterFont(): Promise<ArrayBuffer> {
  if (interBoldFont) return interBoldFont;
  
  // Fetch Inter Bold from jsDelivr CDN (reliable, no auth needed, serves raw TTF)
  // Using the official Inter font package on npm
  const fontResponse = await fetch(
    "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/files/inter-latin-700-normal.woff",
    { cache: "force-cache" }
  );
  
  if (!fontResponse.ok) {
    throw new Error(`Failed to fetch font: ${fontResponse.status}`);
  }
  
  interBoldFont = await fontResponse.arrayBuffer();
  return interBoldFont;
}

function parseParams(searchParams: URLSearchParams): FaviconParams {
  const size = Math.min(Math.max(parseInt(searchParams.get("size") || "32"), 16), 512);
  
  return {
    text: searchParams.get("text") || searchParams.get("emoji") || "F",
    bg: (searchParams.get("bg") || "000000").replace("#", ""),
    color: (searchParams.get("color") || "ffffff").replace("#", ""),
    size,
    shape: (searchParams.get("shape") as FaviconParams["shape"]) || "square",
    radius: parseInt(searchParams.get("radius") || "0"),
    fontSize: parseInt(searchParams.get("fontSize") || "0") || Math.floor(size * 0.6),
  };
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(request: NextRequest) {
  try {
    const params = parseParams(request.nextUrl.searchParams);
    const format = request.nextUrl.searchParams.get("format") || "png";
    const { text, bg, color, size, shape, radius, fontSize } = params;
    
    // Calculate border radius based on shape
    let borderRadius = 0;
    if (shape === "circle") {
      borderRadius = size / 2;
    } else if (shape === "rounded") {
      borderRadius = radius || Math.floor(size * 0.2);
    }

    // Check if text is emoji
    const isEmoji = /\p{Emoji}/u.test(text);
    const displayText = text.slice(0, 3); // Max 3 characters

    // SVG format - generate a proper vector SVG
    if (format === "svg") {
      // Generate shape element based on shape type
      let shapeElement: string;
      if (shape === "circle") {
        const r = size / 2;
        shapeElement = `<circle cx="${r}" cy="${r}" r="${r}" fill="#${bg}"/>`;
      } else if (shape === "rounded") {
        const rx = radius || Math.floor(size * 0.2);
        shapeElement = `<rect width="${size}" height="${size}" fill="#${bg}" rx="${rx}"/>`;
      } else {
        shapeElement = `<rect width="${size}" height="${size}" fill="#${bg}"/>`;
      }

      // Escape special characters for XML
      const escapedText = escapeXml(displayText);

      // Use Inter font from Google Fonts for consistent rendering
      const fontFamily = isEmoji ? "system-ui, sans-serif" : "'Inter', sans-serif";
      const fontImport = isEmoji ? "" : `
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&amp;display=swap');
    </style>
  </defs>`;

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${fontImport}
  ${shapeElement}
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="#${color}" font-family="${fontFamily}" font-size="${fontSize}px" font-weight="700">${escapedText}</text>
</svg>`;

      return new NextResponse(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    }
    
    // Load Inter font for PNG generation
    const interFont = await getInterFont();

    // Generate image using Satori
    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            width: size,
            height: size,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: `#${bg}`,
            borderRadius: borderRadius,
            fontFamily: isEmoji ? "sans-serif" : "Inter",
            fontSize: fontSize,
            fontWeight: 700,
            color: `#${color}`,
          }}
        >
          {displayText}
        </div>
      ),
      {
        width: size,
        height: size,
        fonts: [
          {
            name: "Inter",
            data: interFont,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );

    // Get the PNG buffer
    const pngBuffer = await imageResponse.arrayBuffer();

    return new NextResponse(pngBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Favicon generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate favicon", details: String(error) },
      { status: 500 }
    );
  }
}
