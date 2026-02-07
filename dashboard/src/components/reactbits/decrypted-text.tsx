'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';

export interface DecryptedTextProps {
  text: string;
  speed?: number;
  revealDirection?: 'start' | 'end' | 'center';
  className?: string;
  onComplete?: () => void;
}

export function DecryptedText({
  text,
  speed = 50,
  revealDirection = 'start',
  className = '',
  onComplete
}: DecryptedTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  const reveal = useCallback((targetText: string) => {
    let iteration = 0;
    const totalIterations = 3; // Number of scramble cycles
    
    const interval = setInterval(() => {
      setDisplayed((prev) => {
        if (iteration >= totalIterations) {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
          return targetText;
        }
        
        return targetText
          .split('')
          .map((letter, index) => {
            if (index < iteration || index > targetText.length - iteration - 1) {
              return letter;
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
      });
      
      iteration += 1;
    }, speed);
    
    return () => clearInterval(interval);
  }, [speed, onComplete]);

  useEffect(() => {
    reveal(text);
  }, [text, reveal]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {displayed || text}
    </motion.span>
  );
}

export default DecryptedText;
