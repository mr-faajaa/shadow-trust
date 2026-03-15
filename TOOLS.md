# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:
- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

---

## My Tools & Capabilities

### File & Code
- **read/write/edit**: Read, write, edit any file in workspace
- **exec**: Run shell commands
- **skills**: Install and use skills from ClawHub

### Web
- **web_search**: Search the web (Brave API)
- **web_fetch**: Fetch URLs and extract content
- **camoufox**: Anti-detection browser for Google/Amazon/LinkedIn/etc.

### Messaging (Discord, Telegram, WhatsApp, Signal, etc.)
- **message**: Send messages, media, reactions
- Use `--media /path/to/image.png` to send images

### Memory & Search
- **memory_search/memory_get**: Search my long-term memory
- **qmd**: Local markdown search (26 files indexed)

### Automation
- **cron**: Schedule jobs/reminders
- **gateway**: Restart, config management
- **sessions**: Manage sub-agents

### Voice (TTS)
- **tts**: Convert text to speech
- Preferred voice: "Nova"

### Nodes (NOT AVAILABLE HERE)
- Canvas requires a paired macOS/iOS node - not available on this server

---

## Current Setup

### qmd (Local Markdown Search)
- Index location: /home/ubuntu/.openclaw/workspace/memory
- Files indexed: 26 markdown files
- Command: `cd /tmp/qmd && tsx src/qmd.ts search "query" -n 5`

### Vercel (Personal Account)
- **Account:** mr-faajaas-projects
- **Token:** (stored in ~/.vercel/ or set as VERCEL_TOKEN env var)
- **Usage:** `vercel --token=<token> deploy`

### ClawVault (Agent Memory)
- **Vault path:** `/home/ubuntu/.openclaw/workspace/memory`
- **Categories:** decisions/, people/, lessons/, projects/, commitments/, preferences/, handoffs/
- **Command:** `CLAWVAULT_PATH=/home/ubuntu/.openclaw/workspace/memory clawvault <command>`
- **Status:** Initialized and tracking memories

### Solscan CLI (Free Solscan API)
- **Location:** `/home/ubuntu/.openclaw/workspace/bin/solscan`
- **Install deps:** `python3 -m pip install --break-system-packages cloudscraper`
- **Usage:**
  ```bash
  solscan tx <tx_hash>          # Transaction details
  solscan account <address>     # Account info
  solscan transfers <address>   # Transfer history
  solscan tokens <address>       # Token holdings
  solscan holders <token_addr>  # Token holders
  ```
- **Source:** https://github.com/paoloanzn/free-solscan-api

### Agent Browser (Headless)
- **Command:** `agent-browser --args "--headless" <command>`
- **Usage:** Use for browser automation on headless server
- **Examples:**
  - `agent-browser --args "--headless" open https://example.com`
  - `agent-browser snapshot -i` (interactive elements)
  - `agent-browser click @e1` (click by ref)
  - `agent-browser screenshot ./file.png`

### Camoufox (Browser)
- **Status:** May not be available on headless server (connection errors)
- **Fallback:** Use web_fetch for simple pages, screenshots from user for X/Twitter
- Address: tb1pkzmgtxvsg97t2sdnrmam3meeyu7h5t68v7p64cq3js0z4lhczz3swgegd5
- Pubkey: 0371634d8e89d298b560e2efc583f094cc4966f9e9ecd987c23497e9166a5d2483

Add whatever helps you do your job. This is your cheat sheet.

### Image Viewing (OCR)
- **tesseract-ocr**: Read text from screenshots/images
- **pillow**: Python image processing
- **Usage:**
  ```bash
  tesseract /path/to/image.png stdout
  ```
- **Why**: Can read screenshots users send, terminal output, etc.
- **Installed**: 2026-03-15 (was unable to view images initially, fixed after user pushed)


---

## Self-Improvement Rules

When user reports something doesn't work or I can't do something:
1. FIX IT FIRST, ask questions later
2. Install missing tools proactively
3. Update TOOLS.md and MEMORY.md to record the fix
4. Don't make user repeat themselves


### Remote Browser (Brave via Tailscale)
- **URL:** http://100.80.156.2:9222
- **User:** prestage (Windows machine)
- **Setup:** Brave runs with --remote-debugging-port=9222, Tailscale serves it
- **Usage:** 
  ```bash
  BROWSER_USE_DEBUGGER_URL=http://100.80.156.2:9222 browser-use --browser real <command>
  ```
- **To enable:** Run Brave with debug flag + tailscale serve --tcp 9222 localhost:9222


### Agent Browser (via agent-browser CLI)
- **Connection:** `--cdp http://100.80.156.2:9222`
- **Commands:**
  - `agent-browser --cdp http://100.80.156.2:9222 tab list` - list all tabs
  - `agent-browser --cdp http://100.80.156.2:9222 tab <n>` - switch to tab
  - `agent-browser --cdp http://100.80.156.2:9222 screenshot` - take screenshot
  - `agent-browser --cdp http://100.80.156.2:9222 snapshot` - get page structure


### Local Models (Ollama)
- **qwen2.5-coder** - 4.7GB, for coding tasks
- Usage: `ollama run qwen2.5-coder "your prompt"`
- Start server: `ollama serve`

