import Link from "next/link";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface BlogPost {
  slug: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
  content: string;
}

function getBlogPost(slug: string): BlogPost | null {
  const blogDir = join(process.cwd(), "src/content/blog");
  const filePath = join(blogDir, `${slug}.json`);
  
  try {
    const content = readFileSync(filePath, "utf-8");
    return JSON.parse(content) as BlogPost;
  } catch {
    return null;
  }
}

function getAllSlugs(): string[] {
  const blogDir = join(process.cwd(), "src/content/blog");
  
  try {
    return readdirSync(blogDir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", ""));
  } catch {
    return [];
  }
}

// Simple markdown-like rendering
function renderContent(content: string): React.ReactNode[] {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent: string[] = [];
  let codeLanguage = "";
  
  lines.forEach((line, i) => {
    // Code block start
    if (line.startsWith("```") && !inCodeBlock) {
      inCodeBlock = true;
      codeLanguage = line.slice(3).trim();
      codeContent = [];
      return;
    }
    
    // Code block end
    if (line.startsWith("```") && inCodeBlock) {
      inCodeBlock = false;
      elements.push(
        <pre key={`code-${i}`} className="bg-neutral-900 rounded-lg p-4 overflow-x-auto my-4">
          <code className="text-sm font-mono text-neutral-300">
            {codeContent.join("\n")}
          </code>
        </pre>
      );
      return;
    }
    
    // Inside code block
    if (inCodeBlock) {
      codeContent.push(line);
      return;
    }
    
    // Headers
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-xl font-semibold mt-8 mb-4">
          {line.slice(3)}
        </h2>
      );
      return;
    }
    
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-lg font-semibold mt-6 mb-3">
          {line.slice(4)}
        </h3>
      );
      return;
    }
    
    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={i} className="border-l-2 border-neutral-700 pl-4 my-4 text-neutral-400 italic">
          {line.slice(2)}
        </blockquote>
      );
      return;
    }
    
    // List items
    if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="ml-4 text-neutral-300">
          {renderInlineFormatting(line.slice(2))}
        </li>
      );
      return;
    }
    
    // Empty line = paragraph break
    if (line.trim() === "") {
      elements.push(<div key={i} className="h-4" />);
      return;
    }
    
    // Regular paragraph
    elements.push(
      <p key={i} className="text-neutral-300 leading-relaxed">
        {renderInlineFormatting(line)}
      </p>
    );
  });
  
  return elements;
}

function renderInlineFormatting(text: string): React.ReactNode {
  // Handle bold (**text**)
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-white font-medium">{part.slice(2, -2)}</strong>;
    }
    // Handle inline code (`code`)
    const codeParts = part.split(/(`[^`]+`)/g);
    return codeParts.map((codePart, j) => {
      if (codePart.startsWith("`") && codePart.endsWith("`")) {
        return (
          <code key={`${i}-${j}`} className="px-1.5 py-0.5 bg-neutral-800 rounded text-sm font-mono text-neutral-200">
            {codePart.slice(1, -1)}
          </code>
        );
      }
      return codePart;
    });
  });
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) {
    return { title: "Not Found | ContextKit" };
  }
  
  return {
    title: `${post.title} | ContextKit Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) {
    notFound();
  }

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
              className="text-neutral-400 hover:text-white transition-colors"
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

      {/* Article */}
      <article className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="text-sm text-neutral-500 hover:text-white transition-colors inline-flex items-center gap-1 mb-8"
          >
            ← Back to blog
          </Link>
          
          {/* Header */}
          <header className="mb-12">
            <time className="text-sm text-neutral-500 font-mono">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-neutral-400">
              {post.description}
            </p>
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
          <div className="prose prose-invert max-w-none">
            {renderContent(post.content)}
          </div>
          
          {/* CTA */}
          <div className="mt-16 p-6 border border-neutral-800 rounded-lg">
            <h3 className="font-semibold mb-2">Ready to try ContextKit?</h3>
            <p className="text-neutral-400 text-sm mb-4">
              Install in 30 seconds and start finding the right context for your AI prompts.
            </p>
            <code className="inline-block bg-neutral-900 px-4 py-2 rounded font-mono text-sm">
              npm install -g @milo4jo/contextkit
            </code>
          </div>
        </div>
      </article>

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
          <Link href="/blog" className="text-sm text-neutral-500 hover:text-white">
            ← More posts
          </Link>
        </div>
      </footer>
    </main>
  );
}
