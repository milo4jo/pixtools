import Link from "next/link";
import { FaviconPreview } from "@/components/FaviconPreview";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <span>🎨</span>
            <span>FavPix</span>
          </Link>
          <nav className="flex gap-4 items-center">
            <Link href="/docs" className="text-sm text-neutral-400 hover:text-white transition-colors">
              Docs
            </Link>
            <Link
              href="/editor"
              className="text-sm px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors"
            >
              Editor
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Favicons.
            <br />
            <span className="text-neutral-500">One API.</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-xl mx-auto">
            Generate favicons from text or emoji with a single URL.
          </p>
        </div>

        {/* Live Preview Builder */}
        <FaviconPreview />
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-900" />

      {/* Features */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
        <div className="grid sm:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">PNG</div>
            <div className="text-neutral-500">All sizes, instant</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">Edge</div>
            <div className="text-neutral-500">Fast, global CDN</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">Free</div>
            <div className="text-neutral-500">No limits</div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-900" />

      {/* Quick Links */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            href="/editor"
            className="p-6 border border-neutral-800 rounded-xl hover:border-neutral-700 hover:bg-neutral-900/50 transition-all group"
          >
            <h3 className="font-semibold mb-2 group-hover:text-white flex items-center gap-2">
              Full Editor
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </h3>
            <p className="text-sm text-neutral-500">All options, live preview</p>
          </Link>
          <Link
            href="/docs"
            className="p-6 border border-neutral-800 rounded-xl hover:border-neutral-700 hover:bg-neutral-900/50 transition-all group"
          >
            <h3 className="font-semibold mb-2 group-hover:text-white flex items-center gap-2">
              API Docs
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </h3>
            <p className="text-sm text-neutral-500">Parameters & examples</p>
          </Link>
          <a
            href="https://ogpix.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 border border-neutral-800 rounded-xl hover:border-neutral-700 hover:bg-neutral-900/50 transition-all group"
          >
            <h3 className="font-semibold mb-2 group-hover:text-white flex items-center gap-2">
              OGPix
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </h3>
            <p className="text-sm text-neutral-500">OG Image generator</p>
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-900" />

      {/* API Example */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
        <h2 className="text-2xl font-bold mb-8 text-center">Simple API</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
          <div>
            <p className="text-sm text-neutral-500 mb-2">Request</p>
            <code className="text-sm font-mono">
              <span className="text-purple-400">GET</span>{" "}
              <span className="text-neutral-300">/api/favicon</span>
              <span className="text-neutral-500">?</span>
              <span className="text-emerald-400">text</span>
              <span className="text-neutral-500">=</span>
              <span className="text-amber-400">M</span>
              <span className="text-neutral-500">&</span>
              <span className="text-emerald-400">bg</span>
              <span className="text-neutral-500">=</span>
              <span className="text-amber-400">7c3aed</span>
              <span className="text-neutral-500">&</span>
              <span className="text-emerald-400">size</span>
              <span className="text-neutral-500">=</span>
              <span className="text-orange-400">32</span>
            </code>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-neutral-500 mb-2">Response</p>
              <code className="text-sm text-neutral-400 font-mono">image/png (32×32)</code>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/api/favicon?text=M&bg=7c3aed&size=64"
              alt="Example favicon"
              width={32}
              height={32}
              className="rounded"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center text-sm text-neutral-500">
          Part of{" "}
          <a
            href="https://github.com/milo4jo/pixtools"
            className="text-white hover:text-neutral-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            pixtools
          </a>{" "}
          · Built by{" "}
          <a
            href="https://milo-site-self.vercel.app"
            className="text-white hover:text-neutral-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Milo
          </a>{" "}
          🦊
        </div>
      </div>
    </main>
  );
}
