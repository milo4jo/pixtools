import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FavPix - Favicon Generator | PixTools",
  description: "Generate favicons from emoji or text. All sizes, all formats, one click.",
};

export default function FavPixPage() {
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
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-amber-400">
            FavPix
          </h1>
          <p className="text-xl text-neutral-400 mb-8">
            Favicon Generator
          </p>
          <p className="text-neutral-300 leading-relaxed max-w-2xl">
            Turn any emoji or text into a complete favicon package. 
            Get all the sizes you need: ICO, PNG, Apple Touch, and more. 
            Download a ZIP with everything ready to drop into your project.
          </p>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold text-amber-400 mb-1">Emoji</div>
            <div className="text-neutral-500">Any character</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-400 mb-1">All Sizes</div>
            <div className="text-neutral-500">16px to 512px</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-400 mb-1">Free</div>
            <div className="text-neutral-500">No limits</div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://favpix.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 rounded-lg font-medium transition-colors"
          >
            Open App
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
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
