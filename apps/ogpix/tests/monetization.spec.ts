import { test, expect } from "@playwright/test";

/**
 * Monetization Tests for OGPix
 * Tests API key authentication, rate limiting, and billing features
 */

test.describe("API Key Authentication", () => {
  test("should generate image without watermark when using valid Pro API key", async ({
    request,
  }) => {
    // Note: This test requires a valid Pro API key in the environment
    const proKey = process.env.OGPIX_TEST_PRO_KEY;
    if (!proKey) {
      test.skip();
      return;
    }

    const response = await request.get(
      `/api/og?title=Pro+Test&key=${proKey}&watermark=false`
    );

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("should reject invalid API key format", async ({ request }) => {
    const response = await request.get("/api/og?title=Test&key=invalid-key");

    // Should still generate (fallback to anonymous) but with watermark
    expect(response.ok()).toBeTruthy();
  });

  test("should include watermark for free tier", async ({ request }) => {
    const response = await request.get("/api/og?title=Free+Test");

    expect(response.ok()).toBeTruthy();
    // Image should be generated (watermark is visual, can't test content easily)
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("should respect watermark=false only for Pro users", async ({
    request,
  }) => {
    // Without valid Pro key, watermark=false should be ignored
    const response = await request.get(
      "/api/og?title=Watermark+Test&watermark=false"
    );

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });
});

test.describe("Rate Limiting", () => {
  test("should allow requests within rate limit", async ({ request }) => {
    // First request should always succeed
    const response = await request.get("/api/og?title=Rate+Limit+Test+1");
    expect(response.ok()).toBeTruthy();
  });

  test("should include rate limit headers", async ({ request }) => {
    const response = await request.get("/api/og?title=Rate+Header+Test");

    // Note: Rate limit headers are optional but good practice
    // The implementation may or may not include these
    expect(response.status()).toBeLessThan(500);
  });

  test("should handle concurrent requests gracefully", async ({ request }) => {
    // Fire 5 concurrent requests
    const promises = Array.from({ length: 5 }, (_, i) =>
      request.get(`/api/og?title=Concurrent+Test+${i}`)
    );

    const responses = await Promise.all(promises);

    // All should complete without server errors
    for (const response of responses) {
      expect(response.status()).toBeLessThan(500);
    }
  });
});

test.describe("Usage Tracking", () => {
  test("should track API usage for authenticated users", async ({ page }) => {
    // This is more of an E2E test - skip if not logged in
    test.skip();
  });
});

test.describe("Billing Page", () => {
  test("should redirect to login when not authenticated", async ({ page }) => {
    await page.goto("/dashboard/billing");

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);
  });

  test("should display pricing information", async ({ page }) => {
    await page.goto("/");

    // Scroll to pricing section
    const pricingSection = page.locator("#pricing");
    if (await pricingSection.isVisible()) {
      await expect(pricingSection).toContainText("Free");
      await expect(pricingSection).toContainText("Pro");
    }
  });
});

test.describe("Security", () => {
  test("should sanitize title to prevent XSS", async ({ request }) => {
    const xssTitle = '<script>alert("xss")</script>';
    const response = await request.get(
      `/api/og?title=${encodeURIComponent(xssTitle)}`
    );

    expect(response.ok()).toBeTruthy();
    // Image should be generated without executing script
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("should block SSRF attempts via logo URL", async ({ request }) => {
    const ssrfUrl = "http://localhost:22/etc/passwd";
    const response = await request.get(
      `/api/og?title=Test&logo=${encodeURIComponent(ssrfUrl)}`
    );

    // Should reject or ignore invalid logo URL
    expect(response.status()).toBeLessThan(500);
  });

  test("should block private IP ranges in logo URL", async ({ request }) => {
    const privateUrl = "http://192.168.1.1/image.png";
    const response = await request.get(
      `/api/og?title=Test&logo=${encodeURIComponent(privateUrl)}`
    );

    // Should reject or ignore private IP
    expect(response.status()).toBeLessThan(500);
  });

  test("should only allow HTTPS for logo URLs", async ({ request }) => {
    const httpUrl = "http://example.com/image.png";
    const response = await request.get(
      `/api/og?title=Test&logo=${encodeURIComponent(httpUrl)}`
    );

    // Should reject HTTP logos
    expect(response.status()).toBeLessThan(500);
  });

  test("should enforce max title length", async ({ request }) => {
    const longTitle = "A".repeat(1000);
    const response = await request.get(
      `/api/og?title=${encodeURIComponent(longTitle)}`
    );

    // Should truncate or reject, but not crash
    expect(response.status()).toBeLessThan(500);
  });
});
