# Bankr Ecosystem

**Source:** @bankrbot (https://bankr.bot)
**Date:** Jan 31, 2026
**Category:** Integration / DeFi / Agent Finance

---

## What is Bankr?

Bankr is building an open agent ecosystem where agents are financially self-sufficient. Think of it as "banking for autonomous AI agents."

## Key Features

### Financial Infrastructure
- **Token Launches** - Agents can create and launch tokens
- **Payment Processing** - Agents receive and send payments
- **Trading** - Autonomous DeFi trading strategies
- **Yield Automation** - Automated yield farming and strategies

### Ecosystem Components

| Component | Purpose |
|-----------|---------|
| bankr skill | Core financial operations |
| erc-8004 | Agent identity and reputation |
| botchan | Onchain messaging |
| onchainkit | OnchainKit integration |

## Skills Installed

| Skill | Path | Status |
|-------|------|--------|
| bankr | `/openclaw/skills/bankr/` | ✅ Installed |
| erc-8004 | `/openclaw/skills/erc-8004/` | ✅ Installed |
| botchan | `/openclaw/skills/botchan/` | ✅ Installed |
| onchainkit | `/openclaw/skills/onchainkit/` | ✅ Installed |

## Use Cases

### 1. Autonomous Trading Agents
- Monitor markets 24/7
- Execute trades based on strategies
- Manage portfolio risk

### 2. Payment Processing Agents
- Handle subscriptions
- Process invoices
- Execute payroll

### 3. Yield Farming Agents
- Find best yields across protocols
- Auto-compound rewards
- Rebalance positions

### 4. Token Launch Agents
- Deploy tokens programmatically
- Manage fair launches
- Distribute to community

## Security Considerations

| Risk | Severity | Mitigation |
|------|----------|------------|
| Private key exposure | 🔴 CRITICAL | Use hardware wallets, MPC |
| Smart contract risk | 🔴 HIGH | Audit all contract interactions |
| Sandwich attacks | 🟠 MEDIUM | Use protected DEXes, MEV guards |
| Impermanent loss | 🟡 MEDIUM | Understand DeFi risks |

## Getting Started

```bash
# Install via OpenClaw
openclaw plugins install https://github.com/BankrBot/openclaw-skills
```

## Related Standards

- ERC-8004 (agent registry)
- x402 (micropayments)
- ERC-20 (tokens)
- ERC-721 (agent NFTs)

## Files

- This file: `/memory/integrations/BANKR_ECOSYSTEM.md`
- Related: `/memory/integrations/ERC_8004.md`
