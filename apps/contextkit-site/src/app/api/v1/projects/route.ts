/**
 * Projects API
 *
 * GET /api/v1/projects - List all projects
 * POST /api/v1/projects - Create a new project
 */

import { auth } from "@clerk/nextjs/server";
import { validateApiKey } from "@/lib/api-keys";
import { listProjects, createProject, checkPlanLimits } from "@/lib/projects";
import { db, users } from "@/db";
import { eq } from "drizzle-orm";

async function getAuthenticatedUser(req: Request): Promise<{ userId: string; plan: string } | null> {
  // Try API key auth first
  const authHeader = req.headers.get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const apiKey = authHeader.slice(7);
    const keyResult = await validateApiKey(apiKey);
    if (keyResult.valid && keyResult.userId) {
      // Get user's plan
      const [user] = await db
        .select({ plan: users.plan })
        .from(users)
        .where(eq(users.id, keyResult.userId))
        .limit(1);
      return { userId: keyResult.userId, plan: user?.plan || "free" };
    }
  }

  // Fall back to Clerk session auth
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
 * List all projects for the authenticated user
 */
export async function GET(req: Request) {
  const authResult = await getAuthenticatedUser(req);

  if (!authResult) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const projectList = await listProjects(authResult.userId);
    const limits = await checkPlanLimits(authResult.userId, authResult.plan);

    return new Response(
      JSON.stringify({
        projects: projectList.map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description,
          indexSize: p.indexSize,
          indexVersion: p.indexVersion,
          fileCount: p.fileCount,
          chunkCount: p.chunkCount,
          lastSyncedAt: p.lastSyncedAt?.toISOString(),
          createdAt: p.createdAt.toISOString(),
        })),
        limits: {
          projectCount: limits.projectCount,
          maxProjects: limits.maxProjects,
          canCreateProject: limits.canCreateProject,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Failed to list projects:", error);
    return new Response(
      JSON.stringify({ error: "Failed to list projects" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/**
 * Create a new project
 */
export async function POST(req: Request) {
  const authResult = await getAuthenticatedUser(req);

  if (!authResult) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    const { name, description } = body;

    if (!name || typeof name !== "string") {
      return new Response(
        JSON.stringify({ error: "Name is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check plan limits
    const limits = await checkPlanLimits(authResult.userId, authResult.plan);
    if (!limits.canCreateProject) {
      return new Response(
        JSON.stringify({
          error: "Project limit reached",
          message: `Your ${authResult.plan} plan allows ${limits.maxProjects} project(s). Upgrade to add more.`,
          upgradeUrl: "/dashboard/billing",
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await createProject(authResult.userId, name, description);

    return new Response(
      JSON.stringify({
        project: {
          id: result.project.id,
          name: result.project.name,
          slug: result.project.slug,
          description: result.project.description,
          createdAt: result.project.createdAt.toISOString(),
        },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Failed to create project:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create project" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
