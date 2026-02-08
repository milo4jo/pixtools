import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-neutral-900">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg flex items-center gap-2">
            <span className="text-xl">🎯</span>
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
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            v0.5.9 — Now with Java &amp; C# support
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            The right context.
            <br />
            <span className="text-neutral-500">Every time.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-neutral-400 mb-8 max-w-2xl mx-auto">
            Stop dumping your entire codebase into AI prompts.
            ContextKit selects the most relevant code for any query — 
            <span className="text-white"> saving 90%+ tokens</span> and getting better answers.
          </p>
          
          {/* Install command */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <code className="bg-neutral-900 border border-neutral-800 px-5 py-3 rounded-lg font-mono text-sm flex items-center gap-3">
              <span className="text-neutral-500">$</span>
              <span>npm i -g @milo4jo/contextkit</span>
              <button 
                className="text-neutral-500 hover:text-white transition-colors"
                title="Copy to clipboard"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </code>
          </div>
          
          {/* Social proof */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-neutral-500">
            <a 
              href="https://www.npmjs.com/package/@milo4jo/contextkit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <img 
                src="https://img.shields.io/npm/dw/@milo4jo/contextkit?style=flat&color=22c55e&labelColor=171717" 
                alt="npm downloads" 
                className="h-5"
              />
            </a>
            <a 
              href="https://github.com/milo4jo/contextkit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <img 
                src="https://img.shields.io/github/stars/milo4jo/contextkit?style=flat&color=22c55e&labelColor=171717" 
                alt="GitHub stars" 
                className="h-5"
              />
            </a>
            <span className="flex items-center gap-2">
              <span className="text-green-500">✓</span> 100% Local
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-500">✓</span> No API Keys
            </span>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900 border-b border-neutral-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-xs text-neutral-500 ml-2">terminal</span>
            </div>
            {/* Terminal content */}
            <div className="p-6 font-mono text-sm overflow-x-auto">
              <div className="text-neutral-500">$ contextkit select &quot;How does auth work?&quot;</div>
              <div className="mt-4 text-neutral-300">
                <span className="text-blue-400">Finding relevant context...</span>
              </div>
              <div className="mt-4">
                <div className="text-green-400">## src/auth/middleware.ts</div>
                <div className="text-neutral-400 mt-1 pl-4 border-l-2 border-neutral-800">
                  <div className="text-purple-400">export</div>
                  <div>{`const authMiddleware = async (req, res, next) => {`}</div>
                  <div className="pl-4">{`const token = req.headers.authorization;`}</div>
                  <div className="pl-4">{`const user = await validateToken(token);`}</div>
                  <div className="pl-4">{`req.user = user;`}</div>
                  <div>{`}`}</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-green-400">## src/auth/jwt.ts</div>
                <div className="text-neutral-400 mt-1 pl-4 border-l-2 border-neutral-800">
                  <div>{`function validateToken(token: string): User {`}</div>
                  <div className="pl-4">{`return jwt.verify(token, SECRET);`}</div>
                  <div>{`}`}</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-800 text-neutral-500">
                📊 2,847 tokens | 6 chunks | 2 files
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why ContextKit */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-4">
            Why ContextKit?
          </h2>
          <p className="text-2xl sm:text-3xl font-medium text-neutral-200 mb-12 max-w-3xl">
            AI assistants are only as good as the context you give them.
            Most developers either paste too much or too little.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl">
              <div className="text-3xl mb-4">📦</div>
              <h3 className="font-semibold text-lg mb-2">Too much context</h3>
              <p className="text-neutral-500">
                200k tokens for a 50k line codebase. Expensive. Slow. The model loses focus.
              </p>
            </div>
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl">
              <div className="text-3xl mb-4">🫥</div>
              <h3 className="font-semibold text-lg mb-2">Too little context</h3>
              <p className="text-neutral-500">
                Miss a key file and get hallucinations. Wrong imports. Broken code.
              </p>
            </div>
            <div className="p-6 bg-green-950/30 border border-green-900/50 rounded-xl">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-semibold text-lg mb-2 text-green-400">Right context</h3>
              <p className="text-neutral-400">
                ContextKit gives you the 3-8k tokens that matter. 96% savings, better answers.
              </p>
            </div>
          </div>

          {/* Comparison */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border border-neutral-800 rounded-xl">
              <h3 className="font-medium mb-4 text-neutral-400">❌ Without ContextKit</h3>
              <ul className="space-y-3 text-sm text-neutral-500">
                <li className="flex gap-2">
                  <span className="text-red-500">•</span>
                  Copy-paste random files
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">•</span>
                  Hit token limits constantly
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">•</span>
                  Miss important dependencies
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">•</span>
                  Get hallucinated code
                </li>
              </ul>
            </div>
            <div className="p-6 border border-green-900/50 bg-green-950/20 rounded-xl">
              <h3 className="font-medium mb-4 text-green-400">✓ With ContextKit</h3>
              <ul className="space-y-3 text-sm text-neutral-300">
                <li className="flex gap-2">
                  <span className="text-green-500">•</span>
                  Semantic search finds relevant code
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">•</span>
                  Token budget respected
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">•</span>
                  Import graph included
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500">•</span>
                  Accurate, grounded answers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - streamlined */}
      <section className="py-20 px-6 border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-12">
            Three Commands. That&apos;s it.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-bold text-neutral-800 mb-4">1</div>
              <h3 className="font-semibold mb-2">Index</h3>
              <code className="text-sm text-green-400">contextkit index</code>
              <p className="text-sm text-neutral-500 mt-2">
                Embeds your code locally. Runs in seconds, updates incrementally.
              </p>
            </div>
            <div>
              <div className="text-5xl font-bold text-neutral-800 mb-4">2</div>
              <h3 className="font-semibold mb-2">Select</h3>
              <code className="text-sm text-green-400">contextkit select &quot;query&quot;</code>
              <p className="text-sm text-neutral-500 mt-2">
                Finds the most relevant chunks. Respects your token budget.
              </p>
            </div>
            <div>
              <div className="text-5xl font-bold text-neutral-800 mb-4">3</div>
              <h3 className="font-semibold mb-2">Use</h3>
              <code className="text-sm text-green-400">| pbcopy</code>
              <p className="text-sm text-neutral-500 mt-2">
                Paste into Claude, GPT, or any LLM. Or use MCP for auto-fetch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features - compact */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-12">
            Everything you need
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-4">
              <div className="text-xl mb-2">🔒</div>
              <h3 className="font-medium text-sm mb-1">Local-first</h3>
              <p className="text-xs text-neutral-500">
                Your code never leaves your machine. Zero data sent anywhere.
              </p>
            </div>
            <div className="p-4">
              <div className="text-xl mb-2">🤖</div>
              <h3 className="font-medium text-sm mb-1">MCP Server</h3>
              <p className="text-xs text-neutral-500">
                Claude Desktop fetches context automatically. Zero copy-paste.
              </p>
            </div>
            <div className="p-4">
              <div className="text-xl mb-2">🔍</div>
              <h3 className="font-medium text-sm mb-1">Symbol Search</h3>
              <p className="text-xs text-neutral-500">
                Find functions by name instantly. Faster than grep.
              </p>
            </div>
            <div className="p-4">
              <div className="text-xl mb-2">🕸️</div>
              <h3 className="font-medium text-sm mb-1">Call Graph</h3>
              <p className="text-xs text-neutral-500">
                See what calls what. Navigate dependencies visually.
              </p>
            </div>
            <div className="p-4">
              <div className="text-xl mb-2">⚡</div>
              <h3 className="font-medium text-sm mb-1">Incremental</h3>
              <p className="text-xs text-neutral-500">
                Only re-indexes changed files. Sub-second updates.
              </p>
            </div>
            <div className="p-4">
              <div className="text-xl mb-2">🗺️</div>
              <h3 className="font-medium text-sm mb-1">Map Mode</h3>
              <p className="text-xs text-neutral-500">
                Get signatures only. Perfect for codebase overviews.
              </p>
            </div>
            <div className="p-4">
              <div className="text-xl mb-2">🌐</div>
              <h3 className="font-medium text-sm mb-1">Multi-language</h3>
              <p className="text-xs text-neutral-500">
                TS, JS, Python, Go, Rust, Java, C#, Markdown.
              </p>
            </div>
            <div className="p-4">
              <div className="text-xl mb-2">📊</div>
              <h3 className="font-medium text-sm mb-1">Token Budget</h3>
              <p className="text-xs text-neutral-500">
                Specify max tokens. We fill it with the best chunks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MCP Section */}
      <section className="py-20 px-6 border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest">
              Claude Desktop Integration
            </h2>
            <span className="px-2 py-0.5 text-xs rounded bg-green-900/50 text-green-400 border border-green-800">
              MCP
            </span>
          </div>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl">
            Let Claude fetch its own context. Ask a question, and Claude uses ContextKit 
            to find the relevant code — no copy-paste needed.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-neutral-900 rounded-xl p-6 font-mono text-sm overflow-x-auto border border-neutral-800">
              <div className="text-neutral-500 mb-2"># claude_desktop_config.json</div>
              <div className="text-neutral-300">{`{`}</div>
              <div className="text-neutral-300 pl-4">{`"mcpServers": {`}</div>
              <div className="text-neutral-300 pl-8">{`"contextkit": {`}</div>
              <div className="text-green-400 pl-12">{`"command": "contextkit-mcp"`}</div>
              <div className="text-neutral-300 pl-8">{`}`}</div>
              <div className="text-neutral-300 pl-4">{`}`}</div>
              <div className="text-neutral-300">{`}`}</div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5">→</span>
                <div>
                  <p className="font-medium text-sm">contextkit_select</p>
                  <p className="text-xs text-neutral-500">Semantic search for relevant code</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5">→</span>
                <div>
                  <p className="font-medium text-sm">contextkit_symbol</p>
                  <p className="text-xs text-neutral-500">Find functions/classes by name</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5">→</span>
                <div>
                  <p className="font-medium text-sm">contextkit_graph</p>
                  <p className="text-xs text-neutral-500">Show call relationships</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5">→</span>
                <div>
                  <p className="font-medium text-sm">contextkit_index</p>
                  <p className="text-xs text-neutral-500">Re-index after changes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-12">
            Use Cases
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border border-neutral-800 rounded-xl">
              <h3 className="font-semibold mb-3">🐛 Bug Investigation</h3>
              <p className="text-sm text-neutral-400 mb-3">
                &quot;Find all code related to payment processing&quot;
              </p>
              <p className="text-xs text-neutral-600">
                Get the relevant handlers, services, and utils — not the entire codebase.
              </p>
            </div>
            <div className="p-6 border border-neutral-800 rounded-xl">
              <h3 className="font-semibold mb-3">📝 Documentation</h3>
              <p className="text-sm text-neutral-400 mb-3">
                &quot;How does our caching layer work?&quot;
              </p>
              <p className="text-xs text-neutral-600">
                Feed the AI the right code, get accurate documentation back.
              </p>
            </div>
            <div className="p-6 border border-neutral-800 rounded-xl">
              <h3 className="font-semibold mb-3">🔄 Refactoring</h3>
              <p className="text-sm text-neutral-400 mb-3">
                &quot;Show me all usages of the legacy auth module&quot;
              </p>
              <p className="text-xs text-neutral-600">
                Understand impact before making changes. Call graph included.
              </p>
            </div>
            <div className="p-6 border border-neutral-800 rounded-xl">
              <h3 className="font-semibold mb-3">🆕 Onboarding</h3>
              <p className="text-sm text-neutral-400 mb-3">
                &quot;How does this feature work?&quot;
              </p>
              <p className="text-xs text-neutral-600">
                New team member? Give them context, not overwhelming codebases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-neutral-900 bg-gradient-to-b from-neutral-950 to-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Better context = Better answers
          </h2>
          <p className="text-neutral-400 mb-8">
            Install ContextKit and start getting the right code context in seconds.
          </p>
          <code className="inline-block bg-neutral-900 border border-neutral-800 px-6 py-3 rounded-lg font-mono text-sm mb-8">
            npm install -g @milo4jo/contextkit
          </code>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/docs"
              className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors"
            >
              Read the docs
            </Link>
            <a
              href="https://github.com/milo4jo/contextkit"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-neutral-700 rounded-lg hover:border-neutral-500 transition-colors flex items-center gap-2"
            >
              View on GitHub
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="font-semibold text-lg flex items-center gap-2 mb-2">
                <span>🎯</span> ContextKit
              </div>
              <p className="text-sm text-neutral-500 max-w-xs">
                The right context for AI coding assistants. Local-first, open source.
              </p>
            </div>
            <div className="flex gap-12 text-sm">
              <div>
                <h4 className="font-medium mb-3 text-neutral-400">Product</h4>
                <ul className="space-y-2 text-neutral-500">
                  <li><Link href="/docs" className="hover:text-white transition-colors">Docs</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><a href="https://github.com/milo4jo/contextkit/blob/main/CHANGELOG.md" className="hover:text-white transition-colors">Changelog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-neutral-400">Links</h4>
                <ul className="space-y-2 text-neutral-500">
                  <li><a href="https://github.com/milo4jo/contextkit" className="hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="https://www.npmjs.com/package/@milo4jo/contextkit" className="hover:text-white transition-colors">npm</a></li>
                  <li><a href="https://github.com/milo4jo" className="hover:text-white transition-colors">@milo4jo</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-600">
            <p>MIT License</p>
            <p>
              Built by{" "}
              <a href="https://github.com/milo4jo" className="text-neutral-400 hover:text-white transition-colors">
                Milo 🦊
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
