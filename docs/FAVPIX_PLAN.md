# FavPix — Favicon Generator App

> Teil des pixtools Monorepos | Geplant: Februar 2026

---

## 🎯 Vision

**FavPix** ist ein moderner Favicon Generator, der mit einer einzigen URL alle benötigten Favicon-Formate und -Größen generiert. Analog zu OGPix (OG Images) fokussiert sich FavPix auf eine einfache API mit visuellem Editor.

**Tagline:** *"One API. Every favicon format."*

---

## 📊 Marktanalyse

### Bestehende Lösungen
- **favicon.io** — Upload-basiert, viele Formate, aber keine API
- **realfavicongenerator.net** — Umfangreich, aber komplex
- **Vercel/Next.js Icons** — App-spezifisch, nicht universell

### Unsere Differenzierung
- **API-first** — Generiere alle Favicons mit URL-Parametern
- **Keine Uploads nötig** — Text/Emoji-basierte Icons
- **Live Preview** — Interaktiver Editor wie OGPix
- **Alle Formate** — ICO, PNG, SVG, Apple Touch, Web Manifest

---

## ✨ Features

### Phase 1: MVP (v0.1)

#### Kern-Features
- [ ] **Text-zu-Favicon** — Buchstabe(n) als Favicon
- [ ] **Emoji-zu-Favicon** — Emoji als Favicon
- [ ] **Einfache Formen** — Kreis, Quadrat, Abgerundet
- [ ] **Farbanpassung** — Hintergrund + Text-Farbe
- [ ] **Alle Standard-Größen** — 16, 32, 48, 96, 180, 192, 512px

#### Ausgabeformate
- [ ] **favicon.ico** — Multi-Size ICO (16, 32, 48)
- [ ] **favicon.png** — Standard PNG
- [ ] **apple-touch-icon.png** — 180x180 für iOS
- [ ] **android-chrome-*.png** — 192x192 + 512x512
- [ ] **site.webmanifest** — JSON mit Icon-Referenzen

### Phase 2: Enhanced (v0.2)

- [ ] **SVG-Support** — Skalierbare Favicons
- [ ] **Gradient-Hintergründe** — Wie OGPix Themes
- [ ] **Icon-Library** — Simple Icons, Lucide Integration
- [ ] **Schatten & Effekte** — Leichte 3D-Effekte
- [ ] **Favicon-Pakete** — ZIP mit allen Formaten

### Phase 3: Pro (v1.0)

- [ ] **Bild-Upload** — Eigenes Bild als Basis
- [ ] **AI-Generierung** — Beschreibung → Favicon
- [ ] **Animierte Favicons** — GIF/APNG Support
- [ ] **Favicon History** — Generierte Icons speichern
- [ ] **Bulk-Generierung** — Mehrere Varianten gleichzeitig

---

## 🛠️ Tech Stack

### Frontend
```
Next.js 16.x          — App Router, Server Components
React 19.x            — Client Components für Editor
Tailwind CSS 4.x      — Styling (gleiche Config wie OGPix)
TypeScript 5.x        — Type Safety
```

### Backend/API
```
Next.js Edge Runtime  — Favicon-Generierung
sharp                 — PNG-Verarbeitung
svg2img               — SVG-zu-PNG Konvertierung
png-to-ico            — ICO-Generierung
```

### Shared Packages (Monorepo)
```
@pixtools/config      — ESLint, TypeScript Config
@pixtools/ui          — Shared Components (künftig)
@pixtools/database    — Supabase Client
@pixtools/constants   — Shared Constants (neu)
```

### Infrastruktur
```
Vercel                — Hosting + Edge Functions
Supabase              — Auth, Usage Tracking, Storage
LemonSqueezy          — Payments (wie OGPix)
```

---

## 📐 API Design

### Base URL
```
https://favpix.vercel.app/api/favicon
```

### Haupt-Endpunkte

#### 1. Einzelnes Favicon
```
GET /api/favicon?text=M&bg=000000&color=ffffff&size=32
```

