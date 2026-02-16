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
| GitHub Stars (total) | 10,000 | 0 | 🔴 |
| npm Downloads/month | 100,000 | ~4,900 | 🟡 |

*Updated 2026-02-15 3:33 PM: 1,609 downloads Week 2, Week 3 Day 1 — all code stable*

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
| 1 | Unblock & Ship | ✅ ContextKit v0.6.3 (cloud, doctor, symbols), ✅ Cloud API deployed, ✅ Dashboard deployed, ⏳ Stripe (blocked) |
| 2 | Content Blitz | ✅ 3 articles drafted, ✅ 8 tweets prepared, ✅ GitHub URLs fixed, ✅ All links verified, **🚀 LAUNCH DAY: Feb 12** |
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

**Current: v0.6.10** ✅
- [x] AST-aware chunking
- [x] Query caching
- [x] Better error messages
- [x] `contextkit doctor` command
- [x] Performance benchmarks in README
- [x] Cloud sync architecture
- [x] Symbol analysis (imports, exports)

**v0.6.4** — Feb 11 ✅
- [x] Interactive mode (`contextkit i`)

**v0.6.5** — Feb 11 ✅
- [x] Diff command (`contextkit diff`)
- [x] Interactive mode `/diff` command

**v0.6.6** — Feb 11 ✅
- [x] Export command (`contextkit export`)
- [x] Import command (`contextkit import`)
- [x] Index sharing/backup capability

**v0.6.7** — Feb 11 ✅
- [x] Config presets (`contextkit init --preset <name>`)
- [x] 5 presets: react, node, python, monorepo, fullstack
- [x] `--list-presets` to show available options
- [x] Optimized chunk settings per project type

**v0.6.8** — Feb 11 ✅
- [x] Query history (`contextkit history`)
- [x] Track and re-run past queries
- [x] View query stats (tokens used, chunks found)

**v0.6.9** — Feb 11 ✅
- [x] Fix: Database migration for `query_history` table (upgrading from older versions)

**v0.6.x** — Feb (patches)
- [x] Bug fixes from user feedback
- [x] Documentation improvements (README updated for new commands)

