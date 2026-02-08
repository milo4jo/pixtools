/**
 * Usage Tracking
 *
 * Tracks API usage for:
 * - Billing (usage-based pricing)
 * - Rate limiting enforcement
 * - Analytics and insights
 * - Quota management
 */

import { db, usage, usageMonthly, users } from "@/db";
import { eq, and, sql } from "drizzle-orm";

export type ActionType = "select" | "symbol" | "graph" | "index" | "status";

interface TrackUsageParams {
  userId: string;
  apiKeyId?: string;
  action: ActionType;
  tokensIn?: number;
  tokensOut?: number;
  durationMs?: number;
}

interface UsageStats {
  today: number;
  thisMonth: number;
  monthlyLimit: number;
  remaining: number;
  resetDate: Date;
}

interface MonthlyUsage {
  selectCount: number;
  symbolCount: number;
  graphCount: number;
  indexCount: number;
  totalRequests: number;
  totalTokens: number;
}

// Plan limits (requests per month)
const PLAN_LIMITS: Record<string, number> = {
  free: 1000,
  pro: 10000,
  team: 50000,
  enterprise: Infinity,
};

/**
 * Track a single API request
 */
export async function trackUsage(params: TrackUsageParams): Promise<void> {
  const { userId, apiKeyId, action, tokensIn = 0, tokensOut = 0, durationMs } = params;

  // Insert detailed usage record
  await db.insert(usage).values({
    userId,
    apiKeyId: apiKeyId ?? null,
    action,
    tokensIn,
    tokensOut,
    durationMs,
  });

  // Update monthly aggregate (upsert)
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const actionColumn = `${action}Count` as const;

  // Try to update existing monthly record
  const updateResult = await db
    .update(usageMonthly)
    .set({
      [actionColumn]: sql`${usageMonthly[actionColumn as keyof typeof usageMonthly]} + 1`,
      totalTokens: sql`${usageMonthly.totalTokens} + ${tokensIn + tokensOut}`,
    })
    .where(
      and(
        eq(usageMonthly.userId, userId),
        eq(usageMonthly.year, year),
        eq(usageMonthly.month, month)
      )
    );

  // If no record existed, create one
  // Check by trying to select (drizzle doesn't return affected rows easily)
  const existing = await db
    .select({ id: usageMonthly.id })
    .from(usageMonthly)
    .where(
      and(
        eq(usageMonthly.userId, userId),
        eq(usageMonthly.year, year),
        eq(usageMonthly.month, month)
      )
    )
    .limit(1);

  if (existing.length === 0) {
    await db.insert(usageMonthly).values({
      userId,
      year,
      month,
      selectCount: action === "select" ? 1 : 0,
      symbolCount: action === "symbol" ? 1 : 0,
      graphCount: action === "graph" ? 1 : 0,
      indexCount: action === "index" ? 1 : 0,
      totalTokens: tokensIn + tokensOut,
    });
  }
}

/**
 * Get usage statistics for a user
 */
export async function getUsageStats(userId: string): Promise<UsageStats> {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  // Get user's plan
  const userResult = await db
    .select({ plan: users.plan })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const plan = userResult[0]?.plan ?? "free";
  const monthlyLimit = PLAN_LIMITS[plan] ?? PLAN_LIMITS.free;

  // Get monthly usage
  const monthlyResult = await db
    .select({
      selectCount: usageMonthly.selectCount,
      symbolCount: usageMonthly.symbolCount,
      graphCount: usageMonthly.graphCount,
      indexCount: usageMonthly.indexCount,
    })
    .from(usageMonthly)
    .where(
      and(
        eq(usageMonthly.userId, userId),
        eq(usageMonthly.year, year),
        eq(usageMonthly.month, month)
      )
    )
    .limit(1);

  const monthly = monthlyResult[0];
  const thisMonth = monthly
    ? monthly.selectCount + monthly.symbolCount + monthly.graphCount + monthly.indexCount
    : 0;

  // Get today's usage
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(usage)
    .where(
      and(
        eq(usage.userId, userId),
        sql`${usage.createdAt} >= ${todayStart}`
      )
    );

  const today = Number(todayResult[0]?.count ?? 0);

  // Calculate reset date (first of next month)
  const resetDate = new Date(year, month, 1); // month is 0-indexed, so this gives next month

  return {
    today,
    thisMonth,
    monthlyLimit,
    remaining: Math.max(0, monthlyLimit - thisMonth),
    resetDate,
  };
}

/**
 * Get detailed monthly usage breakdown
 */
export async function getMonthlyUsage(
  userId: string,
  year?: number,
  month?: number
): Promise<MonthlyUsage> {
  const now = new Date();
  const targetYear = year ?? now.getFullYear();
  const targetMonth = month ?? now.getMonth() + 1;

  const result = await db
    .select({
      selectCount: usageMonthly.selectCount,
      symbolCount: usageMonthly.symbolCount,
      graphCount: usageMonthly.graphCount,
      indexCount: usageMonthly.indexCount,
      totalTokens: usageMonthly.totalTokens,
    })
    .from(usageMonthly)
    .where(
      and(
        eq(usageMonthly.userId, userId),
        eq(usageMonthly.year, targetYear),
        eq(usageMonthly.month, targetMonth)
      )
    )
    .limit(1);

  const data = result[0];

  if (!data) {
    return {
      selectCount: 0,
      symbolCount: 0,
      graphCount: 0,
      indexCount: 0,
      totalRequests: 0,
      totalTokens: 0,
    };
  }

  return {
    selectCount: data.selectCount,
    symbolCount: data.symbolCount,
    graphCount: data.graphCount,
    indexCount: data.indexCount,
    totalRequests:
      data.selectCount + data.symbolCount + data.graphCount + data.indexCount,
    totalTokens: data.totalTokens,
  };
}

/**
 * Check if user has exceeded their quota
 */
export async function checkQuota(userId: string): Promise<{
  allowed: boolean;
  remaining: number;
  limit: number;
}> {
  const stats = await getUsageStats(userId);

  return {
    allowed: stats.remaining > 0,
    remaining: stats.remaining,
    limit: stats.monthlyLimit,
  };
}
