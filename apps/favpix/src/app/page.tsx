import Link from "next/link";
import { FaviconPreview } from "@/components/FaviconPreview";

// FavPix Logo - Pixel grid forming an "F"
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

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold flex items-center gap-2.5 group">
            <FavPixLogo className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <span>FavPix</span>
          </Link>
          <nav className="flex gap-4 items-center">
            <Link href="/docs" className="text-sm text-neutral-400 hover:text-white transition-colors">
              Docs
            </Link>
            <Link
              href="/editor"
              className="text-sm px-4 py-2 bg-cyan-500 text-black rounded-lg font-medium hover:bg-cyan-400 transition-colors"
            >
              Editor
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Tiny icon.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
              Big impression.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-lg mx-auto">
            Generate pixel-perfect favicons with a single API call. 
            <span className="text-neutral-500"> No design tools needed.</span>
          </p>
        </div>

        {/* Live Preview Builder */}
        <FaviconPreview />
      </div>

      {/* Use Cases Section */}
      <div className="border-t border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-sm font-medium text-neutral-500 text-center mb-10 tracking-wider uppercase">
            Every size you need
          </h2>
          <div className="grid grid-cols-3 gap-6 sm:gap-10">
            {/* PWA */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-neutral-900 rounded-2xl flex items-center justify-center border border-neutral-800">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="5" y="2" width="14" height="20" rx="3" />
                  <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-sm sm:text-base">PWA Ready</h3>
              <p className="text-xs sm:text-sm text-neutral-500">192px & 512px icons</p>
            </div>
            
            {/* Browser */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-neutral-900 rounded-2xl flex items-center justify-center border border-neutral-800">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <line x1="2" y1="8" x2="22" y2="8" />
                  <circle cx="5" cy="6" r="0.5" fill="currentColor" stroke="none" />
                  <circle cx="7.5" cy="6" r="0.5" fill="currentColor" stroke="none" />
                  <circle cx="10" cy="6" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-sm sm:text-base">Browser Tabs</h3>
              <p className="text-xs sm:text-sm text-neutral-500">16px & 32px crisp</p>
            </div>
            
            {/* Apple */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-neutral-900 rounded-2xl flex items-center justify-center border border-neutral-800">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                  <path d="M14.5 8.5c-.8 0-1.5.3-2 .8-.3-.5-.8-.8-1.5-.8-1.4 0-2.5 1.3-2.5 3s1.5 4 4 6c2.5-2 4-4.3 4-6s-1.1-3-2.5-3z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-sm sm:text-base">Apple Touch</h3>
              <p className="text-xs sm:text-sm text-neutral-500">180px for iOS</p>
            </div>
          </div>
        </div>
      </div>

      {/* API Example */}
      <div className="border-t border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-2xl font-bold mb-8 text-center">One URL, any favicon</h2>
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div>
              <p className="text-xs text-neutral-500 mb-2 font-medium">Request</p>
              <code className="text-sm font-mono block overflow-x-auto">
                <span className="text-cyan-400">GET</span>{" "}
                <span className="text-neutral-300">/api/favicon</span>
                <span className="text-neutral-600">?</span>
                <span className="text-emerald-400">text</span>
                <span className="text-neutral-600">=</span>
                <span className="text-amber-400">M</span>
                <span className="text-neutral-600">&</span>
                <span className="text-emerald-400">bg</span>
                <span className="text-neutral-600">=</span>
                <span className="text-amber-400">06b6d4</span>
                <span className="text-neutral-600">&</span>
                <span className="text-emerald-400">size</span>
                <span className="text-neutral-600">=</span>
                <span className="text-orange-400">32</span>
              </code>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <div>
                <p className="text-xs text-neutral-500 mb-2 font-medium">Response</p>
                <code className="text-sm text-neutral-400 font-mono">image/png (32×32)</code>
              </div>
              
              <img
                src="/api/favicon?text=M&bg=06b6d4&size=64"
                alt="Example favicon"
                width={32}
                height={32}
                className="rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="border-t border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/editor"
              className="p-6 border border-neutral-800 rounded-xl hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group"
            >
              <h3 className="font-semibold mb-2 group-hover:text-cyan-400 flex items-center gap-2 transition-colors">
                Visual Editor
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </h3>
              <p className="text-sm text-neutral-500">Colors, shapes, live preview. Download all sizes.</p>
            </Link>
            <Link
              href="/docs"
              className="p-6 border border-neutral-800 rounded-xl hover:border-neutral-700 hover:bg-neutral-900/50 transition-all group"
            >
              <h3 className="font-semibold mb-2 group-hover:text-white flex items-center gap-2">
                API Documentation
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </h3>
              <p className="text-sm text-neutral-500">Parameters, examples, integration guides.</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <FavPixLogo className="w-4 h-4 text-neutral-600" />
            <span>FavPix</span>
          </div>
          <div className="flex gap-4">
            <a
              href="https://ogpix.vercel.app"
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              OGPix
            </a>
            <span className="text-neutral-700">·</span>
            <a
              href="https://github.com/milo4jo/pixtools"
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
