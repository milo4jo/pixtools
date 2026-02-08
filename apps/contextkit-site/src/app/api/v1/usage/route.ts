/**
 * Usage Statistics Endpoint
 *
 * GET /api/v1/usage - Get usage stats for authenticated user
 */

import { auth } from "@clerk/nextjs/server";
import { getUsageStats, getMonthlyUsage } from "@/lib/usage";

/**
 * Get usage statistics
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
