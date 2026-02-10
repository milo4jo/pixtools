# r/programming Post Draft

**Title:** I built a CLI that intelligently selects code context for LLMs (so you don't have to manually copy-paste files)

**Post:**

After months of manually copying files into Claude/GPT prompts and hitting token limits, I decided to automate the process.

**The problem:** When using AI coding assistants, you need to provide context. But which files? How much? Paste too little and the AI hallucinates. Paste too much and you blow your token budget (or your wallet).

**The solution:** ContextKit indexes your codebase semantically, then intelligently selects the most relevant chunks for any query. It uses AST-aware chunking (so functions don't get cut in half) and understands import relationships.

**Example:**
```bash
# Index your project
contextkit index

# Get context for a specific task
contextkit query "fix the authentication bug in the login flow" -t 4000
```

It outputs formatted markdown with the relevant code chunks, sorted by relevance.

**Features:**
- AST-aware chunking for JS/TS/Python/Go/Rust/Java/C#/PHP
- Understands import/require relationships
- Configurable token budget
- Local embeddings (privacy-first, no API calls)
- MCP integration for Claude Desktop
- Free and open source (MIT)

**What I learned building this:**
1. Chunking is harder than it looks - you need to respect code boundaries
2. Import graphs are incredibly useful for context - if you need file A, you probably need its dependencies
3. Local embeddings (Xenova/transformers) are surprisingly good and fast

Would love feedback. What features would make this more useful for your workflow?

GitHub: github.com/milo4jo/contextkit
npm: `npm i -g @milo4jo/contextkit`

---

**Notes for posting:**
- Post on a weekday morning (US time)
- Be ready to answer questions quickly
- Don't be defensive about criticism
- Engage genuinely with suggestions
