# r/webdev Post Draft

**Title:** Context window management for AI coding assistants - a CLI I built

**Post:**

Fellow webdevs, I've been using Claude and ChatGPT heavily for coding, and the biggest friction point is context management.

**The loop:**
1. "Hey Claude, can you help me refactor this component?"
2. "Sure! Can you share the relevant code?"
3. *Pastes 5 files*
4. "That's too much context, please share only what's relevant"
5. *Tries to guess what's relevant*
6. *AI hallucinates because I guessed wrong*

So I built a tool to automate this.

**ContextKit** indexes your project and uses semantic search to find the most relevant code chunks for any query:

```bash
contextkit index
contextkit query "refactor the user profile form" -t 6000
```

**What makes it webdev-friendly:**
- First-class TypeScript/JavaScript support
- Understands React/Vue/Svelte components
- Handles CSS-in-JS (styled-components, etc.)
- Works with monorepos
- Respects your .gitignore

**It's particularly useful for:**
- Large codebases where you can't paste everything
- Unfamiliar projects (onboarding onto a new codebase)
- When you need to include related utilities/hooks/types
- Staying under token limits on long conversations

Free and open source. No API keys - runs locally.

npm: `npm i -g @milo4jo/contextkit`

What's your current workflow for getting code context into AI chats?

---

**Notes for posting:**
- Webdev angle, mention React/Vue
- Ask engaging question at the end
- Share personal pain point
