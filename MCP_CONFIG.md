# MCP Server Configuration
# Works for: OpenClaw, Claude Code, Cursor, VS Code, Codex

## Quick Setup

### 1. React Bits MCP (Animated UI Components)

```bash
# Install
npm install -g react-bits-mcp
```

**OpenClaw** (`~/.openclaw/openclaw.json`):
```json
{
  "plugins": {
    "installs": {
      "react-bits-mcp": {
        "source": "npm",
        "spec": "react-bits-mcp",
        "installPath": "/home/ubuntu/.openclaw/mcp/react-bits-mcp"
      }
    }
  }
}
```

**Claude Code / Cursor** (`.mcp.json`):
```json
{
  "mcpServers": {
    "react-bits": {
      "command": "npx",
      "args": ["-y", "react-bits-mcp"]
    }
  }
}
```

### 2. shadcn MCP (UI Components Registry)

```bash
# Install
npx shadcn@latest init
```

**Claude Code / Cursor** (`.mcp.json`):
```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

**VS Code** (`.vscode/mcp.json`):
```json
{
  "servers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

**Codex** (`~/.codex/config.toml`):
```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

### 3. Agent Browser MCP

**Claude Code / Cursor** (`.mcp.json`):
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

## Unified .mcp.json (Claude Code + Cursor)

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    },
    "agent-browser": {
      "command": "npx",
      "args": ["-y", "agent-browser"]
    }
  }
}
```

## MCP Servers Installed

| Server | Package | Purpose |
|--------|---------|---------|
| react-bits-mcp | react-bits-mcp | Animated React components |
| shadcn-mcp | shadcn | UI component registry |
| agent-browser | agent-browser | Headless browser automation |

## Skills Reference

- `/skills/react-bits-mcp/` - React Bits skill
- `/skills/shadcn-mcp/` - shadcn MCP skill
- `/skills/agent-browser/` - Browser automation skill

## Usage

After configuring MCP servers:

1. **Restart your editor/agent**
2. **Try prompts:**
   - "Show me all shadcn components"
   - "Add a button with react-bits animation"
   - "Browse to a URL using agent-browser"
3. **Check MCP status** with `/mcp` command (Claude Code)

## Troubleshooting

### Server Not Connected
- Verify configuration file exists
- Check server name matches exactly
- Restart editor after changes
- Run `npx <package>` to test installation

### No Tools Available
- Clear npx cache: `npx clear-npx-cache`
- Re-enable server in MCP settings
- Check logs (Cursor: View → Output → MCP)

### Permission Errors
- Ensure write permissions to config files
- Check npm global bin is in PATH
- Verify node_modules/.bin contains executables

## Example Prompts

### shadcn
- "Show me available dialog components"
- "Install button and card components"
- "Find a data table component"

### React Bits
- "List all animation components"
- "Get fade-in animation code"
- "Show me hover effects"

### Agent Browser
- "Navigate to https://example.com"
- "Take a screenshot"
- "Click the login button"
