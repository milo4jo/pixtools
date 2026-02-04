# Admin Dashboard Plan

> Zentrales Dashboard zur Verwaltung aller PixTools-Apps (OGPix, FavPix, etc.)
> **Zugang:** Nur Jo (Johannes Mändle) — kein öffentlicher Zugang

---

## 1. Technische Architektur

### 1.1 App-Struktur

```
apps/admin/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout mit Auth-Check
│   │   ├── page.tsx             # Dashboard-Übersicht
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── stats/route.ts   # Aggregierte Stats
│   │   │   ├── keys/route.ts    # API-Key Management
│   │   │   └── apps/route.ts    # App-Verwaltung
│   │   ├── keys/
│   │   │   └── page.tsx         # API-Key Übersicht
│   │   ├── usage/
│   │   │   └── page.tsx         # Detaillierte Usage-Logs
│   │   └── apps/
│   │       └── page.tsx         # App-Konfiguration
│   ├── components/
│   │   ├── AdminNav.tsx
│   │   ├── StatsCard.tsx
│   │   ├── UsageChart.tsx       # Simple bar chart
│   │   ├── KeysTable.tsx
│   │   └── AppsTable.tsx
│   ├── lib/
│   │   ├── auth.ts              # Admin-Auth config
│   │   └── queries.ts           # Admin-spezifische Queries
│   └── globals.css
├── package.json
└── next.config.ts
```

### 1.2 Auth-Strategie: Allowlist-basiert

**Warum nicht Supabase RLS?**
- Dashboard ist NICHT für normale User gedacht
- Simpler: Hardcoded Email-Allowlist in Env-Variable
- Schneller zu implementieren, sicherer (weniger Angriffsfläche)

**Implementation:**

```typescript
// src/lib/auth.ts
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim());

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Nur erlaubte Emails können sich einloggen
      return ADMIN_EMAILS.includes(user.email || '');
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
};
```

**Env-Variable:**
```
ADMIN_EMAILS=johannes@example.com
```

### 1.3 Routing & Navigation

| Route | Beschreibung |
|-------|--------------|
| `/` | Dashboard-Übersicht mit Key-Metriken |
| `/keys` | Alle API-Keys über alle Apps |
| `/usage` | Detaillierte Usage-Logs mit Filtern |
| `/apps` | App-Verwaltung (aktivieren/deaktivieren) |

### 1.4 Tech Stack

- **Framework:** Next.js 16 (App Router) — wie OGPix/FavPix
- **Auth:** NextAuth mit GitHub + Email-Allowlist
- **Database:** Supabase (Service Role für Admin-Queries)
- **Styling:** Tailwind CSS v4 (dark theme, minimal)
- **Charts:** Simple CSS-based bars (keine externe Library)
- **State:** React Query für Server-State

---

## 2. Datenbank-Queries

### 2.1 Dashboard-Übersicht Stats

```sql
-- Gesamtstatistiken pro App (letzte 30 Tage)
SELECT 
  a.id as app_id,
  a.name as app_name,
  COUNT(DISTINCT ak.id) as total_keys,
  COUNT(DISTINCT ak.user_id) as total_users,
  COUNT(ul.id) as usage_30d
FROM apps a
LEFT JOIN api_keys ak ON ak.app_id = a.id AND ak.is_active = true
LEFT JOIN usage_logs ul ON ul.api_key_id = ak.id 
  AND ul.created_at > NOW() - INTERVAL '30 days'
GROUP BY a.id, a.name
ORDER BY usage_30d DESC;
```

### 2.2 Usage-Timeline (für Chart)

```sql
-- Tägliche Usage pro App (letzte 14 Tage)
SELECT 
  DATE(ul.created_at) as date,
  ak.app_id,
  COUNT(*) as count
FROM usage_logs ul
JOIN api_keys ak ON ak.id = ul.api_key_id
WHERE ul.created_at > NOW() - INTERVAL '14 days'
GROUP BY DATE(ul.created_at), ak.app_id
ORDER BY date ASC;
```

