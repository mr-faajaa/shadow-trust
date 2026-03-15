# Rowboat - AI Coworker with Memory

## What It Is
Local-first AI coworker that turns work into a knowledge graph. Connects to email/meeting notes, builds long-lived context, and helps you get work done — privately, on your machine.

## How to Run

**⚠️ NOT Recommended for Server/Headless**
Rowboat requires Docker services + Google OAuth + API keys — designed for **local desktop use**.

### Recommended: Desktop App
1. Download: https://www.rowboatlabs.com/downloads
2. Install on Mac/Windows/Linux
3. Connect Google account (see google-setup.md)

### Running from Source (Local Machine Only)
```bash
cd /home/ubuntu/.openclaw/workspace/rowboat
./start.sh  # Requires Docker, many env vars
```

### CLI (Also Local)
```bash
cd apps/cli
npm install && npm run build
./bin/run --help
```

## Features
- **Knowledge Graph**: From Gmail, Granola, Fireflies (meeting notes)
- **Meeting Prep**: Past decisions → briefs
- **Email Drafting**: Grounded in history
- **Artifacts**: PDFs, slides generation
- **Voice Memos**: Auto-capture takeaways
- **Background Agents**: Automate tasks

## Configuration (on your machine)
- Models: `~/.rowboat/config/models.json`
- Deepgram (voice): `~/.rowboat/config/deepgram.json`
- Brave Search: `~/.rowboat/config/brave-search.json`

## Trigger Phrases
- "set up rowboat"
- "rowboat knowledge graph"
- "use rowboat"
