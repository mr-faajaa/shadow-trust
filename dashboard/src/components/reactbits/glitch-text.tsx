'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface GlitchTextProps {
  text: string;
  speed?: number;
  intensity?: number;
  className?: string;
}

export function GlitchText({
  text,
  speed = 100,
  intensity = 0.5,
  className = ''
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  const glitch = useCallback(() => {
    const intensityMultiplier = intensity;
    const iterations = Math.floor(2 + Math.random() * 3);
    
    let count = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < count) return text[index];
            return Math.random() < intensityMultiplier 
              ? chars[Math.floor(Math.random() * chars.length)] 
              : char;
          })
          .join('')
      );
      
      count++;
      if (count >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, speed / 3);
    
    return interval;
  }, [text, speed, intensity]);

  useEffect(() => {
    // Initial glitch on mount
    const timeout = setTimeout(glitch, 500);
    
    // Random glitches
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.05) {
        setIsGlitching(true);
        const interval = glitch();
        setTimeout(() => {
          setIsGlitching(false);
          clearInterval(interval);
        }, 100 + Math.random() * 200);
      }
    }, 2000);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(glitchInterval);
    };
  }, [glitch]);

  return (
    <div className={cn('relative inline-block', className)}>
      <motion.span
        className="relative z-10"
        animate={isGlitching ? { x: [-2, 2, 0] } : {}}
        transition={{ duration: 0.1 }}
      >
        {displayText}
      </motion.span>
      
      {/* Red shift layer */}
      <motion.span
        className="absolute top-0 left-0 -z-10 text-red-500 opacity-50"
        animate={isGlitching ? { x: [-3, 3, 0], opacity: [0.5, 0.8, 0.5] } : {}}
        style={{ clipPath: 'inset(0 0 50% 0)' }}
        transition={{ duration: 0.1 }}
      >
        {displayText}
      </motion.span>
      
      {/* Blue shift layer */}
      <motion.span
        className="absolute top-0 left-0 -z-10 text-blue-500 opacity-50"
        animate={isGlitching ? { x: [3, -3, 0], opacity: [0.5, 0.8, 0.5] } : {}}
        style={{ clipPath: 'inset(50% 0 0 0)' }}
        transition={{ duration: 0.1 }}
      >
        {displayText}
      </motion.span>
    </div>
  );
}

export default GlitchText;