### 2.3 Alle API-Keys (Admin-Ansicht)

```sql
-- Alle Keys mit User-Info und Usage
SELECT 
  ak.id,
  ak.key,
  ak.is_active,
  ak.created_at,
  ak.app_id,
  a.name as app_name,
  u.id as user_id,
  u.name as user_name,
  u.email as user_email,
  COUNT(ul.id) as total_usage,
  MAX(ul.created_at) as last_used
FROM api_keys ak
JOIN apps a ON a.id = ak.app_id
JOIN users u ON u.id = ak.user_id
LEFT JOIN usage_logs ul ON ul.api_key_id = ak.id
GROUP BY ak.id, a.id, a.name, u.id, u.name, u.email
ORDER BY ak.created_at DESC;
```

### 2.4 Usage pro Key (Detail-Ansicht)

```sql
-- Usage-Details für einen Key
SELECT 
  ul.id,
  ul.created_at,
  ul.metadata
FROM usage_logs ul
WHERE ul.api_key_id = $1
ORDER BY ul.created_at DESC
LIMIT 100;
```

### 2.5 Key aktivieren/deaktivieren

```sql
-- Toggle Key Status
UPDATE api_keys 
SET is_active = NOT is_active 
WHERE id = $1
RETURNING *;
```

### 2.6 User-Übersicht

```sql
-- Alle User mit ihren Keys und Usage
SELECT 
  u.id,
  u.name,
  u.email,
  u.created_at,
  COUNT(DISTINCT ak.id) as key_count,
  COUNT(ul.id) as total_usage,
  MAX(ul.created_at) as last_active
FROM users u
LEFT JOIN api_keys ak ON ak.user_id = u.id
LEFT JOIN usage_logs ul ON ul.api_key_id = ak.id
GROUP BY u.id
ORDER BY total_usage DESC;
```

---

## 3. UI-Design

### 3.1 Design-Prinzipien

- **Minimal:** Wie OGPix/FavPix — schwarzer Hintergrund, weiße Akzente
- **Dense:** Mehr Informationen pro Screen als User-facing Apps
- **Functional:** Keine Animationen, keine Fancy-Effects

### 3.2 Screen: Dashboard-Übersicht (`/`)

```
┌────────────────────────────────────────────────────────────────┐
│  PixTools Admin                              [Jo] [Sign out]   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Total Users  │  │ Total Keys   │  │ Requests/30d │         │
│  │     127      │  │     234      │  │    45,892    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                │
│  ── Usage by App (14 days) ──────────────────────────────────  │
│                                                                │
│  OGPix    ████████████████████████████████░░░░  34,521 (75%)  │
│  FavPix   ██████████░░░░░░░░░░░░░░░░░░░░░░░░░░  11,371 (25%)  │
│                                                                │
│  ── Recent Activity ─────────────────────────────────────────  │
│                                                                │
│  • ogpix_abc123... | user@email.com | 2 min ago | OGPix       │
│  • favpix_def456.. | other@mail.de  | 5 min ago | FavPix      │
│  • ogpix_ghi789... | user@email.com | 8 min ago | OGPix       │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 3.3 Screen: API Keys (`/keys`)

```
┌────────────────────────────────────────────────────────────────┐
│  PixTools Admin  >  API Keys                                   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Filter: [All Apps ▼] [Active Only ☑] [Search...          ]   │
│                                                                │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ KEY            │ USER          │ APP    │ USAGE │ STATUS  ││
│  ├────────────────────────────────────────────────────────────┤│
│  │ ogpix_abc123.. │ Max Müller    │ OGPix  │ 1,234 │ ● Active││
│  │                │ max@mail.de   │        │       │ [Toggle]││
│  ├────────────────────────────────────────────────────────────┤│
│  │ favpix_def45.. │ Lisa Schmidt  │ FavPix │   892 │ ○ Inact ││
│  │                │ lisa@web.de   │        │       │ [Toggle]││
│  └────────────────────────────────────────────────────────────┘│
│                                                                │
│  Showing 1-20 of 234                    [← Prev] [Next →]     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 3.4 Screen: Usage Details (`/usage`)

