# r/ChatGPT (or r/ClaudeAI) Post Draft

**Title:** Tool I built to automatically select the right code context for ChatGPT/Claude

**Post:**

If you use ChatGPT or Claude for coding, you've probably done this dance:

1. Ask AI to help with something
2. It hallucinates because it doesn't have enough context
3. Paste a bunch of files
4. Hit the token limit
5. Try to figure out what to cut
6. Repeat

I got tired of this, so I built **ContextKit** - a CLI that indexes your codebase and intelligently selects the most relevant code for any prompt.

**How it works:**

```bash
# Index your project once
contextkit index

# Get relevant context for your task
contextkit query "fix the payment processing bug" --tokens 8000
```

It outputs a nicely formatted markdown block with just the relevant code chunks, sorted by importance.

**Why it's better than just pasting files:**
- **Semantic search:** Finds code by meaning, not just keywords
- **Respects token limits:** You set a budget, it stays under
- **AST-aware:** Functions don't get cut in half
- **Import tracking:** Includes dependencies automatically

For Claude Desktop users: it has an MCP integration so you can access it directly from the Claude app.

**It's free and open source.** No API keys needed - embeddings run locally.

npm: `npm i -g @milo4jo/contextkit`

What features would make this more useful for your AI coding workflow?

---

**Notes for posting:**
- Focus on the user pain point
- Less technical, more practical
- Good for r/ChatGPT, r/ClaudeAI, r/LocalLLaMA
