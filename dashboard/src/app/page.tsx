'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { DecryptedText, CountUp, FaultyTerminal, GlitchText } from '@/components/reactbits'

type Trend = 'up' | 'stable' | 'down'

interface AgentData {
  agentId: string
  name: string
  walletAddress: string
  overall: number
  breakdown: {
    taskCompletion: number
    paymentHistory: number
    identityVerification: number
    onChainActivity: number
  }
  trend: Trend
  attestations: number
  onChainData: {
    balance: string
    transactions: number
    lastActive: string
    programs: string[]
  }
  dataSource: string
}

interface LeaderboardAgent {
  id: string
  name: string
  score: number
  trend: Trend
  attestations: number
  wallet: string
}

const AGENT_WALLETS: Record<string, string> = {
  shadowbuilder: '7nYhS6PaB9hGzLvGmpc8bG2R4Z7j8xK9m4n2p5q8r0s1t',
  said: '3mRt5hZ9k8p2b6c7d8e0f1a4b5c6d7e8f9a0b1c2',
  bountyboard: '5nXs7Pb8h0gK1jL4m5n6Op7q9r2s3t4u5v6w8x9y0z1a2b3c',
  sipher: '8mYt9Rc1hB2iK5o7p0s8u2v3w6x7y0z1a2d3e4f5g6h7i8j9k',
  level5: '2lNq5Td0kC3jM6r9t1w4x7y0z2a5b8c1d6e2f3g4h5i6j7l8m',
  claude: '6oP8Ve4aE1hB5iK9o2s5u8w1x4z7a0c3d6e9f2g3h5i6j8k1l4',
  notagent: 'CFaXxN9fqowBQUa5bjYeHejHu8kUZGoqLJ1zMC1QEsKa'
}

async function fetchAgentData(agentId: string): Promise<AgentData | null> {
  try {
    const res = await fetch(`/api/reputation/${agentId}`)
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

async function fetchLeaderboard(): Promise<LeaderboardAgent[]> {
  try {
    const res = await fetch('/api/leaderboard')
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

function StatCard({ label, value, delay = 0 }: { label: string; value: number | string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.2, ease: 'easeOut' }}
      className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 backdrop-blur-sm"
    >
      <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-100 tabular-nums">
        {typeof value === 'number' ? <CountUp end={value} duration={1.5} /> : value}
      </p>
    </motion.div>
  )
}

function AgentCard({ 
  agent, 
  isSelected, 
  onClick, 
  index 
}: { 
  agent: LeaderboardAgent; 
  isSelected: boolean; 
  onClick: () => void; 
  index: number;
}) {
  const medals = ['🥇', '🥈', '🥉']
  const trendColors = { up: 'text-green-400', stable: 'text-yellow-400', down: 'text-red-400' }
  
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.15, ease: 'easeOut' }}
      className={cn(
        'group w-full rounded-lg p-3 text-left transition-all',
        isSelected 
          ? 'bg-zinc-800 ring-1 ring-purple-500/50' 
          : 'hover:bg-zinc-800/50 bg-zinc-900/30'
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">{medals[index] || ''}</span>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-green-500/20 text-sm font-medium ring-1 ring-white/10">
            {agent.name.charAt(0)}
          </div>
          <div>
            <DecryptedText 
              text={agent.name} 
              speed={40}
              className="text-sm font-medium text-zinc-200"
            />
            <p className="text-xs text-zinc-600 font-mono">{agent.wallet.slice(0, 8)}...{agent.wallet.slice(-4)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn('text-sm font-semibold tabular-nums', trendColors[agent.trend])}>
            {agent.score}
          </span>
          <span className="text-lg">{agent.trend === 'up' ? '↑' : agent.trend === 'down' ? '↓' : '→'}</span>
        </div>
      </div>
    </motion.button>
  )
}

function ProgressBar({ value, label, color = 'bg-purple-500' }: { value: number; label: string; color?: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-zinc-400">{label}</span>
        <CountUp end={value} duration={1} className="text-zinc-300 tabular-nums" />
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn('h-full rounded-full', color)}
        />
      </div>
    </div>
  )
}

function ScoreRing({ score }: { score: number }) {
  const radius = 36
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (score / 100) * circumference
  const color = score >= 80 ? '#14F195' : score >= 60 ? '#FBBF24' : '#F87171'
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={88} height={88} className="transform -rotate-90">
        <circle
          cx={44}
          cy={44}
          r={radius}
          fill="none"
          stroke="#27272a"
          strokeWidth={5}
        />
        <motion.circle
          cx={44}
          cy={44}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={5}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-xl font-bold tabular-nums" style={{ color }}>
        <CountUp end={score} duration={1} />
      </div>
    </div>
  )
}

