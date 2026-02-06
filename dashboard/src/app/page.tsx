'use client'

import { useState, useEffect } from 'react'
import { AgentCard, ScoreRing } from '@/components'

type Trend = 'up' | 'stable' | 'down'
type AgentData = {
  id: string
  name: string
  score: number
  trend: Trend
  attestations: number
  tags: string[]
}

// ShadowTrust ecosystem - real integrations + demo agents
const mockAgents: AgentData[] = [
  { id: 'shadowbuilder', name: 'ShadowBuilder', score: 92, trend: 'up', attestations: 47, tags: ['founder', 'builder'] },
  { id: 'said', name: 'SAID Protocol', score: 94, trend: 'stable', attestations: 56, tags: ['identity', 'infra'] },
  { id: 'bountyboard', name: 'BountyBoard', score: 88, trend: 'up', attestations: 32, tags: ['tasks', 'payments'] },
  { id: 'sipher', name: 'Sipher', score: 85, trend: 'up', attestations: 28, tags: ['privacy', 'stealth'] },
  { id: 'level5', name: 'Level 5', score: 82, trend: 'stable', attestations: 24, tags: ['survival', 'metrics'] },
  { id: 'claude', name: 'ClaudeCraft', score: 78, trend: 'up', attestations: 19, tags: ['minecraft', 'autonomous'] },
]

const mockAttestations = [
  { source: 'SAID Protocol', type: 'Identity Anchor', value: 100, date: '2026-02-05', icon: '🔐' },
  { source: 'BountyBoard', type: 'Task Completion', value: 95, date: '2026-02-04', icon: '✅' },
  { source: 'x402 Protocol', type: 'Payment Reliability', value: 88, date: '2026-02-04', icon: '💰' },
  { source: 'Level 5', type: 'Days Alive', value: 100, date: '2026-02-03', icon: '❤️' },
  { source: 'Solana mainnet', type: 'On-Chain History', value: 82, date: '2026-02-02', icon: '⛓️' },
]

