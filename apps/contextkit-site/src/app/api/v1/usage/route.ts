/**
 * Usage Statistics Endpoint
 *
 * GET /api/v1/usage - Get usage stats for authenticated user
 * Supports both Clerk session auth (dashboard) and API key auth (CLI)
 */

import { auth } from "@clerk/nextjs/server";
import { getUsageStats, getMonthlyUsage } from "@/lib/usage";
import { validateApiKey } from "@/lib/api-keys";

/**
 * Get usage statistics
 */
export async function GET(req: Request) {
  let userId: string | null = null;

  // Try API key auth first (for CLI)
  const authHeader = req.headers.get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const apiKey = authHeader.slice(7);
    const keyResult = await validateApiKey(apiKey);
    if (keyResult.valid && keyResult.userId) {
      userId = keyResult.userId;
    }
  }

  // Fall back to Clerk session auth (for dashboard)
  if (!userId) {
    const clerkAuth = await auth();
    userId = clerkAuth.userId;
  }

  if (!userId) {
    return new Response(
      JSON.stringify({ 
        error: "Unauthorized",
        message: "Missing or invalid API key. Include it as 'Authorization: Bearer <key>'" 
      }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const [stats, monthly] = await Promise.all([
      getUsageStats(userId),
      getMonthlyUsage(userId),
    ]);

    return new Response(
      JSON.stringify({
        usage: {
          today: stats.today,
          thisMonth: stats.thisMonth,
          remaining: stats.remaining,
          limit: stats.monthlyLimit,
          resetDate: stats.resetDate.toISOString(),
        },
        breakdown: {
          select: monthly.selectCount,
          symbol: monthly.symbolCount,
          graph: monthly.graphCount,
          index: monthly.indexCount,
          total: monthly.totalRequests,
          tokens: monthly.totalTokens,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to get usage stats:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get usage stats" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
