# FavPix Feature Roadmap

> Analyse erstellt: 2. Februar 2026  
> Live: https://favpix.vercel.app

---

## 1. Status Quo — Was kann FavPix aktuell?

### ✅ Implementiert

**Landing Page**
- Clean, minimalistisches Design (Black/White)
- Hero mit Live-Preview Builder
- Feature-Übersicht (PNG, Edge, Free)
- API-Beispiel mit Syntax-Highlighting
- Cross-Promotion zu OGPix

**API (`/api/favicon`)**
- PNG-Generierung via Satori/Vercel OG
- Parameter: text, bg, color, size (16-512), shape, fontSize, format
- SVG-Output (Basic — Text-basiert)
- Edge Runtime für schnelle Responses
- Caching (86400s)
- Inter Bold Font via CDN

**Editor (`/editor`)**
- Text/Emoji Toggle mit Presets
- Shape Selector (square, rounded, circle)
- 10 Color Presets + Custom Color Picker
- Font Size Slider (30-90%)
- Live Preview in 5 Größen (16, 32, 48, 64, 128px)
- Browser Tab Mockup
- Download-Buttons für alle Standard-Größen
- "Download All Sizes" (sequentiell)
- URL Builder mit Copy-Funktion
- Mobile Responsive

**Docs (`/docs`)**
- Parameter-Referenz
- cURL Beispiel
- HTML Integration Guide
- "Coming Soon" Section

**Tech Stack**
- Next.js 16.1.6 + React 19
- @vercel/og für Image-Generierung
- @pixtools/ui (Shared Components)
- Tailwind CSS 4
- Dependencies vorhanden: jszip, png-to-ico, sharp (noch nicht genutzt)

---

## 2. Gap Analysis — Was fehlt noch?

### Phase 1 (MVP) — Lücken

| Feature | Plan | Status | Aufwand |
|---------|------|--------|---------|
| Text-zu-Favicon | ✓ | ✅ Done | — |
| Emoji-zu-Favicon | ✓ | ✅ Done | — |
| Einfache Formen | ✓ | ✅ Done | — |
| Farbanpassung | ✓ | ✅ Done | — |
| Alle Größen | ✓ | ✅ Done | — |
| **favicon.ico (Multi-Size)** | ✓ | ❌ Missing | 2-4h |
| **ZIP Package** | ✓ | ❌ Missing | 4-6h |
| **site.webmanifest** | ✓ | ❌ Missing | 1-2h |
| **HTML Tags Generator** | ✓ | ❌ Missing | 1-2h |

### Phase 2 (Enhanced) — Noch nicht begonnen

| Feature | Aufwand | Wert |
|---------|---------|------|
| Gradient Backgrounds | 2-4h | Hoch |
| Icon Library (Lucide/Simple Icons) | 4-8h | Mittel |
| Schatten & Effekte | 2-4h | Niedrig |
| Custom Fonts | 4-6h | Mittel |

### Phase 3 (Pro) — Zukunft

| Feature | Aufwand | Wert |
|---------|---------|------|
| Auth + API Keys | 8-16h | Hoch |
| Usage Tracking | 4-8h | Mittel |
| Dashboard | 8-16h | Mittel |
| Billing (LemonSqueezy) | 8-16h | Hoch |
| Bild-Upload | 8-16h | Hoch |
| AI-Generierung | 16-32h | Mittel |

---

## 3. Feature-Priorisierung

### 🔴 Must-Have (für echte Nutzung)

1. **ICO Format** — Ohne .ico ist FavPix für viele Use Cases unbrauchbar
2. **ZIP Package** — Nutzer wollen alle Formate auf einmal
3. **Web Manifest Generator** — Essentiell für PWAs
4. **HTML Tags Generator** — Copy-Paste Integration

### 🟡 Nice-to-Have (verbessert das Produkt)

5. **Gradient Backgrounds** — Visuelle Differenzierung
6. **Icon Library** — Mehr als nur Text/Emoji
7. **Custom Fonts** — Google Fonts Integration
8. **Bulk Download UI-Verbesserung** — Progress Indicator, ZIP statt sequentiell

### 🟢 Später (nach Validierung)

9. **Auth/API Keys** — Erst wenn Traffic da ist
10. **Usage Tracking** — Nach Auth
11. **Billing** — Nach signifikanter Nutzung
12. **Bild-Upload** — Komplexität vs. Nutzen evaluieren
13. **AI-Generierung** — Nice-to-have, nicht Kern-Feature

---

## 4. Konkrete nächste Schritte (Top 5)

### 1. ICO Multi-Size Format ⭐⭐⭐
**Warum:** Das klassische .ico Format enthält mehrere Größen (16, 32, 48px) in einer Datei. Ohne ICO ignorieren viele Nutzer FavPix komplett.

