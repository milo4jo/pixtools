import { NextRequest, NextResponse } from "next/server";
import pngToIco from "png-to-ico";

// ICO generation requires Node.js runtime (not Edge)
// png-to-ico uses Node's Buffer and fs APIs
export const runtime = "nodejs";

// ICO files typically contain multiple sizes
const ICO_SIZES = [16, 32, 48];

interface FaviconParams {
  text: string;
  bg: string;
  color: string;
  shape: "square" | "circle" | "rounded";
  radius: number;
}

function parseParams(searchParams: URLSearchParams): FaviconParams {
  return {
    text: searchParams.get("text") || searchParams.get("emoji") || "F",
    bg: (searchParams.get("bg") || "000000").replace("#", ""),
    color: (searchParams.get("color") || "ffffff").replace("#", ""),
    shape: (searchParams.get("shape") as FaviconParams["shape"]) || "square",
    radius: parseInt(searchParams.get("radius") || "0"),
  };
}

async function generatePng(
  params: FaviconParams,
  size: number,
  baseUrl: string
): Promise<Buffer> {
  // Use our own PNG endpoint to generate each size
  const url = new URL("/api/favicon", baseUrl);
  url.searchParams.set("text", params.text);
  url.searchParams.set("bg", params.bg);
  url.searchParams.set("color", params.color);
  url.searchParams.set("size", String(size));
  url.searchParams.set("shape", params.shape);
  if (params.radius) {
    url.searchParams.set("radius", String(params.radius));
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to generate PNG at size ${size}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function GET(request: NextRequest) {
  try {
    const params = parseParams(request.nextUrl.searchParams);
    const baseUrl = request.nextUrl.origin;

    // Generate PNGs at all required sizes
    const pngBuffers = await Promise.all(
      ICO_SIZES.map((size) => generatePng(params, size, baseUrl))
    );

    // Convert to ICO
    const icoBuffer = await pngToIco(pngBuffers);

    // Convert Buffer to Uint8Array for NextResponse
    return new NextResponse(new Uint8Array(icoBuffer), {
      headers: {
        "Content-Type": "image/x-icon",
        "Content-Disposition": 'attachment; filename="favicon.ico"',
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("ICO generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate ICO", details: String(error) },
      { status: 500 }
    );
  }
}
