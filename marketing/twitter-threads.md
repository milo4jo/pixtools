# Twitter/X Threads - Ready to Post

> Copy-paste these threads. Use a thread scheduler like Typefully for best results.

---

## Thread 1: Product Launch

**Tweet 1/6:**
🧵 I built a tool that solves the biggest pain point of AI-assisted coding:

The context window problem.

Here's how ContextKit works:

**Tweet 2/6:**
The problem:

Your codebase is 50,000 lines.
Claude's context is 100k tokens.
But you can't just paste everything.

Half is irrelevant.
Manually picking files? Tedious.
Miss something? AI gives wrong answers.

**Tweet 3/6:**
The solution:

```
contextkit index
contextkit query "how does auth work"
```

It uses semantic search to find the EXACT code you need.

No more guessing. No more "I don't have access to that file."

**Tweet 4/6:**
What makes it smart:

• AST-aware chunking (doesn't cut functions in half)
• Local embeddings (no API costs)
• Token budgets (fit any context window)
• MCP server (Claude searches your code directly)

**Tweet 5/6:**
1,200+ npm downloads last week.

Open source. MIT licensed.

```
npm install -g @milo4jo/contextkit
```

**Tweet 6/6:**
Built by @milo4jo 🦊

GitHub: github.com/milo4jo/contextkit

What's YOUR biggest frustration with AI coding assistants?

---

## Thread 2: Tutorial Style

**Tweet 1/5:**
The one trick that 10x'd my AI coding sessions:

Stop manually copying files.

Let me show you 👇

**Tweet 2/5:**
Before: 
"Let me paste auth.ts... and the types... and maybe the middleware... oh no, I forgot the utils... *context limit exceeded*"

**Tweet 3/5:**
After:

```bash
contextkit query "explain the authentication flow" --budget 8000
```

Returns: perfectly sized context, most relevant code first.

Semantic search finds what you need. AST parsing respects code boundaries.

**Tweet 4/5:**
Bonus: It works with Claude Desktop directly.

No copy-pasting at all. 

Claude just... searches your codebase. 🤯

(MCP integration ftw)

**Tweet 5/5:**
Try it:

```
npm i -g @milo4jo/contextkit
contextkit index
contextkit query "your question"
```

Free. Open source. 

github.com/milo4jo/contextkit

---

## Thread 3: Technical Deep Dive

**Tweet 1/7:**
How I built a semantic code search engine in TypeScript 🧵

(No external APIs. Runs locally. <500ms queries.)

**Tweet 2/7:**
The stack:

• tree-sitter → AST parsing for 10+ languages
• Transformers.js → local embeddings (all-MiniLM-L6-v2)
• SQLite → chunk storage + metadata
• BM25 + vector similarity → hybrid search

**Tweet 3/7:**
The chunking strategy:

Don't split by lines. Split by AST nodes.

A function = one chunk.
A class = one chunk.
An import block = one chunk.

Context is preserved. AI understands better.

**Tweet 4/7:**
The search:

1. BM25 for keyword matching
2. Vector similarity for semantic meaning
3. Weighted combination (0.7 semantic, 0.3 lexical)
4. Token budget truncation

Query caching makes repeated queries instant.

**Tweet 5/7:**
The MCP magic:

Claude Desktop's Model Context Protocol lets you expose tools.

ContextKit runs as an MCP server.

Claude can search your code without you lifting a finger.

**Tweet 6/7:**
Performance:

• Indexing: ~30 sec for 10k LOC
• Query: ~400ms (first run), ~50ms (cached)
• Memory: ~200MB peak during indexing

All local. No API costs.

**Tweet 7/7:**
Try it:

```
npm i -g @milo4jo/contextkit
```

Source: github.com/milo4jo/contextkit

Built by @milo4jo 🦊

---

## Single Tweets (Daily Posts)

**Monday:**
Tip: When asking AI about your code, don't paste random files.

Use semantic search to find what's actually relevant.

`contextkit query "how does X work" --budget 8000`

Saves time. Better answers. 🎯

---

**Tuesday:**
PSA for Claude Desktop users:

You can connect it directly to your codebase.

ContextKit's MCP server lets Claude search your code without copy-pasting.

`npx @milo4jo/contextkit mcp`

Game changer.

---

**Wednesday:**
The hardest part of AI coding isn't the prompts.

It's getting the RIGHT context into the prompt.

Been working on this problem for months. Finally solved it.

---

**Thursday:**
Built something? 

Your code has ~100k lines.
Context window is 100k tokens.

Sounds fine, right?

Wrong. Half that code is irrelevant to your question.

The skill is SELECTING the right context.

---

**Friday:**
Weekend project idea:

Index your codebase with embeddings.
Query it semantically.
Feed results to your AI assistant.

Or just: `npm i -g @milo4jo/contextkit`

---

*Created: 2026-02-10 by Milo 🦊*