**Implementierung:**
- `png-to-ico` ist bereits als Dependency vorhanden
- Neue Route: `/api/favicon/ico` oder `?format=ico`
- Generiere 16, 32, 48px PNGs → combine zu ICO

**Aufwand:** 2-4h

---

### 2. ZIP Package Download ⭐⭐⭐
**Warum:** Aktuell muss man 6+ Downloads machen. Ein ZIP mit allem ist 10x besser UX.

**Implementierung:**
- `jszip` ist bereits als Dependency vorhanden
- Neue Route: `/api/favicon/package`
- Inhalt:
  - favicon.ico (16, 32, 48)
  - favicon-16x16.png
  - favicon-32x32.png
  - apple-touch-icon.png (180)
  - android-chrome-192x192.png
  - android-chrome-512x512.png
  - site.webmanifest
  - browserconfig.xml (optional)

**Aufwand:** 4-6h

---

### 3. Web Manifest Generator ⭐⭐
**Warum:** PWAs brauchen ein Manifest. Wir können es automatisch generieren.

**Implementierung:**
- Route: `/api/favicon/manifest`
- Parameter: name, short_name, theme_color, background_color
- JSON Output mit Icon-URLs

**Aufwand:** 1-2h

---

### 4. HTML Tags Generator ⭐⭐
**Warum:** Nutzer sollen Copy-Paste-fertige HTML-Snippets bekommen.

**Implementierung:**
- Route: `/api/favicon/html` oder Button im Editor
- Output: Alle `<link>` Tags für Favicon-Integration
- Bonus: Next.js metadata format

**Aufwand:** 1-2h

---

### 5. Gradient Backgrounds ⭐
**Warum:** Visuelle Differenzierung von Konkurrenz. Einfach zu implementieren, großer visueller Impact.

**Implementierung:**
- Preset Gradients (5-10 populäre)
- Linear Gradient mit 2 Farben
- UI: Zusätzlicher Tab "Gradient" neben Solid Colors

**Aufwand:** 2-4h

---

## 5. Wettbewerbsanalyse

### Bekannte Favicon-Generatoren

| Tool | Stärken | Schwächen |
|------|---------|-----------|
| **favicon.io** | Viele Formate, sauber | Kein API, Upload-basiert |
| **realfavicongenerator.net** | Sehr umfangreich, alle Plattformen | Komplex, überladen |
| **favicon.cc** | Pixel-Editor | Veraltet, kein modernes Design |
| **Vercel/Next.js** | Built-in | Nur für Next.js Apps |

### Was fehlt am Markt?

1. **API-First Lösung** — Alle Tools sind Upload-basiert oder manuell
2. **Instant Preview** — Die meisten haben keinen Live-Editor
3. **Modernes Design** — favicon.cc ist von 2005
4. **Developer Experience** — Kein Tool bietet echte API-Integration

### FavPix Differenzierung

| Aspekt | Andere | FavPix |
|--------|--------|--------|
| API | ❌ | ✅ URL-basiert |
| Live Preview | Teilweise | ✅ Instant |
| Design | Veraltet | ✅ Modern, minimal |
| Speed | Langsam | ✅ Edge, gecached |
| Emoji Support | Teilweise | ✅ Native |
| Preis | Free/Freemium | ✅ Free (vorerst) |

### Opportunity Gap

**FavPix kann das "Unsplash für Favicons" werden:**
- Schnell, kostenlos, API-basiert
- Kein Account nötig für Basic Usage
- Developer-fokussiert
- Ein Befehl, alle Formate

---

## 6. Empfohlene Roadmap-Reihenfolge

```
Woche 1:  ICO Format + ZIP Package
Woche 2:  Manifest + HTML Generator
Woche 3:  Gradient Backgrounds + UI Polish
Woche 4:  Icon Library Integration
          → V0.2 Release

Nach Traffic-Validierung:
- Auth + API Keys
- Usage Tracking
- Pro Tier mit Billing
```

---

## Zusammenfassung

**FavPix ist zu 70% fertig für ein nutzbares MVP.** Die Kern-UX (Editor, Preview, Download) funktioniert gut. Was fehlt sind die Formate, die Nutzer tatsächlich erwarten:

| Was | Wichtigkeit | Status |
|-----|-------------|--------|
| ICO Format | Kritisch | ❌ |
| ZIP Package | Sehr hoch | ❌ |
| Manifest | Hoch | ❌ |
| HTML Tags | Hoch | ❌ |

**Mit 2 Wochen Arbeit** (ca. 20-30h) kann FavPix ein vollwertiges, wettbewerbsfähiges Produkt werden.

**Unique Selling Point:** API-First Favicon Generator mit modernem Editor. Kein anderer Service bietet das in dieser Kombination.

---

*Nächster Review: Nach Implementation von ICO + ZIP*