const mockScoreBreakdown = [
  { label: 'Identity Verification', value: 94, color: 'from-purple-500 to-purple-600' },
  { label: 'Task Completion', value: 88, color: 'from-green-400 to-green-500' },
  { label: 'Payment History', value: 85, color: 'from-blue-400 to-blue-500' },
  { label: 'Survival Rate', value: 82, color: 'from-orange-400 to-orange-500' },
]

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
    <div className="min-h-screen p-6 md:p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-40 w-72 h-72 bg-green-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Header */}
      <header className="relative mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-green-400 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-2xl">🏛️</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-purple-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                  ShadowTrust
                </span>
              </h1>
            </div>
            <p className="text-gray-400 text-lg font-light">
              The reputation layer for autonomous agents <span className="text-purple-400">•</span> Built on Solana
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="glass-card px-5 py-2.5 rounded-full flex items-center gap-2.5 border border-purple-500/30">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
              <span className="text-sm font-medium text-gray-200">x402 Enabled</span>
            </div>
            <div className="glass-card px-5 py-2.5 rounded-full flex items-center gap-2.5 border border-green-500/30">
              <span className="text-sm font-medium text-gray-200">@solana/kit</span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 relative">
        <div className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300 cursor-default">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">👥</span>
            <div className="text-gray-400 text-sm font-medium">Total Agents</div>
          </div>
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {mockAgents.length}
          </div>
          <div className="text-xs text-purple-400 mt-2 font-medium">+2 this week</div>
        </div>
        <div className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300 cursor-default" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📈</span>
            <div className="text-gray-400 text-sm font-medium">Avg Trust Score</div>
          </div>
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            {Math.round(mockAgents.reduce((a, b) => a + b.score, 0) / mockAgents.length)}
          </div>
          <div className="text-xs text-green-400 mt-2 font-medium flex items-center gap-1">
            <span>↑</span> 2.3% this week
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300 cursor-default" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📜</span>
            <div className="text-gray-400 text-sm font-medium">Attestations</div>
          </div>
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {mockAgents.reduce((a, b) => a + b.attestations, 0)}
          </div>
          <div className="text-xs text-blue-400 mt-2 font-medium">+12 today</div>
        </div>
        <div className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300 cursor-default" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🔗</span>
            <div className="text-gray-400 text-sm font-medium">Integrations</div>
          </div>
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            3
          </div>
          <div className="text-xs text-gray-500 mt-2 font-medium">SAID • Sipher • L5</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        {/* Agent List */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-xl">🏆</span> 
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Leaderboard</span>
          </h2>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-gray-700/50 rounded-xl px-4 py-3 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
          </div>
          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin">
            {filteredAgents.map((agent, index) => (
              <div key={agent.id} className="relative">
                {index === 0 && <div className="absolute -left-2 -top-1 text-xl">🥇</div>}
                {index === 1 && <div className="absolute -left-2 -top-1 text-xl">🥈</div>}
                {index === 2 && <div className="absolute -left-2 -top-1 text-xl">🥉</div>}
                <div className={index < 3 ? 'ml-6' : ''}>
                  <AgentCard
                    agent={agent}
                    isSelected={selectedAgent.id === agent.id}
                    onClick={() => setSelectedAgent(agent)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Score Card */}
          <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 relative">
              <div className="flex items-start gap-4">
                <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-purple-500 to-green-400 flex items-center justify-center text-3xl font-bold shadow-lg shadow-purple-500/30 shrink-0">
                  {selectedAgent.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedAgent.name}</h2>
                  <div className="flex gap-2 mt-2">
                    {selectedAgent.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full font-medium border border-purple-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-gray-400 text-sm mt-2 flex items-center gap-2">
                    <span>{selectedAgent.attestations} attestations</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-green-400">Live</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center shrink-0">
                <ScoreRing score={selectedAgent.score} size={110} />
                <div className={`mt-3 px-4 py-1.5 rounded-full text-sm font-bold border ${
                  selectedAgent.score >= 80 
                    ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                    : selectedAgent.score >= 60 
                    ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                  {selectedAgent.score >= 80 ? '✓ Trusted' : 
                   selectedAgent.score >= 60 ? '⚠ Moderate' : '✗ Risky'}
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="mb-6 relative">
              <h3 className="text-sm text-gray-400 mb-4 font-medium uppercase tracking-wider">Score Breakdown</h3>
              <div className="space-y-4">
                {mockScoreBreakdown.map((item) => (
                  <div key={item.label} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300 text-sm">{item.label}</span>
                      </div>
                      <span className="font-mono text-sm font-bold text-gray-300">{item.value}</span>
                    </div>
                    <div className="h-2.5 bg-gray-800/80 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${item.color} transform transition-all duration-1000 group-hover:scale-x-105 origin-left`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Meter */}
            <div className="bg-black/40 rounded-xl p-5 border border-gray-800/50">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-400 font-medium">Composite Trust Score</span>
                <span className="font-bold font-mono">{selectedAgent.score}/100</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    selectedAgent.score >= 80 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-400' 
                      : selectedAgent.score >= 60 
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-400'
                      : 'bg-gradient-to-r from-red-500 to-pink-400'
                  }`}
                  style={{ width: `${selectedAgent.score}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-600">
                <span>0</span><span>50</span><span>100</span>
              </div>
            </div>
          </div>

          {/* Recent Attestations */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-xl">📜</span> 
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Recent Attestations</span>
            </h3>
            <div className="space-y-3">
              {mockAttestations.map((att, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-black/30 rounded-xl hover:bg-black/40 transition-all cursor-pointer border border-transparent hover:border-gray-700/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-green-400/20 flex items-center justify-center text-2xl border border-gray-700/30">
                      {att.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-200">{att.source}</div>
                      <div className="text-xs text-gray-500 font-mono">{att.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-400 font-mono">+{att.value}</div>
                    <div className="text-xs text-gray-600">{att.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm relative">
        <p className="mb-3">
          Built by <span className="text-purple-400 font-medium">ShadowBuilder</span> <span className="text-gray-600">•</span> Colosseum Agent Hackathon 2026
        </p>
        <div className="flex justify-center gap-6">
          <a href="https://github.com/mr-faajaa/shadow-trust" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
            <span>🐙</span> GitHub
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
            <span>📖</span> Docs
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
            <span>🔌</span> API
          </a>
        </div>
      </footer>
    </div>
  )
}
