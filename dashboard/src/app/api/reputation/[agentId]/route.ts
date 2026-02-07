import { NextRequest, NextResponse } from 'next/server'
import { getSolanaService } from '@/lib/solana-rpc'

const AGENT_WALLETS: Record<string, string> = {
  shadowbuilder: '7nYhS6PaB9hGzLvGmpc8bG2R4Z7j8xK9m4n2p5q8r0s1t',
  said: '3mRt5hZ9k8p2b6c7d8e0f1a4b5c6d7e8f9a0b1c2',
  bountyboard: '5nXs7Pb8h0gK1jL4m5n6Op7q9r2s3t4u5v6w8x9y0z1a2b3c',
  sipher: '8mYt9Rc1hB2iK5o7p0s8u2v3w6x7y0z1a2d3e4f5g6h7i8j9k',
  level5: '2lNq5Td0kC3jM6r9t1w4x7y0z2a5b8c1d6e2f3g4h5i6j7l8m',
  claude: '6oP8Ve4aE1hB5iK9o2s5u8w1x4z7a0c3d6e9f2g3h5i6j8k1l4',
  notagent: 'CFaXxN9fqowBQUa5bjYeHejHu8kUZGoqLJ1zMC1QEsKa'
}

const BREAKDOWN_WEIGHTS = { taskCompletion: 0.30, paymentHistory: 0.30, identityVerification: 0.25, onChainActivity: 0.15 }

export async function GET(request: NextRequest, { params }: { params: { agentId: string } }) {
  const agentId = params.agentId
  const solana = getSolanaService()
  const walletAddress = AGENT_WALLETS[agentId]
  const onChainData = await solana.getAgentData(agentId, walletAddress)
  const reputation = calculateReputation(onChainData, agentId)
  
  return NextResponse.json({
    agentId, name: formatAgentName(agentId), walletAddress: onChainData.walletAddress,
    overall: reputation.overall, breakdown: reputation.breakdown, trend: calculateTrend(agentId),
    attestations: onChainData.transactions,
    onChainData: { balance: `${onChainData.balance.toFixed(4)} SOL`, transactions: onChainData.transactions, lastActive: onChainData.lastActive.toISOString(), programs: onChainData.programs },
    lastUpdated: new Date().toISOString(), dataSource: solana.isConnected() ? 'solana-mainnet' : 'mock'
  })
}

function calculateReputation(onChainData: any, agentId: string) {
  const txScore = Math.min(onChainData.transactions * 2, 100)
  const balanceScore = Math.min(onChainData.balance * 10, 100)
  const programScore = Math.min(onChainData.programs.length * 15, 100)
  const onChainScore = (txScore * 0.4 + balanceScore * 0.3 + programScore * 0.3)
  const isReal = agentId === 'notagent'
  
  const breakdown = {
    taskCompletion: isReal ? 85 + Math.floor(Math.random() * 10) : Math.floor(75 + Math.random() * 20),
    paymentHistory: isReal ? 90 + Math.floor(Math.random() * 8) : Math.floor(80 + Math.random() * 18),
    identityVerification: isReal ? 95 + Math.floor(Math.random() * 5) : Math.floor(85 + Math.random() * 15),
    onChainActivity: Math.floor(onChainScore)
  }
  
  const overall = Math.floor(breakdown.taskCompletion * BREAKDOWN_WEIGHTS.taskCompletion + breakdown.paymentHistory * BREAKDOWN_WEIGHTS.paymentHistory + breakdown.identityVerification * BREAKDOWN_WEIGHTS.identityVerification + breakdown.onChainActivity * BREAKDOWN_WEIGHTS.onChainActivity)
  return { overall, breakdown }
}

function calculateTrend(agentId: string): 'up' | 'stable' | 'down' {
  const trends: Record<string, 'up' | 'stable' | 'down'> = {
    shadowbuilder: 'up', said: 'stable', bountyboard: 'up', sipher: 'up', level5: 'stable', claude: 'up', notagent: 'up'
  }
  return trends[agentId] || 'stable'
}

function formatAgentName(agentId: string): string {
  const names: Record<string, string> = {
    shadowbuilder: 'ShadowBuilder', said: 'SAID Protocol', bountyboard: 'BountyBoard',
    sipher: 'Sipher', level5: 'Level 5', claude: 'ClaudeCraft', notagent: 'Not Agent'
  }
  return names[agentId] || agentId
}
