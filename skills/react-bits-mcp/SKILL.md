---
name: react-bits-mcp
description: MCP server for React Bits - animated UI components library
metadata: {"openclaw": {"requires": {"bins": ["npx"]}, "install": [{"id": "npm", "kind": "npm", "package": "react-bits-mcp", "bins": ["react-bits-mcp"]}]}}
---

# React Bits MCP Server

MCP server for accessing React Bits animated UI components library.

## What It Does

- Browse available animated React components
- Search for specific animations (fade, slide, bounce, etc.)
- Get component code and installation instructions
- Access copy-paste ready code snippets

## Installation

```bash
npm install -g react-bits-mcp
```

## Usage

The MCP server exposes tools for:
- `list-components` - List all available components
- `search-components` - Search by animation type or name
- `get-component` - Get code for a specific component
- `get-examples` - Get usage examples

## MCP Configuration

### OpenClaw

Add to `~/.openclaw/openclaw.json`:

```json
{
  "plugins": {
    "entries": {
      "react-bits-mcp": {
        "enabled": true
      }
    },
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

### Claude Code / Cursor

Add to `.mcp.json` in your project:

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

## Example Prompts

- "Show me all available animated components"
- "Find components with fade-in animation"
- "Get the code for a smooth scroll reveal"
- "Give me a bounce animation for a button"
