import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation — ContextKit",
  description: "Install and use ContextKit in 30 seconds.",
};

export default function DocsPage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-neutral-900">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg flex items-center gap-2">
            <span>🎯</span> ContextKit
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/docs" className="text-white">Docs</Link>
            <Link href="/blog" className="text-neutral-400 hover:text-white transition-colors">Blog</Link>
            <a href="https://github.com/milo4jo/contextkit" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Documentation</h1>
          <p className="text-neutral-500 mb-12">Everything you need. Nothing you don&apos;t.</p>

          {/* Install */}
          <section className="mb-12">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-4">Install</h2>
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm">
              npm install -g @milo4jo/contextkit
            </div>
            <p className="text-neutral-600 text-xs mt-2">Node.js 18+ required</p>
          </section>

          {/* Quick Start */}
          <section className="mb-12">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-4">30-Second Start</h2>
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm space-y-1">
              <div><span className="text-neutral-600">$</span> <span className="text-green-400">contextkit init</span></div>
              <div><span className="text-neutral-600">$</span> <span className="text-green-400">contextkit source add ./src</span></div>
              <div><span className="text-neutral-600">$</span> <span className="text-green-400">contextkit index</span></div>
              <div><span className="text-neutral-600">$</span> <span className="text-green-400">contextkit select &quot;how does auth work?&quot;</span></div>
            </div>
          </section>

          {/* Commands */}
          <section className="mb-12">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-4">Commands</h2>
            <div className="space-y-4">
              <Command name="init" desc="Create .contextkit/ in current directory" />
              <Command name="source add <path>" desc="Add directory to index" />
              <Command name="source list" desc="Show configured sources" />
              <Command name="index" desc="Build/update the index" />
              <Command name="index --force" desc="Full rebuild" />
              <Command name="select <query>" desc="Find relevant code" />
              <Command name="select --budget 4000" desc="Limit tokens" />
              <Command name="select --mode map" desc="Signatures only" />
              <Command name="symbol <name>" desc="Find by symbol name" />
              <Command name="graph <function>" desc="Show call relationships" />
              <Command name="watch" desc="Auto-reindex on changes" />
              <Command name="doctor" desc="Diagnose issues" />
            </div>
          </section>

          {/* Cloud Sync */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest">Cloud Sync</h2>
              <span className="px-1.5 py-0.5 text-xs rounded bg-blue-900/50 text-blue-400 border border-blue-800">NEW</span>
            </div>
            <p className="text-neutral-400 text-sm mb-4">
              Sync your index to the cloud. Access from any machine.
            </p>
            <div className="space-y-4">
              <Command name="cloud login" desc="Authenticate with your API key" />
              <Command name="cloud sync" desc="Upload index to cloud" />
              <Command name="cloud pull" desc="Download index from cloud" />
              <Command name="cloud status" desc="Check sync status" />
              <Command name="cloud logout" desc="Remove stored credentials" />
            </div>
            <p className="text-neutral-600 text-xs mt-4">
              Get your API key at{' '}
              <a href="/dashboard/api-keys" className="text-blue-400 hover:text-blue-300">
                Dashboard → API Keys
              </a>
            </p>
          </section>

          {/* Languages */}
          <section className="mb-12">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-4">Supported Languages</h2>
            <div className="flex flex-wrap gap-2">
              {['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Java', 'C#', 'PHP', 'Markdown'].map(lang => (
                <span key={lang} className="px-2 py-1 bg-neutral-900 rounded text-sm text-neutral-400">{lang}</span>
              ))}
            </div>
          </section>

          {/* MCP */}
          <section className="mb-12">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-4">Claude Desktop (MCP)</h2>
            <p className="text-neutral-400 text-sm mb-4">Add to your Claude config:</p>
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-xs overflow-x-auto">
              <pre className="text-neutral-300">{`{
  "mcpServers": {
    "contextkit": {
      "command": "contextkit-mcp",
      "env": { "CONTEXTKIT_PROJECT": "/your/project" }
    }
  }
}`}</pre>
            </div>
            
            <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mt-8 mb-4">MCP Tools</h3>
            <div className="space-y-2 text-sm">
              <MCPTool name="contextkit_select" desc="Semantic search for code" />
              <MCPTool name="contextkit_symbol" desc="Find by name" />
              <MCPTool name="contextkit_graph" desc="Call relationships" />
              <MCPTool name="contextkit_index" desc="Rebuild index" />
              <MCPTool name="contextkit_status" desc="Index info" />
            </div>
          </section>

          {/* Config */}
          <section className="mb-12">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-4">Configuration</h2>
            <p className="text-neutral-400 text-sm mb-4">.contextkit/config.yaml</p>
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-xs">
              <pre className="text-neutral-300">{`sources:
  - id: src
    path: ./src
    patterns:
      include: ["**/*.ts", "**/*.tsx"]
      exclude: ["**/node_modules/**"]

settings:
  chunk_size: 500
  chunk_overlap: 50`}</pre>
            </div>
          </section>

          {/* How-Tos */}
          <section className="mb-12">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-6">How-To Guides</h2>
            
            {/* How-To: Debug a Bug */}
            <HowTo 
              title="🐛 Debug a Bug"
              steps={[
                { cmd: 'contextkit select "error handling in payment"', desc: 'Find relevant code' },
                { cmd: '| pbcopy', desc: 'Copy to clipboard (macOS)' },
                { desc: 'Paste into Claude/ChatGPT with your error message' },
              ]}
            />

            {/* How-To: Understand New Codebase */}
            <HowTo 
              title="🗺️ Understand a New Codebase"
              steps={[
                { cmd: 'contextkit select "main entry point" --mode map', desc: 'Get overview' },
                { cmd: 'contextkit graph "main"', desc: 'See what main calls' },
                { cmd: 'contextkit symbol "App"', desc: 'Find key components' },
              ]}
            />

            {/* How-To: Refactor Safely */}
            <HowTo 
              title="🔄 Refactor Safely"
              steps={[
                { cmd: 'contextkit symbol "oldFunction"', desc: 'Find the function' },
                { cmd: 'contextkit graph "oldFunction"', desc: 'See all callers' },
                { cmd: 'contextkit select "usages of oldFunction"', desc: 'Get full context for AI' },
              ]}
            />

            {/* How-To: Write Documentation */}
            <HowTo 
              title="📝 Write Documentation"
              steps={[
                { cmd: 'contextkit select "how does auth work" --budget 6000', desc: 'Get comprehensive context' },
                { desc: 'Ask AI: "Write documentation for this authentication system"' },
              ]}
            />

            {/* How-To: Code Review */}
            <HowTo 
              title="👀 Code Review with Context"
              steps={[
                { cmd: 'git diff --name-only main | head -5', desc: 'See changed files' },
                { cmd: 'contextkit select "changes to user service"', desc: 'Get context for changed area' },
                { desc: 'Review with full understanding of impact' },
              ]}
            />

            {/* How-To: Use with Cursor */}
            <HowTo 
              title="⚡ Use with Cursor"
              steps={[
                { cmd: 'contextkit select "your question" | pbcopy', desc: 'Get context' },
                { desc: 'In Cursor: Cmd+L → Paste → Ask your question' },
                { desc: 'Or: Set up MCP for automatic context fetching' },
              ]}
            />
          </section>

          {/* Tips */}
          <section className="mb-12">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-4">Tips & Tricks</h2>
            <div className="space-y-4 text-sm">
              <Tip 
                title="Use --mode map for large codebases"
                desc="Get function signatures instead of full code. Uses 90% fewer tokens."
              />
              <Tip 
                title="Combine with grep"
                desc="contextkit select 'error' | grep -A5 'catch' — Filter results further."
              />
              <Tip 
                title="Set up shell alias"
                desc="alias ctx='contextkit select' — Type less, search faster."
              />
              <Tip 
                title="Watch mode for active development"
                desc="contextkit watch — Auto-reindex when files change."
              />
              <Tip 
                title="Use --explain to understand scoring"
                desc="See why certain chunks were selected over others."
              />
            </div>
          </section>

          {/* Privacy */}
          <section className="mb-12">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-4">Privacy</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="text-green-500">✓</span> 100% Local
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="text-green-500">✓</span> No API keys
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="text-green-500">✓</span> No telemetry
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="text-green-500">✓</span> Open source
              </div>
            </div>
          </section>

          {/* Links */}
          <footer className="pt-8 border-t border-neutral-800">
            <div className="flex flex-wrap gap-6 text-sm text-neutral-500">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <a href="https://github.com/milo4jo/contextkit" className="hover:text-white transition-colors">GitHub</a>
              <a href="https://www.npmjs.com/package/@milo4jo/contextkit" className="hover:text-white transition-colors">npm</a>
              <a href="https://github.com/milo4jo/contextkit/blob/main/CHANGELOG.md" className="hover:text-white transition-colors">Changelog</a>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}

