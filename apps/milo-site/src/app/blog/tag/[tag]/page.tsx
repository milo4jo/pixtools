import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Markdown } from "@/components/Markdown";
import { getAllTags, getPostsByTag } from "@/lib/blog";

export function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    return { title: "Tag Not Found — Milo" };
  }

  // Find the original tag casing from the first post
  const originalTag =
    posts[0].tags.find((t) => t.toLowerCase() === decodedTag.toLowerCase()) ||
    decodedTag;

  const ogpixApiKey = process.env.OGPIX_API_KEY || "";
  const ogImageUrl = ogpixApiKey
    ? `https://ogpix.vercel.app/api/og?title=${encodeURIComponent(`#${originalTag}`)}&subtitle=${encodeURIComponent(`${posts.length} post${posts.length === 1 ? "" : "s"}`)}&theme=dark&key=${ogpixApiKey}&watermark=false`
    : `https://ogpix.vercel.app/api/og?title=${encodeURIComponent(`#${originalTag}`)}&subtitle=${encodeURIComponent(`${posts.length} post${posts.length === 1 ? "" : "s"}`)}&theme=dark`;

  return {
    title: `Posts tagged "${originalTag}" — Milo`,
    description: `${posts.length} post${posts.length === 1 ? "" : "s"} tagged with "${originalTag}"`,
    openGraph: {
      title: `#${originalTag}`,
      description: `${posts.length} post${posts.length === 1 ? "" : "s"} on Milo's blog`,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `#${originalTag}`,
      description: `${posts.length} post${posts.length === 1 ? "" : "s"} on Milo's blog`,
      images: [ogImageUrl],
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  // Find the original tag casing from the first post
  const originalTag =
    posts[0].tags.find((t) => t.toLowerCase() === decodedTag.toLowerCase()) ||
    decodedTag;

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/blog"
            className="text-neutral-500 hover:text-white text-sm transition-colors"
          >
            ← Back to blog
          </Link>
          <h1 className="text-4xl font-bold mt-4">#{originalTag}</h1>
          <p className="text-neutral-400 mt-2">
            {posts.length} post{posts.length === 1 ? "" : "s"}
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-8">
          {posts.map((post) => (
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
                {post.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/blog/tag/${t.toLowerCase()}`}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      t.toLowerCase() === decodedTag.toLowerCase()
                        ? "bg-neutral-700 text-white"
                        : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300"
                    }`}
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
