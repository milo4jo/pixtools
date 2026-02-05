import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation — ContextKit",
  description: "Learn how to install and use ContextKit for smart context selection.",
};

export default function DocsPage() {
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
              className="text-white"
            >
              Docs
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

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Documentation</h1>

          {/* Installation */}
          <section className="mb-16">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-6">
              Installation
            </h2>
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm mb-4">
              <span className="text-green-400">npm install -g @milo4jo/contextkit</span>
            </div>
            <p className="text-neutral-400 text-sm">
              Requires Node.js 18+. About 500MB disk space for the embedding model (downloaded on first run).
            </p>
          </section>

          {/* Quick Start */}
          <section className="mb-16">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-6">
              Quick Start
            </h2>
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm space-y-4">
              <div>
                <div className="text-neutral-500"># Initialize in your project</div>
                <div className="text-green-400">cd your-project</div>
                <div className="text-green-400">contextkit init</div>
              </div>
              <div>
                <div className="text-neutral-500"># Add source directories</div>
                <div className="text-green-400">contextkit source add ./src</div>
                <div className="text-green-400">contextkit source add ./lib</div>
              </div>
              <div>
                <div className="text-neutral-500"># Build the index</div>
                <div className="text-green-400">contextkit index</div>
              </div>
              <div>
                <div className="text-neutral-500"># Find relevant context</div>
                <div className="text-green-400">contextkit select &quot;How does authentication work?&quot;</div>
              </div>
            </div>
          </section>

          {/* Commands */}
          <section className="mb-16">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-6">
              Commands
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-mono text-lg mb-2">contextkit init</h3>
                <p className="text-neutral-400 text-sm mb-4">
                  Initialize ContextKit in your project. Creates <code className="bg-neutral-800 px-1 rounded">.contextkit/</code> directory with config and database.
                </p>
              </div>

              <div>
                <h3 className="font-mono text-lg mb-2">contextkit source</h3>
                <p className="text-neutral-400 text-sm mb-4">
                  Manage which directories to index.
                </p>
                <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400">contextkit source add ./src</div>
                  <div className="text-green-400">contextkit source list</div>
                  <div className="text-green-400">contextkit source remove src</div>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-lg mb-2">contextkit index</h3>
                <p className="text-neutral-400 text-sm mb-4">
                  Build or rebuild the index. Run after code changes.
                </p>
                <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400">contextkit index</div>
                  <div className="text-neutral-500"># Or index specific source</div>
                  <div className="text-green-400">contextkit index --source src</div>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-lg mb-2">contextkit select</h3>
                <p className="text-neutral-400 text-sm mb-4">
                  Find relevant context for a query.
                </p>
                <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm space-y-2">
                  <div className="text-neutral-500"># Basic usage</div>
                  <div className="text-green-400">contextkit select &quot;How does the auth middleware work?&quot;</div>
                  <div className="text-neutral-500 mt-4"># Set token budget (default: 8000)</div>
                  <div className="text-green-400">contextkit select &quot;error handling&quot; --budget 4000</div>
                  <div className="text-neutral-500 mt-4"># Show scoring details</div>
                  <div className="text-green-400">contextkit select &quot;user validation&quot; --explain</div>
                  <div className="text-neutral-500 mt-4"># JSON output (for scripts)</div>
                  <div className="text-green-400">contextkit select &quot;API routes&quot; --json</div>
                </div>
              </div>
            </div>
          </section>

          {/* MCP Setup */}
          <section className="mb-16">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-6">
              Claude Desktop (MCP)
            </h2>
            <p className="text-neutral-400 mb-6">
              ContextKit includes an MCP server for seamless integration with Claude Desktop.
            </p>

            <h3 className="font-medium mb-4">Setup</h3>
            <ol className="list-decimal list-inside space-y-4 text-neutral-400 mb-8">
              <li>
                <span>Find your config file:</span>
                <ul className="ml-6 mt-2 text-sm text-neutral-500">
                  <li>macOS: <code className="bg-neutral-800 px-1 rounded">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
                  <li>Windows: <code className="bg-neutral-800 px-1 rounded">%APPDATA%\Claude\claude_desktop_config.json</code></li>
                </ul>
              </li>
              <li>Add ContextKit:</li>
            </ol>

            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm mb-8">
              <pre className="text-neutral-300">{`{
  "mcpServers": {
    "contextkit": {
      "command": "contextkit-mcp",
      "env": {
        "CONTEXTKIT_PROJECT": "/path/to/your/project"
      }
    }
  }
}`}</pre>
            </div>

            <h3 className="font-medium mb-4">Available Tools</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left py-2 text-neutral-400 font-medium">Tool</th>
                  <th className="text-left py-2 text-neutral-400 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="text-neutral-300">
                <tr className="border-b border-neutral-800">
                  <td className="py-2 font-mono">contextkit_select</td>
                  <td className="py-2 text-neutral-500">Find relevant context for any query</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="py-2 font-mono">contextkit_index</td>
                  <td className="py-2 text-neutral-500">Re-index the codebase</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="py-2 font-mono">contextkit_status</td>
                  <td className="py-2 text-neutral-500">Check index status</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Configuration */}
          <section className="mb-16">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-6">
              Configuration
            </h2>
            <p className="text-neutral-400 mb-4">
              Edit <code className="bg-neutral-800 px-1 rounded">.contextkit/config.yaml</code>:
            </p>
            <div className="bg-neutral-900 rounded-lg p-4 font-mono text-sm">
              <pre className="text-neutral-300">{`version: 1

sources:
  - id: src
    path: ./src
    patterns:
      include:
        - "**/*.ts"
        - "**/*.tsx"
      exclude:
        - "**/node_modules/**"
        - "**/*.test.ts"

settings:
  chunk_size: 500      # Target tokens per chunk
  chunk_overlap: 50    # Overlap between chunks`}</pre>
            </div>
          </section>

          {/* Privacy */}
          <section className="mb-16">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-6">
              Privacy
            </h2>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                All processing happens locally
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                Embeddings stored in <code className="bg-neutral-800 px-1 rounded">.contextkit/index.db</code>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                No API keys required
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>
                Your code never leaves your machine
              </li>
            </ul>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-neutral-800">
            <div className="flex gap-6 text-sm text-neutral-500">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <a
                href="https://github.com/milo4jo/contextkit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/@milo4jo/contextkit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                npm
              </a>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
