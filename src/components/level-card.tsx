'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Lock, Star, Play } from 'lucide-react';
import Image from 'next/image';
import { GameLevel } from '@/lib/game-types';

interface LevelCardProps {
  level: GameLevel;
  isUnlocked: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

export function LevelCard({ level, isUnlocked, isCompleted, onClick }: LevelCardProps) {
  const difficultyStars = Array(level.difficulty).fill(0);

  return (
    <motion.div
      whileHover={isUnlocked ? { scale: 1.05, y: -8 } : undefined}
      whileTap={isUnlocked ? { scale: 0.95 } : undefined}
      className="w-full"
    >
      <Card
        onClick={isUnlocked ? onClick : undefined}
        className={`
          relative overflow-hidden transition-all duration-300
          ${isUnlocked ? 'cursor-pointer hover:shadow-2xl' : 'cursor-not-allowed opacity-60'}
          ${isCompleted ? 'ring-4 ring-green-400 ring-offset-2' : ''}
        `}
        style={{
          background: isUnlocked
            ? `linear-gradient(135deg, ${level.color}, ${level.color}dd)`
            : 'linear-gradient(135deg, #gray-400, #gray-500)',
          minHeight: '200px'
        }}
      >
        {/* Imagen del nivel */}
        <div className="relative h-32 w-full overflow-hidden">
          <Image
            src={level.icon}
            alt={level.title}
            fill
            className="object-cover"
          />
          {/* Overlay con título */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <h3 className="absolute bottom-2 left-2 text-white font-bold text-xl drop-shadow-lg">
            {level.title}
          </h3>
        </div>

        {/* Contenido del nivel */}
        <div className="p-4">
          {/* Estrellas de dificultad */}
          <div className="flex gap-1 mb-2">
            {difficultyStars.map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {/* Descripción */}
          <p className="text-sm text-white font-medium mb-3 drop-shadow">
            {level.description}
          </p>

          {/* Estado del nivel */}
          {!isUnlocked ? (
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Lock className="w-4 h-4" />
              <span>Bloqueado</span>
            </div>
          ) : isCompleted ? (
            <div className="flex items-center gap-2 text-green-300 text-sm font-bold">
              <Star className="w-4 h-4 fill-current" />
              <span>¡Completado!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-white text-sm font-bold">
              <Play className="w-4 h-4" />
              <span>Jugar</span>
            </div>
          )}

          {/* Monedas base */}
          {isUnlocked && (
            <div className="mt-2 flex items-center gap-2 text-sm text-yellow-200 font-semibold">
              <span>🪙</span>
              <span>+{level.baseCoins} monedas</span>
            </div>
          )}
        </div>

        {/* Efecto de brillo si está desbloqueado */}
        {isUnlocked && (
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut'
              }}
            />
          </div>
        )}
      </Card>
    </motion.div>
  );
}
