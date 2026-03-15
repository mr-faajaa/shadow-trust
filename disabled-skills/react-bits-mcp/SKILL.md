---
name: react-bits-mcp
description: React Bits animated UI components. For OpenClaw: use exec tool to run react-bits commands.
metadata: {"openclaw": {"requires": {"bins": ["npx"]}, "install": [{"id": "npm", "kind": "npm", "package": "react-bits-mcp", "bins": ["react-bits-mcp"]}]}}
---

# React Bits for OpenClaw

**Note:** OpenClaw doesn't have native MCP support. Use `exec` tool to run react-bits commands.

## OpenClaw Usage (exec tool)

```bash
# Install react-bits-mcp globally
exec(npx react-bits-mcp install)

# List available animations
exec(npx react-bits-mcp list)

# Get specific animation code
exec(npx react-bits-mcp get fade-in)

# Search animations
exec(npx react-bits-mcp search bounce)
```

## What is React Bits?

React Bits is a library of animated UI components for React:

- **Animations:** fade-in, slide-in, bounce, scale, rotate
- **Effects:** blur, glow, shimmer, particles
- **Interactions:** hover, click, drag, scroll
- **Transitions:** page transitions, modal transitions

## Installation

```bash
# Global install
npm install -g react-bits-mcp

# Or use npx
npx react-bits-mcp <command>
```

## Example Workflow

```typescript
// In your OpenClaw session:

// 1. List all animations
await exec({command: "npx react-bits-mcp list", timeout: 30});

// 2. Get fade-in animation code
await exec({command: "npx react-bits-mcp get fade-in", timeout: 30});

// 3. Search for bounce animations
await exec({command: "npx react-bits-mcp search bounce", timeout: 30});
```

## Available Animations

### Entrances
- fade-in, fade-in-up, fade-in-down
- slide-in-left, slide-in-right
- scale-in, bounce-in

### Exits
- fade-out, slide-out
- scale-out

### Interactions
- hover-scale, hover-float
- click-bounce, click-pulse
- drag-gesture, swipe-gesture

### Special Effects
- shimmer, glow, blur-in
- particles, confetti
- typing-effect

## React Component Example

```tsx
import { FadeIn } from 'react-bits';

function MyComponent() {
  return (
    <FadeIn direction="up" duration={500}>
      <div>Content that fades in</div>
    </FadeIn>
  );
}
```

## For Claude Code / Cursor (Native MCP)

If using Claude Code or Cursor, add to `.mcp.json`:

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

## Skills Reference

- Use `baseline-ui` for UI patterns
- Use `fixing-motion-performance` for animation best practices
- Use `tailwindcss` for styling
- Use `react-dev` for React patterns
