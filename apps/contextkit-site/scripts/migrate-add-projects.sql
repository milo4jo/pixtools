-- Add projects table for cloud sync
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  blob_url TEXT,
  blob_pathname TEXT,
  index_hash TEXT,
  index_size INTEGER,
  index_version INTEGER NOT NULL DEFAULT 1,
  last_synced_at INTEGER,
  file_count INTEGER,
  chunk_count INTEGER,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Index for fast user lookups
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(user_id, slug);
