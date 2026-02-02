# 🏗️ PixTools Migration Plan

> Skalierbare Architektur für 10-20 Pix-Apps

## Ziel

Migration von bestehenden Apps (ogpix, milo-site) in ein Turborepo Monorepo mit shared packages für maximale Code-Wiederverwendung.

---

## 1. Monorepo Struktur mit Turborepo

```
/pixtools                    # Root
├── apps/
│   ├── ogpix/              # Bestehende App (migrieren)
│   ├── milo-site/          # Milo's Website (migrieren)
│   ├── favpix/             # Neue App: Favicon Generator
│   ├── qrpix/              # Zukünftig: QR Code Generator
│   └── ...
├── packages/
│   ├── ui/                 # Shared Components (Navbar, Footer, etc.)
│   ├── database/           # Supabase Client + Queries
│   ├── auth/               # NextAuth Config
│   ├── config/             # ESLint, TSConfig, Tailwind
│   └── constants/          # Shared Branding, Limits
├── turbo.json
├── package.json
└── .env                    # Shared env vars
```

**Warum Turborepo:**
- Cached builds (nur geänderte Apps rebuilden)
- Code-Sharing ohne npm publish
- Ein `pnpm install` für alles
- Vercel hat native Turborepo-Support

---

## 2. Shared Supabase (Multi-App Schema)

**Ein Projekt, alle Apps:**

```sql
-- ============================================
-- SHARED TABLES (Cross-App)
-- ============================================

-- Users sind global (ein Account für alle Pix-Tools)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  github_id TEXT UNIQUE,
  email TEXT,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Apps Registry
CREATE TABLE apps (
  id TEXT PRIMARY KEY,           -- 'ogpix', 'favpix', etc.
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true
);

-- API Keys sind pro User + App
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  app_id TEXT REFERENCES apps(id),
  key TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Usage Logs sind pro Key (und damit pro App)
CREATE TABLE usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_id UUID REFERENCES api_keys(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  metadata JSONB                 -- App-spezifische Daten
);

-- Plans sind pro User + App
CREATE TABLE user_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  app_id TEXT REFERENCES apps(id),
  plan TEXT DEFAULT 'free',
  monthly_limit INT DEFAULT 500,
  UNIQUE(user_id, app_id)
);

-- Initial Apps einfügen
INSERT INTO apps (id, name) VALUES
  ('ogpix', 'OG Image Generator'),
  ('favpix', 'Favicon Generator'),
  ('qrpix', 'QR Code Generator');
```

**Vorteile:**
- ✅ Ein Supabase-Projekt für alles
- ✅ Ein User-Account = Zugang zu allen Tools
- ✅ Cross-App Analytics möglich
- ✅ Unified Billing später einfach

---

## 3. Shared Packages

### `packages/database/`

```typescript
// packages/database/src/client.ts
export { getServiceClient, getSupabaseClient } from './supabase';

// packages/database/src/queries.ts
export async function getOrCreateUser(githubId: string, email: string, name: string) { ... }
export async function createApiKey(userId: string, appId: string) { ... }
export async function trackUsage(apiKeyId: string, metadata?: object) { ... }
export async function checkRateLimit(apiKey: string, appId: string) { ... }
```

### `packages/auth/`

```typescript
// Shared NextAuth config
export const authOptions: NextAuthOptions = {
  providers: [GitHub({ ... })],
  callbacks: { ... }
};
```

### `packages/ui/`

```typescript
// Shared components
export { Navbar } from './Navbar';
export { Footer } from './Footer';
export { DashboardLayout } from './DashboardLayout';
export { CodeBlock } from './CodeBlock';
export { PricingCard } from './PricingCard';
```

### `packages/config/`

```typescript
// Shared configs
export { eslintConfig } from './eslint';
export { tailwindPreset } from './tailwind';
export { tsconfig } from './typescript';
```

---

## 4. Neue App Bootstrapping (< 5 Min)

Mit der richtigen Struktur ist eine neue App schnell erstellt:

```bash
# Im Monorepo Root
pnpm create next-app apps/favpix --typescript --tailwind --app

# In apps/favpix/package.json dependencies hinzufügen:
{
  "dependencies": {
    "@pixtools/ui": "workspace:*",
    "@pixtools/database": "workspace:*",
    "@pixtools/auth": "workspace:*",
    "@pixtools/config": "workspace:*"
  }
}

# App-spezifische Logik schreiben, fertig!
```

**Danach:**
1. In Supabase `apps`-Tabelle eintragen
2. Shared auth, database, UI funktioniert sofort

---

## 5. Migration Steps

### Phase 1: Monorepo Setup ✅
- [x] Turborepo initialisieren (pnpm workspaces)
- [x] Basis-Konfiguration (turbo.json, root package.json)
- [ ] Shared config package erstellen (ESLint, TSConfig, Tailwind)
- [ ] pnpm install + verify build works

### Phase 2: OGPix Migration ⬜
- [ ] OGPix Code nach `apps/ogpix/` kopieren
- [ ] Dependencies auf workspace packages umstellen
- [ ] Supabase-Code nach `packages/database/` extrahieren
- [ ] Auth-Code nach `packages/auth/` extrahieren
- [ ] OGPix auf neue Packages umstellen
- [ ] Tests anpassen und verifizieren
- [ ] Vercel Deployment konfigurieren

### Phase 3: Supabase Schema Update ⬜
- [ ] Multi-App Schema deployen (apps, unified tables)
- [ ] Bestehende OGPix-Daten migrieren
- [ ] `app_id` Spalte zu api_keys hinzufügen
- [ ] OGPix auf neue Queries umstellen

### Phase 4: Milo-Site Migration ⬜
- [ ] Milo-site Code nach `apps/milo-site/` kopieren
- [ ] Shared packages einbinden
- [ ] UI-Komponenten nach `packages/ui/` extrahieren (falls shared)

### Phase 5: FavPix (Neue App) ⬜
- [ ] `apps/favpix/` bootstrappen mit Next.js template
- [ ] Shared packages nutzen (@pixtools/ui, database, auth)
- [ ] Favicon-Generator API bauen
- [ ] In Supabase apps-Tabelle eintragen

---

## 6. Vercel Deployment

Jede App wird als separates Vercel-Projekt deployed:

```
pixtools/apps/ogpix     → ogpix.vercel.app
pixtools/apps/milo-site → milo.dev (custom domain)
pixtools/apps/favpix    → favpix.vercel.app
```

**Vercel Monorepo Settings:**
- Root Directory: `apps/ogpix` (pro Projekt)
- Build Command: `cd ../.. && pnpm turbo build --filter=ogpix`
- Install Command: `pnpm install`

---

## 7. Environment Variables

Shared `.env` im Root + App-spezifische `.env.local`:

```bash
# Root .env (shared)
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
GITHUB_ID=...
GITHUB_SECRET=...

# apps/ogpix/.env.local (app-specific)
NEXT_PUBLIC_APP_ID=ogpix
NEXTAUTH_URL=https://ogpix.vercel.app
```

---

## Referenzen

- [Turborepo Docs](https://turbo.build/repo/docs)
- [Vercel Monorepo Guide](https://vercel.com/docs/monorepos)
- [pnpm Workspaces](https://pnpm.io/workspaces)