| Parameter | Typ | Default | Beschreibung |
|-----------|-----|---------|--------------|
| `text` | string | "F" | Text/Buchstabe(n) für Icon |
| `emoji` | string | — | Emoji als Icon (überschreibt text) |
| `bg` | hex | 000000 | Hintergrundfarbe |
| `color` | hex | ffffff | Text/Icon-Farbe |
| `size` | number | 32 | Größe in Pixel |
| `shape` | string | square | `square` / `circle` / `rounded` |
| `radius` | number | 0 | Border-Radius (bei rounded) |
| `format` | string | png | `png` / `svg` / `ico` |
| `font` | string | inter | Font-Familie |
| `fontWeight` | string | bold | `normal` / `medium` / `bold` |
| `fontSize` | string | auto | Auto-Skalierung oder px-Wert |
| `gradient` | string | — | Gradient-Preset oder Custom |
| `shadow` | boolean | false | Leichter Schatten |
| `key` | string | — | API Key für höhere Limits |

#### 2. Favicon-Paket (ZIP)
```
GET /api/favicon/package?text=M&bg=000000
```

Liefert ZIP mit allen Formaten:
- favicon.ico (16, 32, 48)
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png (180)
- android-chrome-192x192.png
- android-chrome-512x512.png
- site.webmanifest
- browserconfig.xml

#### 3. Web Manifest
```
GET /api/favicon/manifest?name=MyApp&short_name=App&theme_color=000000
```

Generiert `site.webmanifest` mit Icon-URLs.

#### 4. HTML-Tags
```
GET /api/favicon/html?text=M&bg=000000
```

Liefert HTML-Snippet zum Einbinden:
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

### Response-Formate

#### PNG (Standard)
```
Content-Type: image/png
Cache-Control: public, max-age=86400, s-maxage=86400
```

#### ICO
```
Content-Type: image/x-icon
```

#### SVG
```
Content-Type: image/svg+xml
```

#### ZIP (Package)
```
Content-Type: application/zip
Content-Disposition: attachment; filename="favicon-package.zip"
```

---

## 🎨 UI/Editor Konzept

### Landing Page (`/`)

**Hero Section:**
```
┌────────────────────────────────────────────────┐
│                                                │
│     🎨 FavPix                                  │
│     One API. Every favicon format.             │
│                                                │
│     [Try the Editor]    [View API Docs]        │
│                                                │
│     ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐    │
│     │  M   │  │  🚀  │  │  ⚡  │  │  JS  │    │
│     └──────┘  └──────┘  └──────┘  └──────┘    │
│     Live Preview verschiedener Styles          │
│                                                │
└────────────────────────────────────────────────┘
```

### Editor Page (`/editor`)

**Split-View Layout (wie OGPix):**

```
┌─────────────────────────────────────────────────────────────────┐
│  FavPix Editor                                                  │
├─────────────────────────────────┬───────────────────────────────┤
│                                 │                               │
│  CONTROLS                       │  PREVIEW                      │
│                                 │                               │
│  ┌─────────────────────────┐   │   ┌─────┐ 512px              │
│  │ Type: [Text] [Emoji]    │   │   │     │                     │
│  └─────────────────────────┘   │   │  M  │                     │
│                                 │   │     │                     │
│  Text: [M        ]              │   └─────┘                     │
│                                 │                               │
│  ┌─────────────────────────┐   │   ┌───┐ 192px   ┌──┐ 32px    │
│  │ Shape: ● ■ ▢            │   │   │ M │         │M │         │
│  └─────────────────────────┘   │   └───┘         └──┘         │
│                                 │                               │
│  Background: [■ #000000]        │   Browser Preview:            │
│  Text Color: [□ #ffffff]        │   ┌─────────────────────────┐ │
│                                 │   │ [M] My Website      ─ □ X│ │
│  ▸ Advanced Options             │   │ ┌───────────────────┐   │ │
│    Font: [Inter ▼]              │   │ │                   │   │ │
│    Weight: [Bold ▼]             │   │ │   (page content)  │   │ │
│    Gradient: [None ▼]           │   │ │                   │   │ │
│    Shadow: [ ]                  │   │ └───────────────────┘   │ │
│                                 │   └─────────────────────────┘ │
│  ─────────────────────────────  │                               │
│                                 │   Download:                   │
│  API URL:                       │   [Download ICO]              │
│  ┌─────────────────────────┐   │   [Download PNG Pack]         │
│  │ /api/favicon?text=M&... │   │   [Download All (ZIP)]        │
│  └─────────────────────────┘   │                               │
│  [Copy URL]                     │   [Get HTML Code]             │
│                                 │                               │
└─────────────────────────────────┴───────────────────────────────┘
```

