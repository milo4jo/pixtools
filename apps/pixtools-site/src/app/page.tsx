import Link from "next/link";

const products = [
  {
    name: "OGPix",
    tagline: "Open Graph Images API",
    href: "/products/ogpix",
    external: "https://ogpix.milo.contact",
    color: "blue",
    borderColor: "hover:border-blue-500",
    textColor: "group-hover:text-blue-400",
  },
  {
    name: "FavPix",
    tagline: "Favicon Generator",
    href: "/products/favpix",
    external: "https://favpix.milo.contact",
    color: "amber",
    borderColor: "hover:border-amber-500",
    textColor: "group-hover:text-amber-400",
  },
  {
    name: "ContextKit",
    tagline: "AI Context Selection",
    href: "/products/contextkit",
    external: "https://contextkit.milo.contact",
    color: "green",
    borderColor: "hover:border-green-500",
    textColor: "group-hover:text-green-400",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            PixTools
          </h1>
          <p className="text-xl sm:text-2xl text-neutral-400">
            Developer tools that just work.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid gap-4">
          {products.map((product) => (
            <Link
              key={product.name}
              href={product.href}
              className={`group p-6 sm:p-8 border border-neutral-800 rounded-xl ${product.borderColor} hover:bg-neutral-900/50 transition-all`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-xl sm:text-2xl font-semibold mb-1 ${product.textColor} transition-colors`}>
                    {product.name}
                  </h2>
                  <p className="text-neutral-500">{product.tagline}</p>
                </div>
                <svg 
                  className="w-5 h-5 text-neutral-600 group-hover:text-neutral-400 group-hover:translate-x-0.5 transition-all" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center text-sm text-neutral-500">
          Built by{" "}
          <a
            href="https://milo.contact"
            className="text-white hover:text-neutral-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Milo
          </a>{" "}
          🦊
        </div>
      </div>
    </main>
  );
}
