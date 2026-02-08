/**
 * Single API Key Management
 *
 * DELETE /api/v1/keys/[keyId] - Revoke API key
 * PATCH /api/v1/keys/[keyId] - Update API key name
 */

import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { revokeApiKey, updateApiKeyName } from "@/lib/api-keys";

interface RouteParams {
  params: Promise<{ keyId: string }>;
}

/**
 * Revoke (delete) an API key
 */
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { userId } = await auth();
  const { keyId } = await params;

  if (!userId) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    await revokeApiKey(userId, keyId);

    return new Response(
      JSON.stringify({ success: true, message: "API key revoked" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to revoke API key:", error);
    return new Response(
      JSON.stringify({ error: "Failed to revoke API key" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/**
 * Update API key name
 */
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { userId } = await auth();
  const { keyId } = await params;

  if (!userId) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string") {
      return new Response(
        JSON.stringify({ error: "Name is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await updateApiKeyName(userId, keyId, name);

    return new Response(
      JSON.stringify({ success: true, message: "API key updated" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to update API key:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update API key" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
