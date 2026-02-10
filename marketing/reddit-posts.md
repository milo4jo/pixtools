# Reddit Posts - Ready to Post

> **Instruction for Jo:** Copy-paste these into the relevant subreddits. 
> Best posting times: Tuesday-Thursday, 9-11 AM EST (3-5 PM Berlin)

---

## r/programming

**Title:** I built an open-source tool to solve the "too much context" problem with AI coding assistants

**Body:**
After months of wrestling with Claude, GPT, and Copilot hitting context limits, I built ContextKit - a CLI that intelligently selects the most relevant code chunks for your query.

**The problem:** You want to ask "how does the auth flow work?" but your codebase is 50k+ lines. Pasting everything fails. Manually picking files is tedious.

**The solution:** `contextkit query "how does auth work"` → returns only the relevant chunks, ranked by semantic similarity.

**Key features:**
- AST-aware chunking (respects code boundaries)
- Semantic search with local embeddings
- MCP integration (works directly with Claude Desktop)
- Caches queries for speed
- Works with any codebase (TypeScript, Python, Go, etc.)

**Install:** `npm install -g @milo4jo/contextkit`

**GitHub:** https://github.com/milo4jo/contextkit

Would love feedback from anyone dealing with similar context management issues!

---

## r/node

**Title:** [Tool] ContextKit - Smart context selection for AI coding assistants

**Body:**
Hi r/node!

I made a CLI tool that helps you work with AI coding assistants more effectively. Instead of manually copying files or hitting context limits, ContextKit automatically finds the most relevant code for your query.

```bash
npm install -g @milo4jo/contextkit
contextkit index
contextkit query "explain the API routes"
```

**What it does:**
- Indexes your codebase with semantic embeddings (local, no API calls)
- Uses AST parsing to create smart chunks (not just line-based splitting)
- Ranks results by relevance to your query
- MCP server for direct Claude Desktop integration

Built with TypeScript, uses tree-sitter for parsing. ~1200 downloads last week!

GitHub: https://github.com/milo4jo/contextkit

Feedback welcome!

---

## r/ChatGPT (or r/ClaudeAI)

**Title:** Tool that auto-selects the right code context for your AI prompts

**Body:**
I was tired of manually copy-pasting code files into ChatGPT/Claude, so I built ContextKit.

**Before:** "Let me find auth.ts... and middleware.ts... and maybe types.ts... *hits context limit*"

**After:** `contextkit query "how does authentication work" --budget 8000` → perfectly sized context, most relevant code first.

It uses semantic search + AST parsing to find exactly what you need. Works with any codebase.

Install: `npm install -g @milo4jo/contextkit`

For Claude Desktop users: It has an MCP server built in, so Claude can query your codebase directly!

---

## r/webdev

**Title:** Finally solved my context window problem when using AI for coding

**Body:**
If you use AI assistants for coding help (Claude, GPT, Copilot), you've probably hit the context limit problem. Your codebase is too big to paste entirely, but manually selecting files means you might miss relevant code.

I built ContextKit to fix this:

1. **Index your project:** `contextkit index`
2. **Query semantically:** `contextkit query "how does the payment flow work"`
3. **Get ranked results:** Most relevant code chunks, within your token budget

It uses local embeddings (no API costs) and AST-aware chunking (doesn't cut functions in half).

**Bonus:** If you use Claude Desktop, there's an MCP server so Claude can search your codebase directly.

`npm install -g @milo4jo/contextkit`

What tools do you use for managing AI context?

---

## r/LocalLLaMA

**Title:** Built a context selection tool that works great with local models

**Body:**
Local LLMs often have smaller context windows than cloud models. I built ContextKit to help make the most of limited context:

```bash
contextkit query "explain the database schema" --budget 4000 --format clipboard
```

It:
- Uses local embeddings (Transformers.js, no API calls)
- AST-aware chunking (respects code structure)
- Token budget control (stay within your model's limits)
- Clipboard output for easy pasting

Works especially well when you need to fit context into 4K-8K token models.

`npm install -g @milo4jo/contextkit`

GitHub: https://github.com/milo4jo/contextkit

---

# Hacker News - Show HN

**Title:** Show HN: ContextKit – Smart context selection for AI coding assistants

**Body:**
ContextKit is a CLI tool that solves the "too much code" problem when working with AI assistants.

Instead of manually copying files or hitting context limits, it uses semantic search to find the most relevant code for your query:

```
contextkit index
contextkit query "how does the API authentication work"
```

Key features:
- AST-aware chunking using tree-sitter (respects code boundaries)
- Local embeddings with Transformers.js (no API costs)
- MCP server for Claude Desktop integration
- Token budget control
- Query caching for speed

Tech: TypeScript, tree-sitter, Transformers.js

npm: https://www.npmjs.com/package/@milo4jo/contextkit
GitHub: https://github.com/milo4jo/contextkit

Built this after getting frustrated with manually managing context when using Claude for coding. Would love to hear how others solve this problem.

---

# Post Schedule

| Day | Platform | Post |
|-----|----------|------|
| Tue | r/programming | Main post |
| Wed | r/node | Node-focused post |
| Thu | Hacker News | Show HN |
| Fri | r/ChatGPT or r/ClaudeAI | User-focused post |
| Mon (next) | r/webdev | Webdev angle |

**Tips:**
- Respond to ALL comments within first 2 hours
- Don't be defensive about criticism
- Thank people for feedback
- Add to README if someone suggests a good feature

---

*Created: 2026-02-10 by Milo 🦊*
