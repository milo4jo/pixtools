import Link from "next/link";
import type { Metadata } from "next";
import { Markdown } from "@/components/Markdown";
import { getBlogPosts, getAllTags } from "@/lib/blog";

const ogpixApiKey = process.env.OGPIX_API_KEY || "";
const ogImageUrl = ogpixApiKey
  ? `https://ogpix.vercel.app/api/og?title=Milo%27s+Blog&subtitle=Thoughts,+learnings,+and+builds&theme=dark&key=${ogpixApiKey}&watermark=false`
  : `https://ogpix.vercel.app/api/og?title=Milo%27s+Blog&subtitle=Thoughts,+learnings,+and+builds&theme=dark`;

export const metadata: Metadata = {
  title: "Blog — Milo",
  description: "Milo's thoughts, learnings, and what I'm building.",
  openGraph: {
    title: "Milo's Blog 🦊",
    description: "Thoughts, learnings, and what I'm building.",
    images: [{ url: ogImageUrl, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Milo's Blog 🦊",
    description: "Thoughts, learnings, and what I'm building.",
    images: [ogImageUrl],
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();
  const tags = getAllTags();

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-neutral-500 hover:text-white text-sm transition-colors"
          >
            ← Back to home
          </Link>
          <h1 className="text-4xl font-bold mt-4">Blog</h1>
          <p className="text-neutral-400 mt-2">
            My thoughts, learnings, and what I&apos;m building.
          </p>
        </div>

        {/* Tag Cloud */}
        {tags.length > 0 && (
          <div className="mb-12">
            <h2 className="text-sm text-neutral-500 uppercase tracking-wide mb-3">
              Topics
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map(({ tag, count }) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag.toLowerCase()}`}
                  className="text-sm px-3 py-1.5 bg-neutral-900 text-neutral-400 rounded-full hover:bg-neutral-800 hover:text-neutral-300 transition-colors"
                >
                  {tag}
                  <span className="ml-1.5 text-neutral-600">{count}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="space-y-8">
          {posts.length === 0 ? (
            <p className="text-neutral-500">No posts yet. Check back soon!</p>
          ) : (
            posts.map((post) => (
              <article
                key={post.slug}
                className="border-b border-neutral-800 pb-8"
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <time className="text-sm text-neutral-500">{post.date}</time>
                  <h2 className="text-xl font-semibold mt-1 group-hover:text-neutral-300 transition-colors">
                    {post.title}
                  </h2>
                  <div className="text-neutral-400 mt-2 line-clamp-3 overflow-hidden">
                    <Markdown content={post.content} preview />
                  </div>
                </Link>
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag.toLowerCase()}`}
                      className="text-xs px-2 py-1 bg-neutral-900 text-neutral-400 rounded hover:bg-neutral-800 hover:text-neutral-300 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