### Dashboard (`/dashboard`)

**Features:**
- API Key Management (wie OGPix)
- Usage Statistics
- Gespeicherte Favicons
- Billing/Upgrade

### Docs Page (`/docs`)

**Struktur:**
- Quick Start Guide
- API Reference (alle Parameter)
- Framework Integration (Next.js, Remix, etc.)
- Beispiele und Use Cases

---

## 💰 Monetarisierung

### Tier-Struktur

| | Free | Pro |
|---|---|---|
| **Preis** | $0 | $5/mo |
| **Generierungen** | 100/Monat | Unlimited |
| **ICO Format** | ✓ | ✓ |
| **PNG Formate** | ✓ | ✓ |
| **SVG Format** | ✗ | ✓ |
| **ZIP Package** | ✗ | ✓ |
| **Bild-Upload** | ✗ | ✓ |
| **Custom Fonts** | ✗ | ✓ |
| **No Watermark** | ✗ | ✓ |
| **API Priority** | Standard | High |
| **Support** | Community | Email |

### Rate Limits

```typescript
const LIMITS = {
  // Ohne API Key (per IP)
  anonymousDaily: 10,
  
  // Free Tier (mit API Key)
  freeMonthly: 100,
  
  // Pro Tier
  proMonthly: Infinity,
};
```

### Warum günstiger als OGPix?

- **Einfachere Generierung** — Weniger compute-intensiv
- **Kleinere Dateien** — Weniger Bandwidth
- **Einmalige Nutzung** — User generieren einmal, nicht wiederholt
- **Niedrigere Einstiegshürde** — Mehr Conversions

---

## 📁 Projektstruktur

```
apps/favpix/
├── .gitignore
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts (oder postcss.config.mjs)
├── README.md
├── DESIGN.md
├── playwright.config.ts
│
├── public/
│   ├── og-image.png
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Landing
│   │   ├── error.tsx
│   │   ├── providers.tsx
│   │   │
│   │   ├── editor/
│   │   │   └── page.tsx          # Editor UI
│   │   │
│   │   ├── docs/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx          # API Keys, Usage
│   │   │   └── billing/
│   │   │       └── page.tsx
│   │   │
│   │   ├── login/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   └── api/
│   │       ├── favicon/
│   │       │   ├── route.ts      # Einzelnes Favicon
│   │       │   ├── package/
│   │       │   │   └── route.ts  # ZIP mit allen Formaten
│   │       │   ├── manifest/
│   │       │   │   └── route.ts  # Web Manifest
│   │       │   └── html/
│   │       │       └── route.ts  # HTML Tags
│   │       │
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts
│   │       │
│   │       ├── keys/
│   │       │   └── route.ts
│   │       │
│   │       └── webhooks/
│   │           └── lemonsqueezy/
│   │               └── route.ts
│   │
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── FaviconEditor.tsx     # Haupt-Editor
│   │   ├── FaviconPreview.tsx    # Live Preview
│   │   ├── BrowserMockup.tsx     # Browser Tab Preview
│   │   ├── ColorPicker.tsx
│   │   ├── ShapeSelector.tsx
│   │   ├── DownloadButtons.tsx
│   │   ├── CodeBlock.tsx
│   │   └── UpgradeButton.tsx
│   │
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   └── useFaviconUrl.ts
│   │
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── supabase.ts
│   │   ├── auth.ts
│   │   ├── favicon-generator.ts  # Core Generation Logic
│   │   ├── ico-encoder.ts        # ICO Format Encoder
│   │   └── zip-builder.ts        # Package Builder
│   │
│   └── types/
│       └── next-auth.d.ts
│
├── tests/
│   ├── favicon-api.spec.ts
│   ├── editor.spec.ts
│   ├── landing.spec.ts
│   └── mobile.spec.ts
│
└── supabase/
    └── migrations/
        └── 001_favpix_tables.sql
```

