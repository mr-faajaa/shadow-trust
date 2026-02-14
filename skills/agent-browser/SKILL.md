---
name: Agent Browser
description: Fast headless browser automation. For OpenClaw: use exec tool. For Claude Code/Cursor: use MCP server.
metadata: {"openclaw": {"requires": {"bins": ["agent-browser"]}, "install": [{"id": "npm", "kind": "npm", "package": "agent-browser", "bins": ["agent-browser"]}]}}
---

# Browser Automation

**For OpenClaw:** Use `exec` tool with `agent-browser` CLI  
**For Claude Code/Cursor:** Use MCP server (配置 in `.mcp.json`)

## OpenClaw Usage (exec tool)

```bash
# Navigate to URL
exec(agent-browser open https://example.com)

# Get interactive elements with refs
exec(agent-browser snapshot -i)

# Click element by ref
exec(agent-browser click @e1)

# Fill input
exec(agent-browser fill @e2 "text")

# Take screenshot
exec(agent-browser screenshot ./page.png)

# Close browser
exec(agent-browser close)
```

## Core Commands

| Command | Description |
|---------|-------------|
| `agent-browser open <url>` | Navigate to URL |
| `agent-browser snapshot -i` | Get interactive elements (recommended) |
| `agent-browser click @e1` | Click element by ref |
| `agent-browser fill @e2 "text"` | Fill input field |
| `agent-browser type @e2 "text"` | Type without clearing |
| `agent-browser screenshot` | Take screenshot |
| `agent-browser scroll down 500` | Scroll page |
| `agent-browser close` | Close browser |

## Example Workflow

```typescript
// In your OpenClaw session:

// 1. Navigate to page
await exec({command: "agent-browser open https://example.com/form", timeout: 30});

// 2. Get interactive elements
const snapshot = await exec({command: "agent-browser snapshot -i", timeout: 30});
// Output shows: textbox [ref=e1], textbox [ref=e2], button [ref=e3]

// 3. Fill form
await exec({command: 'agent-browser fill @e1 "user@example.com"', timeout: 10});
await exec({command: 'agent-browser fill @e2 "password123"', timeout: 10});

// 4. Submit
await exec({command: "agent-browser click @e3", timeout: 10});

// 5. Wait for navigation
await exec({command: "agent-browser wait --load networkidle", timeout: 30});

// 6. Screenshot
await exec({command: "agent-browser screenshot ./result.png", timeout: 30});
```

## For Claude Code / Cursor (MCP)

Add to `.mcp.json`:

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

## MCP Tools Available (Claude Code/Cursor)

- `navigate` - Go to URL
- `click` - Click element
- `type` - Type text
- `screenshot` - Take screenshot
- `snapshot` - Get accessibility tree
- `scroll` - Scroll page
- `close` - Close browser

## Example Prompts (Claude Code with MCP)

- "Navigate to https://example.com"
- "Take a screenshot"
- "Fill the login form"
- "Click the submit button"

## Skills Reference

- Use `web-design-guidelines` for web design best practices
- Use `accessibility` for a11y compliance
- Use `fixing-accessibility` for a11y fixes
