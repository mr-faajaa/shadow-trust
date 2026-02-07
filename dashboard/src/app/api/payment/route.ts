import { NextRequest, NextResponse } from 'next/server'

// x402 Payment Challenge Endpoint
// In production, this would:
// 1. Create a payment challenge on Solana
// 2. Return the challenge with amount and recipient
// 3. Client pays via wallet, then verifies

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const agentId = searchParams.get('agentId') || 'shadowbuilder'
  
  // Generate a payment challenge (mock)
  const challenge = {
    id: `chal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    agentId,
    amount: 1000, // 1000 lamports = 0.000001 SOL
    recipient: 'ShadowTrustTreasury',
    expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes
    status: 'pending',
    // x402 headers that would be returned in production
    headers: {
      'WWW-Authenticate': 'x402',
      'X-Payment-Required': '1000',
      'X-Payment-Challenge': `chal_${Date.now()}`,
      'X-Payment-Recipient': 'ShadowTrustTreasury'
    }
  }
  
  // Return 402 Payment Required with challenge
  const response = NextResponse.json({ challenge }, { status: 402 })
  
  // Add x402 headers
  Object.entries(challenge.headers).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  return response
}

export async function POST(request: NextRequest) {
  // Verify payment (mock implementation)
  // In production, this would:
  // 1. Verify the transaction on Solana
  // 2. Check the signature matches the challenge
  // 3. Return the reputation data if payment is valid
  
  const body = await request.json()
  const { challengeId, signature } = body
  
  // Mock verification
  const isValid = Math.random() > 0.1 // 90% success rate for demo
  
  if (!isValid) {
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 402 }
    )
  }
  
  // Return reputation data after successful payment
  return NextResponse.json({
    verified: true,
    reputation: {
      agentId: body.agentId || 'shadowbuilder',
      overall: 92,
      breakdown: {
        taskCompletion: 88,
        paymentHistory: 95,
        identityVerification: 94,
        onChainActivity: 89
      },
      attestations: 47,
      trend: 'up'
    }
  })
}
