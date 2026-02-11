import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ContextKit - Smart Context Selection for AI Coding | PixTools",
  description: "CLI tool that intelligently selects the most relevant code for your AI prompts. Semantic search, AST-aware chunking, MCP integration.",
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
            Smart Context Selection for AI Coding
          </p>
          <p className="text-neutral-300 leading-relaxed max-w-2xl">
            Stop manually copy-pasting code files into Claude or ChatGPT. 
            ContextKit uses semantic search to automatically find the most relevant 
            code for your query — perfectly sized for your token budget.
          </p>
        </div>

        {/* Install */}
        <div className="mb-12 p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg">
          <code className="text-green-400 font-mono text-sm">
            npm install -g @milo4jo/contextkit
          </code>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold text-green-400 mb-1">Semantic</div>
            <div className="text-neutral-500">AI-powered search finds relevant code</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400 mb-1">Smart</div>
            <div className="text-neutral-500">AST-aware chunking respects code boundaries</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400 mb-1">Local</div>
            <div className="text-neutral-500">Embeddings run locally, no API costs</div>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-white">How it works</h2>
          <div className="space-y-4 font-mono text-sm">
            <div className="p-3 bg-neutral-900/50 border border-neutral-800 rounded">
              <span className="text-neutral-500">$</span> <span className="text-green-400">contextkit index</span>
              <span className="text-neutral-500 ml-4"># Index your codebase</span>
            </div>
            <div className="p-3 bg-neutral-900/50 border border-neutral-800 rounded">
              <span className="text-neutral-500">$</span> <span className="text-green-400">contextkit select</span> <span className="text-white">&quot;how does auth work&quot;</span>
              <span className="text-neutral-500 ml-4"># Get relevant code</span>
            </div>
            <div className="p-3 bg-neutral-900/50 border border-neutral-800 rounded">
              <span className="text-neutral-500">$</span> <span className="text-green-400">contextkit i</span>
              <span className="text-neutral-500 ml-4"># Interactive mode</span>
            </div>
          </div>
        </div>

        {/* More features */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-white">Features</h2>
          <ul className="space-y-3 text-neutral-300">
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <span><strong className="text-white">MCP Integration</strong> — Works directly with Claude Desktop</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <span><strong className="text-white">Token Budget</strong> — Control output size with --budget flag</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <span><strong className="text-white">Symbol Search</strong> — Find functions, classes, exports</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <span><strong className="text-white">Call Graph</strong> — See function relationships</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <span><strong className="text-white">Interactive Mode</strong> — REPL for quick exploration</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://github.com/milo4jo/contextkit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors"
          >
            View on GitHub
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
            npm Package
          </a>
          <a
            href="https://contextkit-site.vercel.app/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-neutral-700 hover:border-neutral-500 rounded-lg font-medium transition-colors"
          >
            Documentation
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
