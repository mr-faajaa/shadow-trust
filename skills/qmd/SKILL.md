---
name: qmd
description: Local hybrid search for markdown notes and docs. Use when searching notes, finding related content, or retrieving documents from indexed collections.
homepage: https://github.com/tobi/qmd
metadata: {"openclaw":{"emoji":"🔍","requires":{"bins":["tsx"]},"install":[{"id":"clone-qmd","kind":"shell","command":"cd /tmp && git clone --depth 1 https://github.com/tobi/qmd","label":"Clone qmd repo"}]}}
---

# qmd - Quick Markdown Search

Local search engine for Markdown notes, docs, and knowledge bases. Index once, search fast.

## When to use (trigger phrases)

- "search my notes / docs / knowledge base"
- "find related notes"
- "retrieve a markdown document"
- "search local markdown files"

## Setup (Already Done!)

```bash
# Clone and setup
cd /tmp && git clone --depth 1 https://github.com/tobi/qmd
cd qmd && npm rebuild better-sqlite3

# Index workspace memory
tsx src/qmd.ts collection add /home/ubuntu/.openclaw/workspace/memory --name workspace --mask "**/*.md"
tsx src/qmd.ts update
```

## Running qmd

```bash
cd /tmp/qmd && export PATH="$HOME/.local/bin:$PATH" && tsx src/qmd.ts <command>
```

## Commands

```bash
# Search (fast BM25 keyword search)
tsx src/qmd.ts search "query" -n 5

# Vector search (semantic, slower)
tsx src/qmd.ts vsearch "query" -n 5

# List files in collection
tsx src/qmd.ts ls workspace

# Get document
tsx src/qmd.ts get "qmd://workspace/2026-02-16.md"

# Update index
tsx src/qmd.ts update

# Status
tsx src/qmd.ts status
```

## Collection
- **Name:** workspace
- **Path:** /home/ubuntu/.openclaw/workspace/memory
- **Files:** 26 markdown files indexed
