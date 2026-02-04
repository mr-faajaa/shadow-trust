# Learning & Research Notes
## ShadowTrust Development — Colosseum Hackathon

---

## Solana Development (Learned: 2026-02-04)

### Modern Stack (from Solana SKILL.md)
**Old approach:** @solana/web3.js everywhere
**New approach:** 
- UI: @solana/client + @solana/react-hooks (framework-kit)
- SDK: @solana/kit first
- Programs: Anchor (fast iteration) or Pinocchio (performance)
- Testing: LiteSVM/Mollusk for unit tests

### Why Upgrade?
- Better type safety with Address/Signer types
- Modern transaction message APIs
- Framework-kit has wallet standard discovery built-in
- Shows judges we're using current best practices

### Risk Notes
- Switching from web3.js to @solana/kit changes transaction building
- Need to test carefully on devnet
- Fee payer configuration must be explicit

---

## x402 Payments Protocol (Learned: 2026-02-04)

### What is x402?
- HTTP 402 "Payment Required" response with payment headers
- Enables per-request micropayments without accounts
- Compatible with Solana payments

### How ShadowTrust Uses It
```
Client requests: GET /api/reputation/:agentId
If no payment: Return 402 with payment challenge
Client pays SOL → gets access to reputation data
```

### Why This Matters
- Economic layer: agents can monetize reputation data
- Prevents spam
- Shows judges a complete economic system

### Implementation
- Add /api/payment/challenge endpoint
- Accept SPL token or SOL payments
- Return data after payment verification

---

## Basehub Integration (Learned: 2026-02-04)

### What is Basehub?
- Agent identity and data ownership platform
- Agents own their identity, not the platform
- Enables portable reputation

### ShadowTrust + Basehub
- Agents can link Basehub ID to ShadowTrust reputation
- Reputation becomes portable across platforms
- Shows ecosystem awareness

---

## Key Decisions

### 1. Keep It Simple
❌ Don't implement full x402 now (too complex)
✅ Add payment endpoint stub for future
✅ Document x402 support in API

### 2. Focus on Core Reputation
The main value prop: aggregating reputation from multiple sources
- BountyBoard integration (task completion)
- SAID Protocol (identity)
- On-chain activity

### 3. Show Technical Depth
- Use @solana/kit
- Proper type safety
- Security-aware implementation

---

## References
- Solana SKILL.md: https://solana.com/SKILL.md
- x402: HTTP 402 Payment Protocol
- Basehub: Agent identity platform
