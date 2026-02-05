import { test, expect } from "@playwright/test";

test.describe("Milo Site E2E Tests", () => {
  test.describe("Homepage", () => {
    test("loads correctly with hero content", async ({ page }) => {
      await page.goto("/");

      // Check hero section
      await expect(page.locator("h1")).toHaveText("Milo");
      await expect(
        page.getByText("AI agent for", { exact: false })
      ).toBeVisible();

      // Check online status indicator
      await expect(page.getByText("Online")).toBeVisible();

      // Check projects section exists
      await expect(page.getByText("Projects")).toBeVisible();

      // Check footer links
      await expect(page.getByRole("link", { name: "About" })).toBeVisible();
      await expect(page.getByRole("link", { name: "Blog" })).toBeVisible();
      await expect(page.getByRole("link", { name: "GitHub" })).toBeVisible();
    });
  });

  test.describe("Blog Overview", () => {
    test("shows blog posts", async ({ page }) => {
      await page.goto("/blog");

      // Check page header
      await expect(page.locator("h1")).toHaveText("Blog");

      // Check that posts are displayed (articles exist)
      const articles = page.locator("article");
      await expect(articles.first()).toBeVisible();

      // At least one post should be visible
      const articleCount = await articles.count();
      expect(articleCount).toBeGreaterThan(0);

      // Posts should have titles and dates
      await expect(articles.first().locator("h2")).toBeVisible();
      await expect(articles.first().locator("time")).toBeVisible();
    });

    test("shows tag cloud", async ({ page }) => {
      await page.goto("/blog");

      // Topics section should exist
      await expect(page.getByText("Topics")).toBeVisible();

      // At least one tag should be visible
      const tagLinks = page.locator('a[href^="/blog/tag/"]');
      await expect(tagLinks.first()).toBeVisible();
    });
  });

  test.describe("Blog Post", () => {
    test("opens without 404", async ({ page }) => {
      // First get a post slug from the blog page
      await page.goto("/blog");

      // Click the first post
      const firstPostLink = page.locator("article").first().locator("a").first();
      const postTitle = await firstPostLink.locator("h2").textContent();
      await firstPostLink.click();

      // Should be on a blog post page (not 404)
      await expect(page).not.toHaveURL("/404");

      // Post title should be visible as h1
      if (postTitle) {
        await expect(page.locator("h1")).toContainText(postTitle);
      }

      // Should have back link
      await expect(page.getByText("Back to blog")).toBeVisible();

      // Should have content
      await expect(page.locator("article")).toBeVisible();
    });

    test("displays post date and tags", async ({ page }) => {
      await page.goto("/blog");
      await page.locator("article").first().locator("a").first().click();

      // Wait for post page to load (URL should contain /blog/ but not be exactly /blog)
      await page.waitForURL(/\/blog\/[^/]+$/);

      // Post should have a date (single time element on post page)
      await expect(page.locator("article header time")).toBeVisible();

      // Post should have tags
      const tagLinks = page.locator('article header a[href^="/blog/tag/"]');
      await expect(tagLinks.first()).toBeVisible();
    });
  });

  test.describe("Tag Pages", () => {
    test("tag page loads and shows filtered posts", async ({ page }) => {
      await page.goto("/blog");

      // Click on a tag
      const tagLink = page.locator('a[href^="/blog/tag/"]').first();
      const tagText = await tagLink.textContent();
      await tagLink.click();

      // Should be on tag page
      await expect(page).toHaveURL(/\/blog\/tag\//);

      // Should show tag name in heading
      if (tagText) {
        // Tag text might include count, extract just the tag name
        const tagName = tagText.split(/\d/)[0].trim();
        await expect(page.locator("h1")).toContainText(tagName, {
          ignoreCase: true,
        });
      }

      // Should show posts
      const articles = page.locator("article");
      await expect(articles.first()).toBeVisible();
    });
  });

  test.describe("Navigation", () => {
    test("homepage to blog navigation works", async ({ page }) => {
      await page.goto("/");

      // Click Blog link in footer
      await page.getByRole("link", { name: "Blog" }).click();

      await expect(page).toHaveURL("/blog");
      await expect(page.locator("h1")).toHaveText("Blog");
    });

    test("homepage to about navigation works", async ({ page }) => {
      await page.goto("/");

      // Click About link in footer
      await page.getByRole("link", { name: "About" }).click();

      await expect(page).toHaveURL("/about");
    });

    test("blog back to home navigation works", async ({ page }) => {
      await page.goto("/blog");

      // Click back to home link
      await page.getByText("Back to home").click();

      await expect(page).toHaveURL("/");
      await expect(page.locator("h1")).toHaveText("Milo");
    });

    test("blog post back to blog navigation works", async ({ page }) => {
      await page.goto("/blog");

      // Go to a post
      await page.locator("article").first().locator("a").first().click();

      // Go back to blog
      await page.getByText("Back to blog").click();

      await expect(page).toHaveURL("/blog");
    });

    test("Writing section links to posts correctly", async ({ page }) => {
      await page.goto("/");

      // Check if Writing section exists (it might not if no posts)
      const writingSection = page.getByText("Writing");
      if (await writingSection.isVisible()) {
        // Click "All posts" link
        await page.getByText("All posts").click();
        await expect(page).toHaveURL("/blog");
      }
    });
  });
});
