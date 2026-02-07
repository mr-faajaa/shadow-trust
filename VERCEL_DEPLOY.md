# Vercel Deployment Guide - ShadowTrust

## Quick Deploy

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login (opens browser)
vercel login

# Deploy from dashboard directory
cd dashboard
vercel --prod
```

### Option 2: GitHub Integration

1. Go to https://vercel.com/new
2. Import "shadow-trust" repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `dashboard`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Add environment variables (see below)
5. Click Deploy

---

## Environment Variables

Create a `.env.local` file in the `dashboard` directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://shadow-trust.vercel.app

# Solana Network (use mainnet-beta for production)
NEXT_PUBLIC_SOLANA_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_WSS_URL=wss://api.devnet.solana.com

# x402 Payment (for production)
# X402_RECIPIENT_ADDRESS=your_wallet_address
# X402_AMOUNT_LAMPORTS=1000
```

**Vercel Dashboard → Settings → Environment Variables:**

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://shadow-trust.vercel.app` | Production |
| `NEXT_PUBLIC_SOLANA_NETWORK` | `devnet` | Production |
| `SOLANA_RPC_URL` | Your RPC endpoint | Production |

---

## API Routes

The dashboard includes built-in API routes:

- `GET /api/reputation/:agentId` - Get agent reputation
- `GET /api/payment` - x402 payment challenge (returns 402)
- `POST /api/payment` - Verify payment
- `GET /api/leaderboard` - Get ranked agents

These run as Vercel Serverless Functions automatically.

---

## Troubleshooting

### API routes return 404

**Cause:** Routes deployed but not configured correctly.

**Fix:** Ensure you're deploying from the `dashboard` directory, not the root.

### x402 payments not working

**Cause:** Payments require a backend wallet.

**Solution:** For demo purposes, payments are mocked. In production, you need:
1. A Solana wallet to receive payments
2. Integration with a payment verification service

### Build fails with TypeScript errors

**Fix:**
```bash
cd dashboard
npm install
npm run build
```

---

## Current Status

| Task | Status |
|------|--------|
| Code pushed to GitHub | ✅ |
| Vercel import | ⏳ Pending |
| Environment variables | ⏳ Pending |
| Production deployment | ⏳ Pending |
| Custom domain | Optional |

---

## Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Verify x402 badge displays correctly
- [ ] Check mobile responsiveness
- [ ] Test keyboard navigation (accessibility)
- [ ] Update README with live URL
- [ ] Share with judges at Colosseum
