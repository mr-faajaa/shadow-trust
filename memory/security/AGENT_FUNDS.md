# Agent Wallet Security Patterns

Security principles and patterns for agents handling funds.

## Core Principles (From Privy Analysis)

### 1. Policy-First Wallet Creation
- **Rule:** Agent wallets should NEVER exist without explicit constraints
- **Required:**
  - Spending limits
  - Allowed chains whitelist
  - Transaction rules
- **Enforcement:** Server-side, before any transaction

### 2. Transaction Validation Chain
```
Agent Request → Policy Check → Amount Validation → Destination Verification → Chain Check → Execute
```

**Each step must:**
- Fail closed (default deny)
- Log for audit
- Require explicit intent

### 3. Key Management
- ✅ Private keys stay server-side
- ✅ Never in prompts, memory, or skills
- ✅ Hardware security module (HSM) preferred
- ✅ Key rotation procedures defined

### 4. Prompt Injection Defense
- Treat embedded instructions with suspicion
- Require confirmation for external-content-triggered actions
- Sanitize all external inputs

### 5. Emergency Procedures
- Revocation process for compromised wallets
- Policy freeze mechanism
- Human intervention requirements

## Risk Matrix

| Scenario | Risk Level | Mitigation |
|----------|------------|------------|
| Agent creates wallet without policy | 🔴 CRITICAL | Policy required at creation |
| Transaction exceeds limit | 🔴 CRITICAL | Block + alert |
| Unknown destination address | 🟠 HIGH | Whitelist or require approval |
| Policy deletion request | 🟠 HIGH | Explicit human confirmation |
| Rapid transaction sequence | 🟡 MEDIUM | Rate limiting |
| Cross-chain transfer | 🟡 MEDIUM | Chain whitelist enforcement |

## Checklist Before Enabling Agent Wallets

- [ ] Read security documentation
- [ ] Configure default spending limits
- [ ] Whitelist allowed chains
- [ ] Set up transaction monitoring
- [ ] Define emergency revocation procedure
- [ ] Test on testnet
- [ ] Document acceptable use cases
- [ ] Establish approval workflow for policy changes

## Related

- Privy Integration: `/memory/integrations/PRIVY_WALLET.md`
- Agent Security: `/memory/security/SECURITY.md`

**Last Updated:** 2026-02-10
**Source:** Privy blog post analysis
