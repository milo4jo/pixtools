import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">🎨 FavPix</Link>
          <nav className="flex gap-4">
            <Link href="/editor" className="text-gray-400 hover:text-white">Editor</Link>
          </nav>
        </div>
      </header>

      {/* Docs Content */}
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">API Documentation</h1>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
          <p className="text-gray-400 mb-4">
            Generate a favicon with a single HTTP request:
          </p>
          <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <code className="text-green-400">
              GET /api/favicon?text=M&bg=7c3aed&color=fff&size=32
            </code>
          </pre>
        </section>

        {/* Parameters */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Parameters</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-3 pr-4">Parameter</th>
                  <th className="py-3 pr-4">Type</th>
                  <th className="py-3 pr-4">Default</th>
                  <th className="py-3">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-gray-800">
                  <td className="py-3 pr-4 font-mono text-white">text</td>
                  <td className="py-3 pr-4">string</td>
                  <td className="py-3 pr-4">&quot;F&quot;</td>
                  <td className="py-3">Text or emoji (max 3 chars)</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 pr-4 font-mono text-white">bg</td>
                  <td className="py-3 pr-4">hex</td>
                  <td className="py-3 pr-4">000000</td>
                  <td className="py-3">Background color</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 pr-4 font-mono text-white">color</td>
                  <td className="py-3 pr-4">hex</td>
                  <td className="py-3 pr-4">ffffff</td>
                  <td className="py-3">Text color</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 pr-4 font-mono text-white">size</td>
                  <td className="py-3 pr-4">number</td>
                  <td className="py-3 pr-4">32</td>
                  <td className="py-3">Size in pixels (16-512)</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 pr-4 font-mono text-white">shape</td>
                  <td className="py-3 pr-4">string</td>
                  <td className="py-3 pr-4">square</td>
                  <td className="py-3">square, rounded, or circle</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 pr-4 font-mono text-white">format</td>
                  <td className="py-3 pr-4">string</td>
                  <td className="py-3 pr-4">png</td>
                  <td className="py-3">png or svg</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Examples</h2>
          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-400 text-sm mb-2">Simple letter favicon</p>
              <code className="text-green-400 text-sm">/api/favicon?text=A&bg=000&color=fff</code>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-400 text-sm mb-2">Emoji favicon</p>
              <code className="text-green-400 text-sm">/api/favicon?text=🚀&bg=1a1a1a&shape=circle</code>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-400 text-sm mb-2">Apple Touch Icon (180px)</p>
              <code className="text-green-400 text-sm">/api/favicon?text=M&bg=7c3aed&size=180&shape=rounded</code>
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>ICO format with multiple sizes</li>
            <li>ZIP package with all formats</li>
            <li>Web manifest generation</li>
            <li>Image upload support</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
