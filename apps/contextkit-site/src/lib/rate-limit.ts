/**
 * Rate Limiting
 *
 * Token bucket algorithm implementation for API rate limiting.
 * Uses in-memory storage for speed (resets on deploy).
 *
 * For production scale, consider:
 * - Upstash Redis for distributed rate limiting
 * - Vercel KV for edge-compatible storage
 */

interface RateLimitConfig {
  /** Maximum tokens in bucket */
  maxTokens: number;
  /** Tokens added per interval */
  refillRate: number;
  /** Refill interval in milliseconds */
  refillInterval: number;
}

interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetMs: number;
  limit: number;
}

// Plan-based rate limits (requests per minute)
const RATE_LIMITS: Record<string, RateLimitConfig> = {
  free: {
    maxTokens: 20,
    refillRate: 20,
    refillInterval: 60_000, // 1 minute
  },
  pro: {
    maxTokens: 100,
    refillRate: 100,
    refillInterval: 60_000,
  },
  team: {
    maxTokens: 500,
    refillRate: 500,
    refillInterval: 60_000,
  },
  enterprise: {
    maxTokens: 2000,
    refillRate: 2000,
    refillInterval: 60_000,
  },
};

// In-memory storage for token buckets
// Key: userId or apiKeyId
const buckets = new Map<string, TokenBucket>();

/**
 * Get or create a token bucket for an identifier
 */
function getBucket(identifier: string, config: RateLimitConfig): TokenBucket {
  const existing = buckets.get(identifier);

  if (existing) {
    return existing;
  }

  const bucket: TokenBucket = {
    tokens: config.maxTokens,
    lastRefill: Date.now(),
  };

  buckets.set(identifier, bucket);
  return bucket;
}

/**
 * Refill tokens based on elapsed time
 */
function refillBucket(bucket: TokenBucket, config: RateLimitConfig): void {
  const now = Date.now();
  const elapsed = now - bucket.lastRefill;
  const intervalsElapsed = Math.floor(elapsed / config.refillInterval);

  if (intervalsElapsed > 0) {
    bucket.tokens = Math.min(
      config.maxTokens,
      bucket.tokens + intervalsElapsed * config.refillRate
    );
    bucket.lastRefill = now;
  }
}

/**
 * Check and consume rate limit
 *
 * @param identifier - User ID or API key ID
 * @param plan - User's plan for limit lookup
 * @param cost - Number of tokens to consume (default: 1)
 */
export function checkRateLimit(
  identifier: string,
  plan: string = "free",
  cost: number = 1
): RateLimitResult {
  const config = RATE_LIMITS[plan] ?? RATE_LIMITS.free;
  const bucket = getBucket(identifier, config);

  // Refill tokens
  refillBucket(bucket, config);

  // Check if enough tokens
  if (bucket.tokens >= cost) {
    bucket.tokens -= cost;

    return {
      allowed: true,
      remaining: Math.floor(bucket.tokens),
      resetMs: config.refillInterval - (Date.now() - bucket.lastRefill),
      limit: config.maxTokens,
    };
  }

  // Rate limited
  return {
    allowed: false,
    remaining: 0,
    resetMs: config.refillInterval - (Date.now() - bucket.lastRefill),
    limit: config.maxTokens,
  };
}

/**
 * Get rate limit headers for HTTP response
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": Math.ceil(Date.now() / 1000 + result.resetMs / 1000).toString(),
  };
}

/**
 * Create rate limit exceeded response
 */
export function rateLimitExceededResponse(result: RateLimitResult): Response {
  return new Response(
    JSON.stringify({
      error: "Rate limit exceeded",
      message: `Too many requests. Please retry after ${Math.ceil(result.resetMs / 1000)} seconds.`,
      retryAfter: Math.ceil(result.resetMs / 1000),
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": Math.ceil(result.resetMs / 1000).toString(),
        ...getRateLimitHeaders(result),
      },
    }
  );
}

/**
 * Clean up old buckets (call periodically)
 * Removes buckets that haven't been used in 10 minutes
 */
export function cleanupBuckets(): void {
  const now = Date.now();
  const maxAge = 10 * 60 * 1000; // 10 minutes

  for (const [key, bucket] of buckets) {
    if (now - bucket.lastRefill > maxAge) {
      buckets.delete(key);
    }
  }
}

// Cleanup every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(cleanupBuckets, 5 * 60 * 1000);
}
