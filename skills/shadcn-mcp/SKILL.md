---
name: shadcn-mcp
description: MCP server for shadcn/ui components registry - browse, search, and install components
metadata: {"openclaw": {"requires": {"bins": ["npx", "shadcn"]}, "install": [{"id": "npm", "kind": "npm", "package": "shadcn@latest", "bins": ["shadcn"]}]}}
---

# shadcn MCP Server

MCP server for browsing and installing shadcn/ui components using natural language.

## What It Does

- Browse components, blocks, and templates from any configured registry
- Search across registries for specific functionality
- Install components using natural language prompts
- Support for multiple registries (shadcn/ui, private, third-party)

## Installation

```bash
npx shadcn@latest init
npx shadcn@latest add button dialog card
```

Or install globally:
```bash
npm install -g shadcn-ui
```

## MCP Configuration

### OpenClaw

Add to `~/.openclaw/openclaw.json`:

```json
{
  "plugins": {
    "entries": {
      "shadcn-mcp": {
        "enabled": true
      }
    }
  },
  "skills": {
    "entries": {
      "shadcn-mcp": {
        "enabled": true,
        "env": {
          "SHADCN_REGISTRY": "https://ui.shadcn.com/registry"
        }
      }
    }
  }
}
```

### Claude Code

Add to `.mcp.json` in your project:

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

### Cursor

Add to `.cursor/mcp.json`:

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

### VS Code (GitHub Copilot)

Add to `.vscode/mcp.json`:

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

### Codex

Add to `~/.codex/config.toml`:

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

## Example Prompts

### Browse & Search
- "Show me all available components in the shadcn registry"
- "Find me a login form from the shadcn registry"
- "What components are available for dialogs?"

### Install Items
- "Add the button component to my project"
- "Create a login form using shadcn components"
- "Install dialog and card components"

### Multiple Registries
- "Show me components from acme registry"
- "Install @internal/auth-form"

## Supported Registries

- **shadcn/ui** - Default registry
- **Third-Party** - Any shadcn-compatible registry
- **Private** - Your company's internal component library
- **Namespaced** - Multiple registries with @namespace syntax

## Configure Additional Registries

Add to `components.json`:

```json
{
  "registries": {
    "@acme": "https://registry.acme.com/{name}.json",
    "@internal": {
      "url": "https://internal.company.com/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

## Environment Variables

For private registries:

```bash
REGISTRY_TOKEN=your_token_here
API_KEY=your_api_key_here
```

## Troubleshooting

### MCP Not Responding
1. Check configuration is correct
2. Restart your MCP client
3. Verify shadcn is installed
4. Check network access to registries

### Installation Failures
1. Verify components.json exists
2. Check target directories exist
3. Ensure write permissions
4. Review dependencies
