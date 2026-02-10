"use client";

import Link from "next/link";

interface ProBannerProps {
  usage?: number;
  limit?: number;
  variant?: "subtle" | "prominent";
}

export function ProBanner({ usage = 0, limit = 500, variant = "subtle" }: ProBannerProps) {
  const usagePercent = limit > 0 ? Math.round((usage / limit) * 100) : 0;
  const isHighUsage = usagePercent >= 70;
  
  // Show different messages based on usage
  const message = isHighUsage
    ? `${usagePercent}% of your monthly limit used. Go Pro for unlimited.`
    : "Remove watermarks & get unlimited images with Pro.";

  if (variant === "prominent" && isHighUsage) {
    return (
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 border border-neutral-700 rounded-xl p-4 sm:p-5 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-medium text-white mb-1">Running low on images?</p>
            <p className="text-sm text-neutral-400">{message}</p>
          </div>
          <Link
            href="/dashboard/billing"
            className="shrink-0 px-5 py-2.5 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors text-center text-sm"
          >
            Upgrade to Pro
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Link
      href="/dashboard/billing"
      className="block p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:border-neutral-600 transition-colors group mb-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg">✨</span>
          <span className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
            {message}
          </span>
        </div>
        <svg 
          className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
