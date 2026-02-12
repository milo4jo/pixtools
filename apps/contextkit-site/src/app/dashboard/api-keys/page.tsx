"use client";

import { useState, useEffect } from "react";

interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  createdAt: string;
  lastUsedAt: string | null;
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKey, setNewKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchKeys();
  }, []);

  async function fetchKeys() {
    try {
      const res = await fetch("/api/v1/keys");
      const data = await res.json();
      setKeys(data.keys || []);
    } catch (error) {
      console.error("Failed to fetch keys:", error);
    } finally {
      setLoading(false);
    }
  }

  async function createKey() {
    setCreating(true);
    try {
      const res = await fetch("/api/v1/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName || "Default" }),
      });
      const data = await res.json();
      if (data.key) {
        setNewKey(data.key);
        setNewKeyName("");
        fetchKeys();
      }
    } catch (error) {
      console.error("Failed to create key:", error);
    } finally {
      setCreating(false);
    }
  }

  async function revokeKey(keyId: string) {
    if (
      !confirm(
        "Are you sure you want to revoke this API key? This action cannot be undone."
      )
    ) {
      return;
    }
    try {
      await fetch(`/api/v1/keys/${keyId}`, { method: "DELETE" });
      fetchKeys();
    } catch (error) {
      console.error("Failed to revoke key:", error);
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function formatDate(dateString: string | null) {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">API Keys</h1>
          <p className="text-zinc-400 mt-1">
            Manage your API keys for accessing the ContextKit API
          </p>
        </div>
      </div>

      {/* New Key Modal */}
      {newKey && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 max-w-lg w-full mx-4">
            <h2 className="text-xl font-bold mb-4">🔐 Your New API Key</h2>
            <p className="text-zinc-400 text-sm mb-4">
              Copy this key now. You won&apos;t be able to see it again!
            </p>
            <div className="bg-black border border-zinc-700 rounded p-3 font-mono text-sm break-all">
              {newKey}
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => copyToClipboard(newKey)}
                className="flex-1 bg-white text-black py-2 px-4 rounded font-medium hover:bg-zinc-200 transition"
              >
                {copied ? "✓ Copied!" : "Copy to Clipboard"}
              </button>
              <button
                onClick={() => setNewKey(null)}
                className="px-4 py-2 border border-zinc-700 rounded hover:bg-zinc-800 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Key Form */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Create New Key</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Key name (e.g., Production, Development)"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            className="flex-1 bg-black border border-zinc-700 rounded px-4 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500"
          />
          <button
            onClick={createKey}
            disabled={creating}
            className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-zinc-200 transition disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create Key"}
          </button>
        </div>
      </div>

      {/* Keys List */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold">Your API Keys</h2>
        </div>

        {loading ? (
          <div className="px-6 py-8 text-center text-zinc-400">Loading...</div>
        ) : keys.length === 0 ? (
          <div className="px-6 py-8 text-center text-zinc-400">
            No API keys yet. Create one above to get started.
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {keys.map((key) => (
              <div
                key={key.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{key.name}</div>
                  <div className="text-sm text-zinc-400 font-mono mt-1">
                    {key.keyPrefix}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    Created {formatDate(key.createdAt)} • Last used{" "}
                    {formatDate(key.lastUsedAt)}
                  </div>
                </div>
                <button
                  onClick={() => revokeKey(key.id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Revoke
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Usage Info */}
      <div className="mt-8 text-sm text-zinc-500">
        <h3 className="font-medium text-zinc-400 mb-2">Using your API key</h3>
        <pre className="bg-zinc-900 border border-zinc-800 rounded p-4 overflow-x-auto">
          <code>
            {`# Check your usage
curl https://contextkit-site.vercel.app/api/v1/usage \\
  -H "Authorization: Bearer YOUR_API_KEY"

# CLI configuration
contextkit config --api-key YOUR_API_KEY`}
          </code>
        </pre>
      </div>
    </>
  );
}
