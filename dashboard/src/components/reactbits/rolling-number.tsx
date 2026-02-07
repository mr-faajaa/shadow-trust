'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, SpringOptions } from 'motion/react';

export interface RollingNumberProps {
  value: number;
  duration?: number;
  className?: string;
  springOptions?: SpringOptions;
}

export function RollingNumber({
  value,
  duration = 2,
  className = '',
  springOptions = { bounce: 0, damping: 25, stiffness: 80 }
}: RollingNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);
  
  const spring = useSpring(0, springOptions);
  const display = useTransform(spring, (latest: number) => Math.round(latest).toString());

  useEffect(() => {
    // Only animate on mount, not on every value change
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      spring.set(value);
    }
  }, [value, spring]);

  return (
    <motion.span className={className}>
      {display}
    </motion.span>
  );
}

export default RollingNumber;
