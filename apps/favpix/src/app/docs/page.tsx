import Link from "next/link";
import { CodeBlock, InlineCode } from "@pixtools/ui";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <span>🎨</span>
            <span>FavPix</span>
          </Link>
          <nav className="flex gap-4 items-center">
            <Link href="/editor" className="text-sm text-neutral-400 hover:text-white transition-colors">
              Editor
            </Link>
          </nav>
        </div>
      </header>

      {/* Docs Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
        <p className="text-neutral-400 mb-12">Generate favicons with a simple HTTP request.</p>

        {/* Quick Start */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Quick Start</h2>
          <CodeBlock 
            code="curl https://favpix.vercel.app/api/favicon?text=M&bg=7c3aed&size=32 -o favicon.png"
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
              <p className="text-neutral-400 text-sm mb-3">Emoji favicon with purple background</p>
              <CodeBlock 
                code="https://favpix.vercel.app/api/favicon?text=🚀&bg=7c3aed&shape=rounded"
                language="url"
              />
            </div>
            
            <div>
              <p className="text-neutral-400 text-sm mb-3">Apple Touch Icon (180×180)</p>
              <CodeBlock 
                code="https://favpix.vercel.app/api/favicon?text=M&bg=2563eb&size=180&shape=rounded"
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
            code={`<link rel="icon" type="image/png" sizes="32x32" href="https://favpix.vercel.app/api/favicon?text=M&bg=7c3aed&size=32">
<link rel="icon" type="image/png" sizes="16x16" href="https://favpix.vercel.app/api/favicon?text=M&bg=7c3aed&size=16">
<link rel="apple-touch-icon" sizes="180x180" href="https://favpix.vercel.app/api/favicon?text=M&bg=7c3aed&size=180&shape=rounded">`}
            language="html"
          />
        </section>

        {/* Coming Soon */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Coming Soon</h2>
          <ul className="space-y-3 text-neutral-400">
            <li className="flex items-center gap-2">
              <span className="text-neutral-600">○</span>
              ICO format with multiple sizes
            </li>
            <li className="flex items-center gap-2">
              <span className="text-neutral-600">○</span>
              ZIP package with all formats
            </li>
            <li className="flex items-center gap-2">
              <span className="text-neutral-600">○</span>
              Web manifest generation
            </li>
            <li className="flex items-center gap-2">
              <span className="text-neutral-600">○</span>
              Custom font support
            </li>
          </ul>
        </section>

        {/* Footer Link */}
        <div className="pt-8 border-t border-neutral-900">
          <Link 
            href="/editor" 
            className="inline-flex items-center gap-2 text-white hover:text-neutral-300 transition-colors"
          >
            Try the Editor
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
