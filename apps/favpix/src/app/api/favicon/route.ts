import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import path from "path";
import fs from "fs";

export const runtime = "nodejs";

interface FaviconParams {
  text: string;
  bg: string;
  color: string;
  size: number;
  shape: "square" | "circle" | "rounded";
  radius: number;
  fontSize: number;
}

// Load and cache the Inter font as base64 for SVG embedding
let interFontBase64: string | null = null;

async function getInterFontBase64(): Promise<string> {
  if (interFontBase64) return interFontBase64;
  
  try {
    // Try to load local font file
    const fontPath = path.join(process.cwd(), "public", "fonts", "Inter-Bold.woff2");
    if (fs.existsSync(fontPath)) {
      const fontBuffer = fs.readFileSync(fontPath);
      interFontBase64 = fontBuffer.toString("base64");
      return interFontBase64;
    }
  } catch {
    // Font file not available, will use fallback
  }
  
  return "";
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

function generateSVG(params: FaviconParams, fontBase64: string): string {
  const { text, bg, color, size, shape, radius, fontSize } = params;
  
  // Calculate border radius based on shape
  let rx = 0;
  if (shape === "circle") {
    rx = size / 2;
  } else if (shape === "rounded") {
    rx = radius || size * 0.2;
  }

  // Check if text is emoji
  const isEmoji = /\p{Emoji}/u.test(text);
  const displayText = text.slice(0, 3); // Max 3 characters
  
  // Escape special XML characters
  const escapedText = displayText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Font definition - embed Inter if available, otherwise use DejaVu Sans (available on Linux/Vercel)
  const fontFamily = isEmoji 
    ? "Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji" 
    : fontBase64 
      ? "Inter" 
      : "DejaVu Sans, Liberation Sans, Arial, sans-serif";
  
  const fontFace = fontBase64 ? `
    <defs>
      <style type="text/css">
        @font-face {
          font-family: 'Inter';
          font-weight: bold;
          src: url(data:font/woff2;base64,${fontBase64}) format('woff2');
        }
      </style>
    </defs>` : "";

  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${fontFace}
  <rect width="${size}" height="${size}" fill="#${bg}" rx="${rx}" ry="${rx}"/>
  <text 
    x="50%" 
    y="50%" 
    dominant-baseline="central" 
    text-anchor="middle" 
    fill="#${color}"
    font-family="${fontFamily}"
    font-size="${fontSize}px"
    font-weight="bold"
  >${escapedText}</text>
</svg>`;
}

export async function GET(request: NextRequest) {
  try {
    const params = parseParams(request.nextUrl.searchParams);
    const format = request.nextUrl.searchParams.get("format") || "png";
    
    // Load font for embedding
    const fontBase64 = await getInterFontBase64();
    
    // Generate SVG
    const svg = generateSVG(params, fontBase64);
    
    // If SVG requested, return directly
    if (format === "svg") {
      return new NextResponse(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    }
    
    // Convert to PNG using sharp
    const pngBuffer = await sharp(Buffer.from(svg))
      .resize(params.size, params.size)
      .png()
      .toBuffer();
    
    return new NextResponse(new Uint8Array(pngBuffer), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Favicon generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate favicon" },
      { status: 500 }
    );
  }
}
