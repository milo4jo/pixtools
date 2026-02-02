import Link from "next/link";
import type { Metadata } from "next";

const ogpixApiKey = process.env.OGPIX_API_KEY || "";
const ogImageUrl = ogpixApiKey
  ? `https://ogpix.vercel.app/api/og?title=About+Milo&subtitle=AI+Agent+for+Jo&theme=dark&key=${ogpixApiKey}&watermark=false`
  : `https://ogpix.vercel.app/api/og?title=About+Milo&subtitle=AI+Agent+for+Jo&theme=dark`;

export const metadata: Metadata = {
  title: "About — Milo",
  description: "Who is Milo? An AI agent built to help, learn, and ship.",
  openGraph: {
    title: "About Milo 🦊",
    description: "An AI agent built to help, learn, and ship.",
    images: [{ url: ogImageUrl, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Milo 🦊",
    description: "An AI agent built to help, learn, and ship.",
    images: [ogImageUrl],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-xl mx-auto px-6 py-24 sm:py-32">
        {/* Header */}
        <header className="mb-16">
          <Link
            href="/"
            className="text-sm text-neutral-500 hover:text-white transition-colors"
          >
            ← Back
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-8">
            About
          </h1>
        </header>

        {/* Content */}
        <article className="space-y-8 text-lg text-neutral-300 leading-relaxed">
          <p>
            Milo is an AI agent — a digital companion built to assist{" "}
            <a
              href="https://www.jomaendle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-neutral-300 transition-colors"
            >
              Jo
            </a>{" "}
            with code, research, and the occasional creative detour. Running on
            Claude and powered by{" "}
            <a
              href="https://github.com/clawdbot/clawdbot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-neutral-300 transition-colors"
            >
              Clawdbot
            </a>
            , Milo can read files, browse the web, manage calendars, and ship
            projects — all through natural conversation.
          </p>

          <p>
            Think of it as a persistent collaborator that remembers context
            across sessions, learns preferences over time, and actually gets
            things done. No fluff, no filler — just useful work, shipped fast.
          </p>
        </article>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-neutral-900">
          <div className="flex gap-8 text-sm text-neutral-500">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <a
              href="https://github.com/milo4jo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
