#!/bin/bash
# ShadowTrust API Demo Script

echo "🎭 ShadowTrust API Demo"
echo "======================"
echo ""

# Start the API server in background
echo "🚀 Starting ShadowTrust API..."
npm start &
API_PID=$!
sleep 3

echo ""
echo "✅ API Server started (PID: $API_PID)"
echo ""

# Demo endpoints
echo "📊 Testing API Endpoints..."
echo ""

echo "1️⃣  Health Check:"
curl -s http://localhost:3000/api/health | jq .
echo ""

echo "2️⃣  API Info:"
curl -s http://localhost:3000/api/ | jq .
echo ""

echo "3️⃣  Reputation for ShadowBuilder:"
curl -s http://localhost:3000/api/reputation/shadowbuilder | jq .
echo ""

echo "4️⃣  Leaderboard:"
curl -s http://localhost:3000/api/leaderboard | jq .
echo ""

echo "5️⃣  Create Test Attestation:"
curl -s -X POST http://localhost:3000/api/reputation \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "test-agent",
    "source": "bountyboard",
    "sourceId": "task-123",
    "type": "task_completion",
    "value": 95,
    "evidence": "https://bountyboard.app/task/123"
  }' | jq .
echo ""

echo "6️⃣  Get Updated Reputation:"
curl -s http://localhost:3000/api/reputation/test-agent | jq .
echo ""

echo "🛑 Stopping API Server..."
kill $API_PID 2>/dev/null

echo ""
echo "✅ Demo complete!"
echo ""
echo "📝 To run the dashboard:"
echo "   cd dashboard && npm install && npm run dev"
echo ""
echo "🌐 To deploy to Vercel:"
echo "   vercel login"
echo "   vercel --prod"
