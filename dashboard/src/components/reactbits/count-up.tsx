'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, SpringOptions } from 'motion/react';

export interface CountUpProps {
  end: number;
  duration?: number;
  start?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  springOptions?: SpringOptions;
  onComplete?: () => void;
}

export function CountUp({
  end,
  duration = 1.5,
  start = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  springOptions = { bounce: 0, damping: 20, stiffness: 100 },
  onComplete
}: CountUpProps) {
  const [displayValue, setDisplayValue] = useState(start);
  const [isComplete, setIsComplete] = useState(false);
  const hasCompleted = useRef(false);
  
  // Use spring for smooth animation
  const spring = useSpring(start, springOptions);
  const rounded = useTransform(spring, (latest: number) => {
    const value = decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString();
    return value;
  });

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest: number) => {
      if (!hasCompleted.current) {
        setDisplayValue(latest);
        
        // Check if we've reached the target
        if (latest >= end && end >= start) {
          hasCompleted.current = true;
          setIsComplete(true);
          onComplete?.();
        } else if (latest <= end && end <= start) {
          hasCompleted.current = true;
          setIsComplete(true);
          onComplete?.();
        }
      }
    });

    // Animate to end value
    spring.set(end);

    return () => {
      unsubscribe();
    };
  }, [spring, end, start, onComplete]);

  // Format with decimals
  const formatValue = (val: number) => {
    const formatted = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
    return `${prefix}${formatted}${suffix}`;
  };

  return (
    <motion.span
      className={className}
      data-complete={isComplete}
    >
      {formatValue(displayValue)}
    </motion.span>
  );
}

export default CountUp;
