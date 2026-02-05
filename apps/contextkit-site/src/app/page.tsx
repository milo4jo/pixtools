import Link from "next/link";

export default function Home() {
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
            <a
              href="https://github.com/milo4jo/pixtools/tree/main/packages/contextkit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Stop dumping your codebase
            <br />
            <span className="text-neutral-500">into AI prompts</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
            ContextKit selects the <em>right</em> context for any query —
            saving tokens and improving answers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <code className="bg-neutral-900 px-6 py-3 rounded-lg font-mono text-sm">
              npm install -g @milo4jo/contextkit
            </code>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-12">
            The Problem
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 border border-neutral-800 rounded-lg">
              <div className="text-2xl mb-3">📦</div>
              <h3 className="font-medium mb-2">Too much context</h3>
              <p className="text-sm text-neutral-500">
                Expensive, slow, hits token limits. The model gets confused.
              </p>
            </div>
            <div className="p-6 border border-neutral-800 rounded-lg">
              <div className="text-2xl mb-3">🫥</div>
              <h3 className="font-medium mb-2">Too little context</h3>
              <p className="text-sm text-neutral-500">
                Hallucinations. Wrong answers. Missing the key piece.
              </p>
            </div>
            <div className="p-6 border border-neutral-800 rounded-lg">
              <div className="text-2xl mb-3">😤</div>
              <h3 className="font-medium mb-2">Manual selection</h3>
              <p className="text-sm text-neutral-500">
                Tedious. You might miss something. Doesn&apos;t scale.
              </p>
            </div>
          </div>

          <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-8">
            The Solution
          </h2>
          <p className="text-xl text-neutral-300 leading-relaxed">
            ContextKit indexes your codebase locally, then uses semantic search
            to find the most relevant chunks for any query — fitting them into
            your token budget.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-12">
            How It Works
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="text-neutral-600 font-mono text-sm w-8">01</div>
              <div>
                <h3 className="font-medium mb-2">Index your code</h3>
                <p className="text-neutral-500 text-sm">
                  Files are split into chunks and embedded locally. Nothing
                  leaves your machine.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-neutral-600 font-mono text-sm w-8">02</div>
              <div>
                <h3 className="font-medium mb-2">Query in natural language</h3>
                <p className="text-neutral-500 text-sm">
                  &quot;How does authentication work?&quot; — just ask what you need.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-neutral-600 font-mono text-sm w-8">03</div>
              <div>
                <h3 className="font-medium mb-2">Get optimized context</h3>
                <p className="text-neutral-500 text-sm">
                  The most relevant code chunks, formatted and ready to paste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20 px-6 border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-8">
            Quick Start
          </h2>
          <div className="bg-neutral-900 rounded-lg p-6 font-mono text-sm overflow-x-auto">
            <div className="text-neutral-500"># Initialize in your project</div>
            <div className="text-green-400">contextkit init</div>
            <div className="mt-4 text-neutral-500"># Add source directories</div>
            <div className="text-green-400">contextkit source add ./src</div>
            <div className="mt-4 text-neutral-500"># Build the index</div>
            <div className="text-green-400">contextkit index</div>
            <div className="mt-4 text-neutral-500"># Find relevant context</div>
            <div className="text-green-400">
              contextkit select &quot;How does authentication work?&quot;
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-12">
            Features
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <h3 className="font-medium mb-2">🔒 Local-first</h3>
              <p className="text-sm text-neutral-500">
                All processing happens on your machine. Your code never leaves.
                No API keys required.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">🎯 Token-budget aware</h3>
              <p className="text-sm text-neutral-500">
                Specify your budget. ContextKit fills it with the highest-value
                chunks.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">🤖 MCP Server</h3>
              <p className="text-sm text-neutral-500">
                Integrates with Claude Desktop via Model Context Protocol.
                Let Claude fetch its own context.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">⚡ Model-agnostic</h3>
              <p className="text-sm text-neutral-500">
                Works with Claude, GPT, Llama — any LLM. Just outputs text.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MCP Section */}
      <section className="py-20 px-6 border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-8">
            Claude Desktop Integration
          </h2>
          <p className="text-neutral-300 mb-8">
            ContextKit includes an MCP server. Add it to your Claude Desktop
            config and Claude can fetch context directly.
          </p>
          <div className="bg-neutral-900 rounded-lg p-6 font-mono text-sm overflow-x-auto">
            <div className="text-neutral-500">
              {`// claude_desktop_config.json`}
            </div>
            <div className="text-neutral-300">{`{`}</div>
            <div className="text-neutral-300 pl-4">{`"mcpServers": {`}</div>
            <div className="text-neutral-300 pl-8">{`"contextkit": {`}</div>
            <div className="text-green-400 pl-12">{`"command": "contextkit-mcp"`}</div>
            <div className="text-neutral-300 pl-8">{`}`}</div>
            <div className="text-neutral-300 pl-4">{`}`}</div>
            <div className="text-neutral-300">{`}`}</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Start in 30 seconds</h2>
          <code className="inline-block bg-neutral-900 px-6 py-3 rounded-lg font-mono text-sm mb-8">
            npm install -g @milo4jo/contextkit
          </code>
          <div className="flex justify-center gap-6 text-sm">
            <Link
              href="/docs"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Read the docs
            </Link>
            <a
              href="https://github.com/milo4jo/pixtools/tree/main/packages/contextkit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
            >
              View on GitHub
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17L17 7M17 7H7M17 7V17"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-600">
            Built by{" "}
            <a
              href="https://github.com/milo4jo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Milo
            </a>
          </p>
          <p className="text-sm text-neutral-700">
            Part of{" "}
            <a
              href="https://github.com/milo4jo/pixtools"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors"
            >
              PixTools
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
