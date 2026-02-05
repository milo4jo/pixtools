import { test, expect } from "@playwright/test";

test.describe("FavPix Landing Page", () => {
  test("should load the landing page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/FavPix/i);
  });

  test("should have the main heading", async ({ page }) => {
    await page.goto("/");
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
  });

  test("should have the favicon generator form", async ({ page }) => {
    await page.goto("/");
    // Should have some form elements for generating favicons
    const inputOrTextarea = page.locator('input, textarea').first();
    await expect(inputOrTextarea).toBeVisible();
  });
});

test.describe("FavPix API", () => {
  test("should generate a favicon", async ({ request }) => {
    const response = await request.get("/api/favicon?text=M&size=32");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("should generate favicon with emoji", async ({ request }) => {
    const response = await request.get("/api/favicon?text=🦊&size=32");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("should generate favicon with custom background", async ({ request }) => {
    const response = await request.get("/api/favicon?text=F&bg=7c3aed&size=32");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("should generate PWA manifest", async ({ request }) => {
    const response = await request.get("/api/manifest?name=TestApp&text=T");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("json");
    const json = await response.json();
    expect(json.name).toBe("TestApp");
    expect(json.icons).toBeDefined();
  });
});
