import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            ContextKit
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">
              {user?.emailAddresses[0]?.emailAddress}
            </span>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* API Key Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">API Key</h2>
            <p className="text-sm text-zinc-400 mb-4">
              Your personal API key for ContextKit Cloud.
            </p>
            <div className="bg-black border border-zinc-700 rounded px-3 py-2 font-mono text-sm text-zinc-500">
              Coming soon...
            </div>
          </div>

          {/* Usage Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Usage</h2>
            <p className="text-sm text-zinc-400 mb-4">
              Your context selections this month.
            </p>
            <div className="text-3xl font-bold">0</div>
            <div className="text-sm text-zinc-500">/ 1,000 free tier</div>
          </div>

          {/* Plan Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Plan</h2>
            <p className="text-sm text-zinc-400 mb-4">
              Your current subscription.
            </p>
            <div className="inline-block bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm font-medium">
              Free
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Start</h2>
          <pre className="bg-black border border-zinc-700 rounded p-4 overflow-x-auto">
            <code className="text-sm font-mono text-green-400">
              npx @milo4jo/contextkit select &quot;your query here&quot;
            </code>
          </pre>
          <p className="text-sm text-zinc-400 mt-4">
            The CLI works locally without an API key. Cloud features coming Q2 2025.
          </p>
        </div>
      </main>
    </div>
  );
}
