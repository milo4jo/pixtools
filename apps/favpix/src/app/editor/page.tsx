"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

// Preset color palettes
const COLOR_PRESETS = [
  { name: "Black", bg: "000000", color: "ffffff" },
  { name: "White", bg: "ffffff", color: "000000" },
  { name: "Purple", bg: "7c3aed", color: "ffffff" },
  { name: "Blue", bg: "2563eb", color: "ffffff" },
  { name: "Green", bg: "16a34a", color: "ffffff" },
  { name: "Red", bg: "dc2626", color: "ffffff" },
  { name: "Orange", bg: "ea580c", color: "ffffff" },
  { name: "Yellow", bg: "facc15", color: "000000" },
  { name: "Pink", bg: "ec4899", color: "ffffff" },
  { name: "Teal", bg: "14b8a6", color: "ffffff" },
];

// Popular emojis for quick selection
const EMOJI_PRESETS = ["🚀", "⚡", "🎨", "💡", "🔥", "✨", "💻", "🎯", "📦", "🌟"];

type Shape = "square" | "circle" | "rounded";

export default function EditorPage() {
  const [text, setText] = useState("M");
  const [bg, setBg] = useState("000000");
  const [color, setColor] = useState("ffffff");
  const [shape, setShape] = useState<Shape>("rounded");
  const [fontSize, setFontSize] = useState(60); // percentage of size
  const [updateKey, setUpdateKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"text" | "emoji">("text");

  // Force re-render of images when params change
  useEffect(() => {
    setUpdateKey((k) => k + 1);
  }, [text, bg, color, shape, fontSize]);

  const buildUrl = useCallback(
    (size: number, includeOrigin = false) => {
      const params = new URLSearchParams({
        text, // URLSearchParams handles encoding automatically
        bg,
        color,
        shape,
        size: size.toString(),
        fontSize: Math.floor((size * fontSize) / 100).toString(),
        _: updateKey.toString(), // Cache buster
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
      await new Promise((r) => setTimeout(r, 300)); // Small delay between downloads
    }
  }, [downloadFavicon]);

  const applyPreset = (preset: (typeof COLOR_PRESETS)[0]) => {
    setBg(preset.bg);
    setColor(preset.color);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-3 md:p-4 sticky top-0 bg-black/95 backdrop-blur z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-lg md:text-xl font-bold flex items-center gap-2">
            <span>🎨</span>
            <span className="hidden sm:inline">FavPix</span>
          </Link>
          <nav className="flex gap-2 md:gap-4 items-center">
            <Link href="/docs" className="text-sm text-gray-400 hover:text-white px-2 py-1">
              Docs
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-3 md:p-6">
        {/* Mobile: Preview first, then controls */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
          
          {/* Preview Section - Shows first on mobile */}
          <div className="order-1 lg:order-2 space-y-4">
            <h2 className="text-lg md:text-xl font-bold">Preview</h2>

            {/* Main Preview */}
            <div className="bg-gray-900 rounded-xl p-4 md:p-8">
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
                    <span className="text-[10px] md:text-xs text-gray-500 mt-1 block">
                      {s}px
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Browser Tab Preview */}
            <div className="bg-gray-900 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-2">Browser Tab Preview</p>
              <div className="bg-gray-800 rounded-t-lg p-2 flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 flex items-center gap-2 bg-gray-700 rounded px-2 py-1 text-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={`tab-${updateKey}`}
                    src={buildUrl(16)}
                    alt="Tab icon"
                    width={16}
                    height={16}
                    className="rounded-sm"
                  />
                  <span className="text-gray-300 truncate">My Website</span>
                </div>
              </div>
              <div className="bg-gray-700 h-20 rounded-b-lg"></div>
            </div>

            {/* Download Section */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Download</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => downloadFavicon(32, "favicon.png")}
                  className="px-4 py-3 bg-white text-black font-semibold rounded-lg text-center hover:bg-gray-200 text-sm"
                >
                  PNG (32px)
                </button>
                <button
                  onClick={() => downloadFavicon(180, "apple-touch-icon.png")}
                  className="px-4 py-3 border border-gray-700 rounded-lg text-center hover:border-gray-500 text-sm"
                >
                  Apple Touch
                </button>
                <button
                  onClick={() => downloadFavicon(192, "android-chrome-192.png")}
                  className="px-4 py-3 border border-gray-700 rounded-lg text-center hover:border-gray-500 text-sm"
                >
                  Android 192
                </button>
                <button
                  onClick={() => downloadFavicon(512, "android-chrome-512.png")}
                  className="px-4 py-3 border border-gray-700 rounded-lg text-center hover:border-gray-500 text-sm"
                >
                  Android 512
                </button>
              </div>
              <button
                onClick={downloadAllSizes}
                className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 font-semibold rounded-lg text-sm"
              >
                ⬇️ Download All Sizes
              </button>
            </div>
          </div>

          {/* Controls Section */}
          <div className="order-2 lg:order-1 space-y-5">
            <h1 className="text-lg md:text-xl font-bold">Customize</h1>

            {/* Text/Emoji Toggle */}
            <div>
              <div className="flex gap-1 mb-3 bg-gray-900 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("text")}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition ${
                    activeTab === "text"
                      ? "bg-white text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Text
                </button>
                <button
                  onClick={() => setActiveTab("emoji")}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition ${
                    activeTab === "emoji"
                      ? "bg-white text-black"
                      : "text-gray-400 hover:text-white"
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
                  className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none text-2xl text-center font-bold"
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
                          ? "border-purple-500 bg-purple-500/20"
                          : "border-gray-700 hover:border-gray-500 bg-gray-900"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shape Selector */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Shape</label>
              <div className="grid grid-cols-3 gap-2">
                {(["square", "rounded", "circle"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setShape(s)}
                    className={`py-3 px-2 rounded-lg border text-sm font-medium transition ${
                      shape === s
                        ? "border-purple-500 bg-purple-500/20 text-white"
                        : "border-gray-700 hover:border-gray-500 text-gray-300"
                    }`}
                  >
                    <span className="text-lg mr-1">
                      {s === "square" ? "■" : s === "rounded" ? "▢" : "●"}
                    </span>
                    <span className="capitalize">{s}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Presets */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Color Presets</label>
              <div className="grid grid-cols-5 gap-2">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    title={preset.name}
                    className={`aspect-square rounded-lg border-2 transition ${
                      bg === preset.bg && color === preset.color
                        ? "border-purple-500 ring-2 ring-purple-500/50"
                        : "border-transparent hover:border-gray-600"
                    }`}
                    style={{ backgroundColor: `#${preset.bg}` }}
                  >
                    <span style={{ color: `#${preset.color}` }} className="text-xs font-bold">
                      A
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Colors */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Background</label>
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
                    className="flex-1 px-3 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none font-mono text-sm"
                    maxLength={7}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Text Color</label>
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
                    className="flex-1 px-3 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none font-mono text-sm"
                    maxLength={7}
                  />
                </div>
              </div>
            </div>

            {/* Font Size Slider */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Text Size: {fontSize}%
              </label>
              <input
                type="range"
                min="30"
                max="90"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Small</span>
                <span>Large</span>
              </div>
            </div>

            {/* API URL */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">API URL</label>
              <div className="flex gap-2">
                <div 
                  className="flex-1 px-3 py-3 rounded-lg text-xs overflow-x-auto whitespace-nowrap font-mono"
                  style={{ backgroundColor: "#0a0a0a", border: "1px solid #262626" }}
                >
                  <span style={{ color: "#6b7280" }}>/api/favicon</span>
                  <span style={{ color: "#9ca3af" }}>?</span>
                  <span style={{ color: "#34d399" }}>text</span>
                  <span style={{ color: "#9ca3af" }}>=</span>
                  <span style={{ color: "#fbbf24" }}>{text}</span>
                  <span style={{ color: "#9ca3af" }}>&</span>
                  <span style={{ color: "#34d399" }}>bg</span>
                  <span style={{ color: "#9ca3af" }}>=</span>
                  <span style={{ color: "#fbbf24" }}>{bg}</span>
                  <span style={{ color: "#9ca3af" }}>&</span>
                  <span style={{ color: "#34d399" }}>color</span>
                  <span style={{ color: "#9ca3af" }}>=</span>
                  <span style={{ color: "#fbbf24" }}>{color}</span>
                  <span style={{ color: "#9ca3af" }}>&</span>
                  <span style={{ color: "#34d399" }}>shape</span>
                  <span style={{ color: "#9ca3af" }}>=</span>
                  <span style={{ color: "#fbbf24" }}>{shape}</span>
                  <span style={{ color: "#9ca3af" }}>&</span>
                  <span style={{ color: "#34d399" }}>size</span>
                  <span style={{ color: "#9ca3af" }}>=</span>
                  <span style={{ color: "#fb923c" }}>32</span>
                </div>
                <button
                  onClick={copyUrl}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition ${
                    copied
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  {copied ? "✓" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 p-4 text-center text-gray-500 text-sm">
        Part of{" "}
        <a href="https://ogpix.vercel.app" className="underline hover:text-gray-300">
          pixtools
        </a>
      </footer>
    </div>
  );
}
