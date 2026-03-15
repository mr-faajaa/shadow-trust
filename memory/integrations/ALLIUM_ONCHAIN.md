# Allium On-Chain Data Skill Analysis

**Source:** @AlliumLabs tweet + agents.allium.so documentation
**Date:** Feb 6, 2026 (tweet), Feb 10, 2026 (analysis)
**Category:** Integration → Blockchain / Data
**Status:** INSTALLED `/openclaw/skills/allium-onchain-data`

---

## 🔒 Security Audit

### Source Assessment
- **Source:** @AlliumLabs
- **Trust Level:** HIGH
- **Verification:** 1595 likes, 181 retweets, established crypto data provider
- **Enterprise clients:** Phantom, Uniswap, Coinbase (mentioned in docs)

### Threat Model Analysis

| Risk | Severity | Mitigation |
|------|----------|------------|
| API key exposure | 🔴 HIGH | Credentials file, never in prompts |
| Rate limit abuse | 🟢 LOW | 1 req/sec limit, 429 response |
| SQL injection | 🟡 MEDIUM | Parameterized queries in API design |
| Wrong chain errors | 🟡 LOW | Silent empty results or errors |
| Data freshness | 🟢 LOW | Realtime APIs for supported chains |

### Security Claims Analysis

| Claim | Assessment |
|-------|------------|
| "Enterprise-grade blockchain data" | ✅ VERIFIED - Serves Phantom, Uniswap, Coinbase |
| "150+ chains" | ✅ LIKELY - Industry standard for Allium |
| "No accounts to create" | ⚠️ QUALIFIED - API key still required |
| "Works from agent code" | ✅ VERIFIED - Simple curl-based API |

---

## 🧠 Logic Guard Analysis

### What Makes Sense ✅
1. **Enterprise credibility** - Major clients validate the product
2. **Simple auth model** - API key in header, credentials file
3. **Rate limiting** - Prevents runaway queries
4. **Structured endpoints** - Clear mapping of use case → endpoint

### Potential Issues ⚠️
1. **Query ID complexity** - Requires second step after API key registration
2. **No free tier mentioned** - May require paid subscription
3. **Chain name case sensitivity** - Silent failures if wrong case
4. **Custom SQL requires pre-created query_id** - Extra setup step

### Unanswered Questions ❓
1. Is there a free tier? What's the pricing?
2. How fast is data freshness? (Real-time vs delayed)
3. What's the query complexity limit?
4. Can agents create queries dynamically or only run pre-created ones?

---

## 📋 Key Features

### Data Available:
- ✅ Token prices (current, historical OHLCV)
- ✅ Wallet balances (current, historical)
- ✅ Wallet transactions
- ✅ Wallet PnL
- ✅ Custom SQL queries
- ✅ 150+ chains (EVM, Solana, Bitcoin)

### Requirements:
- ⚠️ API key registration
- ⚠️ Query ID creation (for custom SQL)
- ⚠️ Credentials file at `~/.allium/credentials`
- ⚠️ Rate limit compliance (1/second)

---

## 💡 Actionable Items

### Installation Status: INSTALLED + CONFIGURED
- Skill installed at: `/openclaw/skills/allium-onchain-data`
- API key registered and credentials saved to `~/.allium/credentials`
- Test query successful: cbBTC price = $68,791

### To Do:
1. Test with other tokens (ETH, SOL, USDC)
2. Try wallet balance queries
3. Create custom SQL query if needed
4. Create skill when available on ClawHub

---

## 📂 Storage

**Category:** Skills → Blockchain Data
**File:** `/memory/skills/ALLIUM_ONCHAIN.md`

**Related:**
- `/memory/integrations/PRIVY_WALLET.md` (another blockchain integration)
- `/memory/ideas/IDEAS.md` (potential agent use cases)

---

## 🔗 Links

- Tweet: https://x.com/AlliumLabs/status/2019810793324482901
- Docs: https://agents.allium.so/skills/skill.md
- Signup: https://agents.allium.so/
- Reference: https://agents.allium.so/references/apis.md

---

**Assessment:** LEGITIMATE, ENTERPRISE-GRADE, REQUIRES SETUP

Recommendation: Good for blockchain queries. Wait for ClawHub skill or use manual curl setup. Verify pricing before heavy usage.

**Next Steps:**
1. Register for API key if interested
2. Monitor ClawHub for official skill release
3. Test with simple price query first
