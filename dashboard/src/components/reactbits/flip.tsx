'use client';

import { useState, useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FlipProps {
  children: ReactNode[];
  className?: string;
  duration?: number;
}

export function Flip({ 
  children, 
  className = '', 
  duration = 0.3 
}: FlipProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={className}>
      <AnimatePresence mode="popLayout">
        {mounted && children.map((child, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              layout: { duration },
              opacity: { duration: duration * 0.5 },
              scale: { duration: duration * 0.5 }
            }}
          >
            {child}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltIntensity?: number;
  glareIntensity?: number;
}

export function TiltCard({ 
  children, 
  className = '', 
  tiltIntensity = 20,
  glareIntensity = 0.3
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -tiltIntensity;
    const rotateY = ((x - centerX) / centerX) * tiltIntensity;
    
    setRotation({ x: rotateX, y: rotateY });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      animate={{ 
        rotateX: rotation.x, 
        rotateY: rotation.y 
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Glare effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glareIntensity}) 0%, transparent 60%)`,
          opacity: rotation.x !== 0 || rotation.y !== 0 ? 1 : 0,
        }}
      />
      {children}
    </motion.div>
  );
}

interface GlassSurfaceProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  blur?: number;
}

export function GlassSurface({ 
  children, 
  className = '', 
  intensity = 'medium',
  blur = 12
}: GlassSurfaceProps) {
  const intensityStyles = {
    low: 'bg-zinc-900/40 border-zinc-700/20',
    medium: 'bg-zinc-900/60 border-zinc-700/30',
    high: 'bg-zinc-900/80 border-zinc-700/40',
  };

  return (
    <div
      className={`relative rounded-xl border backdrop-blur-xl ${intensityStyles[intensity]} ${className}`}
      style={{ backdropFilter: `blur(${blur}px)` }}
    >
      {/* Glass shine effect */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-50"
      />
      {children}
    </div>
  );
}

interface GradientTextProps {
  text: string;
  className?: string;
  gradient?: string;
  animated?: boolean;
}

export function GradientText({ 
  text, 
  className = '', 
  gradient = 'from-green-400 via-emerald-400 to-teal-400',
  animated = true
}: GradientTextProps) {
  return (
    <span 
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${animated ? 'animate-gradient' : ''} ${className}`}
      style={{
        backgroundSize: '200% 200%',
      }}
    >
      {text}
    </span>
  );
}

interface WavesProps {
  className?: string;
  color?: string;
  amplitude?: number;
  speed?: number;
}

export function Waves({ 
  className = '', 
  color = '#22c55e',
  amplitude = 50,
  speed = 0.5
}: WavesProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setOffset(prev => prev + speed);
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill={color}
          fillOpacity="0.1"
          d={`M0,160 C240,${160 + amplitude} 480,${160 - amplitude} 720,160 C960,160 1200,160 1440,160 L1440,320 L0,320 Z`}
          style={{
            transform: `translateY(${Math.sin(offset * 0.01) * 20}px)`,
          }}
        />
        <path
          fill={color}
          fillOpacity="0.05"
          d={`M0,200 C320,${200 + amplitude * 0.8} 640,${200 - amplitude * 0.8} 960,200 C1280,200 1400,200 1440,200 L1440,320 L0,320 Z`}
          style={{
            transform: `translateY(${Math.sin(offset * 0.01 + 2) * 15}px)`,
          }}
        />
        <path
          fill={color}
          fillOpacity="0.03"
          d={`M0,240 C400,${240 + amplitude * 0.6} 800,${240 - amplitude * 0.6} 1200,240 C1400,240 1440,240 1440,240 L1440,320 L0,320 Z`}
          style={{
            transform: `translateY(${Math.sin(offset * 0.01 + 4) * 10}px)`,
          }}
        />
      </svg>
    </div>
  );
}

interface CardSwapProps {
  children: [ReactNode, ReactNode];
  className?: string;
  hoverIntensity?: number;
}

export function CardSwap({ 
  children, 
  className = '', 
  hoverIntensity = 8 
}: CardSwapProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: 1000 }}
    >
      {/* Back card (shown on hover) */}
      <motion.div
        className="absolute inset-0"
        initial={{ rotateY: -hoverIntensity, opacity: 0 }}
        animate={{ 
          rotateY: isHovered ? 0 : -hoverIntensity,
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.95
        }}
        transition={{ duration: 0.3 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children[1]}
      </motion.div>
      
      {/* Front card */}
      <motion.div
        className="relative"
        initial={{ rotateY: 0, opacity: 1 }}
        animate={{ 
          rotateY: isHovered ? hoverIntensity : 0,
          opacity: isHovered ? 0 : 1,
          scale: isHovered ? 0.95 : 1
        }}
        transition={{ duration: 0.3 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children[0]}
      </motion.div>
    </div>
  );
}

interface CounterProps {
  to: number;
  className?: string;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export function Counter({ 
  to, 
  className = '', 
  duration = 2,
  suffix = '',
  prefix = ''
}: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function (easeOutExpo)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(eased * to));
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [to, duration]);

  return (
    <span className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

interface BounceCardsProps {
  children: ReactNode[];
  className?: string;
}

export function BounceCards({ 
  children, 
  className = '' 
}: BounceCardsProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: index * 0.1,
            type: 'spring',
            stiffness: 300,
            damping: 20
          }}
          whileHover={{ 
            y: -10,
            transition: { type: 'spring', stiffness: 400 }
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

interface MarqueeProps {
  text: string;
  className?: string;
  speed?: number;
  direction?: 'left' | 'right';
}

export function Marquee({ 
  text, 
  className = '', 
  speed = 30,
  direction = 'left'
}: MarqueeProps) {
  const duplicatedText = `${text} ${text} ${text}`;
  
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="whitespace-nowrap"
        animate={{ 
          x: direction === 'left' ? ['0%', '-66.66%'] : ['-66.66%', '0%']
        }}
        transition={{ 
          duration: speed,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {duplicatedText}
      </motion.div>
    </div>
  );
}

interface ShinyButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ShinyButton({ 
  children, 
  className = '', 
  onClick 
}: ShinyButtonProps) {
  const [shinePosition, setShinePosition] = useState(-100);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setShinePosition(x);
  };

  return (
    <button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShinePosition(-100)}
      className={`relative overflow-hidden rounded-lg px-4 py-2 font-medium transition-colors ${className}`}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{ 
          transform: `translateX(${shinePosition - 100}%)`,
          transition: 'transform 0.3s ease'
        }}
      />
      {children}
    </button>
  );
}
