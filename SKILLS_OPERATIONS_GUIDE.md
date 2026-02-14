# OpenClaw Skills Operations Guide

_A self-documenting guide for skill management, installation, and security_

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `clawhub search <query>` | Find skills on ClawHub |
| `clawhub install <skill>` | Install to workspace |
| `clawhub update --all` | Update all installed skills |
| `ls /skills` | List all skills |

---

## 1. Installing New Skills (CORRECT Workflow)

### Step 1: Check OpenClaw Docs FIRST
```bash
# ALWAYS do this before installing anything
openclaw docs skills
# or visit: https://docs.openclaw.ai/tools/skills
```

### Step 2: Find Skills
```bash
# Search ClawHub
clawhub search <keyword>

# Examples
clawhub search ui
clawhub search blockchain
clawhub search react
```

### Step 3: Security Audit (REQUIRED)
**Before installing any external skill, scan it:**

```bash
# Using ai.gendigital.com security scanner
curl --request POST \
  --url "https://ai.gendigital.com/api/scan/lookup" \
  --header "Content-Type: application/json" \
  --data '{"skillUrl":"https://clawhub.ai/author/skill-name"}'
```

**Always:**
- Read SKILL.md before enabling
- Check for suspicious code (curl | bash, hidden commands)
- Look for hardcoded API keys or secrets
- Verify the author/source is trusted

### Step 4: Install
```bash
# Install to workspace (highest precedence)
clawhub install <skill-name>

# Or manually clone to /skills
cd /home/ubuntu/.openclaw/workspace/skills
git clone <skill-repo-url>
```

### Step 5: Verify
```bash
# Check skill exists
ls /skills | grep <skill-name>

# Check skill has proper structure
cat /skills/<skill-name>/SKILL.md | head -20
```

---

## 2. Skills Locations (Precedence)

OpenClaw loads skills from three locations:

| Path | Type | Precedence | Purpose |
|------|------|------------|---------|
| `/skills` | Symlink → workspace/skills | **HIGHEST** | Your workspace skills |
| `~/.openclaw/skills` | Symlink → workspace/skills | MEDIUM | Managed/local overrides |
| Bundled skills | npm package | LOWEST | Shipped with OpenClaw |

**Key insight:** `/skills` must exist and point to your workspace skills for OpenClaw to find them.

### Setup (if /skills doesn't exist)
```bash
# Create symlink to workspace skills
sudo ln -s /home/ubuntu/.openclaw/workspace/skills /skills

# Verify
ls -la /skills  # Should show skills folder
```

---

## 3. Skill Format (Required)

Every skill MUST have a `SKILL.md` with YAML frontmatter:

```yaml
---
name: skill-name
description: Brief description of what the skill does
metadata: {"openclaw": {"requires": {"bins": ["binary-name"]}}}
---
# Skill Name

Detailed instructions for the skill...
```

### Optional Frontmatter Fields

| Field | Purpose |
|-------|---------|
| `user-invocation` | Expose as slash command |
| `disable-model-invocation` | Exclude from model prompt |
| `command-dispatch` | Bypass model, dispatch to tool |
| `metadata.openclaw.requires.bins` | Required binaries |
| `metadata.openclaw.requires.env` | Required env vars |
| `metadata.openclaw.install` | Auto-install instructions |

---

## 4. Categories Reference

### 🎨 Frontend & UI (28 skills)
**When:** Building web interfaces, React components, design systems

Key skills:
- `react-dev` - React patterns
- `tailwindcss` - Tailwind utilities
- `baseline-ui` - UI constraints
- `accessibility` - WCAG compliance
- `frontend-design` - Production UI

### ⚡ Backend & APIs (12 skills)
**When:** Server-side, databases, API routes

Key skills:
- `native-data-fetching` - Fetch/React Query
- `database-schema-designer` - Schema design
- `expo-api-routes` - API routes

### 🪙 Blockchain & Web3 (12 skills)
**When:** Crypto, onchain operations, DeFi

Key skills:
- `allium-onchain-data` - Blockchain queries
- `bankr` - Trading agent
- `onchainkit` - Coinbase SDK

### 🤖 AI & Agents (8 skills)
**When:** Building autonomous agents

