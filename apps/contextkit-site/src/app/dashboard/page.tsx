import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { getUsageStats, getMonthlyUsage } from "@/lib/usage";
import { listApiKeys } from "@/lib/api-keys";
import { listProjects } from "@/lib/projects";
import { syncCurrentUser } from "@/lib/sync-user";
import { formatBytes } from "@/lib/utils";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  // Ensure user exists in our database (fallback for webhook)
  await syncCurrentUser();

  // Fetch data in parallel
  const [stats, monthly, keys, projects] = await Promise.all([
    getUsageStats(user.id).catch(() => ({
      today: 0,
      thisMonth: 0,
      monthlyLimit: 1000,
      remaining: 1000,
      resetDate: new Date(),
    })),
    getMonthlyUsage(user.id).catch(() => ({
      selectCount: 0,
      symbolCount: 0,
      graphCount: 0,
      indexCount: 0,
      totalRequests: 0,
      totalTokens: 0,
    })),
    listApiKeys(user.id).catch(() => []),
    listProjects(user.id).catch(() => []),
  ]);

  const usagePercent = Math.min(100, (stats.thisMonth / stats.monthlyLimit) * 100);
  const totalStorage = projects.reduce((sum, p) => sum + (p.indexSize || 0), 0);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-zinc-400 mt-1">
            Welcome back, {user.firstName || user.emailAddresses[0]?.emailAddress}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Usage Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-sm font-medium text-zinc-400 mb-1">This Month</h2>
          <div className="text-3xl font-bold">
            {stats.thisMonth.toLocaleString()}
          </div>
          <div className="text-sm text-zinc-500">
            / {stats.monthlyLimit.toLocaleString()} requests
          </div>
          {/* Progress bar */}
          <div className="mt-3 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                usagePercent > 90
                  ? "bg-red-500"
                  : usagePercent > 70
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </div>

        {/* Today Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-sm font-medium text-zinc-400 mb-1">Today</h2>
          <div className="text-3xl font-bold">{stats.today}</div>
          <div className="text-sm text-zinc-500">requests</div>
        </div>

        {/* API Keys Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-sm font-medium text-zinc-400 mb-1">API Keys</h2>
          <div className="text-3xl font-bold">{keys.length}</div>
          <Link
            href="/dashboard/api-keys"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Manage →
          </Link>
        </div>

        {/* Cloud Sync Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-sm font-medium text-zinc-400 mb-1">Cloud Sync</h2>
          <div className="text-3xl font-bold">{projects.length}</div>
          <div className="text-sm text-zinc-500">
            {totalStorage > 0 ? formatBytes(totalStorage) : "No projects"}
          </div>
          <Link
            href="/dashboard/cloud"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Manage →
          </Link>
        </div>
      </div>

      {/* Usage Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Usage Breakdown</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Select</span>
              <span className="font-mono">{monthly.selectCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Symbol</span>
              <span className="font-mono">{monthly.symbolCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Graph</span>
              <span className="font-mono">{monthly.graphCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Index</span>
              <span className="font-mono">{monthly.indexCount}</span>
            </div>
            <div className="border-t border-zinc-800 pt-3 flex justify-between items-center font-medium">
              <span>Total</span>
              <span className="font-mono">{monthly.totalRequests}</span>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Start</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-2">
                1. Install the CLI
              </h3>
              <pre className="bg-black border border-zinc-700 rounded p-3 text-sm overflow-x-auto">
                <code className="text-green-400">npm i -g @milo4jo/contextkit</code>
              </pre>
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-2">
                2. Index your project
              </h3>
              <pre className="bg-black border border-zinc-700 rounded p-3 text-sm overflow-x-auto">
                <code className="text-green-400">contextkit init && contextkit index</code>
              </pre>
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-2">
                3. Sync to cloud
              </h3>
              <pre className="bg-black border border-zinc-700 rounded p-3 text-sm overflow-x-auto">
                <code className="text-green-400">contextkit cloud login</code>
                {"\n"}
                <code className="text-green-400">contextkit cloud sync</code>
              </pre>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-zinc-800">
            <Link
              href="/dashboard/api-keys"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Get your API key →
            </Link>
          </div>
        </div>
      </div>

      {/* Reset Info */}
      <div className="text-center text-sm text-zinc-500">
        Usage resets on{" "}
        {stats.resetDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    </>
  );
}
