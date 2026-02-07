'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useSpring, useTransform, SpringOptions } from 'motion/react';
import { cn } from '@/lib/utils';

export interface FaultyTerminalProps {
  tint?: string;
  glitchAmount?: number;
  scanlineIntensity?: number;
  curvature?: number;
  mouseReact?: boolean;
  className?: string;
}

export function FaultyTerminal({
  tint = '#22c55e',
  glitchAmount = 0.3,
  scanlineIntensity = 0.5,
  curvature = 0.2,
  mouseReact = false,
  className = ''
}: FaultyTerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);
  const [scanlines, setScanlines] = useState<number[]>([]);
  
  // Spring-based mouse following
  const springOptions: SpringOptions = { bounce: 0, damping: 30, stiffness: 300 };
  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  // Generate scanlines
  useEffect(() => {
    const lines = Array.from({ length: 20 }, (_, i) => i * 4);
    setScanlines(lines);
  }, []);

  // Handle mouse move
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!containerRef.current || !mouseReact) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    mouseX.set(x);
    mouseY.set(y);
    setMousePos({ x, y });
  }, [mouseReact, mouseX, mouseY]);

  useEffect(() => {
    if (!mouseReact || !containerRef.current) return;
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseReact, handleMouseMove]);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < glitchAmount * 0.1) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 50 + Math.random() * 100);
      }
    }, 500);
    
    return () => clearInterval(glitchInterval);
  }, [glitchAmount]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'pointer-events-none fixed inset-0 overflow-hidden',
        isGlitching && 'animate-glitch',
        className
      )}
      style={{
        '--terminal-tint': tint,
      } as React.CSSProperties}
    >
      {/* Base dark overlay */}
      <div 
        className="absolute inset-0 bg-zinc-950"
        style={{ opacity: 0.95 }}
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(var(--terminal-tint) 1px, transparent 1px),
            linear-gradient(90deg, var(--terminal-tint) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          perspective: '1000px',
          transform: curvature > 0 ? `perspective(1000px) rotateX(${curvature * 10}deg)` : undefined,
        }}
      />

      {/* Scanlines */}
      {scanlines.map((offset, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-px"
          style={{
            top: `${offset}%`,
            background: `linear-gradient(90deg, transparent, ${tint}, transparent)`,
            opacity: scanlineIntensity * 0.3,
          }}
          animate={{
            opacity: [
              scanlineIntensity * 0.3,
              scanlineIntensity * 0.6,
              scanlineIntensity * 0.3,
            ],
            y: [0, 5, 0],
          }}
          transition={{
            duration: 3 + i * 0.2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Mouse-following spotlight */}
      {mouseReact && (
        <motion.div
          className="absolute w-64 h-64 rounded-full blur-3xl"
          style={{
            left: useTransform(mouseX, (x) => `${x}%`),
            top: useTransform(mouseY, (y) => `${y}%`),
            background: `radial-gradient(circle, ${tint} 0%, transparent 70%)`,
            opacity: 0.15,
          }}
        />
      )}

      {/* Glitch overlays */}
      {isGlitching && (
        <>
          <motion.div
            className="absolute inset-0"
            style={{
              background: tint,
              opacity: 0.05,
              clipPath: 'polygon(0 0, 100% 0, 100% 10%, 0 10%)',
            }}
            animate={{
              clipPath: [
                'polygon(0 0, 100% 0, 100% 10%, 0 10%)',
                'polygon(0 20%, 100% 20%, 100% 30%, 0 30%)',
                'polygon(0 40%, 100% 40%, 100% 50%, 0 50%)',
              ],
            }}
            transition={{ duration: 0.1 }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: tint,
              opacity: 0.03,
              clipPath: 'polygon(0 80%, 100% 80%, 100% 90%, 0 90%)',
            }}
            animate={{
              clipPath: [
                'polygon(0 80%, 100% 80%, 100% 90%, 0 90%)',
                'polygon(0 60%, 100% 60%, 100% 70%, 0 70%)',
                'polygon(0 40%, 100% 40%, 100% 50%, 0 50%)',
              ],
            }}
            transition={{ duration: 0.1 }}
          />
        </>
      )}

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

export default FaultyTerminal;
