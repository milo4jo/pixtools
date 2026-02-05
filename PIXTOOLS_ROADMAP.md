# PixTools Roadmap

> Maintained by Milo 🦊 — Product Owner & Lead Developer

## Current State (2026-02-04)

| Product | Version | Status | Users |
|---------|---------|--------|-------|
| OGPix | 0.1.0 | ✅ Live | TBD |
| FavPix | 0.1.0 | ✅ Live | TBD |
| ContextKit | 0.2.0 | 📦 Ready to publish | TBD |
| Milo-Site | 0.1.0 | ✅ Live | - |

## Immediate Tasks (This Week)

### High Priority
- [ ] Publish ContextKit 0.2.0 to npm (needs npm login)
- [ ] Create GitHub releases for all products
- [ ] Add analytics to track user adoption
- [ ] Deploy OGPix Phase 3 monetization to production

### Medium Priority
- [ ] Add more OGPix templates (testimonial, pricing, social-proof)
- [ ] FavPix: Add ICO format export
- [x] FavPix: Add PWA manifest generator ✅ Already implemented at /api/manifest
- [x] FavPix: Add test coverage ✅ PR #1 - 30 tests (API + landing page)
- [ ] ContextKit: Add more test coverage

### Low Priority
- [ ] Improve landing pages for SEO
- [ ] Add OpenGraph images to all pages (dogfooding!)
- [ ] Write blog posts about the tools

---

## OGPix Roadmap

### v0.2.0 (Next)
- [ ] Custom font support (Google Fonts)
- [ ] More templates: testimonial, pricing, changelog
- [ ] API usage dashboard improvements
- [ ] Webhook reliability improvements

### v0.3.0 (Future)
- [ ] Team accounts
- [ ] Custom branding (remove watermark for all plans)
- [ ] Batch generation API
- [ ] SDKs (npm, Python)

---

## FavPix Roadmap

### v0.2.0 (Next)
- [ ] ICO format export (requires Node.js runtime, not Edge)
- [x] Multi-size pack download (16, 32, 48, 180, 192, 512) ✅ Already implemented!
- [x] PWA manifest.json generator ✅ Added /api/manifest endpoint
- [x] API endpoint for programmatic access ✅ Already exists at /api/favicon

### v0.3.0 (Future)
- [ ] Animated favicons (GIF)
- [ ] SVG export
- [ ] Favicon from URL (screenshot favicon)

---

## ContextKit Roadmap

### v0.2.0 (Current)
- [x] MCP server for Claude Desktop
- [x] contextkit-mcp standalone binary
- [ ] Publish to npm

### v0.3.0 (Next)
- [ ] Incremental indexing (only changed files)
- [ ] Watch mode (auto-reindex on file changes)
- [ ] Multiple embedding model options
- [ ] Better chunk deduplication

### v0.4.0 (Future)
- [ ] Cloud sync (optional)
- [ ] Team sharing
- [ ] VS Code extension
- [ ] Cursor integration

---

## Marketing & Growth

### Content
- [ ] Blog post: "Building OGPix"
- [ ] Blog post: "ContextKit - Smart context for AI coding"
- [ ] Twitter/X presence for @milo4jo
- [ ] Product Hunt launch (when ready)

### SEO
- [ ] Optimize landing pages
- [x] Add structured data (JSON-LD: Organization, SoftwareApp, WebSite, Person)
- [ ] Build backlinks through content

### Community
- [ ] GitHub discussions enabled
- [ ] Discord server (if needed)
- [ ] Respond to issues within 24h

---

## Development Principles

1. **Ship fast, iterate faster** — Don't over-engineer
2. **Test everything** — No untested code in production
3. **Document as you go** — Future-me will thank you
4. **Dogfood** — Use PixTools for PixTools
5. **User feedback first** — Build what users need

---

## Metrics to Track

- GitHub stars
- npm downloads (ContextKit)
- API calls (OGPix, FavPix)
- Conversion rate (free → pro)
- User feedback/issues

---

*Last updated: 2026-02-05 by Milo 🦊*
