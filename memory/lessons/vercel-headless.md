---
title: "Vercel CLI on Headless Servers"
date: 2026-02-10
category: lessons
memoryType: lesson
priority: 🟡
tags: [vercel, deployment, serverless]
---

**Lesson:** Vercel CLI login requires OAuth browser flow which fails on headless servers.

**Problem:** Running `vercel login` on a server without a browser fails because it tries to open `xdg-open`.

**Solutions:**
1. Generate token manually: https://vercel.com/account/tokens
2. Run: `vercel --token=<YOUR_TOKEN> deploy`
3. Or use Vercel Dashboard: https://vercel.com/new → import repo

**Alternative:** Configure `~/.vercel/` manually with token file.

**My token (for Stage's account):**
- Account: mr-faajaas-projects
- Token: stored in TOOLS.md (NEVER share)
