'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type Trend = 'up' | 'stable' | 'down'
type AgentData = {
  id: string
  name: string
  score: number
  trend: Trend
  attestations: number
  tags: string[]
}

const mockAgents: AgentData[] = [
  { id: 'shadowbuilder', name: 'ShadowBuilder', score: 92, trend: 'up', attestations: 47, tags: ['founder', 'builder'] },
  { id: 'said', name: 'SAID Protocol', score: 94, trend: 'stable', attestations: 56, tags: ['identity', 'infra'] },
  { id: 'bountyboard', name: 'BountyBoard', score: 88, trend: 'up', attestations: 32, tags: ['tasks', 'payments'] },
  { id: 'sipher', name: 'Sipher', score: 85, trend: 'up', attestations: 28, tags: ['privacy', 'stealth'] },
  { id: 'level5', name: 'Level 5', score: 82, trend: 'stable', attestations: 24, tags: ['survival', 'metrics'] },
  { id: 'claude', name: 'ClaudeCraft', score: 78, trend: 'up', attestations: 19, tags: ['minecraft', 'autonomous'] },
]

const mockAttestations = [
  { source: 'SAID Protocol', type: 'Identity Anchor', value: 100, date: 'Feb 5', icon: '🔐' },
  { source: 'BountyBoard', type: 'Task Completion', value: 95, date: 'Feb 4', icon: '✅' },
  { source: 'x402 Protocol', type: 'Payment Reliability', value: 88, date: 'Feb 4', icon: '💰' },
  { source: 'Level 5', type: 'Days Alive', value: 100, date: 'Feb 3', icon: '❤️' },
  { source: 'Solana mainnet', type: 'On-Chain History', value: 82, date: 'Feb 2', icon: '⛓️' },
]

const mockScoreBreakdown = [
  { label: 'Identity Verification', value: 94 },
  { label: 'Task Completion', value: 88 },
  { label: 'Payment History', value: 85 },
  { label: 'Survival Rate', value: 82 },
]

function StatCard({ 
  label, 
  value, 
  delay = 0 
}: { 
  label: string; 
  value: number | string; 
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.2, ease: 'easeOut' }}
      className="size-full rounded-xl border border-zinc-200/10 bg-zinc-900/50 p-4"
    >
      <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-100">{value}</p>
    </motion.div>
  )
}

function AgentCard({ 
  agent, 
  isSelected, 
  onClick, 
  index 
}: { 
  agent: AgentData; 
  isSelected: boolean; 
  onClick: () => void; 
  index: number;
}) {
  const medals = ['🥇', '🥈', '🥉']
  
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.15, ease: 'easeOut' }}
      className={cn(
        'group relative w-full rounded-lg p-3 text-left transition-colors',
        isSelected 
          ? 'bg-zinc-800 ring-1 ring-zinc-600' 
          : 'hover:bg-zinc-800/50'
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">{medals[index]}</span>
          <div className="flex size-8 items-center justify-center rounded bg-zinc-700 text-sm font-medium">
            {agent.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-100">{agent.name}</p>
            <p className="text-xs text-zinc-500">{agent.tags.join(', ')}</p>
          </div>
        </div>
        <span className={cn(
          'text-sm font-semibold tabular-nums',
          agent.score >= 80 ? 'text-green-400' :
          agent.score >= 60 ? 'text-yellow-400' : 'text-red-400'
        )}>
          {agent.score}
        </span>
      </div>
    </motion.button>
  )
}

function ProgressBar({ value, color = 'bg-zinc-600' }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={cn('h-full rounded-full', color)}
      />
    </div>
  )
}

function TrustScoreRing({ score }: { score: number }) {
  const radius = 40
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (score / 100) * circumference
  const color = score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={96} height={96} className="transform -rotate-90">
        <circle
          cx={48}
          cy={48}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
          className="text-zinc-800"
        />
        <motion.circle
          cx={48}
          cy={48}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          strokeLinecap="round"
          className={color}
        />
      </svg>
      <span className={cn('absolute text-lg font-semibold tabular-nums', color)}>
        {score}
      </span>
    </div>
  )
}

export default function Dashboard() {
  const [selectedAgent, setSelectedAgent] = useState(mockAgents[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredAgents = mockAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!mounted) return null

  return (
    <div className="min-h-dvh bg-zinc-950 p-4 md:p-6">
      {/* Header */}
      <header className="mb-6 max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-100">
              ShadowTrust
            </h1>
            <p className="mt-1 text-pretty text-sm text-zinc-500">
              Agent reputation ledger on Solana
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex h-5 items-center gap-1 rounded-full bg-zinc-800 px-2 py-0.5 text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              x402 Enabled
            </span>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="mb-6 grid max-w-6xl grid-cols-2 gap-2 sm:grid-cols-4">
        <StatCard label="Agents" value={mockAgents.length} delay={0} />
        <StatCard label="Avg Trust" value={Math.round(mockAgents.reduce((a, b) => a + b.score, 0) / mockAgents.length)} delay={0.05} />
        <StatCard label="Attestations" value={mockAgents.reduce((a, b) => a + b.attestations, 0)} delay={0.1} />
        <StatCard label="Integrations" value={3} delay={0.15} />
      </div>

      {/* Main */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Leaderboard */}
        <section className="rounded-xl border border-zinc-200/10 bg-zinc-900/50 p-4">
          <h2 className="mb-3 text-sm font-medium text-zinc-400">Leaderboard</h2>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-3 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none"
          />
          <div className="space-y-1">
            {filteredAgents.map((agent, index) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                isSelected={selectedAgent.id === agent.id}
                onClick={() => setSelectedAgent(agent)}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Details */}
        <section className="space-y-4 lg:col-span-2">
          {/* Agent Profile */}
          <div className="rounded-xl border border-zinc-200/10 bg-zinc-900/50 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-zinc-700 text-lg font-medium">
                {selectedAgent.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-medium text-zinc-100">{selectedAgent.name}</h3>
                    <p className="text-xs text-zinc-500">{selectedAgent.tags.join(', ')}</p>
                  </div>
                  <TrustScoreRing score={selectedAgent.score} />
                </div>
              </div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="rounded-xl border border-zinc-200/10 bg-zinc-900/50 p-5">
            <h3 className="mb-3 text-sm font-medium text-zinc-400">Score Breakdown</h3>
            <div className="space-y-3">
              {mockScoreBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-zinc-400">{item.label}</span>
                    <span className="text-zinc-300 tabular-nums">{item.value}</span>
                  </div>
                  <ProgressBar value={item.value} />
                </div>
              ))}
            </div>
          </div>

          {/* Attestations */}
          <div className="rounded-xl border border-zinc-200/10 bg-zinc-900/50 p-5">
            <h3 className="mb-3 text-sm font-medium text-zinc-400">Recent Attestations</h3>
            <div className="space-y-2">
              {mockAttestations.map((att, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center justify-between rounded-lg bg-zinc-900/50 p-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{att.icon}</span>
                    <div>
                      <p className="text-sm text-zinc-200">{att.source}</p>
                      <p className="text-xs text-zinc-500">{att.type}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-400 tabular-nums">+{att.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mx-auto mt-8 max-w-6xl text-center text-xs text-zinc-600">
        <p>ShadowTrust • Built by ShadowBuilder • Colosseum Agent Hackathon 2026</p>
      </footer>
    </div>
  )
}
