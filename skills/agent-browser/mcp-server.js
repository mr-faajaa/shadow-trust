#!/usr/bin/env node
// MCP Server Wrapper for Agent Browser
// Usage: npx mcp-server-agent-browser

import { spawn } from 'child_process';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ListToolsRequest, CallToolRequest } from '@modelcontextprotocol/sdk/types.js';

const server = new Server({
  name: 'agent-browser',
  version: '1.0.0'
});

// Track browser process
let browserProcess = null;

const tools = [
  {
    name: 'navigate',
    description: 'Navigate to a URL',
    inputSchema: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'URL to navigate to' }
      },
      required: ['url']
    }
  },
  {
    name: 'click',
    description: 'Click an element by selector or @ref',
    inputSchema: {
      type: 'object',
      properties: {
        selector: { type: 'string', description: 'CSS selector or @ref' }
      },
      required: ['selector']
    }
  },
  {
    name: 'type',
    description: 'Type text into an element',
    inputSchema: {
      type: 'object',
      properties: {
        selector: { type: 'string', description: 'CSS selector' },
        text: { type: 'string', description: 'Text to type' }
      },
      required: ['selector', 'text']
    }
  },
  {
    name: 'screenshot',
    description: 'Take a screenshot',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Output path (optional)' }
      }
    }
  },
  {
    name: 'snapshot',
    description: 'Get accessibility tree with refs',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'scroll',
    description: 'Scroll the page',
    inputSchema: {
      type: 'object',
      properties: {
        direction: { type: 'string', enum: ['up', 'down', 'left', 'right'] },
        pixels: { type: 'number', description: 'Pixels to scroll' }
      },
      required: ['direction']
    }
  },
  {
    name: 'close',
    description: 'Close the browser',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }
];

server.setRequestHandler(ListToolsRequest, async () => {
  return { tools };
});

server.setRequestHandler(CallToolRequest, async (request) => {
  const { name, arguments: args } = request.params;
  
  try {
    let result;
    
    switch (name) {
      case 'navigate':
        result = await runBrowser('open', args.url);
        break;
      case 'click':
        result = await runBrowser('click', args.selector);
        break;
      case 'type':
        result = await runBrowser('type', args.selector, args.text);
        break;
      case 'screenshot':
        result = await runBrowser('screenshot', args.path || './screenshot.png');
        break;
      case 'snapshot':
        result = await runBrowser('snapshot');
        break;
      case 'scroll':
        result = await runBrowser('scroll', args.direction, args.pixels?.toString() || '500');
        break;
      case 'close':
        result = await runBrowser('close');
        break;
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
    
    return {
      content: [{ type: 'text', text: result }]
    };
  } catch (error) {
    return {
      content: [{ type: 'text', text: `Error: ${error.message}` }],
      isError: true
    };
  }
});

function runBrowser(...args) {
  return new Promise((resolve, reject) => {
    const proc = spawn('agent-browser', args, {
      stdio: ['ignore', 'pipe', 'pipe']
    });
    
    let output = '';
    proc.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    proc.stderr.on('data', (data) => {
      output += data.toString();
    });
    
    proc.on('close', (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(`agent-browser exited with code ${code}: ${output}`));
      }
    });
    
    proc.on('error', reject);
  });
}

const transport = new StdioServerTransport();
server.connect(transport).then(() => {
  console.error('Agent Browser MCP Server running...');
}).catch(console.error);
