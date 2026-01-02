'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CoinDisplay } from '@/components/coin-display';
import { LevelCard } from '@/components/level-card';
import { GameQuestion } from '@/components/game-question';
import { WelcomeModal } from '@/components/welcome-modal';
import { useGameStore } from '@/lib/game-store';
import { GAME_LEVELS, LEVEL_INFO } from '@/lib/game-types';
import { ArrowLeft, Home, Trophy, Target, Flame } from 'lucide-react';
import Image from 'next/image';

export default function AlgebraGame() {
  const {
    currentLevel,
    currentQuestion,
    selectedAnswer,
    isCorrect,
    showExplanation,
    streak,
    score,
    coins,
    totalCorrect,
    totalAttempts,
    unlockedLevels,
    completedLevels,
    startLevel,
    answerQuestion,
    nextQuestion,
    goToLevelSelect,
    resetGame
  } = useGameStore();

  const [showHint, setShowHint] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [playerName, setPlayerName] = useState('');

  // Calcular porcentaje de aciertos
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  // Iniciar nivel
  const handleStartLevel = (levelId: string) => {
    startLevel(levelId);
    setShowHint(false);
  };

  // Responder pregunta
  const handleAnswer = (answer: number) => {
    answerQuestion(answer);
    setShowHint(false);
  };

  // Siguiente pregunta o completar nivel
  const handleNext = () => {
    if (isCorrect && currentLevel) {
      // Completar nivel si se respondió correctamente
      completeLevel();
    }
    nextQuestion();
  };

  // Completar nivel
  const completeLevel = () => {
    if (currentLevel) {
      const { completeLevel: storeCompleteLevel } = useGameStore.getState();
      storeCompleteLevel(currentLevel.id);
    }
  };

  // Mostrar pista
  const handleHint = () => {
    if (currentQuestion) {
      setShowHint(true);
    }
  };

  // Vista de selección de niveles
  if (!currentLevel) {
    return (
      <>
        <WelcomeModal
          isOpen={showWelcome}
          onClose={(name) => {
            setPlayerName(name);
            setShowWelcome(false);
          }}
        />
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex flex-col">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <motion.div
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              className="flex items-center gap-3"
            >
              <Image
                src="/game-assets/mascot.png"
                alt="Mascota"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Álgebra Divertida
                </h1>
                <p className="text-sm text-gray-600">¡Aprende matemáticas jugando! 🎮</p>
              </div>
            </motion.div>
            <CoinDisplay coins={coins} size="lg" />
          </div>
        </header>

        {/* Contenido principal */}
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
          {/* Tarjetas de estadísticas */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <Card className="bg-white/90 backdrop-blur-sm p-4 text-center shadow-xl">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-2xl font-bold text-purple-600">{completedLevels.length}</p>
              <p className="text-sm text-gray-600">Niveles completados</p>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm p-4 text-center shadow-xl">
              <Target className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold text-purple-600">{accuracy}%</p>
              <p className="text-sm text-gray-600">Precisión</p>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm p-4 text-center shadow-xl">
              <Flame className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <p className="text-2xl font-bold text-purple-600">{streak}</p>
              <p className="text-sm text-gray-600">Mejor racha</p>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm p-4 text-center shadow-xl">
              <CoinDisplay coins={coins} size="sm" />
              <p className="text-sm text-gray-600">Monedas ganadas</p>
            </Card>
          </motion.div>

          {/* Bienvenida y explicación */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card className="bg-white/90 backdrop-blur-sm p-6 shadow-xl">
              <div className="flex items-start gap-4">
                <Image
                  src="/game-assets/mascot.png"
                  alt="Mascota"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-bold text-purple-600 mb-3">
                    ¡Hola, explorador matemático! 👋
                  </h2>
                  <p className="text-gray-700 mb-4">
                    ¡Bienvenido al mundo de los polinomios! Aquí aprenderás sobre monomios, binomios,
                    trinomios y cuatrinomios de una forma súper divertida. Cada nivel tiene explicaciones
                    simpáticas y ganarás monedas por cada respuesta correcta. ¡Comencemos la aventura! 🚀
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Grid de niveles */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">
              Elige tu nivel de aventura 🎯
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {GAME_LEVELS.map((level, index) => (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <LevelCard
                    level={level}
                    isUnlocked={unlockedLevels.includes(level.id)}
                    isCompleted={completedLevels.includes(level.id)}
                    onClick={() => handleStartLevel(level.id)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="bg-white/90 backdrop-blur-sm mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-600">
            <p>🎮 Álgebra Divertida - Aprende matemáticas jugando 🧮</p>
          </div>
        </footer>
        </div>
      </>
    );
  }

  // Vista del juego activo
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex flex-col">
      {/* Header del juego */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              onClick={goToLevelSelect}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <h2 className="text-xl font-bold text-purple-600">{currentLevel.title}</h2>
              <p className="text-sm text-gray-600">{currentLevel.description}</p>
            </motion.div>

            <div className="flex items-center gap-3">
              <CoinDisplay coins={coins} size="md" />
            </div>
          </div>
        </div>
      </header>

      {/* Contenido del juego */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Explicación del nivel */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className={`
            p-6 shadow-xl
            ${currentLevel.color} bg-opacity-20
          `}>
            <div className="flex items-start gap-4">
              <Image
                src="/game-assets/mascot.png"
                alt="Mascota"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  ¿Qué es un {LEVEL_INFO[currentLevel.type].title}? 🤔
                </h3>
                <p className="text-gray-700 text-lg">
                  {currentLevel.funExplanation}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Pista */}
        <AnimatePresence>
          {showHint && currentQuestion && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4"
            >
              <Card className="bg-yellow-100 border-2 border-yellow-400 p-4 shadow-xl">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <p className="text-lg text-yellow-800">{currentQuestion.hint}</p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pregunta del juego */}
        {currentQuestion && (
          <GameQuestion
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
            showExplanation={showExplanation}
            streak={streak}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onHint={handleHint}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-600">
          <p>🎮 {currentLevel.title} - {currentLevel.type.toUpperCase()} 🧮</p>
        </div>
      </footer>
    </div>
  );
}