function BlockchainBadge({ transactions, programs }: { transactions: number; programs: string[] }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-zinc-900/50 p-2">
      <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-orange-500 to-red-500 text-xs">
        ⛓
      </div>
      <div className="flex-1">
        <p className="text-xs text-zinc-400">On-Chain Activity</p>
        <p className="text-xs text-zinc-500">{transactions} transactions • {programs.length} programs</p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardAgent[]>([])
  const [selectedAgentId, setSelectedAgentId] = useState('notagent')
  const [agentData, setAgentData] = useState<AgentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    const [lb, ad] = await Promise.all([
      fetchLeaderboard(),
      fetchAgentData(selectedAgentId)
    ])
    setLeaderboard(lb)
    setAgentData(ad)
    setLoading(false)
  }

  useEffect(() => {
    fetchAgentData(selectedAgentId).then(setAgentData)
  }, [selectedAgentId])

  if (!mounted) return null

  const avgScore = leaderboard.length > 0 
    ? Math.round(leaderboard.reduce((a, b) => a + b.score, 0) / leaderboard.length)
    : 0

  return (
    <div className="min-h-dvh bg-[#0D0D0D] p-4 md:p-6 relative">
      {/* Background Effects */}
      <FaultyTerminal tint="#9945FF" glitchAmount={0.2} scanlineIntensity={0.3} mouseReact={true} />
      
      {/* Header */}
      <header className="mb-6 max-w-6xl relative z-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <GlitchText 
              text="ShadowTrust" 
              speed={80}
              intensity={0.4}
              className="text-3xl font-semibold tracking-tight text-white"
            />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-1 text-sm text-zinc-500"
            >
              Agent reputation ledger on Solana
            </motion.p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-zinc-900 border border-zinc-800 px-3 py-0.5 text-xs text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              {agentData?.dataSource === 'solana-mainnet' ? 'Live' : 'Demo'}
            </span>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="mb-6 grid max-w-6xl grid-cols-2 gap-2 sm:grid-cols-4 relative z-10">
        <StatCard label="Agents" value={leaderboard.length || 7} delay={0} />
        <StatCard label="Avg Trust" value={avgScore || 85} delay={0.05} />
        <StatCard 
          label="Wallet Balance" 
          value={agentData?.onChainData.balance.replace(' SOL', '') || '0'} 
          delay={0.1} 
        />
        <StatCard label="On-Chain TXs" value={agentData?.onChainData.transactions || 0} delay={0.15} />
      </div>

      {/* Main Content */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-3 relative z-10">
        {/* Leaderboard */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 backdrop-blur-sm">
          <h2 className="mb-3 text-sm font-medium text-zinc-400">Leaderboard</h2>
          <div className="space-y-1">
            {leaderboard.length > 0 ? (
              leaderboard.map((agent, index) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  isSelected={selectedAgentId === agent.id}
                  onClick={() => setSelectedAgentId(agent.id)}
                  index={index}
                />
              ))
            ) : (
              // Fallback to default agents
              Object.entries(AGENT_WALLETS).slice(0, 7).map(([id, wallet], index) => (
                <AgentCard
                  key={id}
                  agent={{ id, name: id.charAt(0).toUpperCase() + id.slice(1).replace(/([A-Z])/g, ' $1'), score: 70 + Math.floor(Math.random() * 25), trend: 'stable', attestations: Math.floor(Math.random() * 50), wallet }}
                  isSelected={selectedAgentId === id}
                  onClick={() => setSelectedAgentId(id)}
                  index={index}
                />
              ))
            )}
          </div>
        </section>

        {/* Agent Details */}
        <section className="space-y-4 lg:col-span-2">
          {loading ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-8 text-center">
              <div className="animate-spin h-8 w-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto" />
              <p className="mt-4 text-zinc-500">Loading agent data...</p>
            </div>
          ) : agentData ? (
            <>
              {/* Agent Profile */}
              <motion.div 
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-green-500/20 text-xl font-medium ring-1 ring-white/10">
                      {agentData.name.charAt(0)}
                    </div>
                    <div>
                      <DecryptedText 
                        text={agentData.name}
                        speed={50}
                        className="text-xl font-medium text-white"
                      />
                      <p className="text-xs text-zinc-500 font-mono mt-1">
                        {agentData.walletAddress.slice(0, 12)}...{agentData.walletAddress.slice(-8)}
                      </p>
                    </div>
                  </div>
                  <ScoreRing score={agentData.overall} />
                </div>
              </motion.div>

              {/* Blockchain Data */}
              <motion.div 
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <BlockchainBadge 
                  transactions={agentData.onChainData.transactions}
                  programs={agentData.onChainData.programs}
                />
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-zinc-900/50 p-3">
                    <p className="text-xs text-zinc-500">Balance</p>
                    <p className="text-lg font-semibold text-white">{agentData.onChainData.balance}</p>
                  </div>
                  <div className="rounded-lg bg-zinc-900/50 p-3">
                    <p className="text-xs text-zinc-500">Last Active</p>
                    <p className="text-sm font-medium text-white">
                      {new Date(agentData.onChainData.lastActive).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Score Breakdown */}
              <motion.div 
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="mb-4 text-sm font-medium text-zinc-400">Score Breakdown</h3>
                <div className="space-y-4">
                  <ProgressBar value={agentData.breakdown.identityVerification} label="Identity Verification" color="bg-purple-500" />
                  <ProgressBar value={agentData.breakdown.taskCompletion} label="Task Completion" color="bg-green-500" />
                  <ProgressBar value={agentData.breakdown.paymentHistory} label="Payment History" color="bg-blue-500" />
                  <ProgressBar value={agentData.breakdown.onChainActivity} label="On-Chain Activity" color="bg-orange-500" />
                </div>
              </motion.div>

              {/* Programs */}
              <motion.div 
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <h3 className="mb-3 text-sm font-medium text-zinc-400">Programs Interacted</h3>
                <div className="flex flex-wrap gap-2">
                  {agentData.onChainData.programs.map((program) => (
                    <span key={program} className="rounded-lg bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-400 ring-1 ring-zinc-800">
                      {program}
                    </span>
                  ))}
                </div>
              </motion.div>
            </>
          ) : (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-8 text-center text-zinc-500">
              Agent not found
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="mx-auto mt-8 max-w-6xl text-center text-xs text-zinc-600 relative z-10">
        <p>ShadowTrust • Agent Reputation Ledger • {agentData?.dataSource === 'solana-mainnet' ? 'Live on Solana' : 'Demo Mode'}</p>
      </footer>
    </div>
  )
}
