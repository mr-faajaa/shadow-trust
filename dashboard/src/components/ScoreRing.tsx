'use client'

interface ScoreRingProps {
  score: number
  size?: number
  strokeWidth?: number
}

export function ScoreRing({ score, size = 120, strokeWidth = 8 }: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (score / 100) * circumference
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#14F195'
    if (score >= 60) return '#FFD700'
    return '#FF6B6B'
  }
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Score ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getScoreColor(score)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="score-ring"
          style={{ '--score-offset': offset } as React.CSSProperties}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold">{score}</span>
      </div>
    </div>
  )
}
