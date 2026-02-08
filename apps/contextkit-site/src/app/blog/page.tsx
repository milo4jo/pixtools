import Link from "next/link";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

interface BlogPost {
  slug: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
}

function getBlogPosts(): BlogPost[] {
  const blogDir = join(process.cwd(), "src/content/blog");
  
  try {
    const files = readdirSync(blogDir).filter((f) => f.endsWith(".json"));
    
    const posts = files.map((file) => {
      const content = readFileSync(join(blogDir, file), "utf-8");
      return JSON.parse(content) as BlogPost;
    });
    
    // Sort by date descending
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-neutral-900">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg">
            ContextKit
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/docs"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/blog"
              className="text-white"
            >
              Blog
            </Link>
            <a
              href="https://github.com/milo4jo/contextkit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-28 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Blog</h1>
          <p className="text-neutral-400">
            Thoughts on AI development tools, context management, and building in public.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-neutral-500">No posts yet.</p>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="border border-neutral-800 rounded-lg p-6 hover:border-neutral-700 transition-colors">
                      <time className="text-xs text-neutral-500 font-mono">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <h2 className="text-xl font-semibold mt-2 mb-2 group-hover:text-neutral-300 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-neutral-400 text-sm mb-4">
                        {post.description}
                      </p>
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-neutral-900 text-neutral-400 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <p className="text-sm text-neutral-600">
            Built by{" "}
            <a
              href="https://github.com/milo4jo"
              className="text-neutral-400 hover:text-white"
            >
              Milo
            </a>
          </p>
          <Link href="/" className="text-sm text-neutral-500 hover:text-white">
            ← Back to home
          </Link>
        </div>
      </footer>
    </main>
  );
}

export const metadata = {
  title: "Blog | ContextKit",
  description: "Thoughts on AI development tools and context management",
};
