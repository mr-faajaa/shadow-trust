# Skills Structure - VERIFIED

**Date:** 2026-02-11
**Status:** ✅ VERIFIED via OpenClaw docs

---

## Official Skills Locations (Precedence Order)

```
1. WORKSPACE SKILLS          → /home/ubuntu/.openclaw/workspace/skills/ (138 skills)
   Highest precedence!
   User-owned, active skills
   Cloned repos go here
   
2. MANAGED/LOCAL SKILLS      → ~/.openclaw/skills/ (5 skills)
   Local overrides
   Symlinks to Claude Code (.agents/skills/)
   
3. BUNDLED SKILLS (npm)     → /nvm/.../openclaw/skills/ (105 skills)
   Lowest precedence
   Shipped with npm package
```

## How Precedence Works

If the same skill exists in multiple locations:
```
workspace wins → managed/local → bundled
```

**Example:** If `brand-voice` exists in both workspace and bundled, OpenClaw uses the workspace version.

## What This Means for Our Setup

### Current State: ✅ CORRECT

| Location | Count | Status |
|----------|-------|--------|
| `/workspace/skills/` | 138 | Active - OpenClaw uses these |
| `~/.openclaw/skills/` | 5 | Claude Code symlinks |
| Bundled (npm) | 105 | Backup/templates |

### The "Duplicate" Issue: ✅ INTENDED

- Having `brand-voice` in both workspace and bundled is FINE
- OpenClaw uses workspace version (higher precedence)
- Duplicates don't cause problems
- This is intentional design

## What I Learned

### From OpenClaw Docs (https://docs.openclaw.ai/tools/skills)

> "Skills are loaded from three places:
> - Bundled skills: shipped with the install
> - Managed/local skills: ~/.openclaw/skills
> - Workspace skills: /skills (highest precedence)
> 
> If a skill name conflicts, precedence is:
> <workspace>/skills (highest) → ~/.openclaw/skills → bundled skills (lowest)"

### Configuration

Skills can be configured in `~/.openclaw/openclaw.json`:
```json
{
  "skills": {
    "entries": {
      "skill-name": {
        "enabled": true,
        "apiKey": "...",
        "env": { ... },
        "config": { ... }
      }
    },
    "load": {
      "extraDirs": ["/path/to/more/skills"]
    }
  }
}
```

## Workspace vs Claude Code

**~/.openclaw/skills/** contains symlinks to **`.agents/skills/`**:
- Claude Code's skills folder
- Separate from OpenClaw's workspace
- 5 skills symlinked

**/home/ubuntu/.openclaw/workspace/skills/** contains:
- OpenClaw's workspace skills
- 138 skills cloned from various repos
- HIGHEST precedence - OpenClaw uses these

## Conclusion

✅ **Structure is correct**
✅ **Duplicates are fine (precedence handles them)**
✅ **Workspace skills are the active ones**
✅ **138 skills are being used by OpenClaw**

## No Changes Needed

The current setup is optimal:
1. Workspace skills (138) = active, highest precedence
2. Managed skills (5) = Claude Code symlinks
3. Bundled skills (105) = backup, lowest precedence

OpenClaw automatically uses workspace skills and falls back to others only if a skill is missing.

---

## Reference

- Docs: https://docs.openclaw.ai/tools/skills
- Config: `~/.openclaw/openclaw.json`
- Workspace: `/home/ubuntu/.openclaw/workspace`
