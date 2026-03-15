# ClawVault Skill

Structured memory system for AI agents — typed storage, knowledge graph, context profiles, canvas dashboards, neural graph themes, and Obsidian-native task views. 🐘

## When to Use

Use ClawVault when:
- Agent needs persistent memory across sessions
- You want semantic search over a knowledge base
- Building a "second brain" with Obsidian integration
- Agent needs session continuity (checkpoint/recover)
- Tracking decisions, lessons, people, projects

## Installation

```bash
npm install -g clawvault
npm install -g github:tobi/qmd  # Required for search/context
```

## Vault Structure

```
vault/
├── .clawvault/          # Internal state
│   ├── graph-index.json
│   ├── last-checkpoint.json
│   └── config.json
├── decisions/           # Key choices with reasoning
├── lessons/            # Insights and patterns
├── people/             # One file per person
├── projects/           # Active work tracking
├── tasks/              # Task files with frontmatter
├── backlog/            # Quick captures and ideas
├── handoffs/          # Session continuity
├── inbox/              # Quick captures
└── templates/          # Document templates
```

## Core Commands

### Session Lifecycle
```bash
clawvault wake                      # Start session - loads context
clawvault checkpoint --working-on "task" --focus "details"  # Save progress
clawvault sleep "summary" --next "next steps"  # End session
```

### Storing Memories
```bash
clawvault remember decision "Use PostgreSQL" --content "Chosen for JSONB"
clawvault capture "TODO: Review PR tomorrow"
clawvault remember lesson "Always verify before announcing success"
```

### Searching
```bash
clawvault search "postgresql"              # Keyword search
clawvault vsearch "what did we decide"     # Semantic search (uses qmd)
clawvault context "database migration"     # Graph-aware context
```

### Work Management
```bash
clawvault task add "Ship v2" --owner agent --project core --priority high
clawvault blocked
clawvault project list --status active
```

## OpenClaw Integration

```bash
# Install hook pack
openclaw hooks install clawvault
openclaw hooks enable clawvault

# Verify
clawvault compat
```

The hook automatically:
- Detects context death and injects recovery alerts
- Auto-checkpoints before session resets
- Provides `--profile auto` for context queries

## Context Profiles

Different tasks need different context:

| Profile | Purpose |
|---------|---------|
| default | Balanced retrieval |
| planning | Broader strategic context |
| incident | Recent events, blockers |
| handoff | Session transition |
| auto | Hook-selected based on intent |

```bash
clawvault context --profile planning "Q1 roadmap"
```

## Environment Variables

```bash
export ANTHROPIC_API_KEY="..."    # For Claude features
export OPENAI_API_KEY="..."        # For GPT features
export CLAWVAULT_PATH="/path/to/vault"  # Vault location
```

## Integration with Workspace Memory

- **MEMORY.md** = Boot context (executive summary)
- **ClawVault** = Full knowledge store

Update MEMORY.md periodically with vault state summary, but don't mirror everything.

## Key Features

- 🐘 Local-first — data stays on your machine
- 📝 Markdown-native — works with Obsidian out of the box
- 🔗 Graph-aware — wiki-links build knowledge graph
- 💾 Session-resilient — checkpoint/recover primitives
- 🔍 Semantic search — via qmd integration
- 📊 Canvas dashboards — visual vault status
- ✅ 466 tests passing
