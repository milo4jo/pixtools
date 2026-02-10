"use client";

import Link from "next/link";

interface ProBannerProps {
  variant?: "inline" | "sticky";
}

export function ProBanner({ variant = "inline" }: ProBannerProps) {
  if (variant === "sticky") {
    return (
      <div className="fixed bottom-4 right-4 z-40 max-w-xs">
        <Link
          href="/#pricing"
          className="block p-4 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl shadow-xl hover:shadow-2xl transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl">
              ✨
            </div>
            <div>
              <div className="font-semibold text-white text-sm">
                Upgrade to Pro
              </div>
              <div className="text-xs text-white/70">
                Unlimited images, no watermark
              </div>
            </div>
            <svg
              className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 transition-transform ml-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
      </div>
    );
  }

  // Inline variant
  return (
    <Link
      href="/#pricing"
      className="block p-5 bg-gradient-to-r from-violet-600/10 to-pink-600/10 border border-violet-500/20 rounded-xl hover:border-violet-500/40 transition-colors group"
    >
      <div className="flex items-center gap-4">
        <div className="shrink-0 w-12 h-12 bg-gradient-to-br from-violet-600 to-pink-600 rounded-xl flex items-center justify-center text-2xl">
          ✨
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-white flex items-center gap-2">
            Upgrade to Pro
            <span className="text-xs bg-violet-500/30 text-violet-300 px-2 py-0.5 rounded-full">
              $9/mo
            </span>
          </div>
          <div className="text-sm text-neutral-400 mt-0.5">
            Unlimited images • No watermark • Priority support
          </div>
        </div>
        <svg
          className="w-5 h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}
