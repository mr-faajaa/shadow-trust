# Vercel Deployment Guide

## Option 1: GitHub Integration (Recommended)

1. Push code to GitHub (done ✅)
2. Go to https://vercel.com/new
3. Import "shadow-trust" repository
4. Settings:
   - Framework: Next.js
   - Root Directory: dashboard
   - Environment Variables: Add below
5. Click Deploy

### Environment Variables
```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

## Option 2: CLI (Needs Browser Login)

```bash
npm i -g vercel
vercel login
cd dashboard
vercel --prod
```

## Option 3: Vercel API (If You Have Token)

```bash
curl -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "shadow-trust",
    "files": [{"file": "dashboard/dist", "src": "dashboard/dist"}],
    "version": 2,
    "buildCommand": "npm run build",
    "outputDirectory": ".next"
  }'
```

## Current Status
- [x] Code pushed to GitHub
- [ ] Vercel import
- [ ] Environment variables set
- [ ] Production deployment
- [ ] Live URL for demo
