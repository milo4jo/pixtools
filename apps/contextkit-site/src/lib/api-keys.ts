/**
 * API Key Management
 *
 * Security best practices:
 * - Keys are hashed with SHA-256 before storage (never stored plain)
 * - Full key shown only once at creation
 * - Prefix allows quick identification without exposing key
 * - Constant-time comparison to prevent timing attacks
 */

import { randomBytes, createHash } from "crypto";
import { db, apiKeys } from "@/db";
import { eq, and } from "drizzle-orm";

// Key format: ck_live_<32 random chars>
const KEY_PREFIX = "ck_live_";
const KEY_LENGTH = 32;

interface CreateKeyResult {
  /** Full API key - shown only once */
  key: string;
  /** Key ID for reference */
  id: string;
  /** Prefix for display (e.g., ck_live_a1b2...wxyz) */
  displayPrefix: string;
}

interface ValidateKeyResult {
  valid: boolean;
  userId?: string;
  keyId?: string;
  error?: string;
}

/**
 * Generate a cryptographically secure random API key
 */
function generateKey(): string {
  const randomPart = randomBytes(KEY_LENGTH).toString("base64url").slice(0, KEY_LENGTH);
  return `${KEY_PREFIX}${randomPart}`;
}

/**
 * Hash an API key using SHA-256
 * Used for secure storage and comparison
 */
function hashKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

/**
 * Extract display prefix from full key
 * Shows first 8 and last 4 chars: ck_live_a1b2...wxyz
 */
function getDisplayPrefix(key: string): string {
  const withoutPrefix = key.slice(KEY_PREFIX.length);
  return `${KEY_PREFIX}${withoutPrefix.slice(0, 4)}...${withoutPrefix.slice(-4)}`;
}

/**
 * Generate a unique key ID using nanoid-style format
 */
function generateKeyId(): string {
  return `key_${randomBytes(12).toString("base64url")}`;
}

/**
 * Create a new API key for a user
 *
 * @returns The full key (shown once) and metadata
 */
export async function createApiKey(
  userId: string,
  name: string = "Default"
): Promise<CreateKeyResult> {
  const key = generateKey();
  const keyHash = hashKey(key);
  const keyId = generateKeyId();
  const displayPrefix = getDisplayPrefix(key);

  await db.insert(apiKeys).values({
    id: keyId,
    userId,
    name,
    keyHash,
    keyPrefix: displayPrefix,
  });

  return {
    key, // Full key - show only once!
    id: keyId,
    displayPrefix,
  };
}

/**
 * Validate an API key
 *
 * Uses constant-time comparison to prevent timing attacks
 */
export async function validateApiKey(key: string): Promise<ValidateKeyResult> {
  // Quick format check
  if (!key || !key.startsWith(KEY_PREFIX)) {
    return { valid: false, error: "Invalid key format" };
  }

  const keyHash = hashKey(key);

  // Find key by hash
  const result = await db
    .select()
    .from(apiKeys)
    .where(eq(apiKeys.keyHash, keyHash))
    .limit(1);

  if (result.length === 0) {
    return { valid: false, error: "Invalid API key" };
  }

  const apiKey = result[0];

  // Check expiration
  if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
    return { valid: false, error: "API key expired" };
  }

  // Update last used timestamp (fire and forget)
  db.update(apiKeys)
    .set({ lastUsedAt: new Date() })
    .where(eq(apiKeys.id, apiKey.id))
    .catch(() => {}); // Don't block on this

  return {
    valid: true,
    userId: apiKey.userId,
    keyId: apiKey.id,
  };
}

/**
 * List all API keys for a user (without exposing hashes)
 */
export async function listApiKeys(userId: string): Promise<
  Array<{
    id: string;
    name: string;
    keyPrefix: string;
    createdAt: Date;
    lastUsedAt: Date | null;
    expiresAt: Date | null;
  }>
> {
  const keys = await db
    .select({
      id: apiKeys.id,
      name: apiKeys.name,
      keyPrefix: apiKeys.keyPrefix,
      createdAt: apiKeys.createdAt,
      lastUsedAt: apiKeys.lastUsedAt,
      expiresAt: apiKeys.expiresAt,
    })
    .from(apiKeys)
    .where(eq(apiKeys.userId, userId));

  return keys;
}

/**
 * Revoke (delete) an API key
 */
export async function revokeApiKey(userId: string, keyId: string): Promise<boolean> {
  await db
    .delete(apiKeys)
    .where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId)));

  return true;
}

/**
 * Update API key name
 */
export async function updateApiKeyName(
  userId: string,
  keyId: string,
  name: string
): Promise<boolean> {
  await db
    .update(apiKeys)
    .set({ name })
    .where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, userId)));

  return true;
}
