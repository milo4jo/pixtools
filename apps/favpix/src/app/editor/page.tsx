"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export default function EditorPage() {
  const [text, setText] = useState("M");
  const [bg, setBg] = useState("000000");
  const [color, setColor] = useState("ffffff");
  const [size, setSize] = useState(128);
  const [shape, setShape] = useState<"square" | "circle" | "rounded">("rounded");

  const faviconUrl = useMemo(() => {
    const params = new URLSearchParams({
      text,
      bg,
      color,
      size: size.toString(),
      shape,
    });
    return `/api/favicon?${params}`;
  }, [text, bg, color, size, shape]);

  const copyUrl = () => {
    const fullUrl = `${window.location.origin}${faviconUrl}`;
    navigator.clipboard.writeText(fullUrl);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">🎨 FavPix</Link>
          <nav className="flex gap-4">
            <Link href="/docs" className="text-gray-400 hover:text-white">Docs</Link>
          </nav>
        </div>
      </header>

      {/* Main Editor */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Favicon Editor</h1>

            {/* Text Input */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Text / Emoji</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 3))}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-white focus:outline-none"
                placeholder="M"
                maxLength={3}
              />
            </div>

            {/* Shape Selector */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Shape</label>
              <div className="flex gap-2">
                {(["square", "rounded", "circle"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setShape(s)}
                    className={`px-4 py-2 rounded-lg border ${
                      shape === s
                        ? "border-white bg-white text-black"
                        : "border-gray-700 hover:border-gray-500"
                    }`}
                  >
                    {s === "square" ? "■" : s === "rounded" ? "▢" : "●"} {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Background</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={`#${bg}`}
                    onChange={(e) => setBg(e.target.value.replace("#", ""))}
                    className="w-12 h-12 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={bg}
                    onChange={(e) => setBg(e.target.value.replace("#", ""))}
                    className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-white focus:outline-none font-mono"
                    maxLength={6}
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
                    className="w-12 h-12 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value.replace("#", ""))}
                    className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-white focus:outline-none font-mono"
                    maxLength={6}
                  />
                </div>
              </div>
            </div>

            {/* API URL */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">API URL</label>
              <div className="flex gap-2">
                <code className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-green-400 text-sm overflow-x-auto">
                  {faviconUrl}
                </code>
                <button
                  onClick={copyUrl}
                  className="px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Preview</h2>

            {/* Large Preview */}
            <div className="bg-gray-900 rounded-xl p-8 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={faviconUrl.replace(size.toString(), "256")}
                alt="Favicon preview"
                width={256}
                height={256}
                className="rounded-lg"
              />
            </div>

            {/* Size Previews */}
            <div className="flex items-end gap-4 justify-center">
              {[16, 32, 48, 64, 128].map((s) => (
                <div key={s} className="text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/api/favicon?text=${text}&bg=${bg}&color=${color}&shape=${shape}&size=${s}`}
                    alt={`${s}px`}
                    width={s}
                    height={s}
                    className="rounded"
                  />
                  <span className="text-xs text-gray-500 mt-1 block">{s}px</span>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex gap-2">
              <a
                href={`${faviconUrl}&size=32`}
                download="favicon.png"
                className="flex-1 px-4 py-3 bg-white text-black font-semibold rounded-lg text-center hover:bg-gray-200"
              >
                Download PNG
              </a>
              <a
                href={`${faviconUrl}&format=svg`}
                download="favicon.svg"
                className="flex-1 px-4 py-3 border border-gray-700 rounded-lg text-center hover:border-gray-500"
              >
                Download SVG
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
