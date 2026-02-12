/**
 * API Authentication Middleware
 *
 * Handles API key validation, rate limiting, and usage tracking
 * for all v1 API endpoints.
 */

import { NextRequest } from "next/server";
import { validateApiKey } from "./api-keys";
import { checkRateLimit, getRateLimitHeaders, rateLimitExceededResponse } from "./rate-limit";
import { trackUsage, checkQuota, type ActionType } from "./usage";
import { db, users } from "@/db";
import { eq } from "drizzle-orm";

interface AuthResult {
  success: true;
  userId: string;
  keyId: string;
  plan: string;
  headers: Record<string, string>;
}

interface AuthError {
  success: false;
  response: Response;
}

type AuthResponse = AuthResult | AuthError;

/**
 * Authenticate an API request
 *
 * Checks:
 * 1. API key presence and validity
 * 2. Rate limiting
 * 3. Quota (monthly limit)
 */
export async function authenticateRequest(req: NextRequest): Promise<AuthResponse> {
  // Extract API key from header
  const authHeader = req.headers.get("Authorization");
  const apiKey = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : req.headers.get("X-API-Key");

  if (!apiKey) {
    return {
      success: false,
      response: new Response(
        JSON.stringify({
          error: "Unauthorized",
          message: "Missing API key. Include it as 'Authorization: Bearer <key>' or 'X-API-Key: <key>'",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      ),
    };
  }

  // Validate API key
  const keyResult = await validateApiKey(apiKey);

  if (!keyResult.valid || !keyResult.userId || !keyResult.keyId) {
    return {
      success: false,
      response: new Response(
        JSON.stringify({
          error: "Unauthorized",
          message: keyResult.error ?? "Invalid API key",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      ),
    };
  }

  // Get user's plan
  const userResult = await db
    .select({ plan: users.plan })
    .from(users)
    .where(eq(users.id, keyResult.userId))
    .limit(1);

  const plan = userResult[0]?.plan ?? "free";

  // Check rate limit
  const rateResult = checkRateLimit(keyResult.keyId, plan);

  if (!rateResult.allowed) {
    return {
      success: false,
      response: rateLimitExceededResponse(rateResult),
    };
  }

  // Check quota
  const quotaResult = await checkQuota(keyResult.userId);

  if (!quotaResult.allowed) {
    return {
      success: false,
      response: new Response(
        JSON.stringify({
          error: "Quota exceeded",
          message: `You've reached your monthly limit of ${quotaResult.limit} requests. Upgrade your plan for more.`,
          limit: quotaResult.limit,
          upgradeUrl: "/dashboard/billing",
        }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
            ...getRateLimitHeaders(rateResult),
          },
        }
      ),
    };
  }

  return {
    success: true,
    userId: keyResult.userId,
    keyId: keyResult.keyId,
    plan,
    headers: getRateLimitHeaders(rateResult),
  };
}

/**
 * Track usage after successful request
 */
export async function trackApiUsage(
  userId: string,
  keyId: string,
  action: ActionType,
  startTime: number,
  tokensIn?: number,
  tokensOut?: number
): Promise<void> {
  const durationMs = Date.now() - startTime;

  await trackUsage({
    userId,
    apiKeyId: keyId,
    action,
    tokensIn,
    tokensOut,
    durationMs,
  });
}

/**
 * Create error response with consistent format
 */
export function errorResponse(
  message: string,
  status: number = 400,
  details?: Record<string, unknown>
): Response {
  return new Response(
    JSON.stringify({
      error: status >= 500 ? "Internal Server Error" : "Bad Request",
      message,
      ...details,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}

/**
 * Create success response with consistent format
 */
export function successResponse<T>(
  data: T,
  headers?: Record<string, string>
): Response {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}
