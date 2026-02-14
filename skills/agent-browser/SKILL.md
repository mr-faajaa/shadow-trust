---
name: Agent Browser
description: A fast Rust-based headless browser automation CLI with Node.js fallback that enables AI agents to navigate, click, type, and snapshot pages via structured commands.
read_when:
  - Automating web interactions
  - Extracting structured data from pages
  - Filling forms programmatically
  - Testing web UIs
metadata: {"openclaw": {"requires": {"bins": ["agent-browser"]}, "install": [{"id": "npm", "kind": "npm", "package": "agent-browser", "bins": ["agent-browser"]}]}}
---

# Browser Automation with agent-browser

## Installation

```bash
npm install -g agent-browser
agent-browser install
```

## MCP Server Configuration

### Claude Code / Cursor (`.mcp.json`)

```json
{
  "mcpServers": {
    "agent-browser": {
      "command": "npx",
      "args": ["-y", "agent-browser"]
    }
  }
}
```

### OpenClaw

agent-browser is installed globally. Use via exec tool:

```bash
agent-browser open <url>
agent-browser snapshot -i
agent-browser click @e1
```

### VS Code / Codex

Add to `.vscode/mcp.json` or `~/.codex/config.toml`:

```json
{
  "mcpServers": {
    "agent-browser": {
      "command": "npx",
      "args": ["-y", "agent-browser"]
    }
  }
}
```

## Quick Start (CLI)

```bash
agent-browser open <url>        # Navigate to page
agent-browser snapshot -i       # Get interactive elements with refs
agent-browser click @e1         # Click element by ref
agent-browser fill @e2 "text"  # Fill input by ref
agent-browser close             # Close browser
```

## Core Commands

| Command | Description |
|---------|-------------|
| `open <url>` | Navigate to URL |
| `snapshot -i` | Get interactive elements with @refs |
| `click @e1` | Click element by ref |
| `fill @e2 "text"` | Fill input field |
| `type @e2 "text"` | Type without clearing |
| `screenshot` | Take screenshot |
| `close` | Close browser |

## Example: Form Submission

```bash
agent-browser open https://example.com/form
agent-browser snapshot -i
# Output: textbox "Email" [ref=e1], textbox "Password" [ref=e2], button "Submit" [ref=e3]

agent-browser fill @e1 "user@example.com"
agent-browser fill @e2 "password123"
agent-browser click @e3
agent-browser wait --load networkidle
agent-browser snapshot -i  # Check result
```

## MCP Tools Available

When configured as MCP server:
- `navigate` - Go to URL
- `click` - Click element
- `type` - Type text
- `screenshot` - Take screenshot
- `snapshot` - Get accessibility tree
- `scroll` - Scroll page
- `close` - Close browser

## Troubleshooting

- If command not found, use full path: `/home/linuxbrew/.linuxbrew/bin/agent-browser`
- Always snapshot after navigation for new refs
- Use `--headed` to see browser window for debugging
- Check refs are stable per page load
