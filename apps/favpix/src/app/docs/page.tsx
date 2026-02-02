import Link from "next/link";
import { CodeBlock, InlineCode } from "@pixtools/ui";

// FavPix Logo component
function FavPixLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="6" height="6" rx="1" fill="currentColor"/>
      <rect x="9" y="2" width="6" height="6" rx="1" fill="currentColor"/>
      <rect x="16" y="2" width="6" height="6" rx="1" fill="currentColor" opacity="0.4"/>
      <rect x="2" y="9" width="6" height="6" rx="1" fill="currentColor"/>
      <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.4"/>
      <rect x="2" y="16" width="6" height="6" rx="1" fill="currentColor"/>
    </svg>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold flex items-center gap-2.5 group">
            <FavPixLogo className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <span>FavPix</span>
          </Link>
          <nav className="flex gap-4 items-center">
            <Link 
              href="/editor" 
              className="text-sm px-4 py-2 bg-cyan-500 text-black rounded-lg font-medium hover:bg-cyan-400 transition-colors"
            >
              Editor
            </Link>
          </nav>
        </div>
      </header>

      {/* Docs Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
        <p className="text-neutral-400 mb-12">Generate pixel-perfect favicons with a single HTTP request.</p>

        {/* Quick Start */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Quick Start</h2>
          <CodeBlock 
            code="curl https://favpix.vercel.app/api/favicon?text=M&bg=06b6d4&size=32 -o favicon.png"
            language="bash"
          />
        </section>

        {/* Base URL */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Base URL</h2>
          <CodeBlock 
            code="https://favpix.vercel.app/api/favicon"
            language="url"
          />
        </section>

        {/* Parameters */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Parameters</h2>
          <div className="border border-neutral-800 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/50">
                  <th className="py-3 px-4 text-sm font-medium text-neutral-300">Parameter</th>
                  <th className="py-3 px-4 text-sm font-medium text-neutral-300">Type</th>
                  <th className="py-3 px-4 text-sm font-medium text-neutral-300">Default</th>
                  <th className="py-3 px-4 text-sm font-medium text-neutral-300">Description</th>
                </tr>
              </thead>
              <tbody className="text-neutral-400 text-sm">
                <tr className="border-b border-neutral-800">
                  <td className="py-3 px-4"><InlineCode>text</InlineCode></td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4">&quot;F&quot;</td>
                  <td className="py-3 px-4">Text or emoji (max 3 chars)</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="py-3 px-4"><InlineCode>bg</InlineCode></td>
                  <td className="py-3 px-4">hex</td>
                  <td className="py-3 px-4">000000</td>
                  <td className="py-3 px-4">Background color (without #)</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="py-3 px-4"><InlineCode>color</InlineCode></td>
                  <td className="py-3 px-4">hex</td>
                  <td className="py-3 px-4">ffffff</td>
                  <td className="py-3 px-4">Text color (without #)</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="py-3 px-4"><InlineCode>size</InlineCode></td>
                  <td className="py-3 px-4">number</td>
                  <td className="py-3 px-4">32</td>
                  <td className="py-3 px-4">Size in pixels (16-512)</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="py-3 px-4"><InlineCode>shape</InlineCode></td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4">square</td>
                  <td className="py-3 px-4">square, rounded, or circle</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="py-3 px-4"><InlineCode>fontSize</InlineCode></td>
                  <td className="py-3 px-4">number</td>
                  <td className="py-3 px-4">auto</td>
                  <td className="py-3 px-4">Font size in pixels</td>
                </tr>
                <tr>
                  <td className="py-3 px-4"><InlineCode>format</InlineCode></td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4">png</td>
                  <td className="py-3 px-4">png or svg</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Examples</h2>
          <div className="space-y-6">
            <div>
              <p className="text-neutral-400 text-sm mb-3">Simple letter favicon</p>
              <CodeBlock 
                code="https://favpix.vercel.app/api/favicon?text=A&bg=000000&color=ffffff"
                language="url"
              />
            </div>
            
            <div>
              <p className="text-neutral-400 text-sm mb-3">Emoji with cyan background</p>
              <CodeBlock 
                code="https://favpix.vercel.app/api/favicon?text=🚀&bg=06b6d4&shape=rounded"
                language="url"
              />
            </div>
            
            <div>
              <p className="text-neutral-400 text-sm mb-3">Apple Touch Icon (180×180)</p>
              <CodeBlock 
                code="https://favpix.vercel.app/api/favicon?text=M&bg=0ea5e9&size=180&shape=rounded"
                language="url"
              />
            </div>

            <div>
              <p className="text-neutral-400 text-sm mb-3">Android Chrome Icon (512×512)</p>
              <CodeBlock 
                code="https://favpix.vercel.app/api/favicon?text=M&bg=16a34a&size=512&shape=circle"
                language="url"
              />
            </div>
          </div>
        </section>

        {/* HTML Integration */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">HTML Integration</h2>
          <CodeBlock 
            code={`<link rel="icon" type="image/png" sizes="32x32" href="https://favpix.vercel.app/api/favicon?text=M&bg=06b6d4&size=32">
<link rel="icon" type="image/png" sizes="16x16" href="https://favpix.vercel.app/api/favicon?text=M&bg=06b6d4&size=16">
<link rel="apple-touch-icon" sizes="180x180" href="https://favpix.vercel.app/api/favicon?text=M&bg=06b6d4&size=180&shape=rounded">`}
            language="html"
          />
        </section>

        {/* Coming Soon */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Coming Soon</h2>
          <ul className="space-y-3 text-neutral-400">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></span>
              ICO format with multiple sizes
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></span>
              ZIP package with all formats
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></span>
              Web manifest generation
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></span>
              Custom font support
            </li>
          </ul>
        </section>

        {/* Footer Link */}
        <div className="pt-8 border-t border-neutral-900">
          <Link 
            href="/editor" 
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Try the Visual Editor
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <FavPixLogo className="w-4 h-4 text-neutral-600" />
            <span>FavPix</span>
          </div>
          <a
            href="https://github.com/milo4jo/pixtools"
            className="hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
