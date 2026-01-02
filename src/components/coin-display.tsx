'use client';

import { motion } from 'framer-motion';
import { Coins } from 'lucide-react';
import Image from 'next/image';

interface CoinDisplayProps {
  coins: number;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export function CoinDisplay({ coins, size = 'md', animate = false }: CoinDisplayProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 36
  };

  return (
    <motion.div
      className={`flex items-center gap-2 bg-gradient-to-r from-yellow-300 to-yellow-500 px-4 py-2 rounded-full shadow-lg ${sizeClasses[size]} font-bold text-yellow-900`}
      animate={animate ? {
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      } : undefined}
      transition={{
        duration: 0.5,
        ease: 'easeInOut'
      }}
    >
      <Image
        src="/game-assets/coin.png"
        alt="Moneda"
        width={iconSizes[size]}
        height={iconSizes[size]}
        className={animate ? 'animate-spin-slow' : ''}
      />
      <span>{coins}</span>
    </motion.div>
  );
}
