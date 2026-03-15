# Login Machine - AI Browser Login Automation

## What It Is
One browser agent loop that logs into any website. Credentials never touch the model — they flow directly into the browser DOM via Playwright.

## Key Features
- **Universal Login**: Works for any website (no per-site scripts)
- **Multi-step Flows**: Handles credentials, SSO pickers, MFA, magic links
- **Vision-based**: Uses LLM with vision to classify screens
- **Credential Isolation**: Model never sees passwords
- **Self-correcting**: Validates locators against live DOM before use
- **6 Screen Types**: credential_login_form, choice_screen, magic_login_link, loading_screen, blocked_screen, logged_in_screen

## Architecture
```
src/
├── app/api/chat/route.ts    # Single API endpoint
├── components/              # React UI components
├── hooks/                   # State management
└── lib/ai-login/
    ├── agent.ts             # LLM analysis + handlers
    ├── browser.ts           # BrowserBase + Playwright
    ├── prompts.ts           # Classification prompts
    └── types.ts             # Zod schemas
```

## Stack
- Frontend: Next.js 16, React 19, Tailwind 4
- LLM: Claude Sonnet 4.5 via Vercel AI SDK
- Browser: Playwright via BrowserBase

## Setup
```bash
cd /home/ubuntu/.openclaw/workspace/login-machine
cp .env.example .env.local
# Fill in ANTHROPIC_API_KEY, BROWSERBASE_API_KEY, BROWSERBASE_PROJECT_ID
npm install
npm run dev
```
Then open http://localhost:3000 and paste a login URL.

## Trigger Phrases
- "set up login-machine"
- "login machine"
- "automate login"
- "browser agent login"
- "use login-machine"
