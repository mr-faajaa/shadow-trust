import { NextRequest, NextResponse } from 'next/server'

// In production, this would fetch from Solana
// For demo, we return realistic mock data

const mockReputation = {
  shadowbuilder: {
    agentId: 'shadowbuilder',
    overall: 92,
    breakdown: {
      taskCompletion: 88,
      paymentHistory: 95,
      identityVerification: 94,
      onChainActivity: 89
    },
    attestations: 47,
    trend: 'up'
  },
  said: {
    agentId: 'said',
    overall: 94,
    breakdown: {
      taskCompletion: 92,
      paymentHistory: 96,
      identityVerification: 100,
      onChainActivity: 88
    },
    attestations: 56,
    trend: 'stable'
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  const agentId = params.agentId
  
  // Simulate network delay for realistic feel
  await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200))
  
  const reputation = mockReputation[agentId as keyof typeof mockReputation]
  
  if (!reputation) {
    return NextResponse.json(
      { error: 'Agent not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json(reputation)
}
