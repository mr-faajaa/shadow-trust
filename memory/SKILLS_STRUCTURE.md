# Skills Structure Research & Brainstorm

**Date:** 2026-02-11
**Problem:** Duplicate skills across two locations, unclear purpose

---

## Current Structure

```
/home/ubuntu/.nvm/versions/node/v25.5.0/lib/node_modules/openclaw/skills/
└── 105 skills (OpenClaw's core skills from npm)

/home/ubuntu/.openclaw/workspace/skills/
└── 138 skills (Claude Code skills from cloned repos)
```

## Overlap Analysis

| Skill | In OpenClaw? | In Workspace? |
|-------|-------------|--------------|
| brand-voice | ✅ | ✅ (duplicated) |
| code-review-excellence | ✅ | ✅ (duplicated) |
| agent-development | ❌ | ✅ (Claude Code only) |
| agent-browser | ✅ | ✅ (duplicated) |
| brain... | ❌ | ✅ (Claude Code only) |

---

## Key Findings

### OpenClaw Skills (npm)
- Located in npm package: `/openclaw/skills/`
- Pre-installed with OpenClaw
- 55 original + 50 installed
- Used by OpenClaw system

### Workspace Skills (Claude Code)
- Located in workspace: `/workspace/skills/`
- From cloned repos (vercel-labs, anthropics, etc.)
- Claude Code-specific skills (agent-development, brain storming, etc.)
- Some overlap with OpenClaw skills

---

## Questions to Resolve

1. **What is `/workspace/skills/` for?** Claude Code or backup?
2. **Should skills be shared or separate?**
3. **Are duplicates wasteful?**
4. **What's the source of truth?**

---

## Option 1: Consolidate (One Source of Truth)

```
/openclaw/skills/
├── OpenClaw-specific skills
└── Claude Code shared skills

/workspace/skills/ → DELETE (symlink to /openclaw/skills/)
```

**Pros:**
- Single location
- No duplicates
- Clear source of truth

**Cons:**
- Claude Code skills might conflict with OpenClaw skills
- Harder to manage different update cycles

---

## Option 2: Keep Separate (Two Systems)

```
/openclaw/skills/                    ← OpenClaw core (105)
/home/ubuntu/.openclaw/workspace/skills/  ← Claude Code (138)
```

**Pros:**
- Clear separation
- Independent update cycles
- Claude Code can have its own skills

**Cons:**
- Duplicates exist
- Confusion about what's where
- More maintenance

---

## Option 3: Workspace Skills = Claude Code Only

```
/openclaw/skills/                    ← OpenClaw (keep as-is)
/home/ubuntu/.openclaw/workspace/skills/  ← Claude Code only, ignore for OpenClaw
```

**Pros:**
- Clear separation of concerns
- Claude Code has its ecosystem
- No duplication confusion

**Cons:**
- Need to understand Claude Code's skill loader
- Might miss synergies

---

## Recommended Approach

**Option 2 with cleanup:**

1. **Keep separate** - they're for different systems
2. **Remove duplicates** - if same skill exists, keep in one place
3. **Document purpose** - MEMORY.md explains what's where
4. **Use workspace/skills for Claude Code** - let it manage itself

**Cleanup steps:**
1. Identify duplicates
2. Keep one copy (probably workspace/skills for Claude Code)
3. Document in MEMORY.md

---

## Questions for User

1. Is `/workspace/skills/` meant for Claude Code or both systems?
2. Do you want to consolidate or keep separate?
3. Should I remove duplicates?

---

## Next Steps

1. Answer questions above
2. Implement chosen approach
3. Update MEMORY.md with clear structure
