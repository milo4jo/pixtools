import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ContextKit - AI Context Selection | PixTools",
  description: "Pick files for AI context with a visual tree. Copy to clipboard, ready for your prompt.",
};

export default function ContextKitPage() {
  return (
    <main className="min-h-screen">
      {/* Back link */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-24">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-green-400">
            ContextKit
          </h1>
          <p className="text-xl text-neutral-400 mb-8">
            AI Context Selection
          </p>
          <p className="text-neutral-300 leading-relaxed max-w-2xl">
            Easily select files from your codebase to include as context in AI prompts. 
            Visual file tree, smart filtering, and one-click copy. 
            Stop manually copying file contents — let ContextKit handle it.
          </p>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold text-green-400 mb-1">Visual</div>
            <div className="text-neutral-500">File tree browser</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400 mb-1">Smart</div>
            <div className="text-neutral-500">Auto-filters junk</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400 mb-1">Fast</div>
            <div className="text-neutral-500">One-click copy</div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://contextkit-site.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors"
          >
            Open App
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <a
            href="https://www.npmjs.com/package/@milo4jo/contextkit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-neutral-700 hover:border-neutral-500 rounded-lg font-medium transition-colors"
          >
            npm
          </a>
          <a
            href="https://github.com/milo4jo/contextkit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-neutral-700 hover:border-neutral-500 rounded-lg font-medium transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center text-sm text-neutral-500">
          Part of{" "}
          <Link href="/" className="text-white hover:text-neutral-300 transition-colors">
            PixTools
          </Link>
        </div>
      </div>
    </main>
  );
}
