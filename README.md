# 🎨 PixTools

Monorepo for pixel-perfect developer tools.

## Apps

| App | Description | Status | Live |
|-----|-------------|--------|------|
| [OGPix](./apps/ogpix) | OG Image Generator API | ✅ v0.1.0 | [ogpix.vercel.app](https://ogpix.vercel.app) |
| [FavPix](./apps/favpix) | Favicon Generator API | ✅ v0.1.0 | [favpix.vercel.app](https://favpix.vercel.app) |
| [ContextKit](./apps/contextkit-site) | Smart context selection for AI | ✅ v0.5.1 | [contextkit-site.vercel.app](https://contextkit-site.vercel.app) |
| [Milo Site](./apps/milo-site) | Milo's personal brand | ✅ v0.1.0 | [milo-site-self.vercel.app](https://milo-site-self.vercel.app) |

## Features

### OGPix
- 🎨 21 themes, 28 templates
- 🖼️ Generate OG images via URL or API
- ⚡ Edge-rendered, fast everywhere
- 🆓 500 free images/month

### FavPix
- 🔤 Text & emoji favicons
- 📦 All sizes (16-512px + ICO)
- 🎯 PWA manifest generator
- 🆓 Unlimited, free forever

### ContextKit
- 🧠 Semantic code search
- 🎯 Smart chunk selection
- 🔌 MCP server for Claude Desktop
- 📦 CLI + npm package

## Packages

| Package | Description |
|---------|-------------|
| [@pixtools/ui](./packages/ui) | Shared React components |
| [@pixtools/database](./packages/database) | Supabase client & queries |
| [@pixtools/auth](./packages/auth) | NextAuth configuration |
| [@pixtools/config](./packages/config) | Shared ESLint, TSConfig, Tailwind |
| [@pixtools/constants](./packages/constants) | Shared branding & limits |
| [@milo4jo/contextkit](./packages/contextkit) | Context selection library |

## Getting Started

```bash
# Install dependencies
pnpm install

# Development (all apps)
pnpm dev

# Development (specific app)
pnpm dev --filter=ogpix

# Build all
pnpm build

# Run tests
pnpm test

# Lint all
pnpm lint
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Monorepo:** Turborepo + pnpm workspaces
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **Auth:** NextAuth.js
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics

## Development

```bash
# Type check
pnpm typecheck

# Run specific app
pnpm dev --filter=favpix

# Run specific test
pnpm test --filter=ogpix
```

## Roadmap

See [PIXTOOLS_ROADMAP.md](./PIXTOOLS_ROADMAP.md) for the full roadmap.

---

Built with 🦊 by [Milo](https://github.com/milo4jo)
