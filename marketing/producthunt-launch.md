# Product Hunt Launch Prep - ContextKit

> **Target Launch:** Month 2, Week 2 (March 12-18, 2026)
> **Best Day:** Tuesday or Wednesday
> **Best Time:** 12:01 AM PT (9:01 AM Berlin)

---

## 🎯 Launch Checklist

### Before Launch (1 week prior)
- [ ] Finalize tagline (max 60 chars)
- [ ] Create Product Hunt product page
- [ ] Upload logo, gallery images, video demo
- [ ] Write description (see below)
- [ ] Add makers (Jo + Milo account if possible)
- [ ] Schedule launch time
- [ ] Prepare hunter (reach out to popular hunter or self-launch)

### Launch Day
- [ ] Wake up early (launch goes live 12:01 AM PT)
- [ ] Post first comment explaining the "why"
- [ ] Share on Twitter immediately
- [ ] Post in Discord communities
- [ ] Share on Reddit (but subtly, link to PH)
- [ ] Respond to ALL comments within 2 hours
- [ ] Update LIVE in first 12 hours if feedback requires

### After Launch
- [ ] Thank everyone who voted/commented
- [ ] Compile feedback into GitHub issues
- [ ] Write "lessons learned" post
- [ ] Update roadmap based on requests

---

## 📝 Product Hunt Listing

### Name
**ContextKit**

### Tagline (max 60 chars)
```
Smart context selection for AI coding assistants
```

Alternative options:
- `Stop dumping your codebase into AI prompts`
- `AI-powered code context selection`
- `Semantic code search for developers`

### Description

**Short (200 chars):**
```
ContextKit indexes your codebase and uses semantic search to find the most relevant code for any query. Works with Claude, GPT, and any AI assistant. Open source CLI + MCP integration.
```

**Full:**
```
🎯 The Problem

AI coding assistants are only as good as the context you give them. But:
- Too much context = expensive, slow, diluted focus
- Too little context = hallucinations, wrong answers
- Manual selection = tedious, doesn't scale

⚡ The Solution

ContextKit indexes your codebase and intelligently selects the most relevant chunks for any query:

`contextkit query "how does authentication work"`

🔥 Key Features

• AST-aware chunking — Respects code boundaries (functions, classes, modules)
• Local embeddings — No API costs, uses Transformers.js
• Token budgets — Fit any context window size
• MCP integration — Claude Desktop can search your code directly
• Query caching — Instant results on repeated queries
• Multi-language — TypeScript, Python, Go, Rust, and more

🚀 Quick Start

npm install -g @milo4jo/contextkit
contextkit index
contextkit query "your question"

Built with ❤️ by Milo (open source, MIT licensed)
```

### Gallery Images (to create)
1. **Hero shot** — Terminal showing query + output
2. **Before/After** — Manual copy-paste vs ContextKit
3. **Architecture** — How it works diagram
4. **Claude Desktop** — MCP integration screenshot
5. **Stats** — npm downloads, GitHub stars

### Video Demo (60-90 sec)
**Script:**
1. (0-15s) Problem: Show frustration of copy-pasting code into AI
2. (15-35s) Solution: Run contextkit index, then query
3. (35-55s) Show MCP: Claude Desktop searching code directly
4. (55-75s) Show features: budget, formats, caching
5. (75-90s) CTA: npm install, GitHub link

---

## 💬 First Comment (Maker Comment)

Post this as soon as the product goes live:

```
Hey Product Hunt! 👋

I'm Milo, and I built ContextKit because I was frustrated with AI coding assistants.

The problem: AI is only as good as the context you give it. But manually picking files is tedious, and dumping your entire codebase hits limits and dilutes focus.

ContextKit uses semantic search to find exactly what you need:
- Ask "how does auth work?" → get the auth code, not everything
- Set a token budget → stay within your model's limits
- Connect Claude Desktop → AI searches your code directly

It runs 100% locally (no API costs) and works with any codebase.

I'd love your feedback:
- What features are missing?
- What would make you try it?
- Any bugs or issues?

Thanks for checking it out! 🦊
```

---

## 📊 Success Metrics

| Metric | Good | Great | Amazing |
|--------|------|-------|---------|
| Upvotes | 100+ | 250+ | 500+ |
| Comments | 20+ | 50+ | 100+ |
| Traffic to GitHub | 200+ | 500+ | 1000+ |
| npm downloads (launch day) | 50+ | 100+ | 250+ |
| Top 10 of the day | ✅ | | |
| Top 5 of the day | | ✅ | |
| #1 Product of the Day | | | ✅ |

---

## 🎨 Assets Needed

| Asset | Status | Notes |
|-------|--------|-------|
| Logo (240x240) | ✅ | `apps/ogpix/public/logo.svg` |
| Gallery image 1 | ❌ | Terminal screenshot |
| Gallery image 2 | ❌ | Before/after |
| Gallery image 3 | ✅ | `marketing/assets/architecture.svg` |
| Video demo | ❌ | 60-90 sec (script ready in assets/README.md) |
| OG image | ❌ | Use OGPix to generate! |

---

## 📢 Launch Day Amplification

### Twitter
- Personal thread announcing launch (prepared)
- Tag relevant accounts (@ProductHunt, @verlovelam, etc.)
- Ask followers to upvote

### Reddit
- Post in r/SideProject
- Comment in daily threads

### Discord
- Claude Discord
- Dev communities
- AI/ML communities

### Email
- Send to newsletter list (if any)
- Personal outreach to dev friends

---

*Created: 2026-02-12 by Milo 🦊*
*Target: Month 2, Week 2 (mid-March 2026)*
