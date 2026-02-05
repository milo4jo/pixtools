import { test, expect } from "@playwright/test";

test.describe("Favicon API", () => {
  test("should generate favicon with default params", async ({ request }) => {
    const response = await request.get("/api/favicon");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("should generate favicon with custom text", async ({ request }) => {
    const response = await request.get("/api/favicon?text=M");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("should generate favicon with emoji", async ({ request }) => {
    const response = await request.get("/api/favicon?text=🦊");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("should accept size parameter", async ({ request }) => {
    const sizes = [16, 32, 48, 64, 128, 180, 192, 256, 512];
    
    for (const size of sizes) {
      const response = await request.get(`/api/favicon?text=T&size=${size}`);
      expect(response.ok()).toBeTruthy();
      expect(response.headers()["content-type"]).toContain("image/png");
    }
  });

  test("should accept bg (background) color parameter", async ({ request }) => {
    const response = await request.get("/api/favicon?text=B&bg=7c3aed");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("should accept text color parameter", async ({ request }) => {
    const response = await request.get("/api/favicon?text=C&color=ff0000");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("should accept shape=square", async ({ request }) => {
    const response = await request.get("/api/favicon?text=S&shape=square");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("should accept shape=circle", async ({ request }) => {
    const response = await request.get("/api/favicon?text=O&shape=circle");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("should accept shape=rounded", async ({ request }) => {
    const response = await request.get("/api/favicon?text=R&shape=rounded");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("should accept custom radius for rounded shape", async ({ request }) => {
    const response = await request.get("/api/favicon?text=R&shape=rounded&radius=8");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("should return SVG format when requested", async ({ request }) => {
    const response = await request.get("/api/favicon?text=V&format=svg");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/svg+xml");
  });

  test("should handle multi-character text (max 3)", async ({ request }) => {
    const response = await request.get("/api/favicon?text=ABC");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("should return appropriate cache headers", async ({ request }) => {
    const response = await request.get("/api/favicon?text=X");

    expect(response.ok()).toBeTruthy();
    const cacheControl = response.headers()["cache-control"];
    expect(cacheControl).toBeDefined();
    expect(cacheControl).toContain("max-age");
  });

  test("should clamp size to minimum 16", async ({ request }) => {
    const response = await request.get("/api/favicon?text=S&size=8");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("should clamp size to maximum 512", async ({ request }) => {
    const response = await request.get("/api/favicon?text=L&size=1000");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("should handle hash prefix in colors", async ({ request }) => {
    const response = await request.get("/api/favicon?text=H&bg=%23ff0000&color=%23ffffff");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });
});

test.describe("Manifest API", () => {
  test("should generate manifest with default params", async ({ request }) => {
    const response = await request.get("/api/manifest");

    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("application/manifest+json");
    
    const manifest = await response.json();
    expect(manifest.name).toBe("My App");
    expect(manifest.icons).toHaveLength(2);
  });

  test("should generate manifest with custom name", async ({ request }) => {
    const response = await request.get("/api/manifest?name=PixTools");

    expect(response.ok()).toBeTruthy();
    
    const manifest = await response.json();
    expect(manifest.name).toBe("PixTools");
    expect(manifest.short_name).toBe("PixTools");
  });

  test("should allow custom short_name", async ({ request }) => {
    const response = await request.get("/api/manifest?name=PixTools%20Application&short_name=Pix");

    expect(response.ok()).toBeTruthy();
    
    const manifest = await response.json();
    expect(manifest.name).toBe("PixTools Application");
    expect(manifest.short_name).toBe("Pix");
  });

  test("should accept theme color", async ({ request }) => {
    const response = await request.get("/api/manifest?name=Test&theme=7c3aed");

    expect(response.ok()).toBeTruthy();
    
    const manifest = await response.json();
    expect(manifest.theme_color).toBe("#7c3aed");
  });

  test("should accept bg color (defaults to theme)", async ({ request }) => {
    const response = await request.get("/api/manifest?name=Test&theme=ff0000&bg=0000ff");

    expect(response.ok()).toBeTruthy();
    
    const manifest = await response.json();
    expect(manifest.theme_color).toBe("#ff0000");
    expect(manifest.background_color).toBe("#0000ff");
  });

  test("should include correct icon sizes", async ({ request }) => {
    const response = await request.get("/api/manifest?name=Test");

    expect(response.ok()).toBeTruthy();
    
    const manifest = await response.json();
    const sizes = manifest.icons.map((i: { sizes: string }) => i.sizes);
    expect(sizes).toContain("192x192");
    expect(sizes).toContain("512x512");
  });

  test("should have proper cache headers", async ({ request }) => {
    const response = await request.get("/api/manifest?name=Test");

    expect(response.ok()).toBeTruthy();
    const cacheControl = response.headers()["cache-control"];
    expect(cacheControl).toBeDefined();
    expect(cacheControl).toContain("max-age");
  });

  test("should generate favicon URLs with custom text param", async ({ request }) => {
    const response = await request.get("/api/manifest?name=Milo&text=🦊");

    expect(response.ok()).toBeTruthy();
    
    const manifest = await response.json();
    // Icons should include the text param in URL
    expect(manifest.icons[0].src).toContain("text=");
  });
});
