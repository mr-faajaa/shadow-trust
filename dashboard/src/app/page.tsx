'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BorderTrail } from '@/components/motion-primitives/border-trail'
import { GlowEffect } from '@/components/motion-primitives/glow-effect'
import { Spotlight } from '@/components/motion-primitives/spotlight'
import { TextShimmer } from '@/components/motion-primitives/text-shimmer'

type Trend = 'up' | 'stable' | 'down'
type AgentData = {
  id: string
  name: string
  score: number
  trend: Trend
  attestations: number
  tags: string[]
  avatar?: string
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
  { source: 'SAID Protocol', type: 'Identity Anchor', value: 100, date: 'Feb 5', icon: '🔐', color: 'from-purple-500 to-pink-500' },
  { source: 'BountyBoard', type: 'Task Completion', value: 95, date: 'Feb 4', icon: '✅', color: 'from-green-400 to-emerald-500' },
  { source: 'x402 Protocol', type: 'Payment Reliability', value: 88, date: 'Feb 4', icon: '💰', color: 'from-blue-400 to-cyan-500' },
  { source: 'Level 5', type: 'Days Alive', value: 100, date: 'Feb 3', icon: '❤️', color: 'from-orange-400 to-red-500' },
  { source: 'Solana mainnet', type: 'On-Chain History', value: 82, date: 'Feb 2', icon: '⛓️', color: 'from-indigo-500 to-purple-500' },
]

const mockScoreBreakdown = [
  { label: 'Identity Verification', value: 94, color: ['#9945FF', '#14F195'] },
  { label: 'Task Completion', value: 88, color: ['#14F195', '#00D4AA'] },
  { label: 'Payment History', value: 85, color: ['#00D4AA', '#00B4D8'] },
  { label: 'Survival Rate', value: 82, color: ['#F59E0B', '#EF4444'] },
]

// Animated Counter Hook
function useAnimatedCounter(target: number, duration = 1000) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let start = 0
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(start + (target - start) * eased)
      setValue(current)
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setValue(target)
      }
    }
    requestAnimationFrame(animate)
  }, [target, duration])
  return value
}

// Stat Card with animated counter
function StatCard({ 
  icon, 
  label, 
  value, 
  gradient, 
  delay = 0,
  suffix = '',
  prefix = ''
}: { 
  icon: string; 
  label: string; 
  value: number; 
  gradient: string;
  delay?: number;
  suffix?: string;
  prefix?: string;
}) {
  const animatedValue = useAnimatedCounter(value, 1500)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="relative group"
    >
      <GlowEffect colors={['#9945FF', '#14F195']} mode="colorShift" blur="strong" />
      <div className="relative glass-card rounded-2xl p-6 overflow-hidden">
        {/* Gradient border top */}
        <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradient}`} />
        
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{icon}</span>
          <span className="text-zinc-400 text-sm font-medium uppercase tracking-wider">{label}</span>
        </div>
        
        <div className="text-4xl md:text-5xl font-black">
          <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {prefix}{animatedValue}{suffix}
          </span>
        </div>
        
        {/* Animated underline */}
        <motion.div 
          className={`h-0.5 bg-gradient-to-r ${gradient} mt-3`}
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  )
}

// Agent Card with electric border
function AgentCard({ agent, isSelected, onClick, index }: { agent: AgentData; isSelected: boolean; onClick: () => void; index: number }) {
  const medals = ['🥇', '🥈', '🥉']
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`relative ${index < 3 ? 'pl-6' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {index < 3 && (
        <motion.span 
          className="absolute -left-2 top-1/2 -translate-y-1/2 text-xl filter drop-shadow-lg z-20"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1, type: 'spring' }}
        >
          {medals[index]}
        </motion.span>
      )}
      
      <motion.div
        onClick={onClick}
        className={`
          relative rounded-xl p-4 cursor-pointer transition-all duration-300
          ${isSelected 
            ? 'bg-gradient-to-br from-purple-500/20 to-green-500/10 ring-2 ring-purple-500/50' 
            : 'bg-zinc-900/50 hover:bg-zinc-900/80'}
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <BorderTrail
          className="bg-gradient-to-r from-purple-500 via-green-400 to-blue-500"
          size={60}
        />
        
        <Spotlight size={150} springOptions={{ bounce: 0, damping: 25, stiffness: 250 }} />
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <motion.div 
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold
                ${isSelected 
                  ? 'bg-gradient-to-br from-purple-500 to-green-400 shadow-lg shadow-purple-500/30' 
                  : 'bg-zinc-800'}
              `}
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {agent.name.charAt(0)}
            </motion.div>
            <div>
              <div className="font-semibold text-white">{agent.name}</div>
              <div className="flex gap-1 mt-1 flex-wrap">
                {agent.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
          
          <motion.div 
            className={`
              px-4 py-2 rounded-full text-xl font-bold
              ${agent.score >= 80 ? 'text-green-400' : agent.score >= 60 ? 'text-yellow-400' : 'text-red-400'}
            `}
            whileHover={{ scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {agent.score}
          </motion.div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-zinc-500 mb-1">
            <span>Trust</span>
            <span>{agent.score >= 80 ? 'High' : agent.score >= 60 ? 'Med' : 'Low'}</span>
          </div>
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                agent.score >= 80 ? 'bg-gradient-to-r from-green-400 to-emerald-400' :
                agent.score >= 60 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                'bg-gradient-to-r from-red-400 to-pink-400'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${agent.score}%` }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Score Ring with animation
function ScoreRing({ score }: { score: number }) {
  const radius = 48
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (score / 100) * circumference
  
  const getColors = (score: number) => {
    if (score >= 80) return { start: '#14F195', end: '#00D4AA', glow: 'from-green-400 to-emerald-500' }
    if (score >= 60) return { start: '#F59E0B', end: '#EF4444', glow: 'from-yellow-400 to-orange-500' }
    return { start: '#EF4444', end: '#EC4899', glow: 'from-red-400 to-pink-500' }
  }
  
  const colors = getColors(score)
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="relative"
      >
        <svg width={130} height={130}>
          <circle
            cx={65}
            cy={65}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={6}
          />
          <motion.circle
            cx={65}
            cy={65}
            r={radius}
            fill="none"
            stroke={colors.start}
            strokeWidth={6}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
            className="drop-shadow-lg"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            className="text-3xl font-bold text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
        </div>
        
        {/* Glow ring */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${colors.glow} blur-xl opacity-30`}
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  )
}

