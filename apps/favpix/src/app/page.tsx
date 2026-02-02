import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Hero */}
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">
          🎨 FavPix
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          One API. Every favicon format.
        </p>
        
        {/* Preview Icons */}
        <div className="flex justify-center gap-4 mb-12">
          {["M", "🚀", "⚡", "JS"].map((text, i) => (
            <div
              key={i}
              className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold"
              style={{
                background: ["#000", "#7c3aed", "#f59e0b", "#facc15"][i],
                color: i === 3 ? "#000" : "#fff",
              }}
            >
              {text}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center mb-16">
          <Link
            href="/editor"
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
          >
            Try the Editor
          </Link>
          <Link
            href="/docs"
            className="px-6 py-3 border border-gray-700 rounded-lg hover:border-gray-500 transition"
          >
            View API Docs
          </Link>
        </div>

        {/* API Example */}
        <div className="bg-gray-900 rounded-xl p-6 text-left">
          <p className="text-gray-500 text-sm mb-2">API Example</p>
          <code className="text-green-400 text-sm break-all">
            GET /api/favicon?text=M&bg=7c3aed&color=fff&size=32
          </code>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-8 text-gray-600 text-sm">
        Part of{" "}
        <a href="https://ogpix.vercel.app" className="underline hover:text-gray-400">
          pixtools
        </a>
      </footer>
    </main>
  );
}
