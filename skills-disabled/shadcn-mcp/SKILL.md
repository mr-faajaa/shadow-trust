---
name: shadcn-mcp
description: Browse and install shadcn/ui components. For OpenClaw: use exec tool to run shadcn commands directly.
metadata: {"openclaw": {"requires": {"bins": ["npx", "shadcn"]}, "install": [{"id": "npm", "kind": "npm", "package": "shadcn@latest", "bins": ["shadcn"]}]}}
---

# shadcn/ui Components for OpenClaw

**Note:** OpenClaw doesn't have native MCP support. Use `exec` tool to run shadcn commands directly.

## OpenClaw Usage (exec tool)

```bash
# Initialize shadcn in a project
exec(cd /path/to/project && npx shadcn@latest init)

# Add components
exec(npx shadcn@latest add button dialog card)

# List available components
exec(npx shadcn@latest list)

# Check version
exec(npx shadcn@latest --version)
```

## Example Workflow

```typescript
// In your OpenClaw session:

// 1. Initialize in project
await exec({command: "cd /home/ubuntu/projects/my-app && npx shadcn@latest init", timeout: 60});

// 2. Add components
await exec({command: "cd /home/ubuntu/projects/my-app && npx shadcn@latest add button input card", timeout: 60});

// 3. Check what components are available
await exec({command: "npx shadcn@latest list", timeout: 30});
```

## Installation

```bash
# Global install
npm install -g shadcn-ui

# Or use npx (recommended)
npx shadcn@latest <command>
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npx shadcn@latest init` | Initialize shadcn |
| `npx shadcn@latest add <component>` | Add component |
| `npx shadcn@latest list` | List all components |
| `npx shadcn@latest remove <component>` | Remove component |
| `npx shadcn@latest upgrade` | Upgrade components |

## Component Registry

Default registry: `https://ui.shadcn.com/registry`

### Popular Components

- button, input, card, dialog, dropdown-menu
- form, select, tabs, toast, tooltip
- accordion, alert, avatar, calendar, chart
- data-table, date-picker, navigation-menu

## For Claude Code / Cursor (Native MCP)

If using Claude Code or Cursor, add to `.mcp.json`:

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

## Example Prompts (Claude Code with MCP)

- "Show me all available shadcn components"
- "Add a button and dialog to my project"
- "Find a data table component"

## Skills Reference

- Use `ui-skills` for UI design constraints
- Use `baseline-ui` for UI patterns
- Use `tailwindcss` for styling
