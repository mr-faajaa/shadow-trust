'use client';

import { motion } from 'motion/react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' as const }}
      />
      <motion.div
        className="absolute top-1/2 -left-40 w-72 h-72 bg-green-400/10 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' as const, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-0 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' as const, delay: 2 }}
      />
    </div>
  );
}
