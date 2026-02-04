'use client'

import { useState, useEffect } from 'react'

interface AgentData {
  id: string
  name: string
  score: number
  trend: 'up' | 'stable' | 'down'
  attestations: number
  tags: string[]
}

interface AgentCardProps {
  agent: AgentData
  isSelected: boolean
  onClick: () => void
}

export function AgentCard({ agent, isSelected, onClick }: AgentCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  
  useEffect(() => {
    const duration = 1000
    const steps = 60
    const increment = agent.score / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= agent.score) {
        setAnimatedScore(agent.score)
        clearInterval(timer)
      } else {
        setAnimatedScore(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [agent.score])
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'trust-score-high'
    if (score >= 60) return 'trust-score-medium'
    return 'trust-score-low'
  }
  
  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'High Trust'
    if (score >= 60) return 'Medium Trust'
    return 'Low Trust'
  }
  
  return (
    <div
      onClick={onClick}
      className={`agent-card glass-card rounded-xl p-4 cursor-pointer ${
        isSelected
          ? 'ring-2 ring-purple-500 bg-purple-500/10'
          : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-green-400 flex items-center justify-center text-lg font-bold">
            {agent.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-lg">{agent.name}</div>
            <div className="flex gap-1 mt-1">
              {agent.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-full text-xl font-bold ${getScoreColor(agent.score)} text-black`}>
            {animatedScore}
          </div>
          {agent.trend === 'up' && (
            <span className="text-green-400 text-xl">↑</span>
          )}
          {agent.trend === 'down' && (
            <span className="text-red-400 text-xl">↓</span>
          )}
        </div>
      </div>
      
      {/* Mini progress bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Trust Score</span>
          <span>{getScoreLabel(agent.score)}</span>
        </div>
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${getScoreColor(agent.score)}`}
            style={{ width: `${agent.score}%` }}
          />
        </div>
      </div>
    </div>
  )
}
