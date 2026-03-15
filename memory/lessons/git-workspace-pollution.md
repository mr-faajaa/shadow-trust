---
title: "Git Workspace Pollution Prevention"
date: 2026-02-07
category: lessons
memoryType: lesson
priority: 🔴
tags: [git, workflow, best-practices]
---

**Lesson:** Git workspace pollution - never run `git add -A` from workspace root

**Incident:** While working on ShadowTrust hackathon project, ran `git add -A` from `/home/ubuntu/.openclaw/workspace/` instead of `/home/ubuntu/.openclaw/workspace/shadow-trust/`. This committed 635 OpenClaw workspace files (skills, MEMORY.md, AGENTS.md, SOUL.md, etc.) into the ShadowTrust GitHub repository.

**What happened:**
- ShadowTrust repo was imported with OpenClaw workspace files included
- Commit history showed OpenClaw files mixed with project files
- Had to force-push a clean version to fix

**What I should have done:**
1. **Always `cd` into project directory first** before running git commands
2. **Check `git status`** to verify only project files are modified
3. **Use explicit `git add <files>`** instead of wildcard `git add -A`
4. **Never run git commands from `/home/ubuntu/.openclaw/workspace/` root**

**Correct workflow:**
```bash
# WRONG
cd /home/ubuntu/.openclaw/workspace
git add -A
git commit -m "..."

# CORRECT
cd /home/ubuntu/.openclaw/workspace/shadow-trust
git add src/ package.json README.md
git commit -m "..."
```

**If pollution occurs:**
1. Create clean clone in /tmp
2. Copy only project files (src/, *.json, README.md)
3. Commit and force-push
4. Notify user immediately