Key skills:
- `agent-development` - Agent structure
- `logical-guard` - Adversarial validation
- `brainstorm-ideas` - Creative ideation

### 🛠️ DevOps & Tooling (22 skills)
**When:** Debugging, CI/CD, workflow automation

Key skills:
- `debugging-strategies` - Systematic debugging
- `dependency-updater` - Safe updates
- `vercel-deploy` - Vercel deployment

### 📝 Communication (15 skills)
**When:** Writing docs, updates, marketing

Key skills:
- `writing-clearly-concisely` - Clear writing
- `doc-coauthoring` - Documentation workflow
- `commit-work` - Git commits

### 🔍 Research & Analysis (10 skills)
**When:** Web search, data analysis

Key skills:
- `perplexity` - Web search
- `data-exploration` - Dataset profiling
- `competitive-analysis` - Competitor research

### 🎬 Media & Presentation (10 skills)
**When:** Videos, slides, visual content

Key skills:
- `create-remotion-geist` - Remotion videos
- `marp-slide` - Markdown slides
- `meme-factory` - Memes

### 📋 Project Management (10 skills)
**When:** Planning, requirements, roadmaps

Key skills:
- `feature-spec` - PRDs
- `roadmap-management` - Prioritization
- `requirements-clarity` - Ambiguity resolution

### ✅ Code Quality (10 skills)
**When:** Reviews, testing, best practices

Key skills:
- `code-review-excellence` - Review practices
- `test-driven-development` - TDD
- `verification-before-completion` - Pre-commit checks

---

## 5. Security Checklist (MANDATORY)

Before using ANY skill:

- [ ] Read SKILL.md entirely
- [ ] Check for `curl | bash` or hidden commands
- [ ] Verify author is trusted (ClawHub, known developers)
- [ ] Scan with `ai.gendigital.com` if unfamiliar
- [ ] Check for hardcoded secrets/API keys
- [ ] Look for suspicious network calls
- [ ] Test in sandboxed environment first

### Known Trusted Sources
- ✅ ClawHub (verified skills)
- ✅ Anthropic official skills
- ✅ Vercel Labs
- ✅ Softaworks
- ⚠️ Third-party GitHub repos (scan first)
- ❌ Unknown sources (avoid)

---

## 6. Troubleshooting

### Skills not showing up
```bash
# Check /skills symlink exists
ls -la /skills

# Check OpenClaw workspace config
grep '"workspace"' ~/.openclaw/openclaw.json

# Restart gateway
systemctl --user restart openclaw-gateway
```

### Gateway won't restart
```bash
# Enable restart in config
openclaw config set commands.restart true

# Or restart manually
systemctl --user restart openclaw-gateway
```

### Skills watcher not working
```bash
# Add to ~/.openclaw/openclaw.json
{
  "skills": {
    "load": {
      "watch": true,
      "watchDebounceMs": 250
    }
  }
}

# Restart gateway
systemctl --user restart openclaw-gateway
```

---

## 7. Best Practices

### DO
- ✅ Check docs before installing
- ✅ Security audit unfamiliar skills
- ✅ Keep skills organized by category
- ✅ Use workspace skills (highest precedence)
- ✅ Document custom skills

### DON'T
- ❌ Install without reading SKILL.md
- ❌ Trust unknown sources
- ❌ Keep duplicate skills
- ❌ Ignore security warnings
- ❌ Let skills pile up without organization

---

## 8. Quick Install Commands

```bash
# UI Skills
clawhub install baseline-ui
clawhub install accessibility
clawhub install tailwindcss

# Blockchain
clawhub install allium-onchain-data

# DevOps
clawhub install debugging-strategies
clawhub install vercel-deploy

# Communication
clawhub install writing-clearly-concisely

# Research
clawhub install perplexity
```

---

## 9. Environment Variables

Some skills require environment variables. Add to `~/.openclaw/openclaw.json`:

```json
{
  "skills": {
    "entries": {
      "skill-name": {
        "enabled": true,
        "env": {
          "API_KEY": "your-key-here"
        }
      }
    }
  }
}
```

---

## References

- Docs: https://docs.openclaw.ai/tools/skills
- ClawHub: https://clawhub.com
- Security Scanner: https://ai.gendigital.com

---

*Last updated: 2026-02-14*
*Total skills: 152*
