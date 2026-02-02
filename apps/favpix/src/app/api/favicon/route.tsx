import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";
import fs from "fs";
import path from "path";

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
    
    // Load Inter font
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

    // If SVG requested, we still return PNG (Satori doesn't output SVG directly in this config)
    // For true SVG, we'd need a different approach
    if (format === "svg") {
      // For SVG format, return a simple SVG wrapper with embedded PNG
      // This is a workaround - true SVG would require different rendering
      return new NextResponse(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
          <rect width="${size}" height="${size}" fill="#${bg}" rx="${borderRadius}"/>
          <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="#${color}" font-family="sans-serif" font-size="${fontSize}px" font-weight="bold">${displayText}</text>
        </svg>`,
        {
          headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "public, max-age=86400, s-maxage=86400",
          },
        }
      );
    }

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
