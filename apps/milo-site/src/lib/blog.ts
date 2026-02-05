import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
  readingTime: number; // in minutes
}

export interface BlogPostNavigation {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

const WORDS_PER_MINUTE = 200;

/**
 * Calculate reading time in minutes based on word count
 */
export function calculateReadingTime(content: string): number {
  // Remove markdown syntax for more accurate count
  const plainText = content
    .replace(/```[\s\S]*?```/g, "") // code blocks
    .replace(/`[^`]+`/g, "") // inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
    .replace(/[#*_~>-]/g, "") // markdown symbols
    .replace(/\n+/g, " ") // newlines
    .trim();

  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);

  return Math.max(1, minutes); // At least 1 minute
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getBlogPosts(): BlogPost[] {
  const blogDir = path.join(process.cwd(), "src/content/blog");

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".json"));

  const posts = files.map((file) => {
    const content = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const post = JSON.parse(content) as Omit<BlogPost, "readingTime">;
    return {
      ...post,
      readingTime: calculateReadingTime(post.content),
    };
  });

  // Sort by date descending
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get a single blog post by slug
 */
export function getBlogPost(slug: string): BlogPost | null {
  const blogDir = path.join(process.cwd(), "src/content/blog");

  if (!fs.existsSync(blogDir)) {
    return null;
  }

  // Check for exact match first
  const exactPath = path.join(blogDir, `${slug}.json`);
  if (fs.existsSync(exactPath)) {
    const content = fs.readFileSync(exactPath, "utf-8");
    const post = JSON.parse(content) as Omit<BlogPost, "readingTime">;
    return {
      ...post,
      readingTime: calculateReadingTime(post.content),
    };
  }

  // Check for files that contain the slug (for date-prefixed files)
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".json"));
  for (const file of files) {
    const content = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const post = JSON.parse(content) as Omit<BlogPost, "readingTime">;
    if (post.slug === slug) {
      return {
        ...post,
        readingTime: calculateReadingTime(post.content),
      };
    }
  }

  return null;
}

/**
 * Get prev/next navigation for a blog post
 */
export function getPostNavigation(slug: string): BlogPostNavigation {
  const posts = getBlogPosts();
  const currentIndex = posts.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev =
    currentIndex < posts.length - 1
      ? { slug: posts[currentIndex + 1].slug, title: posts[currentIndex + 1].title }
      : null;

  const next =
    currentIndex > 0
      ? { slug: posts[currentIndex - 1].slug, title: posts[currentIndex - 1].title }
      : null;

  return { prev, next };
}

/**
 * Get all unique tags with post counts
 */
export function getAllTags(): { tag: string; count: number }[] {
  const posts = getBlogPosts();
  const tagCounts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    }
  }

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get all posts with a specific tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getBlogPosts();
  return posts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all slugs for static generation
 */
export function getAllSlugs(): string[] {
  const blogDir = path.join(process.cwd(), "src/content/blog");

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".json"));
  const slugs: string[] = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const post = JSON.parse(content) as { slug: string };
    slugs.push(post.slug);
  }

  return slugs;
}
