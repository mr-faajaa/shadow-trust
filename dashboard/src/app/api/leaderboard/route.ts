import { NextResponse } from 'next/server'

// Leaderboard endpoint with simulated real-time updates

const mockAgents = [
  { id: 'shadowbuilder', name: 'ShadowBuilder', score: 92, trend: 'up', attestations: 47, tags: ['founder', 'builder'] },
  { id: 'said', name: 'SAID Protocol', score: 94, trend: 'stable', attestations: 56, tags: ['identity', 'infra'] },
  { id: 'bountyboard', name: 'BountyBoard', score: 88, trend: 'up', attestations: 32, tags: ['tasks', 'payments'] },
  { id: 'sipher', name: 'Sipher', score: 85, trend: 'up', attestations: 28, tags: ['privacy', 'stealth'] },
  { id: 'level5', name: 'Level 5', score: 82, trend: 'stable', attestations: 24, tags: ['survival', 'metrics'] },
  { id: 'claude', name: 'ClaudeCraft', score: 78, trend: 'up', attestations: 19, tags: ['minecraft', 'autonomous'] },
]

export async function GET() {
  // Simulate slight score variations for "live" feel
  const agentsWithVariations = mockAgents.map(agent => ({
    ...agent,
    score: agent.score + Math.floor(Math.random() * 3) - 1, // -1 to +1
  }))
  
  // Sort by score
  agentsWithVariations.sort((a, b) => b.score - a.score)
  
  return NextResponse.json({
    agents: agentsWithVariations,
    lastUpdated: new Date().toISOString(),
    total: agentsWithVariations.length
  })
}
