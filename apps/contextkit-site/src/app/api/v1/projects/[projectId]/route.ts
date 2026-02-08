/**
 * Single Project API
 *
 * GET /api/v1/projects/:id - Get project details
 * PATCH /api/v1/projects/:id - Update project
 * DELETE /api/v1/projects/:id - Delete project
 */

import { auth } from "@clerk/nextjs/server";
import { validateApiKey } from "@/lib/api-keys";
import { getProject, updateProject, deleteProject, getIndexMetadata } from "@/lib/projects";
import { db, users } from "@/db";
import { eq } from "drizzle-orm";

async function getAuthenticatedUserId(req: Request): Promise<string | null> {
  // Try API key auth first
  const authHeader = req.headers.get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const apiKey = authHeader.slice(7);
    const keyResult = await validateApiKey(apiKey);
    if (keyResult.valid && keyResult.userId) {
      return keyResult.userId;
    }
  }

  // Fall back to Clerk session auth
  const clerkAuth = await auth();
  return clerkAuth.userId;
}

/**
 * Get project details
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const { projectId } = await params;

  try {
    const project = await getProject(userId, projectId);
    if (!project) {
      return new Response(
        JSON.stringify({ error: "Project not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const indexMeta = await getIndexMetadata(userId, projectId);

    return new Response(
      JSON.stringify({
        project: {
          id: project.id,
          name: project.name,
          slug: project.slug,
          description: project.description,
          createdAt: project.createdAt.toISOString(),
          updatedAt: project.updatedAt.toISOString(),
        },
        index: indexMeta,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Failed to get project:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get project" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/**
 * Update project
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const { projectId } = await params;

  try {
    const body = await req.json();
    const { name, description } = body;

    const project = await updateProject(userId, projectId, { name, description });
    if (!project) {
      return new Response(
        JSON.stringify({ error: "Project not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        project: {
          id: project.id,
          name: project.name,
          slug: project.slug,
          description: project.description,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Failed to update project:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update project" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/**
 * Delete project
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const { projectId } = await params;

  try {
    const deleted = await deleteProject(userId, projectId);
    if (!deleted) {
      return new Response(
        JSON.stringify({ error: "Project not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Failed to delete project:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete project" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
