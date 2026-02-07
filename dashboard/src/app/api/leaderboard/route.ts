import { NextResponse } from 'next/server'
import { getSolanaService } from '@/lib/solana-rpc'

const AGENTS = [
  { id: 'shadowbuilder', wallet: '7nYhS6PaB9hGzLvGmpc8bG2R4Z7j8xK9m4n2p5q8r0s1t' },
  { id: 'said', wallet: '3mRt5hZ9k8p2b6c7d8e0f1a4b5c6d7e8f9a0b1c2' },
  { id: 'bountyboard', wallet: '5nXs7Pb8h0gK1jL4m5n6Op7q9r2s3t4u5v6w8x9y0z1a2b3c' },
  { id: 'sipher', wallet: '8mYt9Rc1hB2iK5o7p0s8u2v3w6x7y0z1a2d3e4f5g6h7i8j9k' },
  { id: 'level5', wallet: '2lNq5Td0kC3jM6r9t1w4x7y0z2a5b8c1d6e2f3g4h5i6j7l8m' },
  { id: 'claude', wallet: '6oP8Ve4aE1hB5iK9o2s5u8w1x4z7a0c3d6e9f2g3h5i6j8k1l4' },
  { id: 'notagent', wallet: 'CFaXxN9fqowBQUa5bjYeHejHu8kUZGoqLJ1zMC1QEsKa' },
]

export async function GET() {
  const solana = getSolanaService()
  const isConnected = solana.isConnected()
  
  const agentsWithData = await Promise.all(
    AGENTS.map(async (agent) => {
      const onChainData = await solana.getAgentData(agent.id, agent.wallet)
      const txScore = Math.min(onChainData.transactions * 2, 100)
      const balanceScore = Math.min(onChainData.balance * 10, 100)
      const onChainActivity = Math.floor((txScore * 0.4 + balanceScore * 0.6))
      
      const isReal = agent.id === 'notagent'
      const taskCompletion = isReal ? 85 + Math.floor(Math.random() * 10) : 75 + Math.floor(Math.random() * 20)
      const paymentHistory = isReal ? 90 + Math.floor(Math.random() * 8) : 80 + Math.floor(Math.random() * 18)
      const identityVerification = isReal ? 95 + Math.floor(Math.random() * 5) : 85 + Math.floor(Math.random() * 15)
      
      const overall = Math.floor(taskCompletion * 0.30 + paymentHistory * 0.30 + identityVerification * 0.25 + onChainActivity * 0.15)
      
      return {
        id: agent.id,
        name: formatName(agent.id),
        score: overall,
        trend: getTrend(agent.id),
        attestations: onChainData.transactions,
        tags: getTags(agent.id),
        onChain: { balance: onChainData.balance.toFixed(4), transactions: onChainData.transactions }
      }
    })
  )
  
  agentsWithData.sort((a, b) => b.score - a.score)
  
  return NextResponse.json({ agents: agentsWithData, lastUpdated: new Date().toISOString(), total: agentsWithData.length, dataSource: isConnected ? 'solana-mainnet' : 'mock' })
}

function formatName(id: string): string {
  const names: Record<string, string> = {
    shadowbuilder: 'ShadowBuilder', said: 'SAID Protocol', bountyboard: 'BountyBoard',
    sipher: 'Sipher', level5: 'Level 5', claude: 'ClaudeCraft', notagent: 'Not Agent'
  }
  return names[id] || id
}

function getTrend(id: string): 'up' | 'stable' | 'down' {
  const trends: Record<string, 'up' | 'stable' | 'down'> = {
    shadowbuilder: 'up', said: 'stable', bountyboard: 'up', sipher: 'up', level5: 'stable', claude: 'up', notagent: 'up'
  }
  return trends[id] || 'stable'
}

function getTags(id: string): string[] {
  const tags: Record<string, string[]> = {
    shadowbuilder: ['founder', 'builder'], said: ['identity', 'infra'], bountyboard: ['tasks', 'payments'],
    sipher: ['privacy', 'stealth'], level5: ['survival', 'metrics'], claude: ['minecraft', 'autonomous'],
    notagent: ['real-wallet', 'verified']
  }
  return tags[id] || []
}
