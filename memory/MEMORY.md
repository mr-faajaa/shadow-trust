# Memory Index - CORRECTED

**Master guide to where information lives.** Use `memory_search` to find content within files.

## Skills Structure (VERIFIED ✅)

OpenClaw uses THREE skill locations with precedence order:

```
1. WORKSPACE SKILLS          → /home/ubuntu/.openclaw/workspace/skills/ (138 skills) ← ACTIVE
2. MANAGED/LOCAL SKILLS     → ~/.openclaw/skills/ (5 symlinks to Claude Code)
3. BUNDLED SKILLS (npm)     → /nvm/.../openclaw/skills/ (105 skills - backup)
```

**Precedence:** workspace > managed/local > bundled

**Duplicates are fine!** - If `brand-voice` exists in both workspace and bundled, OpenClaw uses workspace (higher precedence).

## What Each Location Contains

### 1. Workspace Skills (138) ✅ ACTIVE
- `/home/ubuntu/.openclaw/workspace/skills/`
- HIGHEST precedence
- All cloned repos go here
- OpenClaw uses these actively

**Categories:**
- Blockchain/Finance: bankr, erc-8004, allium-onchain-data, botchan, onchainkit, clanker, etc.
- UI/Components: shadcn-mcp, shadcn-ui, ui-ux-pro-max, baseline-ui, etc.
- Vercel Labs: vercel-deploy, react-best-practices, next-best-practices, etc.
- Anthropics: data-visualization, sql-queries, feature-spec, etc.
- Security: solana-vulnerability-scanner, audit-website, etc.
- Developer: code-review-excellence, error-handling-patterns, etc.
- + More (total 138)

### 2. Managed Skills (5)
- `~/.openclaw/skills/`
- Symlinks to Claude Code skills (`.agents/skills/`)
- Separate from OpenClaw workspace

### 3. Bundled Skills (105)
- `/nvm/.../openclaw/skills/`
- Shipped with npm package
- Lowest precedence
- Backup/templates

## How Skills Work

### Loading
- OpenClaw loads eligible skills at session start
- Filters by `metadata.openclaw.requires` (bins, env, config)
- Applies precedence on conflicts

### Configuration
In `~/.openclaw/openclaw.json`:
```json
{
  "skills": {
    "entries": {
      "skill-name": {
        "enabled": true,
        "apiKey": "...",
        "env": { ... }
      }
    }
  }
}
```

## Folder Structure

```
memory/
├── MEMORY.md                    ← You are here
├── integrations/                 ← Deep research + security analysis
├── security/                     ← Security patterns
├── marketing/                    ← Copywriting strategies
├── ideas/                         ← Prompts to act on
├── projects/                       ← Active projects
├── YYYY-MM-DD.md                  ← Daily notes
├── SKILLS_STRUCTURE_VERIFIED.md    ← Skills structure (MUST READ)
└── SKILLS_STRUCTURE_REVIEW.md     ← Logic guard critique
```

## Rules

1. **Install new skills to workspace/skills/** - This is the active location
2. **Duplicates are fine** - Workspace wins on conflicts
3. **Claude Code skills are separate** - In ~/.openclaw/skills

## Quick Reference

| What | Where |
|------|-------|
| Active skills | `/home/ubuntu/.openclaw/workspace/skills/` (138) |
| Claude Code | `~/.openclaw/skills/` (5 symlinks) |
| Backup skills | npm bundled (105) |
| Docs | https://docs.openclaw.ai/tools/skills |

## Last Updated

2026-02-11