// Floating Dock
function FloatingDock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, type: 'spring' }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-card rounded-2xl px-6 py-3 flex items-center gap-2 border border-white/10">
        {[
          { icon: '🏛️', label: 'Home', href: '#' },
          { icon: '📊', label: 'Stats', href: '#' },
          { icon: '🔗', label: 'Integrations', href: '#' },
          { icon: '📖', label: 'Docs', href: '#' },
          { icon: '🐙', label: 'GitHub', href: 'https://github.com/mr-faajaa/shadow-trust' },
        ].map((item, i) => (
          <motion.a
            key={item.label}
            href={item.href}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors relative group"
          >
            <span className="text-xl">{item.icon}</span>
            <motion.span 
              className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-zinc-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
            >
              {item.label}
            </motion.span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}

// Hero Background with noise
function HeroBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      
      {/* Animated blobs */}
      <motion.div
        className="fixed -top-40 -right-40 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -z-10"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="fixed top-1/3 -left-40 w-[400px] h-[400px] bg-green-400/8 rounded-full blur-[100px] -z-10"
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="fixed bottom-0 right-1/3 w-[350px] h-[350px] bg-blue-500/8 rounded-full blur-[100px] -z-10"
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      
      {/* Noise texture */}
      <div className="fixed inset-0 -z-10 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />
      
      {/* Grid pattern */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
    </>
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
    <div className="min-h-screen p-6 md:p-8 pb-32 relative">
      <HeroBackground />
      
      {/* Header */}
      <header className="relative mb-14">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <motion.div 
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-green-400 flex items-center justify-center shadow-xl shadow-purple-500/30"
                  whileHover={{ scale: 1.08, rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <span className="text-4xl">🏛️</span>
                </motion.div>
                <div>
                  <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                    <span className="bg-gradient-to-r from-white via-purple-100 to-green-100 bg-clip-text text-transparent">
                      ShadowTrust
                    </span>
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <TextShimmer
                      as="p"
                      className="text-xl text-zinc-400 font-light"
                      spread={2}
                    >
                      The reputation layer for autonomous agents
                    </TextShimmer>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-green-400 rounded-full blur opacity-40 animate-pulse" />
                <div className="relative glass-card px-5 py-2.5 rounded-full flex items-center gap-2.5 border border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
                  <span className="text-sm font-medium text-white">x402 Enabled</span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card px-5 py-2.5 rounded-full flex items-center gap-2.5 border border-white/10"
              >
                <span className="text-sm font-medium text-white">@solana/kit</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 relative">
        <StatCard 
          icon="👥" 
          label="Total Agents" 
          value={mockAgents.length} 
          gradient="from-purple-400 to-pink-400"
          delay={0.1}
        />
        <StatCard 
          icon="📈" 
          label="Avg Trust" 
          value={Math.round(mockAgents.reduce((a, b) => a + b.score, 0) / mockAgents.length)} 
          gradient="from-green-400 to-emerald-400"
          delay={0.2}
          suffix="/100"
        />
        <StatCard 
          icon="📜" 
          label="Attestations" 
          value={mockAgents.reduce((a, b) => a + b.attestations, 0)} 
          gradient="from-cyan-400 to-blue-400"
          delay={0.3}
        />
        <StatCard 
          icon="🔗" 
          label="Integrations" 
          value={3} 
          gradient="from-orange-400 to-pink-400"
          delay={0.4}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        {/* Agent List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="relative"
        >
          <GlowEffect colors={['#9945FF', '#14F195', '#00D4AA']} mode="colorShift" blur="medium" />
          <div className="relative glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏆</span>
              <TextShimmer
                as="h2"
                className="text-2xl font-bold"
                spread={3}
              >
                Leaderboard
              </TextShimmer>
            </div>
            
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/80 border border-zinc-700/50 rounded-xl px-4 py-3 pl-10 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">🔍</span>
            </div>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
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
          </div>
        </motion.div>

        {/* Agent Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <BorderTrail
              className="bg-gradient-to-r from-purple-500 via-green-400 to-blue-500"
              size={80}
            />
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
              {/* Glow */}
              <motion.div
                className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/15 rounded-full blur-[80px]"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-8 relative">
                <div className="flex items-start gap-5">
                  <motion.div 
                    className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-green-400 flex items-center justify-center text-5xl font-bold shadow-xl shadow-purple-500/30"
                    whileHover={{ scale: 1.08, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {selectedAgent.name.charAt(0)}
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{selectedAgent.name}</h2>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {selectedAgent.tags.map((tag, i) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full font-medium border border-purple-500/30"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    <div className="text-zinc-400 text-sm mt-2 flex items-center gap-2">
                      <span>{selectedAgent.attestations} attestations</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        Live
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center shrink-0">
                  <ScoreRing score={selectedAgent.score} />
                  <motion.div
                    className={`mt-4 px-5 py-1.5 rounded-full text-sm font-bold border ${
                      selectedAgent.score >= 80 
                        ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                        : selectedAgent.score >= 60 
                        ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {selectedAgent.score >= 80 ? '✓ Trusted' : 
                     selectedAgent.score >= 60 ? '⚠ Moderate' : '✗ Risky'}
                  </motion.div>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="mb-8 relative">
                <h3 className="text-sm text-zinc-400 mb-4 font-medium uppercase tracking-wider">Score Breakdown</h3>
                <div className="space-y-4">
                  {mockScoreBreakdown.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-zinc-300 text-sm">{item.label}</span>
                        <span className="font-mono text-sm font-bold text-zinc-300">{item.value}</span>
                      </div>
                      <div className="h-2.5 bg-zinc-800/80 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(to right, ${item.color[0]}, ${item.color[1]})`
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trust Meter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-zinc-900/80 rounded-xl p-5 border border-zinc-800/50"
              >
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-zinc-400 font-medium">Composite Trust Score</span>
                  <span className="font-bold font-mono text-white">{selectedAgent.score}/100</span>
                </div>
                <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      selectedAgent.score >= 80 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-400' 
                        : selectedAgent.score >= 60 
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-400'
                        : 'bg-gradient-to-r from-red-500 to-pink-400'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedAgent.score}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 1 }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-zinc-600">
                  <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Recent Attestations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="relative"
          >
            <BorderTrail
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              size={60}
            />
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-2xl">📜</span>
                <TextShimmer
                  as="h3"
                  className="text-xl font-semibold"
                  spread={2}
                >
                  Recent Attestations
                </TextShimmer>
              </div>
              <div className="space-y-3">
                {mockAttestations.map((att, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    whileHover={{ scale: 1.01, x: 5 }}
                    className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl cursor-pointer border border-transparent hover:border-zinc-700/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${att.color} flex items-center justify-center text-3xl border border-white/10`}
                        whileHover={{ rotate: 8, scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        {att.icon}
                      </motion.div>
                      <div>
                        <div className="font-medium text-zinc-200">{att.source}</div>
                        <div className="text-xs text-zinc-500 font-mono">{att.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <motion.div 
                        className="font-bold text-green-400 font-mono text-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        +{att.value}
                      </motion.div>
                      <div className="text-xs text-zinc-600">{att.date}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Dock */}
      <FloatingDock />

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-12 text-center text-zinc-500 text-sm relative"
      >
        <p className="mb-3">
          Built by <span className="text-purple-400 font-medium">ShadowBuilder</span> <span className="text-zinc-600">•</span> Colosseum Agent Hackathon 2026
        </p>
        <div className="flex justify-center gap-6">
          <motion.a 
            href="https://github.com/mr-faajaa/shadow-trust" 
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
          >
            <span>🐙</span> GitHub
          </motion.a>
          <motion.a 
            href="#" 
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
          >
            <span>📖</span> Docs
          </motion.a>
          <motion.a 
            href="#" 
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
          >
            <span>🔌</span> API
          </motion.a>
        </div>
      </motion.footer>
    </div>
  )
}
