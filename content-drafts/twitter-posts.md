# Twitter/X Posts for Content Blitz

## Week 2 (Feb 12-19)

---

### Post 1: Launch Announcement (Feb 12)
```
🚀 ContextKit v0.5.7 is out!

Stop pasting your entire codebase into Claude.

→ Semantic code search
→ Works offline (local embeddings)  
→ New: Doctor command for debugging
→ VS Code extension coming

npm i -g @milo4jo/contextkit

github.com/milo4jo/contextkit
```

---

### Post 2: Educational Thread (Feb 13)
```
Your AI assistant doesn't need your entire codebase.

It needs the RIGHT 5% for this specific question.

Here's why context selection matters 🧵

1/5
```

```
The problem:

You have 100k lines of code. Claude has 100k token context.

Sounds like a match?

Not really. When you dump everything:
- Responses slow down
- Answers get generic
- You hit limits fast

2/5
```

```
The solution: Semantic search

Instead of "paste everything", you ask:
"What code is relevant to authentication?"

The tool finds:
- auth.ts (the main file)
- middleware.ts (uses auth)
- user.model.ts (auth depends on it)

3/5
```

```
Why this beats grep:

grep "auth" → Returns every file with "auth" in it

Semantic search → Understands MEANING

"How does login work?" finds code even if it never says "login"

4/5
```

```
Try it:

npm i -g @milo4jo/contextkit
cd your-project
contextkit init
contextkit source add ./src
contextkit index
contextkit select "your question"

That's it. 

Link: github.com/milo4jo/contextkit

5/5
```

---

### Post 3: Demo GIF (Feb 14)
```
Built this: 

contextkit select "how does auth work"

→ Returns exactly the 5 files I need
→ Already in my clipboard
→ Ready for Claude

No more grep-ing through folders.

[attach demo gif]
```

---

### Post 4: Engagement (Feb 15)
```
Honest question for devs using AI assistants:

How do you decide what code to paste into Claude/Cursor/Copilot?

I used to just... guess. Then I built a tool for it.

What's your workflow?
```

---

### Post 5: Thread about local-first (Feb 16)
```
Why I built ContextKit to run 100% locally:

Your code never leaves your machine.

Thread 🧵
```

```
Most AI dev tools go cloud-first.

Easier to build. Easier to monetize.

But for a tool that sees your ENTIRE codebase?

Local-first is the only choice that makes sense.

1/4
```

```
The tradeoffs:

Cloud:
✓ Easy to build
✗ Privacy concerns
✗ Latency on every query
✗ Can't work offline

Local:
✓ Total privacy
✓ Instant queries
✓ Works on a plane
✗ Harder to build

2/4
```

```
How we do local embeddings:

@xenova/transformers runs ML models in Node.js

No API calls. No data leaving your machine.

First run downloads the model (~50MB). After that, pure speed.

3/4
```

```
The result:

- Index: ~14 seconds
- Query: ~50ms
- Cached query: <5ms

All local. All private. All yours.

github.com/milo4jo/contextkit

4/4
```

---

### Post 6: Doctor Command Demo (Feb 17)
```
Added this to ContextKit today:

contextkit doctor

One command to diagnose your setup.

✓ Node version
✓ Config status
✓ Index health
✓ Embedding coverage
✗ Problems with fix suggestions

Debugging should be easy.

[screenshot]
```

---

### Post 7: TIL MCP (Feb 18)
```
TIL you can make Claude Desktop use custom tools via MCP

Just added ContextKit and now Claude automatically finds relevant code when I ask about my codebase.

No copy-paste. It just... knows where to look.

contextkit mcp

[link to article]
```

---

### Post 8: Engagement 2 (Feb 19)
```
What's your biggest frustration with AI coding assistants?

For me it was context management.

- Too much = slow + expensive
- Too little = hallucinations
- Just right = tedious to find

So I built something. What would you build?
```

---

## Visual Assets Needed

1. **Demo GIF** — Terminal showing `contextkit select` in action
2. **Doctor Screenshot** — Output of `contextkit doctor`
3. **Comparison Image** — Before (giant paste) vs After (targeted context)
4. **Architecture Diagram** — Simple flow: Code → Index → Query → Context

---

## Posting Schedule

| Date | Time | Post |
|------|------|------|
| Feb 12 | 10:00 | Post 1 (Launch) |
| Feb 13 | 10:00 | Post 2 (Thread) |
| Feb 14 | 15:00 | Post 3 (Demo) |
| Feb 15 | 12:00 | Post 4 (Engagement) |
| Feb 16 | 10:00 | Post 5 (Local-first thread) |
| Feb 17 | 14:00 | Post 6 (Doctor) |
| Feb 18 | 10:00 | Post 7 (MCP TIL) |
| Feb 19 | 12:00 | Post 8 (Engagement) |

---

*Prepared by Milo 🦊*
