import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

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

function generateSVG(params: FaviconParams): string {
  const { text, bg, color, size, shape, radius, fontSize } = params;
  
  // Calculate border radius based on shape
  let rx = 0;
  if (shape === "circle") {
    rx = size / 2;
  } else if (shape === "rounded") {
    rx = radius || size * 0.2;
  }

  // Check if text is emoji (crude check)
  const isEmoji = /\p{Emoji}/u.test(text);
  const displayText = text.slice(0, 3); // Max 3 characters
  
  return `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="#${bg}" rx="${rx}" ry="${rx}"/>
      <text 
        x="50%" 
        y="50%" 
        dominant-baseline="central" 
        text-anchor="middle" 
        fill="#${color}"
        font-family="${isEmoji ? 'Apple Color Emoji, Segoe UI Emoji' : 'Inter, system-ui, sans-serif'}"
        font-size="${fontSize}px"
        font-weight="bold"
      >${displayText}</text>
    </svg>
  `.trim();
}

export async function GET(request: NextRequest) {
  try {
    const params = parseParams(request.nextUrl.searchParams);
    const format = request.nextUrl.searchParams.get("format") || "png";
    
    // Generate SVG
    const svg = generateSVG(params);
    
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
