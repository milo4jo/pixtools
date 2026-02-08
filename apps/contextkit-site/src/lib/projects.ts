/**
 * Projects Management
 *
 * CRUD operations for synced ContextKit projects.
 * Handles Vercel Blob storage for index files.
 */

import { nanoid } from "nanoid";
import { db, projects, type Project, type NewProject } from "@/db";
import { eq, and, desc } from "drizzle-orm";
import { put, del, head } from "@vercel/blob";
import { createHash } from "crypto";

// Plan limits
const PLAN_LIMITS = {
  free: { maxProjects: 1, maxIndexSize: 100 * 1024 * 1024 }, // 100MB
  pro: { maxProjects: 5, maxIndexSize: 1024 * 1024 * 1024 }, // 1GB
  team: { maxProjects: 50, maxIndexSize: 10 * 1024 * 1024 * 1024 }, // 10GB
  enterprise: { maxProjects: Infinity, maxIndexSize: Infinity },
};

interface CreateProjectResult {
  project: Project;
}

interface UploadResult {
  project: Project;
  blobUrl: string;
}

/**
 * Create a new project (without index yet)
 */
export async function createProject(
  userId: string,
  name: string,
  description?: string
): Promise<CreateProjectResult> {
  const id = nanoid();
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const [project] = await db
    .insert(projects)
    .values({
      id,
      userId,
      name,
      slug,
      description,
    })
    .returning();

  return { project };
}

/**
 * List all projects for a user
 */
export async function listProjects(userId: string): Promise<Project[]> {
  return db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId))
    .orderBy(desc(projects.updatedAt));
}

/**
 * Get a single project by ID
 */
export async function getProject(
  userId: string,
  projectId: string
): Promise<Project | null> {
  const [project] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
    .limit(1);

  return project || null;
}

/**
 * Get project by slug
 */
export async function getProjectBySlug(
  userId: string,
  slug: string
): Promise<Project | null> {
  const [project] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.slug, slug), eq(projects.userId, userId)))
    .limit(1);

  return project || null;
}

/**
 * Upload index to Vercel Blob and update project
 */
export async function uploadIndex(
  userId: string,
  projectId: string,
  indexBuffer: Buffer,
  metadata: {
    fileCount?: number;
    chunkCount?: number;
  } = {}
): Promise<UploadResult> {
  // Check for BLOB token
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }

  // Get existing project
  const project = await getProject(userId, projectId);
  if (!project) {
    throw new Error("Project not found");
  }

  // Calculate hash for change detection
  const indexHash = createHash("sha256").update(indexBuffer).digest("hex");

  // Skip upload if hash matches (no changes)
  if (project.indexHash === indexHash) {
    return { project, blobUrl: project.blobUrl! };
  }

  // Delete old blob if exists
  if (project.blobPathname) {
    try {
      await del(project.blobPathname);
    } catch {
      // Ignore deletion errors
    }
  }

  // Upload new blob
  const pathname = `indexes/${userId}/${projectId}/${Date.now()}.db`;
  const blob = await put(pathname, indexBuffer, {
    access: "public",
    addRandomSuffix: false,
  });

  // Update project
  const [updatedProject] = await db
    .update(projects)
    .set({
      blobUrl: blob.url,
      blobPathname: blob.pathname,
      indexHash,
      indexSize: indexBuffer.length,
      indexVersion: project.indexVersion + 1,
      fileCount: metadata.fileCount,
      chunkCount: metadata.chunkCount,
      lastSyncedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(projects.id, projectId))
    .returning();

  return { project: updatedProject, blobUrl: blob.url };
}

/**
 * Get download URL for an index
 */
export async function getIndexDownloadUrl(
  userId: string,
  projectId: string
): Promise<string | null> {
  const project = await getProject(userId, projectId);
  if (!project?.blobUrl) {
    return null;
  }

  return project.blobUrl;
}

/**
 * Check if index exists and get metadata
 */
export async function getIndexMetadata(
  userId: string,
  projectId: string
): Promise<{
  exists: boolean;
  hash?: string;
  size?: number;
  version?: number;
  lastSynced?: Date;
} | null> {
  const project = await getProject(userId, projectId);
  if (!project) {
    return null;
  }

  if (!project.blobUrl) {
    return { exists: false };
  }

  return {
    exists: true,
    hash: project.indexHash || undefined,
    size: project.indexSize || undefined,
    version: project.indexVersion,
    lastSynced: project.lastSyncedAt || undefined,
  };
}

/**
 * Delete a project and its blob
 */
export async function deleteProject(
  userId: string,
  projectId: string
): Promise<boolean> {
  const project = await getProject(userId, projectId);
  if (!project) {
    return false;
  }

  // Delete blob if exists
  if (project.blobPathname) {
    try {
      await del(project.blobPathname);
    } catch {
      // Ignore deletion errors
    }
  }

  // Delete from DB
  await db
    .delete(projects)
    .where(and(eq(projects.id, projectId), eq(projects.userId, userId)));

  return true;
}

/**
 * Update project metadata
 */
export async function updateProject(
  userId: string,
  projectId: string,
  updates: { name?: string; description?: string }
): Promise<Project | null> {
  const [project] = await db
    .update(projects)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
    .returning();

  return project || null;
}

/**
 * Check plan limits
 */
export async function checkPlanLimits(
  userId: string,
  plan: string = "free"
): Promise<{
  canCreateProject: boolean;
  projectCount: number;
  maxProjects: number;
  maxIndexSize: number;
}> {
  const userProjects = await listProjects(userId);
  const limits = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.free;

  return {
    canCreateProject: userProjects.length < limits.maxProjects,
    projectCount: userProjects.length,
    maxProjects: limits.maxProjects,
    maxIndexSize: limits.maxIndexSize,
  };
}
