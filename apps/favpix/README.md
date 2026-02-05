# FavPix

**Instant Favicon API** — Generate pixel-perfect favicons with a single URL.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**Live:** [favpix.vercel.app](https://favpix.vercel.app)

## ✨ Features

- **Instant Generation** — No design tools needed
- **All Sizes** — 16px to 512px, ICO, SVG
- **Shapes** — Square, rounded, circle
- **ZIP Download** — All formats in one package
- **Visual Editor** — Live preview at `/editor`

## 🚀 Quick Start

```html
<link rel="icon" href="https://favpix.vercel.app/api/favicon?text=M&bg=06b6d4&size=32">
```

Or download:
```bash
curl "https://favpix.vercel.app/api/favicon?text=M&bg=06b6d4&size=32" -o favicon.png
```

## 📖 API Reference

### Base URL
```
https://favpix.vercel.app/api/favicon
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | string | "F" | Text or emoji (max 3 chars) |
| `bg` | hex | 000000 | Background color |
| `color` | hex | ffffff | Text color |
| `size` | number | 32 | Size in pixels (16-512) |
| `shape` | string | square | `square`, `rounded`, `circle` |
| `format` | string | png | `png` or `svg` |

### Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/favicon` | PNG favicon (default) |
| `/api/favicon/ico` | ICO with 16/32/48px sizes |
| `/api/favicon/zip` | ZIP with all formats |

## 🎨 Visual Editor

Try the [Visual Editor](https://favpix.vercel.app/editor) for:
- Live preview
- Color picker
- Shape selection  
- Download all sizes

## 🛠️ Development

```bash
# From monorepo root
pnpm install
pnpm dev --filter favpix
```

## 📄 License

MIT © [Milo](https://github.com/milo4jo)

---

Part of [PixTools](https://pixtools-site.vercel.app) 🦊