```
┌────────────────────────────────────────────────────────────────┐
│  PixTools Admin  >  Usage                                      │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Period: [Last 7 days ▼]  App: [All ▼]  [Export CSV]          │
│                                                                │
│  ── Daily Usage ─────────────────────────────────────────────  │
│                                                                │
│  Mon   ████████████████████████  4,521                        │
│  Tue   ██████████████████████████████  5,892                  │
│  Wed   ████████████████████  3,234                            │
│  Thu   ██████████████████████████  4,123                      │
│  Fri   ████████████████████████████████████  6,012            │
│  Sat   ██████████  1,892                                      │
│  Sun   ████████  1,234                                        │
│                                                                │
│  ── Top Users This Period ───────────────────────────────────  │
│                                                                │
│  1. Max Müller (max@mail.de)        4,521 requests            │
│  2. Lisa Schmidt (lisa@web.de)      2,892 requests            │
│  3. ...                                                       │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 3.5 Screen: Apps (`/apps`)

```
┌────────────────────────────────────────────────────────────────┐
│  PixTools Admin  >  Apps                                       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ OGPix                                          ● Active │  │
│  │ OG Image generation API                                 │  │
│  │ Users: 89 | Keys: 156 | Requests/30d: 34,521           │  │
│  │ URL: ogpix.vercel.app                     [View Stats] │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ FavPix                                         ● Active │  │
│  │ Favicon generation API                                  │  │
│  │ Users: 38 | Keys: 78 | Requests/30d: 11,371            │  │
│  │ URL: favpix.vercel.app                    [View Stats] │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
│  [+ Add App] (nur wenn neue App im Monorepo)                  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 4. Komponenten

### 4.1 AdminNav

```tsx
// Minimale Navigation mit aktuellem Pfad
<nav className="border-b border-neutral-800">
  <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    <div className="flex items-center gap-8">
      <Link href="/" className="font-bold">PixTools Admin</Link>
      <div className="flex gap-6 text-sm">
        <Link href="/" className={active === '/' ? 'text-white' : 'text-neutral-500'}>
          Overview
        </Link>
        <Link href="/keys" className={...}>Keys</Link>
        <Link href="/usage" className={...}>Usage</Link>
        <Link href="/apps" className={...}>Apps</Link>
      </div>
    </div>
    <div className="flex items-center gap-4 text-sm">
      <span className="text-neutral-500">{session.user.name}</span>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  </div>
</nav>
```

### 4.2 StatsCard

```tsx
interface StatsCardProps {
  label: string;
  value: string | number;
  change?: { value: number; positive: boolean };
}

// Kompakte Statistik-Karte
<div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5">
  <div className="text-sm text-neutral-500 mb-1">{label}</div>
  <div className="text-3xl font-bold">{value}</div>
  {change && (
    <div className={change.positive ? 'text-green-500' : 'text-red-500'}>
      {change.positive ? '+' : ''}{change.value}% vs last period
    </div>
  )}
</div>
```

### 4.3 UsageBar (Simple Chart)

```tsx
// Keine externe Library — reines CSS
interface UsageBarProps {
  label: string;
  value: number;
  max: number;
}

<div className="flex items-center gap-4">
  <div className="w-20 text-sm text-neutral-500">{label}</div>
  <div className="flex-1 h-6 bg-neutral-800 rounded overflow-hidden">
    <div 
      className="h-full bg-white rounded"
      style={{ width: `${(value / max) * 100}%` }}
    />
  </div>
  <div className="w-24 text-right text-sm">{value.toLocaleString()}</div>
</div>
```

---

## 5. Implementierungsplan

### Phase 1: Grundgerüst (1-2h)

1. **App erstellen:**
   ```bash
   cd apps
   cp -r ogpix admin
   cd admin
   # package.json anpassen (name: "admin")
   # Unnötige Dateien entfernen
   ```

