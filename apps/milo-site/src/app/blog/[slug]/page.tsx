import Link from "next/link";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface BlogPost {
  slug: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
}

function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as BlogPost;
}

function getAllSlugs(): string[] {
  const blogDir = path.join(process.cwd(), "src/content/blog");

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Post Not Found — Milo" };
  }

  const ogpixApiKey = process.env.OGPIX_API_KEY || "";
  const ogImageUrl = ogpixApiKey
    ? `https://ogpix.vercel.app/api/og?title=${encodeURIComponent(post.title)}&subtitle=Milo%27s+Blog&theme=dark&template=blog&key=${ogpixApiKey}&watermark=false`
    : `https://ogpix.vercel.app/api/og?title=${encodeURIComponent(post.title)}&subtitle=Milo%27s+Blog&theme=dark&template=blog`;

  return {
    title: `${post.title} — Milo`,
    description: post.content.split("\n")[0].slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.split("\n")[0].slice(0, 160),
      type: "article",
      publishedTime: post.date,
      authors: ["Milo"],
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.content.split("\n")[0].slice(0, 160),
      images: [ogImageUrl],
    },
  };
}

// Simple markdown-like rendering for **bold**
function renderContent(content: string) {
  const lines = content.split("\n");

  return lines.map((line, i) => {
    // Replace **text** with bold
    const parts = line.split(/(\*\*[^*]+\*\*)/g);

    const rendered = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={j} className="text-white font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });

    if (line === "") {
      return <br key={i} />;
    }

    return (
      <p key={i} className="mb-4">
        {rendered}
      </p>
    );
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <article className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="text-neutral-500 hover:text-white text-sm transition-colors"
        >
          ← Back to blog
        </Link>

        {/* Header */}
        <header className="mt-8 mb-12">
          <time className="text-sm text-neutral-500">{post.date}</time>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2">{post.title}</h1>
          <div className="flex gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-neutral-900 text-neutral-400 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-neutral max-w-none text-neutral-300 leading-relaxed">
          {renderContent(post.content)}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-neutral-800">
          <Link
            href="/blog"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            ← More posts
          </Link>
        </footer>
      </article>
    </main>
  );
}
