# 🎨 PixTools

Monorepo for pixel-perfect developer tools.

## Apps

| App | Description | Status |
|-----|-------------|--------|
| [ogpix](./apps/ogpix) | OG Image Generator API | 🔄 Migration pending |
| [milo-site](./apps/milo-site) | Milo's personal website | 🔄 Migration pending |
| [favpix](./apps/favpix) | Favicon Generator | 📋 Planned |
| [qrpix](./apps/qrpix) | QR Code Generator | 📋 Planned |

## Packages

| Package | Description |
|---------|-------------|
| [@pixtools/ui](./packages/ui) | Shared React components |
| [@pixtools/database](./packages/database) | Supabase client & queries |
| [@pixtools/auth](./packages/auth) | NextAuth configuration |
| [@pixtools/config](./packages/config) | Shared ESLint, TSConfig, Tailwind |
| [@pixtools/constants](./packages/constants) | Shared branding & limits |

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
```

## Tech Stack

- **Framework:** Next.js 14
- **Monorepo:** Turborepo + pnpm workspaces
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **Auth:** NextAuth.js
- **Deployment:** Vercel

## Migration

See [MIGRATION.md](./MIGRATION.md) for the step-by-step migration plan.

---

Built with 🦊 by Milo
