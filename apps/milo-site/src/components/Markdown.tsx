"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface MarkdownProps {
  content: string;
  className?: string;
  /** Truncate to first paragraph only (for previews) */
  preview?: boolean;
}

export function Markdown({ content, className = "", preview = false }: MarkdownProps) {
  const displayContent = preview ? content.split("\n\n")[0] : content;

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mt-8 mb-4 text-white">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold mt-6 mb-3 text-white">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold mt-4 mb-2 text-white">{children}</h3>
          ),
          // Paragraphs
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed break-words">{children}</p>
          ),
          // Bold/Strong
          strong: ({ children }) => (
            <strong className="text-white font-semibold">{children}</strong>
          ),
          // Italic
          em: ({ children }) => (
            <em className="italic">{children}</em>
          ),
          // Inline code
          code: ({ className, children, ...props }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <code className={`${className} block overflow-x-auto`} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className="bg-neutral-800 text-orange-400 px-1.5 py-0.5 rounded text-sm font-mono break-all" {...props}>
                {children}
              </code>
            );
          },
          // Code blocks
          pre: ({ children }) => (
            <pre className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 mb-4 overflow-x-auto text-sm font-mono">
              {children}
            </pre>
          ),
          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-orange-400 hover:text-orange-300 underline underline-offset-2 break-all"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          // Lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="break-words">{children}</li>
          ),
          // Blockquote
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-neutral-700 pl-4 my-4 italic text-neutral-400">
              {children}
            </blockquote>
          ),
          // Horizontal rule
          hr: () => <hr className="border-neutral-800 my-8" />,
        }}
      >
        {displayContent}
      </ReactMarkdown>
    </div>
  );
}
