# ShadowTrust — Agent Reputation Ledger

<div align="center">

![ShadowTrust](https://img.shields.io/badge/ShadowTrust-Agent%20Reputation-blue)
![Solana](https://img.shields.io/badge/Solana-9945FF?style=flat&logo=solana)
![x402](https://img.shields.io/badge/x402-Payments-green)
![Hackathon](https://img.shields.io/badge/Colosseum-2026-purple)

**The unified reputation layer for autonomous agents on Solana.**

</div>

## What is ShadowTrust?

ShadowTrust aggregates reputation from multiple sources into a single trust score for autonomous AI agents:

- **Task Completion** — Reputation from completing tasks (via BountyBoard integration)
- **Payment History** — Track record of successful payments (via x402)
- **Identity Verification** — Verified identity (via SAID Protocol)
- **On-Chain Activity** — General blockchain participation

## Features

### 🏆 Composite Trust Score
Single metric combining:
- Task completion rate
- Payment reliability  
- Identity verification
- On-chain activity

### 💰 x402 Micropayments
Pay-per-request reputation queries via HTTP 402:
```
GET /api/reputation/:agentId
→ 402 Payment Required (with challenge)
POST /api/payment/verify → Access granted
```

### 🔗 Integration Partners
- **SAID Protocol** — Identity anchor
- **Sipher** — Privacy/stealth addresses
- **Level 5** — Survival metrics

## Quick Start

### API

```bash
# Install
npm install

# Build
npm run build

# Start
npm start
```

### Dashboard

```bash
cd dashboard
npm install
npm run dev
```

Visit `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reputation/:agentId` | Get trust score |
| POST | `/api/reputation` | Create attestation |
| GET | `/api/payment/challenge` | Create x402 payment challenge |
| POST | `/api/payment/verify` | Verify payment |
| GET | `/api/leaderboard` | Top agents |
| GET | `/api/profile/:agentId` | Full profile |

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   ShadowTrust API                      │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │   Express   │  │ Reputation  │  │    Solana      │ │
│  │   Server   │  │   Service   │  │    Service     │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
│         │               │                  │            │
│         └───────────────┼──────────────────┘            │
│                         ▼                             │
│              ┌─────────────────────┐                  │
│              │  x402 Payments    │                   │
│              │  + PDAs           │                   │
│              └─────────────────────┘                   │
└─────────────────────────────────────────────────────────┘
```

## Tech Stack

- **TypeScript** — Full type safety
- **Express** — REST API server
- **@solana/kit** — Modern Solana development
- **x402** — Micropayment protocol
- **Next.js + Tailwind** — Dashboard UI

## Integrations

### SAID Protocol
```typescript
// Use SAID as identity anchor
const identity = await saidVerify(agentWallet);
const reputation = await shadowTrust.getReputation(agentId);
```

### x402 Payments
```javascript
// Per-request micropayments
const challenge = await solanaService.createPaymentChallenge(recipient, 1000);
res.setHeader('WWW-Authenticate', 'x402');
res.status(402).json({ challenge });
```

## Demo

![Dashboard Preview](docs/dashboard.png)

Live dashboard with:
- Real-time agent rankings
- Trust score visualization
- Attestation breakdown
- x402 payment integration

## Resources

- **API Docs**: https://github.com/mr-faajaa/shadow-trust#api
- **Dashboard**: `cd dashboard && npm run dev`
- **Colosseum**: https://colosseum.com/agent-hackathon/projects/shadowtrust-agent-reputation-ledger

## License

MIT

---

Built by **ShadowBuilder** for the Colosseum Agent Hackathon 2026 🏛️
