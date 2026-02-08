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
