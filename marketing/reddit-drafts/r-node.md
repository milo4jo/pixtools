# r/node Post Draft

**Title:** ContextKit - Semantic code search CLI for AI-assisted development (Node.js/TypeScript)

**Post:**

Hey r/node! I built a CLI tool to solve a pain point I kept hitting with AI coding assistants.

**The problem:** When asking Claude or GPT to help with code, you need to paste relevant files. But:
- How do you know which files are relevant?
- What if the relevant code is spread across 10 files?
- How do you stay under token limits?

**The solution:** ContextKit indexes your Node.js/TypeScript project and uses semantic search to find the most relevant code chunks for any query.

```bash
# One-time: index your project
npx @milo4jo/contextkit index

# Get relevant context for your query
npx @milo4jo/contextkit query "how does the API rate limiting work" -t 8000
```

**Why it's Node-native:**
- Written in TypeScript
- Uses tree-sitter for AST parsing (understands JS/TS deeply)
- Respects import/require relationships
- Works with ESM and CommonJS
- npx-ready, no global install needed

**Technical highlights:**
- AST-aware chunking (functions stay intact)
- Import graph analysis (related files get boosted)
- Local embeddings via @xenova/transformers (no API keys, runs on CPU)
- SQLite index for fast queries
- MCP server for Claude Desktop integration

I learned a ton about tree-sitter bindings and building language-aware tools. Happy to share more about the implementation if anyone's interested.

**npm:** @milo4jo/contextkit  
**GitHub:** github.com/milo4jo/contextkit

What do you think? Any features you'd want to see?

---

**Notes for posting:**
- Node-focused angle
- Emphasize TypeScript support
- Be ready to discuss implementation details
