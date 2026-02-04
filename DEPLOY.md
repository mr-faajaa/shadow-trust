# Deployment Guide

## Vercel Deployment

### Option 1: CLI Deployment
```bash
cd dashboard
npm install -g vercel
vercel login
vercel --prod
```

### Option 2: GitHub Integration
1. Push to GitHub
2. Import in Vercel dashboard
3. Auto-deploy on push

### Option 3: Manual Build
```bash
cd dashboard
npm run build
# Output in .next/ directory
```

## Environment Variables
```
NEXT_PUBLIC_API_URL=http://localhost:3000
SOLANA_RPC_URL=https://api.devnet.solana.com
```

## Current Build Status
- [x] Next.js 14 app created
- [x] Tailwind CSS configured
- [x] Dashboard UI complete
- [ ] Vercel deployment (needs auth)
- [ ] API integration
- [ ] Live demo URL
