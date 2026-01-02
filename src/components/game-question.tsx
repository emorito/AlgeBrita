'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lightbulb, Star, Zap, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { Question } from '@/lib/game-types';

interface GameQuestionProps {
  question: Question;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  showExplanation: boolean;
  streak: number;
  onAnswer: (answer: number) => void;
  onNext: () => void;
  onHint: () => void;
}

export function GameQuestion({
  question,
  selectedAnswer,
  isCorrect,
  showExplanation,
  streak,
  onAnswer,
  onNext,
  onHint
}: GameQuestionProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Expresión matemática */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 shadow-2xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            {question.expression}
          </motion.div>
          <p className="text-indigo-100 text-lg">
            ¿Cuántos términos tiene esta expresión?
          </p>
        </Card>
      </motion.div>

      {/* Racha */}
      {streak > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Zap className="w-6 h-6 text-yellow-400" />
          <span className="text-2xl font-bold text-yellow-400">
            ¡Racha de {streak}! 🔥
          </span>
        </motion.div>
      )}

      {/* Opciones de respuesta */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {question.options.map((option, index) => {
          let buttonVariant: 'default' | 'outline' | 'destructive' = 'outline';
          let buttonClass = '';

          if (selectedAnswer === option) {
            if (showExplanation) {
              buttonVariant = isCorrect ? 'default' : 'destructive';
              buttonClass = isCorrect
                ? 'bg-green-500 hover:bg-green-600 text-white scale-105'
                : 'bg-red-500 hover:bg-red-600 text-white scale-95';
            } else {
              buttonClass = 'bg-indigo-500 hover:bg-indigo-600 text-white';
            }
          } else if (showExplanation && option === question.correctAnswer) {
            buttonVariant = 'default';
            buttonClass = 'bg-green-500 hover:bg-green-600 text-white';
          }

          return (
            <motion.div
              key={option}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                onClick={() => !showExplanation && onAnswer(option)}
                disabled={showExplanation}
                variant={buttonVariant as any}
                size="lg"
                className={`
                  w-full h-24 text-3xl font-bold
                  transition-all duration-300
                  ${buttonClass}
                  ${!showExplanation ? 'hover:scale-105 active:scale-95' : ''}
                `}
              >
                {option}
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Pista */}
      {!showExplanation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-4"
        >
          <Button
            onClick={onHint}
            variant="outline"
            size="lg"
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 border-yellow-300"
          >
            <Lightbulb className="w-5 h-5 mr-2" />
            Necesito una pista 💡
          </Button>
        </motion.div>
      )}

      {/* Explicación y resultado */}
      <AnimatePresence mode="wait">
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <Card className={`
              p-6 shadow-xl
              ${isCorrect
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400'
                : 'bg-gradient-to-r from-red-100 to-rose-100 border-2 border-red-400'
              }
            `}>
              <div className="flex items-start gap-4">
                {isCorrect ? (
                  <div className="flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                    >
                      <Image
                        src="/game-assets/victory-star.png"
                        alt="¡Correcto!"
                        width={80}
                        height={80}
                        className="drop-shadow-lg"
                      />
                    </motion.div>
                  </div>
                ) : (
                  <div className="flex-shrink-0">
                    <RotateCcw className="w-16 h-16 text-red-500" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect ? '¡Excelente! 🎉' : '¡Inténtalo de nuevo! 💪'}
                  </h3>
                  <p className="text-lg text-gray-700 mb-2">
                    {question.explanation}
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    {question.hint}
                  </p>
                </div>
              </div>
            </Card>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <Button
                onClick={onNext}
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xl px-12 py-6 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isCorrect ? '¡Siguiente! 🚀' : '¡Reintentar! 🔄'}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
