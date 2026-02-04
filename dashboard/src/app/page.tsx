'use client'

import { useState } from 'react'
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

// Mock data for demo
const mockAgents: AgentData[] = [
  { id: 'shadowbuilder', name: 'ShadowBuilder', score: 92, trend: 'up', attestations: 47, tags: ['infra', 'ai'] },
  { id: 'bountyboard', name: 'BountyBoard', score: 88, trend: 'stable', attestations: 32, tags: ['defi', 'payments'] },
  { id: 'sipher', name: 'Sipher', score: 85, trend: 'up', attestations: 28, tags: ['privacy'] },
  { id: 'said', name: 'SAID Protocol', score: 94, trend: 'stable', attestations: 56, tags: ['identity'] },
  { id: 'kai', name: 'kai', score: 78, trend: 'up', attestations: 19, tags: ['infra'] },
  { id: 'pinch', name: 'Level 5', score: 82, trend: 'stable', attestations: 24, tags: ['survival'] },
]

const mockAttestations = [
  { source: 'BountyBoard', type: 'Task Completion', value: 95, date: '2026-02-04' },
  { source: 'SAID Protocol', type: 'Identity Verification', value: 100, date: '2026-02-03' },
  { source: 'x402 Payments', type: 'Payment History', value: 88, date: '2026-02-02' },
  { source: 'Level 5', type: 'Days Alive', value: 100, date: '2026-02-01' },
]

const mockScoreBreakdown = [
  { label: 'Task Completion', value: 92, color: 'bg-purple-500' },
  { label: 'Payment History', value: 88, color: 'bg-blue-500' },
  { label: 'Identity Verification', value: 100, color: 'bg-green-500' },
  { label: 'On-Chain Activity', value: 85, color: 'bg-yellow-500' },
]

export default function Dashboard() {
  const [selectedAgent, setSelectedAgent] = useState(mockAgents[0])
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAgents = mockAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-green-400 flex items-center justify-center">
                <span className="text-xl">🏛️</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="solana-gradient-text">ShadowTrust</span>
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              Agent Reputation Ledger • Built on Solana
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              <span className="text-sm">x402 Enabled</span>
            </div>
            <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2">
              <span className="text-sm">@solana/kit</span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="glass-card rounded-2xl p-6 float">
          <div className="text-gray-400 text-sm">Total Agents</div>
          <div className="text-3xl md:text-4xl font-bold mt-2">{mockAgents.length}</div>
          <div className="text-xs text-purple-400 mt-1">+3 this week</div>
        </div>
        <div className="glass-card rounded-2xl p-6 float" style={{ animationDelay: '0.1s' }}>
          <div className="text-gray-400 text-sm">Avg Trust Score</div>
          <div className="text-3xl md:text-4xl font-bold mt-2 text-green-400">
            {Math.round(mockAgents.reduce((a, b) => a + b.score, 0) / mockAgents.length)}
          </div>
          <div className="text-xs text-green-400 mt-1">↑ 2.3%</div>
        </div>
        <div className="glass-card rounded-2xl p-6 float" style={{ animationDelay: '0.2s' }}>
          <div className="text-gray-400 text-sm">Total Attestations</div>
          <div className="text-3xl md:text-4xl font-bold mt-2">
            {mockAgents.reduce((a, b) => a + b.attestations, 0)}
          </div>
          <div className="text-xs text-blue-400 mt-1">+12 today</div>
        </div>
        <div className="glass-card rounded-2xl p-6 float" style={{ animationDelay: '0.3s' }}>
          <div className="text-gray-400 text-sm">Integrations</div>
          <div className="text-3xl md:text-4xl font-bold mt-2 text-purple-400">3</div>
          <div className="text-xs text-gray-500 mt-1">SAID, Sipher, L5</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Agent List */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>🏆</span> Agent Rankings
          </h2>
          <input
            type="text"
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/30 border border-gray-700 rounded-xl px-4 py-3 mb-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          />
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {filteredAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                isSelected={selectedAgent.id === agent.id}
                onClick={() => setSelectedAgent(agent)}
              />
            ))}
          </div>
        </div>

        {/* Agent Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Score Card */}
          <div className="glass-card rounded-2xl p-8 pulse-glow">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-green-400 flex items-center justify-center text-2xl font-bold">
                    {selectedAgent.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedAgent.name}</h2>
                    <div className="flex gap-2 mt-1">
                      {selectedAgent.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-gray-400 text-sm mt-2">
                  {selectedAgent.attestations} attestations • Trust score updated live
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <ScoreRing score={selectedAgent.score} size={100} />
                <div className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                  selectedAgent.score >= 80 ? 'bg-green-500/20 text-green-400' :
                  selectedAgent.score >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {selectedAgent.score >= 80 ? 'High Trust' : 
                   selectedAgent.score >= 60 ? 'Medium Trust' : 'Low Trust'}
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="mb-6">
              <h3 className="text-sm text-gray-400 mb-3">Score Breakdown</h3>
              <div className="space-y-3">
                {mockScoreBreakdown.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-gray-300">{item.label}</div>
                    <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                    <div className="w-12 text-right font-mono text-sm">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Trust Meter */}
            <div className="bg-black/30 rounded-xl p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Overall Trust Score</span>
                <span className="font-bold">{selectedAgent.score}/100</span>
              </div>
              <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    selectedAgent.score >= 80 ? 'trust-score-high' :
                    selectedAgent.score >= 60 ? 'trust-score-medium' :
                    'trust-score-low'
                  }`}
                  style={{ width: `${selectedAgent.score}%` }}
                />
              </div>
            </div>
          </div>

          {/* Recent Attestations */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>📜</span> Recent Attestations
            </h3>
            <div className="space-y-3">
              {mockAttestations.map((att, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-black/20 rounded-xl hover:bg-black/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-green-400/20 flex items-center justify-center">
                      <span className="text-xl">✓</span>
                    </div>
                    <div>
                      <div className="font-medium">{att.source}</div>
                      <div className="text-xs text-gray-500">{att.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-400">+{att.value}</div>
                    <div className="text-xs text-gray-500">{att.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p className="mb-2">Built by <span className="text-purple-400">ShadowBuilder</span> • Colosseum Agent Hackathon 2026</p>
        <div className="flex justify-center gap-4">
          <a href="https://github.com/mr-faajaa/shadow-trust" className="text-purple-400 hover:text-purple-300 transition-colors">GitHub</a>
          <a href="#" className="text-green-400 hover:text-green-300 transition-colors">API</a>
          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Docs</a>
        </div>
      </footer>
    </div>
  )
}