2. **Turbo config:**
   - `turbo.json` um `admin` erweitern
   - `pnpm install` ausführen

3. **Basic Layout:**
   - `layout.tsx` mit Auth-Wrapper
   - `AdminNav` Komponente
   - Leere Seiten für alle Routes

### Phase 2: Auth (30min)

1. **Auth-Config:**
   - `src/lib/auth.ts` mit Email-Allowlist
   - `ADMIN_EMAILS` in `.env.local`
   - NextAuth API-Route

2. **Login-Page:**
   - Simple GitHub-Login Button
   - Error-Handling für nicht-erlaubte Emails

### Phase 3: Dashboard Overview (1-2h)

1. **API-Route `/api/stats`:**
   - Aggregierte Stats aus Supabase
   - Cached für 60s (revalidate)

2. **Komponenten:**
   - 3x StatsCard (Users, Keys, Requests)
   - UsageBar Chart pro App
   - Recent Activity List

### Phase 4: API Keys Management (1-2h)

1. **API-Route `/api/keys`:**
   - GET: Alle Keys mit Pagination
   - PATCH: Key aktivieren/deaktivieren

2. **Keys Page:**
   - Filterable Table
   - Toggle-Buttons für Status
   - Search by Key/User

### Phase 5: Usage Details (1h)

1. **API-Route `/api/usage`:**
   - Aggregierte Usage pro Tag
   - Filter nach App, Zeitraum

2. **Usage Page:**
   - Simple Bar Chart (CSS-based)
   - Top Users Liste

### Phase 6: Apps Management (30min)

1. **Apps Page:**
   - Liste aller registrierten Apps
   - Links zu Vercel Deployments
   - Quick-Stats pro App

### Phase 7: Polish & Deploy (1h)

1. **Vercel Setup:**
   - Neues Projekt `pixtools-admin`
   - Environment Variables setzen
   - Domain: `admin.pixtools.dev` oder Subdomain

2. **Testing:**
   - Auth-Flow testen
   - Alle Queries verifizieren
   - Mobile-Responsive Check

---

## 6. Environment Variables

```env
# .env.local für Admin-App

# Auth
GITHUB_ID=xxx
GITHUB_SECRET=xxx
NEXTAUTH_SECRET=xxx
NEXTAUTH_URL=http://localhost:3000  # bzw. Production URL

# Admin Access
ADMIN_EMAILS=johannes@example.com

# Supabase (Service Role für Admin-Queries)
SUPABASE_URL=https://zkurhnnzypdsjefqequm.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx
```

---

## 7. Sicherheit

### 7.1 Auth

- ✅ Email-Allowlist (keine öffentliche Registrierung)
- ✅ GitHub OAuth (kein Passwort-Management)
- ✅ Session-basiert mit secure cookies

### 7.2 API-Routes

- ✅ Alle Admin-Routes prüfen Session
- ✅ Service Role Key nur serverseitig
- ✅ Rate Limiting für API-Routes (optional)

### 7.3 Deployment

- ✅ Keine hardcodierten Secrets im Code
- ✅ Vercel Environment Variables
- ✅ Keine öffentliche Domain-Verlinkung

---

## 8. Erweiterungen (Future)

- [ ] **Email-Notifications:** Alert bei ungewöhnlicher Nutzung
- [ ] **User-Impersonation:** Als User einloggen für Support
- [ ] **Billing-Integration:** LemonSqueezy Dashboard einbetten
- [ ] **Logs-Export:** CSV-Export für Abrechnungen
- [ ] **API-Docs:** Swagger/OpenAPI für Admin-API

---

## Zusammenfassung

| Aspekt | Entscheidung |
|--------|--------------|
| **Auth** | NextAuth + GitHub + Email-Allowlist |
| **Database** | Supabase Service Role (Admin-Rechte) |
| **UI** | Minimal dark theme (wie OGPix) |
| **Charts** | CSS-only (keine externe Library) |
| **Deployment** | Vercel (seperates Projekt) |
| **Geschätzte Zeit** | 6-8 Stunden |
