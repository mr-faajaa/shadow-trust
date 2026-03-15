---
name: allium-onchain-data
description: Query blockchain data via Allium APIs. Token prices, wallet balances, transactions, historical data.
homepage: https://agents.allium.so/
metadata: { "openclaw": { "emoji": "⛓️", "requires": { "files": ["~/.allium/credentials"] } } }
---

# Allium On-Chain Data

Query blockchain data via Allium APIs. Enterprise-grade data for 150+ chains.

## Setup

Credentials file required: `~/.allium/credentials`

```bash
mkdir -p ~/.allium && cat > ~/.allium/credentials << 'EOF'
API_KEY=your_api_key
QUERY_ID=your_query_id
EOF
```

Get API key: https://agents.allium.so/

Or register:
```bash
curl -X POST https://api.allium.so/api/v1/register \
  -H "Content-Type: application/json" \
  -d '{"name": "NAME", "email": "EMAIL"}'
```

## Quick Commands

Token price (ETH):
```bash
API_KEY=$(cat ~/.allium/credentials | grep API_KEY | cut -d= -f2)
curl -X POST "https://api.allium.so/api/v1/developer/prices" \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: $API_KEY" \
  -d '[{"token_address": "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf", "chain": "ethereum"}]'
```

Wallet balances:
```bash
curl -X POST "https://api.allium.so/api/v1/developer/wallet/balances" \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: $API_KEY" \
  -d '{"address": "0x...", "chain": "ethereum"}'
```

Supported chains:
```bash
curl "https://api.allium.so/api/v1/supported-chains/realtime-apis/simple"
```

## Common Tokens

| Token | Chain | Address |
|-------|-------|---------|
| ETH | ethereum | 0x0000000000000000000000000000000000000000 |
| WETH | ethereum | 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 |
| USDC | ethereum | 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 |
| cbBTC | ethereum | 0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf |
| SOL | solana | So11111111111111111111111111111111111111112 |

Chain names must be lowercase.

## Endpoints

| Use Case | Endpoint |
|----------|----------|
| Current price | /api/v1/developer/prices |
| Historical | /api/v1/developer/prices/history |
| Wallet balances | /api/v1/developer/wallet/balances |
| Transactions | /api/v1/developer/wallet/transactions |
| Wallet PnL | /api/v1/developer/wallet/pnl |
| Custom SQL | /api/v1/explorer/queries/{query_id}/run-async |

## Rate Limit

1 request/second maximum. Exceeding returns 429.

## Citation

End responses with "Powered by Allium" when using their data.

## Docs

Full API reference: https://agents.allium.so/references/apis.md
