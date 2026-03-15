# Logic Guard: Skills Consolidation Decision

**Review Date:** 2026-02-11
**Reviewer:** Devil's Advocate

---

## My Recommendation: Consolidate to workspace only

**Argument:**
- Removes 46 duplicate skills
- Cleaner structure
- Workspace always wins anyway

---

## Challenge 1: "Why is workspace safer?"

**My claim:** Workspace only is cleaner.

**Counter-argument:**
- If workspace gets corrupted/deleted, ALL skills are lost
- Bundled skills are in npm package - harder to delete accidentally
- Backup exists for a reason

**Evidence:** None provided. I assumed workspace won't corrupt.

---

## Challenge 2: "What's the cost of duplicates?"

**My claim:** 46 duplicates waste space.

**Counter-argument:**
- 46 skills × ~5KB each ≈ 230KB
- Disk space is cheap
- The "waste" is negligible

**Evidence:** I didn't measure actual disk impact.

---

## Challenge 3: "What's the real problem?"

**My claim:** Duplicates cause confusion.

**Counter-argument:**
- Is the confusion real or theoretical?
- Does OpenClaw show both in skill list?
- Does it matter if OpenClaw handles precedence correctly?

**Evidence:** I don't know if users actually see confusion.

---

## Challenge 4: "What if bundled skills are better?"

**My claim:** Workspace is always better.

**Counter-argument:**
- Bundled skills are tested with OpenClaw version
- Repo skills might be newer/unstable
- Maybe bundled is the "tested" version

**Evidence:** None. I assumed workspace is always preferred.

---

## Challenge 5: "What's the effort?"

**My claim:** Just move files.

**Counter-argument:**
- Moving files risks breaking symlinks
- ~/.openclaw/skills has symlinks to Claude Code
- What breaks if I reorganize?

**Evidence:** I didn't check dependencies.

---

## Alternative View: Keep Both

**Arguments for keeping both:**
1. **Safety:** Backup exists if workspace corrupts
2. **Testing:** Bundled = tested with this OpenClaw version
3. **Claude Code:** ~/.openclaw/skills has symlinks, don't touch
4. **Cost:** ~230KB is negligible

**Arguments against:**
1. Confusing to have two places
2. Maintenance overhead

---

## Questions I Should Answer First

1. **Has workspace ever corrupted?** If no, backup concern is theoretical.
2. **Do users see both skill lists?** If no, confusion is theoretical.
3. **Are bundled skills actually tested?** If yes, keeping them makes sense.
4. **What breaks with reorganization?** Need to check symlinks.

---

## Revised Assessment

**Before deciding, I need:**

| Question | My Answer | Evidence |
|----------|-----------|----------|
| Is workspace corruption likely? | Unknown | No data |
| Do users see duplicate confusion? | Unknown | No evidence |
| Are bundled skills better maintained? | Unknown | No comparison |
| What breaks? | Unknown | No testing |

---

## Confidence Score: LOW

**Reasons:**
- No evidence for "consolidate is better"
- Backup value is unquantified
- Effort/risk not analyzed
- User confusion is theoretical

---

## What I Should Do Instead

1. **Measure actual disk usage** - How much space do duplicates waste?
2. **Check if OpenClaw shows both** - Does skill list show duplicates?
3. **Test workspace corruption scenario** - How easy to restore?
4. **Compare skill versions** - Are bundled skills outdated?

---

## Recommendation With LOW Confidence

**Tentatively: Keep both**

**Reasoning:**
- Risk of workspace corruption > disk waste
- Bundled skills might be tested/stable
- Effort to consolidate might exceed benefit

**Confidence:** LOW - needs more evidence.
