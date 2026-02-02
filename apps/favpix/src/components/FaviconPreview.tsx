"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

// Color presets matching the editor
const colorPresets = [
  { id: "black", bg: "000000", color: "ffffff" },
  { id: "purple", bg: "7c3aed", color: "ffffff" },
  { id: "blue", bg: "2563eb", color: "ffffff" },
  { id: "green", bg: "16a34a", color: "ffffff" },
  { id: "orange", bg: "ea580c", color: "ffffff" },
];

export function FaviconPreview() {
  const [text, setText] = useState("M");
  const [preset, setPreset] = useState(colorPresets[1]); // Purple default
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");
  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    setUpdateKey((k) => k + 1);
  }, [text, preset]);

  const imageUrl = useMemo(() => {
    const params = new URLSearchParams({
      text,
      bg: preset.bg,
      color: preset.color,
      shape: "rounded",
      size: "256",
      _: updateKey.toString(),
    });
    return `/api/favicon?${params}`;
  }, [text, preset, updateKey]);

  const fullUrl = useMemo(() => {
    if (!origin) return "";
    const params = new URLSearchParams({
      text,
      bg: preset.bg,
      color: preset.color,
      shape: "rounded",
      size: "32",
    });
    return `${origin}/api/favicon?${params}`;
  }, [origin, text, preset]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Preview */}
      <div className="mb-8">
        <div className="border border-neutral-800 rounded-xl p-8 flex items-center justify-center bg-neutral-900/50">
          <div className="flex items-center gap-8">
            {/* Main preview */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={`main-${updateKey}`}
              src={imageUrl}
              alt="Favicon preview"
              width={128}
              height={128}
              className="rounded-xl"
            />
            
            {/* Size variants */}
            <div className="flex flex-col gap-3 items-center">
              {[64, 32, 16].map((size) => (
                <div key={size} className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={`${size}-${updateKey}`}
                    src={`/api/favicon?text=${encodeURIComponent(text)}&bg=${preset.bg}&color=${preset.color}&shape=rounded&size=${size}&_=${updateKey}`}
                    alt={`${size}px`}
                    width={size}
                    height={size}
                    className="rounded"
                  />
                  <span className="text-xs text-neutral-500 w-8">{size}px</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        {/* Text Input */}
        <div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 3))}
            className="w-full bg-transparent border-b border-neutral-800 py-3 text-2xl sm:text-3xl font-bold text-white text-center focus:outline-none focus:border-neutral-600 placeholder:text-neutral-600"
            placeholder="Enter text or emoji"
            maxLength={3}
          />
        </div>

        {/* Color Presets */}
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm text-neutral-500">Color</span>
          <div className="flex gap-2">
            {colorPresets.map((p) => (
              <button
                key={p.id}
                onClick={() => setPreset(p)}
                className={`w-8 h-8 rounded-full transition-all ${
                  preset.id === p.id ? "ring-2 ring-white ring-offset-2 ring-offset-black" : ""
                }`}
                style={{ backgroundColor: `#${p.bg}` }}
              />
            ))}
            <Link
              href="/editor"
              className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-700 transition-colors text-xs"
              title="More options"
            >
              +
            </Link>
          </div>
        </div>

        {/* URL + Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 flex items-center gap-2">
            <code className="text-sm text-neutral-300 truncate flex-1 font-mono">
              {fullUrl || "/api/favicon?text=M&bg=7c3aed&size=32"}
            </code>
            <button
              onClick={handleCopy}
              className="shrink-0 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <Link
            href="/editor"
            className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors text-center"
          >
            Open Editor
          </Link>
        </div>
      </div>
    </div>
  );
}
