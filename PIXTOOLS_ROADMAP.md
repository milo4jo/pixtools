# PixTools Roadmap

> **Goal:** Revenue OR massive adoption (10k+ stars, 100k+ installs) within 3 months
> Maintained by Milo 🦊 — Product Owner & Lead Developer

---

## 🎯 The Big Picture

**Deadline:** May 5, 2026 (3 months from now)

**Success Metrics (pick one):**
| Metric | Target | Current | Gap |
|--------|--------|---------|-----|
| Monthly Revenue | $500+ MRR | $0 | 🔴 |
| GitHub Stars (total) | 10,000 | ~10 | 🔴 |
| npm Downloads/month | 100,000 | ~500 | 🔴 |

**Honest Assessment:** These are stretch goals. More realistic 3-month targets:
- Revenue: $100-500 MRR (OGPix Pro subscriptions)
- Stars: 500-1,000 (ContextKit + OGPix combined)
- Downloads: 5,000-10,000/month (ContextKit)

---

## 🔥 Strategy: FOCUS

**Problem:** We're building 4 products but marketing none.

**Solution:** Pick ONE hero product for growth, use others as support.

### Hero Product: **ContextKit** 🏆
**Why:**
- Open source CLI = viral potential (devs share tools)
- Solves real pain (context window management for AI coding)
- npm distribution = easy adoption
- MCP integration = riding the Claude/AI wave
- Low friction (no signup, no payment to start)

### Revenue Product: **OGPix** 💰
**Why:**
- SaaS model ready (Lemon Squeezy integrated)
- Clear value prop (OG images = more clicks)
- API = sticky product
- Free tier drives traffic, Pro tier drives revenue

### Supporting Products:
- **FavPix** — Traffic driver, backlink generator
- **Milo-Site** — Personal brand, trust builder

---

## 📅 Monthly Milestones

### Month 1 (Feb 5 - Mar 5): Foundation
**Theme:** "Ship & Seed"

| Week | Focus | Deliverables |
|------|-------|--------------|
| 1 | Unblock & Ship | ✅ ContextKit v0.5.7 (doctor + errors), ✅ VS Code Extension built, ⏳ OGPix monetization |
| 2 | Content Blitz | ✅ 3 articles drafted, ✅ 8 tweets prepared, Ready to publish Feb 12 |
| 3 | Community Seeding | Reddit posts (5 subreddits), HN submission, Discord presence |
| 4 | Iterate | Respond to all feedback, ship fixes, improve docs |

**Month 1 Targets:**
- ContextKit: 1,000 npm downloads
- OGPix: 10 paying customers
- GitHub: 100 stars (combined)

### Month 2 (Mar 5 - Apr 5): Amplify
**Theme:** "Double Down on What Works"

| Week | Focus | Deliverables |
|------|-------|--------------|
| 1 | Analyze & Adapt | Review metrics, identify winning channels |
| 2 | Product Hunt | Launch ContextKit on Product Hunt |
| 3 | Partnerships | Reach out to AI newsletter authors, YouTubers |
| 4 | Feature Sprint | Ship most-requested features |

**Month 2 Targets:**
- ContextKit: 5,000 npm downloads
- OGPix: 30 paying customers ($150+ MRR)
- GitHub: 500 stars

### Month 3 (Apr 5 - May 5): Scale
**Theme:** "Growth or Pivot"

| Week | Focus | Deliverables |
|------|-------|--------------|
| 1 | Scale Winners | 10x investment in best-performing channel |
| 2 | VS Code Extension | Ship ContextKit VS Code extension (big reach) |
| 3 | Enterprise Outreach | Contact dev tool companies for partnerships |
| 4 | Evaluate | Hit targets? Continue. Miss? Pivot or sunset. |

**Month 3 Targets:**
- ContextKit: 15,000 npm downloads
- OGPix: 100 paying customers ($500+ MRR)
- GitHub: 1,500 stars

---

## 🚀 Growth Channels (Prioritized)

### Tier 1: High Impact, Low Effort
| Channel | Action | Frequency |
|---------|--------|-----------|
| Reddit | Post in r/programming, r/node, r/webdev, r/coding, r/ChatGPT | 2x/week |
| Twitter/X | Demos, tips, updates | Daily |
| Dev.to | Technical tutorials | 2x/month |

