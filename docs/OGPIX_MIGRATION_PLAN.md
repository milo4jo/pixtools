# OGPix Migration Plan

> Gründlicher Review und Plan für die Migration von OGPix ins pixtools Monorepo.

## 📊 Aktueller Stand

### Projekt-Struktur
```
ogpix/
├── src/
│   ├── app/           # Next.js App Router
│   │   ├── api/       # API Routes (og, keys, auth, webhooks)
│   │   ├── dashboard/ # User Dashboard + Billing
│   │   ├── docs/      # API Documentation
│   │   ├── editor/    # OG Image Editor
│   │   └── login/     # Auth Pages
│   ├── components/    # React Components
│   ├── hooks/         # Custom Hooks (useDebounce)
│   ├── lib/           # Utilities (supabase, auth, constants, email)
│   └── types/         # TypeScript Types
├── supabase/          # DB Schema SQL Files
├── tests/             # Playwright E2E Tests (747 LOC)
└── public/            # Static Assets
```

### Dependencies
```json
{
  "dependencies": {
    "@auth/core": "^0.34.3",
    "@supabase/supabase-js": "^2.93.3",
    "@tanstack/react-query": "^5.90.20",
    "@vercel/og": "^0.8.6",
    "next": "16.1.6",
    "next-auth": "^4.24.13",
    "react": "19.2.3",
    "react-dom": "19.2.3"
  }
}
```

---

## 🗄️ Supabase Analyse

### Aktuelles Schema (OGPix-spezifisch)
| Table | Columns | Notes |
|-------|---------|-------|
| `users` | id, github_id, email, name, avatar_url, created_at, updated_at | User accounts |
| `user_plans` | id, user_id, plan, monthly_limit, created_at, updated_at | Subscription tiers |
| `api_keys` | id, user_id, key, name, is_active, created_at, last_used_at | **Kein `app_id`!** |
| `usage_logs` | id, api_key_id, created_at, theme, endpoint | Usage tracking |

### Multi-App Schema (aus MIGRATION.md)
Das geplante Multi-App Schema hat `app_id` in:
- `api_keys` → Unterscheidung pro App
- `user_plans` → Pro-User pro App

### ⚠️ Schema Migration Decision

**Option A: Jetzt migrieren auf Multi-App Schema**
- Fügt `app_id` Spalte zu api_keys + user_plans hinzu
- Alle bestehenden Keys bekommen `app_id = 'ogpix'`
- Vorteil: Zukunftssicher für FavPix etc.

**Option B: Später migrieren**
- OGPix behält aktuelles Schema
- Multi-App Schema erst wenn FavPix startet
- Vorteil: Weniger Risiko jetzt

**Empfehlung: Option B** — Erst OGPix stabil ins Monorepo, dann Schema-Migration als separaten Schritt.

---

## 🔑 Environment Variables

### Vercel OGPix Project (8 Vars)
| Variable | Scope | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Production | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Production | Service role (server-only) |
| `NEXTAUTH_URL` | Production | Auth callback URL |
| `NEXTAUTH_SECRET` | Production | Session encryption |
| `GITHUB_ID` | Production | OAuth App ID |
| `GITHUB_SECRET` | Production | OAuth App Secret |
| `OGPIX_API_KEY` | Production | For dogfooding OG images |

### Nach Migration
- **Diese Vars bleiben im OGPix Vercel Projekt**
- Root Directory wechselt zu `apps/ogpix`
- Gleiche URL (ogpix.vercel.app)
- Keine Änderung an Supabase-Verbindung

---

## 📦 Shared Packages Mapping

### Was wird shared?
| OGPix File | Shared Package | Action |
|------------|----------------|--------|
| `src/lib/supabase.ts` | `@pixtools/database` | **Keep local** — OGPix hat eigenes Schema |
| `src/lib/auth.ts` | `@pixtools/auth` | **Keep local** — funktioniert, kein Grund zu ändern |
| `src/lib/constants.ts` | `@pixtools/constants` | **Keep local** — app-spezifisch |
| `src/lib/email.ts` | — | Keep local (Resend integration) |
| `tsconfig.json` | `@pixtools/config` | **Migrate** |
| `postcss.config.mjs` | `@pixtools/config` | **Migrate** |
| `eslint.config.mjs` | `@pixtools/config` | **Migrate** (shared rules) |

### Entscheidung: Minimale Shared Dependencies
OGPix behält seine eigene `supabase.ts` und `auth.ts` vorerst. Nur Configs werden shared. Das reduziert Migrationsrisiko.

---

## 🧪 Tests

### E2E Tests (Playwright)
- 747 Lines of Code
- Tests: landing, navigation, editor, API, mobile
- **Nach Migration:** Tests müssen weiterhin laufen

### Test-Kommando
```bash
cd apps/ogpix
pnpm test
```

---

## 🚀 Migrations-Schritte

### Phase 1: Code kopieren
- [ ] OGPix Code nach `apps/ogpix/` kopieren
- [ ] Cleanup: `.git`, `node_modules`, `.next`, `.vercel` entfernen
- [ ] `package.json` anpassen (workspace dependency auf `@pixtools/config`)

### Phase 2: Configs auf shared umstellen
- [ ] `tsconfig.json` → extends `@pixtools/config/typescript/nextjs`
- [ ] `postcss.config.mjs` → re-export from `@pixtools/config/postcss`
- [ ] `eslint.config.mjs` → import shared rules

### Phase 3: Testen (LOKAL)
- [ ] `pnpm install` im Root
- [ ] `pnpm build --filter=ogpix` — Build muss funktionieren
- [ ] `pnpm test --filter=ogpix` — Tests müssen passen
- [ ] Local dev: `pnpm dev --filter=ogpix`

### Phase 4: Vercel umstellen
- [ ] Disconnect altes Repo (milo4jo/ogpix)
- [ ] Connect neues Repo (milo4jo/pixtools)
- [ ] Root Directory: `apps/ogpix`
- [ ] **WICHTIG:** Env Vars bleiben automatisch erhalten!

### Phase 5: Verify Production
- [ ] Deployment abwarten
- [ ] https://ogpix.vercel.app testen
- [ ] API testen (mit echtem Key)
- [ ] Dashboard/Login testen

---

## ⚠️ Risiken & Mitigations

### Risiko 1: Supabase Verbindung bricht
**Mitigation:** Env Vars bleiben im Vercel Projekt. Keine Änderung an Supabase-Seite.

### Risiko 2: Auth funktioniert nicht
**Mitigation:** GitHub OAuth Callback URL ist `ogpix.vercel.app/api/auth/callback/github` — bleibt gleich.

### Risiko 3: Build schlägt fehl wegen Dependencies
**Mitigation:** Erst lokal komplett testen bevor Vercel umgestellt wird.

### Risiko 4: Tests schlagen fehl
**Mitigation:** Alle 99 Tests müssen lokal grün sein bevor Deploy.

---

## 📋 Checkliste vor Start

- [ ] Jo bestätigt Plan
- [ ] Backup: OGPix Repo ist auf GitHub (kann zurückgerollt werden)
- [ ] Keine laufenden Vercel Deployments
- [ ] Zeitfenster: ~30 Min Downtime möglich

---

## Fragen an Jo

1. **Schema Migration:** Sollen wir `app_id` jetzt hinzufügen oder später?
2. **Downtime:** Ist kurze Downtime während Vercel-Umstellung OK?
3. **Rollback:** Falls etwas schiefgeht — altes Repo wieder verbinden?
