import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import pngToIco from "png-to-ico";

// ZIP generation requires Node.js runtime for png-to-ico
export const runtime = "nodejs";

interface FaviconParams {
  text: string;
  bg: string;
  color: string;
  shape: "square" | "circle" | "rounded";
  radius: number;
  fontSize: number;
}

// All the sizes we include in the ZIP
const PNG_SIZES = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "android-chrome-192x192.png" },
  { size: 512, name: "android-chrome-512x512.png" },
];

const ICO_SIZES = [16, 32, 48];

function parseParams(searchParams: URLSearchParams): FaviconParams {
  return {
    text: searchParams.get("text") || searchParams.get("emoji") || "F",
    bg: (searchParams.get("bg") || "000000").replace("#", ""),
    color: (searchParams.get("color") || "ffffff").replace("#", ""),
    shape: (searchParams.get("shape") as FaviconParams["shape"]) || "square",
    radius: parseInt(searchParams.get("radius") || "0"),
    fontSize: parseInt(searchParams.get("fontSize") || "0"),
  };
}

async function fetchFavicon(
  baseUrl: string,
  params: FaviconParams,
  size: number,
  format: "png" | "svg" = "png"
): Promise<ArrayBuffer> {
  const url = new URL("/api/favicon", baseUrl);
  url.searchParams.set("text", params.text);
  url.searchParams.set("bg", params.bg);
  url.searchParams.set("color", params.color);
  url.searchParams.set("size", String(size));
  url.searchParams.set("shape", params.shape);
  if (params.radius) {
    url.searchParams.set("radius", String(params.radius));
  }
  if (params.fontSize) {
    // Scale fontSize proportionally to size
    const scaledFontSize = Math.floor((size * params.fontSize) / 100);
    url.searchParams.set("fontSize", String(scaledFontSize));
  }
  if (format === "svg") {
    url.searchParams.set("format", "svg");
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch favicon: ${response.status}`);
  }
  return response.arrayBuffer();
}

export async function GET(request: NextRequest) {
  try {
    const params = parseParams(request.nextUrl.searchParams);
    const baseUrl = request.nextUrl.origin;

    const zip = new JSZip();

    // Generate all PNG sizes in parallel
    const pngPromises = PNG_SIZES.map(async ({ size, name }) => {
      const buffer = await fetchFavicon(baseUrl, params, size);
      return { name, buffer };
    });

    // Generate ICO sizes for favicon.ico
    const icoPromises = ICO_SIZES.map((size) =>
      fetchFavicon(baseUrl, params, size).then((ab) => Buffer.from(ab))
    );

    // Generate SVG
    const svgPromise = fetchFavicon(baseUrl, params, 64, "svg");

    // Wait for all PNG files
    const pngResults = await Promise.all(pngPromises);
    for (const { name, buffer } of pngResults) {
      zip.file(name, buffer);
    }

    // Generate and add ICO
    const icoBuffers = await Promise.all(icoPromises);
    const icoBuffer = await pngToIco(icoBuffers);
    zip.file("favicon.ico", icoBuffer);

    // Add SVG
    const svgBuffer = await svgPromise;
    zip.file("favicon.svg", svgBuffer);

    // Generate the ZIP
    const zipBuffer = await zip.generateAsync({
      type: "arraybuffer",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });

    return new NextResponse(zipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="favicons.zip"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("ZIP generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate ZIP", details: String(error) },
      { status: 500 }
    );
  }
}
