import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { listProjects } from "@/lib/projects";
import { syncCurrentUser } from "@/lib/sync-user";
import { formatBytes } from "@/lib/utils";

export default async function CloudPage() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  // Ensure user exists in our database
  await syncCurrentUser();

  // Fetch projects
  const projects = await listProjects(user.id).catch(() => []);

  // Calculate total storage
  const totalStorage = projects.reduce((sum, p) => sum + (p.indexSize || 0), 0);
  const storageLimit = 100 * 1024 * 1024; // 100 MB for Free tier
  const storagePercent = Math.min(100, (totalStorage / storageLimit) * 100);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Cloud Sync</h1>
          <p className="text-zinc-400 mt-1">
            Manage your synced projects and indexes
          </p>
        </div>
      </div>

      {/* Storage Overview */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {/* Projects Count */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-sm font-medium text-zinc-400 mb-1">Projects</h2>
          <div className="text-3xl font-bold">{projects.length}</div>
          <div className="text-sm text-zinc-500">/ 1 max (Free)</div>
        </div>

        {/* Storage Used */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-sm font-medium text-zinc-400 mb-1">Storage Used</h2>
          <div className="text-3xl font-bold">{formatBytes(totalStorage)}</div>
          <div className="text-sm text-zinc-500">/ 100 MB (Free)</div>
          {/* Progress bar */}
          <div className="mt-3 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                storagePercent > 90
                  ? "bg-red-500"
                  : storagePercent > 70
                  ? "bg-yellow-500"
                  : "bg-blue-500"
              }`}
              style={{ width: `${storagePercent}%` }}
            />
          </div>
        </div>

        {/* Plan */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-sm font-medium text-zinc-400 mb-1">Plan Limits</h2>
          <div className="text-sm space-y-1 text-zinc-300">
            <div>1 project</div>
            <div>100 MB storage</div>
            <div>20 req/min</div>
          </div>
          <button className="mt-2 text-sm text-blue-400 hover:text-blue-300">
            Upgrade →
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold">Your Projects</h2>
        </div>

        {projects.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-4xl mb-4">☁️</div>
            <h3 className="text-lg font-medium mb-2">No projects synced yet</h3>
            <p className="text-zinc-500 mb-6 max-w-md mx-auto">
              Use the CLI to sync your first project to the cloud.
            </p>
            <div className="bg-black border border-zinc-700 rounded-lg p-4 max-w-md mx-auto text-left">
              <pre className="text-sm overflow-x-auto">
                <code className="text-zinc-400"># Initialize and index your project</code>
                {"\n"}
                <code className="text-green-400">contextkit init</code>
                {"\n"}
                <code className="text-green-400">contextkit source add ./src</code>
                {"\n"}
                <code className="text-green-400">contextkit index</code>
                {"\n\n"}
                <code className="text-zinc-400"># Login with your API key</code>
                {"\n"}
                <code className="text-green-400">contextkit cloud login</code>
                {"\n\n"}
                <code className="text-zinc-400"># Sync to cloud</code>
                {"\n"}
                <code className="text-green-400">contextkit cloud sync</code>
              </pre>
            </div>
            <div className="mt-6">
              <Link
                href="/dashboard/api-keys"
                className="inline-block bg-white text-black px-4 py-2 rounded text-sm font-medium hover:bg-zinc-200"
              >
                Get API Key
              </Link>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {projects.map((project) => (
              <div key={project.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-xl">
                    📦
                  </div>
                  <div>
                    <h3 className="font-medium">{project.name}</h3>
                    <div className="text-sm text-zinc-500 flex items-center gap-3">
                      <span>v{project.indexVersion}</span>
                      <span>•</span>
                      <span>{formatBytes(project.indexSize || 0)}</span>
                      <span>•</span>
                      <span>
                        {project.lastSyncedAt
                          ? `Synced ${new Date(project.lastSyncedAt).toLocaleDateString()}`
                          : "Never synced"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {project.blobUrl && (
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded">
                      Synced
                    </span>
                  )}
                  <code className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                    contextkit cloud pull --project {project.name}
                  </code>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CLI Reference */}
      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">CLI Commands</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <code className="text-green-400">contextkit cloud login</code>
            <p className="text-zinc-500 mt-1">Authenticate with your API key</p>
          </div>
          <div>
            <code className="text-green-400">contextkit cloud sync</code>
            <p className="text-zinc-500 mt-1">Upload your index to the cloud</p>
          </div>
          <div>
            <code className="text-green-400">contextkit cloud pull</code>
            <p className="text-zinc-500 mt-1">Download an index from the cloud</p>
          </div>
          <div>
            <code className="text-green-400">contextkit cloud status</code>
            <p className="text-zinc-500 mt-1">Check sync status</p>
          </div>
        </div>
      </div>
    </>
  );
}
