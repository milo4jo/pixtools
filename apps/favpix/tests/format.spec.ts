import { test, expect } from "@playwright/test";

test.describe("FavPix Format Tests", () => {
  test("SVG export format", async ({ request }) => {
    const response = await request.get("/api/favicon?text=M&format=svg&size=64");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("svg");
    const body = await response.text();
    // Check SVG structure
    expect(body).toContain("<svg");
    expect(body).toContain("viewBox");
    expect(body).toContain("Inter"); // Font import
  });

  test("SVG with circle shape", async ({ request }) => {
    const response = await request.get("/api/favicon?text=A&format=svg&shape=circle&size=64");
    const body = await response.text();
    expect(response.ok()).toBeTruthy();
    expect(body).toContain("<circle");
  });

  test("SVG with rounded shape", async ({ request }) => {
    const response = await request.get("/api/favicon?text=B&format=svg&shape=rounded&size=64");
    const body = await response.text();
    expect(response.ok()).toBeTruthy();
    expect(body).toContain('rx="');
  });

  test("SVG escapes special characters", async ({ request }) => {
    const response = await request.get("/api/favicon?text=<>&format=svg&size=64");
    const body = await response.text();
    expect(response.ok()).toBeTruthy();
    expect(body).toContain("&lt;");
    expect(body).toContain("&gt;");
  });

  test("ICO endpoint", async ({ request }) => {
    const response = await request.get("/api/favicon/ico?text=M&bg=06b6d4");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("icon");
  });

  test("large size PNG (512px)", async ({ request }) => {
    const response = await request.get("/api/favicon?text=Hi&size=512&bg=7c3aed&shape=rounded");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
    const buffer = await response.body();
    expect(buffer.length).toBeGreaterThan(1000); // Should be a reasonable PNG size
  });

  test("manifest endpoint with all params", async ({ request }) => {
    const response = await request.get("/api/manifest?name=TestApp&short_name=Test&theme=06b6d4&text=T&color=000000&shape=circle");
    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    expect(json.name).toBe("TestApp");
    expect(json.short_name).toBe("Test");
    expect(json.theme_color).toBe("#06b6d4");
    expect(json.icons.length).toBe(2);
  });
});
