"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

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

// Shape icons as SVG
function ShapeIcon({ shape, className = "w-5 h-5" }: { shape: "square" | "rounded" | "circle"; className?: string }) {
  if (shape === "square") {
    return (
      <svg className={className} viewBox="0 0 20 20" fill="currentColor">
        <rect x="3" y="3" width="14" height="14" rx="1"/>
      </svg>
    );
  }
  if (shape === "rounded") {
    return (
      <svg className={className} viewBox="0 0 20 20" fill="currentColor">
        <rect x="3" y="3" width="14" height="14" rx="4"/>
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <circle cx="10" cy="10" r="7"/>
    </svg>
  );
}

// Creative color presets
const COLOR_PRESETS = [
  { name: "Midnight", bg: "000000", color: "ffffff" },
  { name: "Arctic", bg: "ffffff", color: "000000" },
  { name: "Ultraviolet", bg: "7c3aed", color: "ffffff" },
  { name: "Ocean", bg: "0ea5e9", color: "ffffff" },
  { name: "Forest", bg: "16a34a", color: "ffffff" },
  { name: "Ember", bg: "dc2626", color: "ffffff" },
  { name: "Sunset", bg: "ea580c", color: "ffffff" },
  { name: "Lemon", bg: "facc15", color: "000000" },
  { name: "Sakura", bg: "ec4899", color: "ffffff" },
  { name: "Lagoon", bg: "14b8a6", color: "ffffff" },
];

// Popular emojis for quick selection
const EMOJI_PRESETS = ["🚀", "⚡", "🎨", "💡", "🔥", "✨", "💻", "🎯", "📦", "🌟"];

type Shape = "square" | "circle" | "rounded";

export default function EditorPage() {
  const [text, setText] = useState("M");
  const [bg, setBg] = useState("06b6d4"); // Cyan default
  const [color, setColor] = useState("000000");
  const [shape, setShape] = useState<Shape>("rounded");
  const [fontSize, setFontSize] = useState(60);
  const [updateKey, setUpdateKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"text" | "emoji">("text");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setUpdateKey((k) => k + 1);
  }, [text, bg, color, shape, fontSize]);

  const buildUrl = useCallback(
    (size: number, includeOrigin = false) => {
      const params = new URLSearchParams({
        text,
        bg,
        color,
        shape,
        size: size.toString(),
        fontSize: Math.floor((size * fontSize) / 100).toString(),
        _: updateKey.toString(),
      });
      const path = `/api/favicon?${params}`;
      if (includeOrigin && typeof window !== "undefined") {
        return `${window.location.origin}${path}`;
      }
      return path;
    },
    [text, bg, color, shape, fontSize, updateKey]
  );

  const copyUrl = useCallback(async () => {
    if (typeof window === "undefined") return;
    const baseUrl = `${window.location.origin}${buildUrl(32)}`.replace(`&_=${updateKey}`, "");
    await navigator.clipboard.writeText(baseUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [buildUrl, updateKey]);

  const downloadFavicon = useCallback(
    async (size: number, filename: string) => {
      const url = buildUrl(size);
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(downloadUrl);
    },
    [buildUrl]
  );

  const downloadAllSizes = useCallback(async () => {
    setDownloading(true);
    const sizes = [
      { size: 16, name: "favicon-16x16.png" },
      { size: 32, name: "favicon-32x32.png" },
      { size: 48, name: "favicon-48x48.png" },
      { size: 180, name: "apple-touch-icon.png" },
      { size: 192, name: "android-chrome-192x192.png" },
      { size: 512, name: "android-chrome-512x512.png" },
    ];

    for (const { size, name } of sizes) {
      await downloadFavicon(size, name);
      await new Promise((r) => setTimeout(r, 300));
    }
    setDownloading(false);
  }, [downloadFavicon]);

  const applyPreset = (preset: (typeof COLOR_PRESETS)[0]) => {
    setBg(preset.bg);
    setColor(preset.color);
  };

  // Find current preset name (if matches)
  const currentPreset = COLOR_PRESETS.find(p => p.bg === bg && p.color === color);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 p-3 md:p-4 sticky top-0 bg-black/95 backdrop-blur z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-lg md:text-xl font-bold flex items-center gap-2.5 group">
            <FavPixLogo className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <span className="hidden sm:inline">FavPix</span>
          </Link>
          <nav className="flex gap-2 md:gap-4 items-center">
            <Link href="/docs" className="text-sm text-neutral-400 hover:text-white px-2 py-1 transition-colors">
              Docs
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-3 md:p-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
          
          {/* Preview Section */}
          <div className="order-1 lg:order-2 space-y-4">
            <h2 className="text-lg md:text-xl font-bold">Preview</h2>

            {/* Main Preview */}
            <div className="bg-neutral-900 rounded-xl p-4 md:p-8 border border-neutral-800">
              {/* Large preview */}
              <div className="flex justify-center mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={`main-${updateKey}`}
                  src={buildUrl(256)}
                  alt="Favicon preview"
                  width={160}
                  height={160}
                  className="rounded-lg md:w-[200px] md:h-[200px]"
                />
              </div>

              {/* Size previews */}
              <div className="flex items-end justify-center gap-3 md:gap-4 flex-wrap">
                {[16, 32, 48, 64, 128].map((s) => (
                  <div key={s} className="text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={`${s}-${updateKey}`}
                      src={buildUrl(s)}
                      alt={`${s}px`}
                      width={s}
                      height={s}
                      className="rounded mx-auto"
                      style={{ imageRendering: s <= 32 ? "pixelated" : "auto" }}
                    />
                    <span className="text-[10px] md:text-xs text-neutral-500 mt-1 block">
                      {s}px
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Browser Tab Preview */}
            <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
              <p className="text-xs text-neutral-500 mb-2 font-medium">Browser Tab Preview</p>
              <div className="bg-neutral-800 rounded-t-lg p-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex-1 flex items-center gap-2 bg-neutral-700 rounded px-2.5 py-1.5 text-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={`tab-${updateKey}`}
                    src={buildUrl(16)}
                    alt="Tab icon"
                    width={16}
                    height={16}
                    className="rounded-sm"
                  />
                  <span className="text-neutral-300 truncate">My Website</span>
                </div>
              </div>
              <div className="bg-neutral-700 h-16 rounded-b-lg"></div>
            </div>

            {/* Primary Download CTA */}
            <button
              onClick={downloadAllSizes}
              disabled={downloading}
              className="w-full px-6 py-4 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 text-black font-semibold rounded-xl text-base transition-colors flex items-center justify-center gap-2"
            >
              {downloading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Downloading...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="7,10 12,15 17,10" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round"/>
                  </svg>
                  Download Favicon Pack
                </>
              )}
            </button>

            {/* Individual sizes dropdown */}
            <details className="group">
              <summary className="text-sm text-neutral-500 cursor-pointer hover:text-neutral-300 transition-colors flex items-center gap-1">
                <svg className="w-4 h-4 group-open:rotate-90 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,6 15,12 9,18" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download individual sizes
              </summary>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <button onClick={() => downloadFavicon(32, "favicon-32x32.png")} className="px-3 py-2.5 border border-neutral-800 rounded-lg text-sm hover:border-neutral-600 hover:bg-neutral-900 transition-colors">
                  32px (Browser)
                </button>
                <button onClick={() => downloadFavicon(16, "favicon-16x16.png")} className="px-3 py-2.5 border border-neutral-800 rounded-lg text-sm hover:border-neutral-600 hover:bg-neutral-900 transition-colors">
                  16px (Tiny)
                </button>
                <button onClick={() => downloadFavicon(180, "apple-touch-icon.png")} className="px-3 py-2.5 border border-neutral-800 rounded-lg text-sm hover:border-neutral-600 hover:bg-neutral-900 transition-colors">
                  180px (Apple)
                </button>
                <button onClick={() => downloadFavicon(512, "android-chrome-512x512.png")} className="px-3 py-2.5 border border-neutral-800 rounded-lg text-sm hover:border-neutral-600 hover:bg-neutral-900 transition-colors">
                  512px (Android)
                </button>
              </div>
            </details>
          </div>

          {/* Controls Section */}
          <div className="order-2 lg:order-1 space-y-5">
            <h1 className="text-lg md:text-xl font-bold">Create your favicon</h1>

            {/* Text/Emoji Toggle */}
            <div>
              <div className="flex gap-1 mb-3 bg-neutral-900 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("text")}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition ${
                    activeTab === "text"
                      ? "bg-cyan-500 text-black"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Text
                </button>
                <button
                  onClick={() => setActiveTab("emoji")}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition ${
                    activeTab === "emoji"
                      ? "bg-cyan-500 text-black"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Emoji
                </button>
              </div>

              {activeTab === "text" ? (
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, 3))}
                  className="w-full px-4 py-4 bg-neutral-900 border border-neutral-800 rounded-lg focus:border-cyan-500 focus:outline-none text-2xl text-center font-bold transition-colors"
                  placeholder="M"
                  maxLength={3}
                />
              ) : (
                <div className="grid grid-cols-5 gap-2">
                  {EMOJI_PRESETS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setText(emoji)}
                      className={`p-3 text-2xl rounded-lg border transition ${
                        text === emoji
                          ? "border-cyan-500 bg-cyan-500/10"
                          : "border-neutral-800 hover:border-neutral-600 bg-neutral-900"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shape Selector with SVG icons */}
            <div>
              <label className="block text-sm text-neutral-400 mb-2">Shape</label>
              <div className="grid grid-cols-3 gap-2">
                {(["square", "rounded", "circle"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setShape(s)}
                    className={`py-3 px-3 rounded-lg border text-sm font-medium transition flex items-center justify-center gap-2 ${
                      shape === s
                        ? "border-cyan-500 bg-cyan-500/10 text-white"
                        : "border-neutral-800 hover:border-neutral-600 text-neutral-400"
                    }`}
                  >
                    <ShapeIcon shape={s} className={`w-5 h-5 ${shape === s ? "text-cyan-400" : ""}`} />
                    <span className="capitalize">{s}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Presets with Names */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm text-neutral-400">Colors</label>
                {currentPreset && (
                  <span className="text-xs text-cyan-400 font-medium">{currentPreset.name}</span>
                )}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    title={preset.name}
                    className={`aspect-square rounded-lg border-2 transition relative group ${
                      bg === preset.bg && color === preset.color
                        ? "border-cyan-500 ring-2 ring-cyan-500/30"
                        : "border-transparent hover:border-neutral-600"
                    }`}
                    style={{ backgroundColor: `#${preset.bg}` }}
                  >
                    <span style={{ color: `#${preset.color}` }} className="text-xs font-bold">
                      A
                    </span>
                    {/* Tooltip */}
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Colors */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Background</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={`#${bg}`}
                    onChange={(e) => setBg(e.target.value.replace("#", ""))}
                    className="w-14 h-14 rounded-lg cursor-pointer border-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={`#${bg}`}
                    onChange={(e) => setBg(e.target.value.replace("#", ""))}
                    className="flex-1 px-3 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:border-cyan-500 focus:outline-none font-mono text-sm transition-colors"
                    maxLength={7}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Text Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={`#${color}`}
                    onChange={(e) => setColor(e.target.value.replace("#", ""))}
                    className="w-14 h-14 rounded-lg cursor-pointer border-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={`#${color}`}
                    onChange={(e) => setColor(e.target.value.replace("#", ""))}
                    className="flex-1 px-3 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:border-cyan-500 focus:outline-none font-mono text-sm transition-colors"
                    maxLength={7}
                  />
                </div>
              </div>
            </div>

            {/* Font Size Slider */}
            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Text Size <span className="text-neutral-600">({fontSize}%)</span>
              </label>
              <input
                type="range"
                min="30"
                max="90"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-xs text-neutral-600 mt-1">
                <span>Small</span>
                <span>Large</span>
              </div>
            </div>

            {/* API URL */}
            <div>
              <label className="block text-sm text-neutral-400 mb-2">API URL</label>
              <div className="flex gap-2">
                <div 
                  className="flex-1 px-3 py-3 rounded-lg text-xs overflow-x-auto whitespace-nowrap font-mono bg-neutral-950 border border-neutral-800"
                >
                  <span className="text-neutral-600">/api/favicon</span>
                  <span className="text-neutral-700">?</span>
                  <span className="text-emerald-400">text</span>
                  <span className="text-neutral-700">=</span>
                  <span className="text-amber-400">{text}</span>
                  <span className="text-neutral-700">&</span>
                  <span className="text-emerald-400">bg</span>
                  <span className="text-neutral-700">=</span>
                  <span className="text-amber-400">{bg}</span>
                  <span className="text-neutral-700">&</span>
                  <span className="text-emerald-400">color</span>
                  <span className="text-neutral-700">=</span>
                  <span className="text-amber-400">{color}</span>
                  <span className="text-neutral-700">&</span>
                  <span className="text-emerald-400">shape</span>
                  <span className="text-neutral-700">=</span>
                  <span className="text-amber-400">{shape}</span>
                </div>
                <button
                  onClick={copyUrl}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition flex items-center gap-1 ${
                    copied
                      ? "bg-cyan-500 text-black"
                      : "bg-neutral-800 hover:bg-neutral-700"
                  }`}
                >
                  {copied ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    "Copy"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800 p-4 text-center text-neutral-500 text-sm">
        <Link href="/" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
          <FavPixLogo className="w-3.5 h-3.5" />
          FavPix
        </Link>
        <span className="text-neutral-700 mx-2">·</span>
        Part of{" "}
        <a href="https://github.com/milo4jo/pixtools" className="hover:text-white transition-colors">
          pixtools
        </a>
      </footer>
    </div>
  );
}