---

## 🗄️ Datenbank-Schema

### Neue Tabellen für FavPix

```sql
-- Usage Logs (analog zu OGPix)
CREATE TABLE favpix_usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_id UUID REFERENCES api_keys(id),
  format TEXT NOT NULL, -- 'png', 'ico', 'svg', 'zip'
  size INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gespeicherte Favicons (Pro Feature)
CREATE TABLE favpix_saved_favicons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name TEXT,
  config JSONB NOT NULL, -- Alle Parameter
  preview_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index für schnelle Usage-Abfragen
CREATE INDEX idx_favpix_usage_api_key ON favpix_usage_logs(api_key_id, created_at);
```

### Bestehende `apps` Tabelle

FavPix ist bereits in der `apps` Tabelle eingetragen:
```sql
SELECT * FROM apps WHERE id = 'favpix';
-- id: favpix
-- name: FavPix
-- status: planned
```

---

## 🚀 Implementierungs-Roadmap

### Sprint 1: Foundation (Woche 1-2)
- [ ] Projekt-Setup in Monorepo
- [ ] Basic API Route (`/api/favicon`)
- [ ] Text-zu-PNG Generation
- [ ] Emoji-Support
- [ ] Landing Page (Minimal)

### Sprint 2: Editor (Woche 3-4)
- [ ] FaviconEditor Component
- [ ] Live Preview
- [ ] Farb- und Form-Auswahl
- [ ] URL Copy Function
- [ ] Mobile Responsive

### Sprint 3: Formate (Woche 5-6)
- [ ] ICO Multi-Size Generation
- [ ] Apple Touch Icon
- [ ] Android Chrome Icons
- [ ] Web Manifest Generation
- [ ] HTML Code Generator

### Sprint 4: Auth & Billing (Woche 7-8)
- [ ] NextAuth Integration
- [ ] API Key Management
- [ ] Usage Tracking
- [ ] Rate Limiting
- [ ] LemonSqueezy Integration

### Sprint 5: Polish (Woche 9-10)
- [ ] ZIP Package Download
- [ ] Docs Page
- [ ] E2E Tests
- [ ] Performance Optimization
- [ ] Public Launch

---

## 🔗 Integration mit Monorepo

### Package.json Dependencies
```json
{
  "name": "favpix",
  "dependencies": {
    "@pixtools/config": "workspace:*",
    "@pixtools/database": "workspace:*",
    "next": "16.1.6",
    "react": "19.2.3",
    "sharp": "^0.33.0"
  }
}
```

### Shared Constants erweitern

Neues Package `@pixtools/constants` für app-übergreifende Werte:
```typescript
// packages/constants/src/index.ts
export const PIXTOOLS_APPS = {
  ogpix: {
    name: "OGPix",
    url: "https://ogpix.vercel.app",
    description: "OG Image Generator",
  },
  favpix: {
    name: "FavPix", 
    url: "https://favpix.vercel.app",
    description: "Favicon Generator",
  },
} as const;
```

---

## 📝 Offene Fragen

1. **Domain:** `favpix.vercel.app` oder Custom Domain?
2. **Cross-Promotion:** OGPix ↔ FavPix Links?
3. **Shared Auth:** Gleicher Account für beide Apps?
4. **Bundle-Pricing:** OGPix + FavPix Kombi-Abo?

---

## 🎯 Erfolgskriterien

### MVP Launch
- [ ] 100 Favicon-Generierungen am ersten Tag
- [ ] < 500ms API Response Time
- [ ] 0 kritische Bugs
- [ ] Mobile-friendly Editor

### 3 Monate Post-Launch
- [ ] 1.000 Monthly Active Users
- [ ] 10 zahlende Pro-Kunden
- [ ] 4.5+ Rating in Community Feedback
- [ ] Featured auf Product Hunt / Hacker News

---

*Plan erstellt: 2. Februar 2026*  
*Nächster Review: Nach Sprint 1*