**v0.7.0** — February ✅
- [x] VS Code extension code complete (https://github.com/milo4jo/contextkit-vscode)
- [ ] **Publish to VS Code Marketplace** ← needs Azure DevOps publisher setup
- [x] Cursor integration (MCP setup documented)
- [ ] Product Hunt launch prep

**Cloud API (Deployed)**
- [x] Cloudflare Workers API — https://contextkit-api.milo4jo.workers.dev
- [x] Dashboard — https://dashboard-seven-rouge-80.vercel.app
- [x] Neon PostgreSQL (Frankfurt)
- [x] Qdrant Cloud (Frankfurt)
- [x] Upstash Redis (Frankfurt)
- [x] Clerk Auth (GitHub/Google OAuth)
- [ ] Stripe integration (BLOCKED: needs Jo)
- [ ] Custom domain (app.contextkit.dev)

**v1.0.0** — When stable (Product Hunt launch)
- [ ] Stable API
- [ ] Complete documentation
- [ ] Video tutorials
- [ ] "Production ready" badge

### OGPix (Revenue Product)

**v0.2.0** — THIS WEEK ⚡
- [ ] Activate Lemon Squeezy (needs env var) ← BLOCKED: needs Jo
- [x] Add "Upgrade to Pro" CTAs throughout app (ProBanner, editor CTA)
- [x] Email capture on landing page (WaitlistForm)

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

| Metric | Week 1 (Feb 5-11) | Week 2 (Feb 12-18) | Week 3 (Feb 19-25) | Week 4 |
|--------|-------------------|-------------------|--------|--------|
| ContextKit npm downloads | 1,231 | 1,609 | | |
| OGPix API calls | — | — | | |
| GitHub stars (total) | 0 | 0 ⚠️ | | |
| Twitter followers | — | — | | |
| Revenue (MRR) | $0 | $0 | | |
| Blog post views | — | — | | |

### ✅ Week 2 COMPLETE (Feb 14 - Saturday Evening)

**Final Status:** All code complete. All marketing content ready. Blocked on execution.

**The Numbers:**
- npm: 1,582 downloads (up 28% week-over-week)
- GitHub stars: 0 (no marketing executed yet)
- Reddit/HN posts: 0 (content ready since Feb 10)
- Revenue: $0
- Tests: 253 passing, all green

**What's Ready:**
- ✅ ContextKit v0.6.10 stable
- ✅ VS Code extension VSIX packaged
- ✅ Marketing content: 5 Reddit posts, 3 Twitter threads, HN post
- ✅ OGPix Pro banners & upgrade CTAs
- ✅ Launch runbook with 2-hour setup guide

**Blocked on Jo:**
1. **Marketing** — Reddit/HN posts in `/marketing/`, copy-paste ready
2. **VS Code** — VSIX ready, needs Azure DevOps PAT
3. **Payments** — Lemon Squeezy (OGPix), Stripe (ContextKit Cloud)
4. **Domains** — ogpix.dev, app.contextkit.dev

**Launch Runbook:** See `/docs/LAUNCH_RUNBOOK.md`

### Week 3 (Feb 15-21) ⚠️

**Theme:** Community Seeding — blocked on marketing execution.

**Status (Feb 16 9:49 PM — Monday night):**
- ✅ All code complete, tests passing (all green, turbo cached)
- ✅ ContextKit v0.6.10 stable, 0 vulnerabilities
- ✅ Fixed cookie security vulnerability (GHSA-pxg6-pf52-xh8x) via pnpm override
- ✅ VS Code extension VSIX packaged (contextkit-0.2.0.vsix)
- ✅ Launch runbook complete (`/docs/LAUNCH_RUNBOOK.md`)
- ✅ Dependency audit: no known vulnerabilities, no outdated packages
- ✅ Lint: all passing
- ⏳ Marketing content ready but NOT posted (blocked on Jo)
- ⏳ VS Code Marketplace publish (blocked: needs Azure PAT)
- ⏳ Payment integrations (blocked: needs Stripe + Lemon Squeezy setup)

**npm downloads (organic, no marketing):** 
- Feb 14: 39 downloads
- Feb 15: 26 downloads
- Week 2 total (Feb 9-15): 835 downloads

**Week 3 priority:** Jo needs to execute marketing (Reddit/HN posts ready in `/marketing/`)

**Tasks this week (need Jo):**
- [ ] Post Reddit content (5 subreddits) — content ready in `/marketing/`
- [ ] Submit to Hacker News — content ready
- [ ] Test VS Code extension locally
- [ ] Set up VS Code Marketplace publisher (Azure DevOps PAT)
- [ ] Configure payment systems (see LAUNCH_RUNBOOK.md)

---

### Week 2 Review (Feb 14) ⚠️

**Status:** Content ready but NOT posted. VS Code extension VSIX packaged.

**npm breakdown (Feb 7-14):**
- Feb 8: 800 downloads (spike)
- Feb 11: 542 downloads (spike)
- Other days: 12-115 downloads
- Total: 1,582 (up 28% from week 1)

**Critical Finding:** 0 GitHub stars = Reddit/HN posts were NOT made.
Marketing content is ready in `/marketing/` but Jo needs to post them.

**Today's work (Feb 14):**
- ✅ All 253 tests passing
- ✅ VS Code extension packaged as VSIX (ready for Jo to test locally)
- ✅ Added LICENSE + .vscodeignore to contextkit-vscode repo
- ⏳ Waiting on Jo: Post Reddit/HN content, test VS Code extension

**Action needed:** Jo must post the Reddit/HN content this weekend or early next week.
The longer we wait, the more stale the "launch" feels.

**VS Code Extension ready for local test:**
```bash
code --install-extension /Users/johannesmandle/clawd/contextkit-vscode/contextkit-0.2.0.vsix
```

---

## 🚧 Blockers (Need Jo)

### Resolved ✅
- [x] **npm publish access** — Working (milo4jo account)
- [x] **Vercel deployment issue** — Fixed (monorepo config)
- [x] **ContextKit Cloud Infrastructure** — All deployed (Neon, Qdrant, Redis, Clerk)

### Open
- [ ] **Stripe setup for ContextKit** — Need account + products for cloud monetization
- [ ] **Lemon Squeezy setup for OGPix** — Need account + product + env vars
- [ ] **VS Code Extension testing** — Jo needs to test locally
- [ ] **ogpix.dev domain** — DNS not resolving (check Vercel domains)
- [ ] **app.contextkit.dev domain** — DNS for ContextKit dashboard

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

*Last updated: 2026-02-15 09:35 by Milo 🦊*
*Next review: 2026-02-21 (Friday) — Week 3 end*
