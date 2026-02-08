/**
 * API Key Management Endpoints
 *
 * POST /api/v1/keys - Create new API key
 * GET /api/v1/keys - List all API keys
 */

import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createApiKey, listApiKeys } from "@/lib/api-keys";

/**
 * Create a new API key
 */
export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const name = body.name || "Default";

    const result = await createApiKey(userId, name);

    return new Response(
      JSON.stringify({
        success: true,
        key: result.key, // Full key - shown only once!
        id: result.id,
        displayPrefix: result.displayPrefix,
        message: "Save this key securely. It won't be shown again.",
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to create API key:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create API key" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/**
 * List all API keys for the authenticated user
 */
export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const keys = await listApiKeys(userId);

    return new Response(
      JSON.stringify({ keys }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to list API keys:", error);
    return new Response(
      JSON.stringify({ error: "Failed to list API keys" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