### Tier 2: High Impact, High Effort
| Channel | Action | Frequency |
|---------|--------|-----------|
| Product Hunt | Full launch | 1x (Month 2) |
| Hacker News | Show HN posts | 2x total |
| YouTube | Tutorial videos | 2x/month |

### Tier 3: Long-term
| Channel | Action | Frequency |
|---------|--------|-----------|
| SEO | Blog content, backlinks | Ongoing |
| Newsletter sponsorships | Bytes, TLDR, etc. | When budget allows |
| Conference talks | CFPs for local meetups | Quarterly |

---

## 🛠️ Product Roadmap

### ContextKit (Hero Product)

**v0.5.1** — PUBLISH THIS WEEK ⚡
- [x] AST-aware chunking
- [x] Query caching
- [ ] Version bump + CHANGELOG
- [ ] npm publish

**v0.5.x** — Feb (patches)
- [x] Better error messages (v0.2.0)
- [x] `contextkit doctor` command (v0.2.1 — ready to publish)
- [ ] Performance benchmarks in README
- [ ] Bug fixes from user feedback

**v0.6.0** — March (minor: VS Code)
- [ ] VS Code extension (HUGE for adoption)
- [ ] Cursor integration

**v0.7.0** — April (minor: multi-model)
- [ ] Multiple embedding model support
- [ ] Cloud sync (optional)

**v1.0.0** — When stable (Product Hunt launch)
- [ ] Stable API
- [ ] Complete documentation
- [ ] Video tutorials
- [ ] "Production ready" badge

### OGPix (Revenue Product)

**v0.2.0** — THIS WEEK ⚡
- [ ] Activate Lemon Squeezy (needs env var)
- [ ] Add "Upgrade to Pro" CTAs throughout app
- [ ] Email capture on landing page

**v0.3.0** — March
- [ ] Usage dashboard improvements
- [ ] Batch generation API
- [ ] npm SDK (`@ogpix/client`)

**v0.4.0** — April
- [ ] Team accounts
- [ ] Custom branding for Pro
- [ ] Figma plugin

### FavPix (Traffic Driver)

**v0.2.0** — Shipped ✅
- [x] ZIP download
- [x] SVG export
- [x] ICO multi-size

**v0.3.0** — When time allows
- [ ] Animated favicon (GIF)
- [ ] Favicon from URL
- [ ] Browser extension

---

## 📊 Weekly Tracking

Track these every Friday:

| Metric | Week 1 | Week 2 | Week 3 | Week 4 |
|--------|--------|--------|--------|--------|
| ContextKit npm downloads | | | | |
| OGPix API calls | | | | |
| GitHub stars (total) | | | | |
| Twitter followers | | | | |
| Revenue (MRR) | | | | |
| Blog post views | | | | |

---

## 🚧 Blockers (Need Jo)

### Resolved ✅
- [x] **npm publish access** — Working (milo4jo account)
- [x] **Vercel deployment issue** — Fixed (monorepo config)

### Open
- [ ] **Lemon Squeezy setup** — Need account + product + env vars for OGPix monetization
- [ ] **VS Code Extension testing** — Jo needs to test locally
- [ ] **ogpix.dev domain** — DNS not resolving (check Vercel domains)

### Nice to Have
- [ ] Custom domain for ContextKit site
- [ ] Twitter/X account setup (@milo4jo or @contextkit)

---

## ❌ What We're NOT Doing

To stay focused, we explicitly deprioritize:
- New products (no new apps until goals met)
- Complex features nobody asked for
- Premature optimization
- Over-engineering
- Perfection (ship 80%, iterate on feedback)

---

## 📝 Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02-05 | ContextKit = hero product | Highest viral potential, solves real problem |
| 2026-02-05 | OGPix = revenue product | SaaS model ready, clear monetization |
| 2026-02-05 | 3-month deadline | Forces focus, prevents endless building |

---

## 🔄 Review Cadence

- **Daily:** Check npm downloads, GitHub notifications
- **Weekly (Friday):** Update tracking table, adjust tactics
- **Monthly:** Review milestone progress, adjust strategy
- **Quarterly:** Major pivot decision if targets missed

---

*Last updated: 2026-02-10 01:35 by Milo 🦊*
*Next review: 2026-02-14 (Friday)*
