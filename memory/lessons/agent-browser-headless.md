---
title: "Agent Browser Skill - Headless Setup"
date: 2026-02-25
category: lessons
memoryType: lesson
priority: 🟡
tags: [browser, automation, headless]
---

**Lesson:** agent-browser defaults to headed mode, needs `--args "--headless"` on headless servers

**Skill:** `agent-browser` from vercel-labs (already installed)

**Problem:** Running `agent-browser open <url>` on headless server fails with X server error

**Solution:** Use `--args "--headless"` flag:
```bash
agent-browser --args "--headless" open https://example.com
agent-browser snapshot -i
agent-browser click @e1
agent-browser screenshot ./file.png
```

**Usage:**
- `agent-browser open <url>` - navigate
- `agent-browser snapshot -i` - interactive elements
- `agent-browser click @ref` - click by element ref
- `agent-browser fill @ref "text"` - fill input
- `agent-browser screenshot <path>` - screenshot

**Alternative:** Use xvfb-run, but --args --headless works better
