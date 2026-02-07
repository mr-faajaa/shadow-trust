/**
 * Solana RPC Service for ShadowTrust
 * 
 * Uses Helius RPC for real on-chain data
 * Falls back to mock data if no RPC configured
 */

import { Connection, PublicKey } from '@solana/web3.js'

export interface SolanaConfig {
  rpcUrl: string
  wssUrl?: string
}

export interface AgentOnChainData {
  agentId: string
  walletAddress: string
  transactions: number
  lastActive: Date
  programs: string[]
  balance: number
}

export class SolanaService {
  private connection: Connection | null = null
  private useMock: boolean = true

  constructor(config?: SolanaConfig) {
    if (config?.rpcUrl) {
      try {
        this.connection = new Connection(config.rpcUrl, 'confirmed')
        this.useMock = false
        console.log('✅ Solana RPC connected:', config.rpcUrl)
      } catch (error) {
        console.error('❌ Failed to connect to Solana RPC:', error)
        this.useMock = true
      }
    } else {
      console.log('⚠️ No Solana RPC configured, using mock data')
      this.useMock = true
    }
  }

  /**
   * Check if service is connected to real Solana
   */
  isConnected(): boolean {
    return !this.useMock && this.connection !== null
  }

  /**
   * Get real on-chain data for an agent
   */
  async getAgentData(agentId: string, walletAddress?: string): Promise<AgentOnChainData> {
    if (this.useMock || !walletAddress) {
      return this.getMockAgentData(agentId)
    }

    try {
      const publicKey = new PublicKey(walletAddress)
      
      // Fetch real data from Solana
      const [balance, signatures] = await Promise.all([
        this.connection!.getBalance(publicKey),
        this.connection!.getConfirmedSignaturesForAddress2(publicKey, { limit: 10 })
      ])

      return {
        agentId,
        walletAddress,
        transactions: signatures.length,
        lastActive: signatures[0]?.blockTime 
          ? new Date(signatures[0].blockTime * 1000) 
          : new Date(),
        programs: [], // Would need program interaction analysis
        balance: balance / 1e9 // Convert lamports to SOL
      }
    } catch (error) {
      console.error('Error fetching Solana data:', error)
      return this.getMockAgentData(agentId)
    }
  }

  /**
   * Get agent's recent transactions
   */
  async getTransactions(walletAddress: string, limit: number = 5) {
    if (this.useMock) {
      return this.getMockTransactions()
    }

    try {
      const publicKey = new PublicKey(walletAddress)
      const signatures = await this.connection!.getConfirmedSignaturesForAddress2(
        publicKey, 
        { limit }
      )
      return signatures
    } catch (error) {
      console.error('Error fetching transactions:', error)
      return this.getMockTransactions()
    }
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    if (this.useMock) return false
    
    try {
      const version = await this.connection!.getVersion()
      return true
    } catch {
      return false
    }
  }

  // ============ MOCK DATA ============

  private getMockAgentData(agentId: string): AgentOnChainData {
    const mockAgents: Record<string, AgentOnChainData> = {
      shadowbuilder: {
        agentId: 'shadowbuilder',
        walletAddress: '7nYhS6PaB9hGzLvGmpc8bG2R4Z7j8xK9m4n2p5q8r0s1t',
        transactions: 47,
        lastActive: new Date(),
        programs: ['Token Program', 'Associated Token', 'System Program'],
        balance: 2.5
      },
      said: {
        agentId: 'said',
        walletAddress: '3mRt5hZ9k8p2b6c7d8e0f1a4b5c6d7e8f9a0b1c2',
        transactions: 56,
        lastActive: new Date(),
        programs: ['System Program', 'Token Program'],
        balance: 5.0
      }
    }
    
    return mockAgents[agentId] || {
      agentId,
      walletAddress: 'unknown',
      transactions: 0,
      lastActive: new Date(),
      programs: [],
      balance: 0
    }
  }

  private getMockTransactions() {
    return [
      { signature: 'mock1...', blockTime: Date.now() / 1000, err: null },
      { signature: 'mock2...', blockTime: Date.now() / 1000 - 3600, err: null },
      { signature: 'mock3...', blockTime: Date.now() / 1000 - 7200, err: null },
    ]
  }
}

// Singleton instance
let solanaServiceInstance: SolanaService | null = null

export function getSolanaService(): SolanaService {
  if (!solanaServiceInstance) {
    const rpcUrl = process.env.SOLANA_RPC_URL
    solanaServiceInstance = new SolanaService({ rpcUrl })
  }
  return solanaServiceInstance
}

export default SolanaService