function Command({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <code className="font-mono text-sm text-green-400 whitespace-nowrap">{name}</code>
      <span className="text-neutral-600 text-sm">{desc}</span>
    </div>
  );
}

function MCPTool({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <code className="font-mono text-xs text-neutral-300 bg-neutral-900 px-2 py-0.5 rounded">{name}</code>
      <span className="text-neutral-500 text-xs">{desc}</span>
    </div>
  );
}

function HowTo({ title, steps }: { title: string; steps: Array<{ cmd?: string; desc: string }> }) {
  return (
    <div className="mb-8 p-4 bg-neutral-950 border border-neutral-800 rounded-lg">
      <h3 className="font-medium mb-3">{title}</h3>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-neutral-600 text-xs mt-1">{i + 1}.</span>
            <div>
              {step.cmd && (
                <code className="block font-mono text-xs text-green-400 bg-neutral-900 px-2 py-1 rounded mb-1">
                  {step.cmd}
                </code>
              )}
              <span className="text-neutral-500 text-xs">{step.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tip({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
      <span className="text-yellow-500">💡</span>
      <div>
        <p className="font-medium text-sm text-neutral-300">{title}</p>
        <p className="text-neutral-500 text-xs mt-1">{desc}</p>
      </div>
    </div>
  );
}
