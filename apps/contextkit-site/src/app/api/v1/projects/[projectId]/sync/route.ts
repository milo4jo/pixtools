/**
 * Project Sync API
 *
 * POST /api/v1/projects/:id/sync - Upload index
 * GET /api/v1/projects/:id/sync - Get download URL
 */

import { auth } from "@clerk/nextjs/server";
import { validateApiKey } from "@/lib/api-keys";
import { getProject, uploadIndex, getIndexDownloadUrl, getIndexMetadata, checkPlanLimits } from "@/lib/projects";
import { db, users } from "@/db";
import { eq } from "drizzle-orm";

async function getAuthenticatedUser(req: Request): Promise<{ userId: string; plan: string } | null> {
  const authHeader = req.headers.get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const apiKey = authHeader.slice(7);
    const keyResult = await validateApiKey(apiKey);
    if (keyResult.valid && keyResult.userId) {
      const [user] = await db
        .select({ plan: users.plan })
        .from(users)
        .where(eq(users.id, keyResult.userId))
        .limit(1);
      return { userId: keyResult.userId, plan: user?.plan || "free" };
    }
  }

  const clerkAuth = await auth();
  if (clerkAuth.userId) {
    const [user] = await db
      .select({ plan: users.plan })
      .from(users)
      .where(eq(users.id, clerkAuth.userId))
      .limit(1);
    return { userId: clerkAuth.userId, plan: user?.plan || "free" };
  }

  return null;
}

/**
 * Upload index to cloud
 *
 * Expects multipart form data with:
 * - file: The index database file
 * - fileCount (optional): Number of indexed files
 * - chunkCount (optional): Number of chunks
 * - hash (optional): Client-computed hash for verification
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const authResult = await getAuthenticatedUser(req);
  if (!authResult) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const { projectId } = await params;

  try {
    // Check project exists
    const project = await getProject(authResult.userId, projectId);
    if (!project) {
      return new Response(
        JSON.stringify({ error: "Project not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const fileCount = formData.get("fileCount");
    const chunkCount = formData.get("chunkCount");
    // Client can send hash for future integrity verification
    // const clientHash = formData.get("hash");

    if (!file) {
      return new Response(
        JSON.stringify({ error: "No file provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check file size against plan limits
    const limits = await checkPlanLimits(authResult.userId, authResult.plan);
    if (file.size > limits.maxIndexSize) {
      return new Response(
        JSON.stringify({
          error: "Index too large",
          message: `Your ${authResult.plan} plan allows indexes up to ${Math.round(limits.maxIndexSize / 1024 / 1024)}MB. Upgrade for larger indexes.`,
          size: file.size,
          maxSize: limits.maxIndexSize,
          upgradeUrl: "/dashboard/billing",
        }),
        { status: 413, headers: { "Content-Type": "application/json" } }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Vercel Blob
    const result = await uploadIndex(authResult.userId, projectId, buffer, {
      fileCount: fileCount ? parseInt(fileCount as string, 10) : undefined,
      chunkCount: chunkCount ? parseInt(chunkCount as string, 10) : undefined,
    });

    return new Response(
      JSON.stringify({
        success: true,
        project: {
          id: result.project.id,
          name: result.project.name,
          indexSize: result.project.indexSize,
          indexVersion: result.project.indexVersion,
          indexHash: result.project.indexHash,
          lastSyncedAt: result.project.lastSyncedAt?.toISOString(),
        },
        blobUrl: result.blobUrl,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Failed to upload index:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ 
        error: "Failed to upload index",
        message: errorMessage,
        hint: errorMessage.includes("BLOB") ? "BLOB_READ_WRITE_TOKEN may not be configured" : undefined,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/**
 * Get download URL for index
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const authResult = await getAuthenticatedUser(req);
  if (!authResult) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const { projectId } = await params;

  try {
    const project = await getProject(authResult.userId, projectId);
    if (!project) {
      return new Response(
        JSON.stringify({ error: "Project not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const metadata = await getIndexMetadata(authResult.userId, projectId);
    const downloadUrl = await getIndexDownloadUrl(authResult.userId, projectId);

    if (!downloadUrl || !metadata?.exists) {
      return new Response(
        JSON.stringify({
          error: "No index found",
          message: "This project has not been synced yet. Run `contextkit sync` to upload your index.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        downloadUrl,
        index: {
          hash: metadata.hash,
          size: metadata.size,
          version: metadata.version,
          lastSynced: metadata.lastSynced?.toISOString(),
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Failed to get download URL:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get download URL" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
