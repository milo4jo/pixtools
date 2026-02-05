import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/");
    
    // Should have a heading
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
  });

  test("should have proper page title", async ({ page }) => {
    await page.goto("/");
    
    await expect(page).toHaveTitle(/FavPix/);
  });

  test("should have meta description", async ({ page }) => {
    await page.goto("/");
    
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute("content", /favicon/i);
  });

  test("should have Open Graph tags", async ({ page }) => {
    await page.goto("/");
    
    const ogTitle = page.locator('meta[property="og:title"]');
    const ogDescription = page.locator('meta[property="og:description"]');
    
    await expect(ogTitle).toBeAttached();
    await expect(ogDescription).toBeAttached();
  });

  test("should have favicon configured", async ({ page }) => {
    await page.goto("/");
    
    // Should have at least one favicon link
    const favicon = page.locator('link[rel="icon"]');
    await expect(favicon.first()).toBeAttached();
  });

  test("should be responsive", async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator("h1")).toBeVisible();

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator("h1")).toBeVisible();
  });
});
