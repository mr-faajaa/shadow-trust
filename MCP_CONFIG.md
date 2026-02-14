# MCP Server Configuration Guide

**Important:** OpenClaw doesn't have native MCP support. Use the `exec` tool to run MCP server commands directly.

---

## OpenClaw Usage

For OpenClaw, use the `exec` tool with CLI commands:

```typescript
// Run shadcn commands
await exec({command: "npx shadcn@latest add button dialog", timeout: 60});

// Run agent-browser
await exec({command: "agent-browser open https://example.com", timeout: 30});

// Run react-bits
await exec({command: "npx react-bits-mcp list", timeout: 30});
```

---

## Claude Code / Cursor Usage (Native MCP)

Add to `.mcp.json` in your project:

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
    },
    "react-bits": {
      "command": "npx",
      "args": ["-y", "react-bits-mcp"]
    }
  }
}
```

---

## MCP Servers Installed

| Server | Package | OpenClaw (exec) | Claude Code (MCP) |
|--------|---------|------------------|-------------------|
| shadcn | shadcn@latest | `npx shadcn@latest add button` | ✅ Native MCP |
| agent-browser | agent-browser | `agent-browser open <url>` | ✅ Native MCP |
| react-bits | react-bits-mcp | `npx react-bits-mcp list` | ✅ Native MCP |

---

## Quick Setup

### 1. Install Global Tools

```bash
# shadcn
npm install -g shadcn-ui
# or use npx
npx shadcn@latest init

# agent-browser
npm install -g agent-browser
agent-browser install

# react-bits
npm install -g react-bits-mcp
```

### 2. Verify Installation

```bash
# Check shadcn
npx shadcn@latest --version

# Check agent-browser
agent-browser --version

# Check react-bits
npx react-bits-mcp --version
```

---

## Example Prompts

### OpenClaw (exec tool)

```typescript
// Add shadcn components to project
await exec({command: "cd /projects/my-app && npx shadcn@latest add button input card", timeout: 60});

// Navigate and screenshot
await exec({command: "agent-browser open https://example.com", timeout: 30});
await exec({command: "agent-browser screenshot ./screenshot.png", timeout: 30});

// Get animation code
await exec({command: "npx react-bits-mcp get fade-in", timeout: 30});
```

### Claude Code / Cursor (MCP)

```markdown
- "Show me all available shadcn components"
- "Add a button to my project"
- "Navigate to https://example.com"
- "Take a screenshot of the page"
- "Find components with fade-in animation"
```

---

## Skills Reference

| Skill | Purpose |
|-------|---------|
| `shadcn-mcp` | shadcn UI components |
| `agent-browser` | Browser automation |
| `react-bits-mcp` | Animated components |
| `ui-skills` | UI design constraints |
| `baseline-ui` | UI patterns |
| `tailwindcss` | Tailwind utilities |

---

## Troubleshooting

### Command Not Found
```bash
# Use full path
/usr/local/bin/agent-browser open <url>

# Or reinstall
npm install -g agent-browser
```

### Timeout Issues
```typescript
// Increase timeout in exec
await exec({command: "npx shadcn@latest add complex-component", timeout: 120});
```

### Permission Errors
```bash
# Fix npm permissions
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

---

## Related Documentation

- [OpenClaw Skills](https://docs.openclaw.ai/tools/skills)
- [MCP Specification](https://modelcontextprotocol.io)
- [shadcn Documentation](https://ui.shadcn.com)
- [React Bits](https://www.reactbits.dev)
- [Agent Browser](https://github.com/vercel-labs/agent-browser)
