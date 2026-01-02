import { create } from 'zustand';
import { GameLevel, LevelType, GameState, Question, generateQuestion, calculateCoinsEarned, checkLevelUnlock, GAME_LEVELS } from './game-types';

interface GameStore extends GameState {
  currentLevel: GameLevel | null;
  currentQuestion: Question | null;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  showExplanation: boolean;
  unlockedLevels: string[];
  completedLevels: string[];

  // Acciones
  startLevel: (levelId: string) => void;
  answerQuestion: (answer: number) => void;
  nextQuestion: () => void;
  goToLevelSelect: () => void;
  resetGame: () => void;
  addCoins: (amount: number) => void;
  unlockLevel: (levelId: string) => void;
  completeLevel: (levelId: string) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Estado inicial
  currentLevel: null,
  currentQuestion: null,
  currentExpression: null,
  selectedAnswer: null,
  isCorrect: null,
  showExplanation: false,
  score: 0,
  coins: 0,
  streak: 0,
  totalCorrect: 0,
  totalAttempts: 0,
  unlockedLevels: [GAME_LEVELS[0].id], // Primer nivel desbloqueado
  completedLevels: [],

  // Iniciar un nivel
  startLevel: (levelId: string) => {
    const level = GAME_LEVELS.find(l => l.id === levelId);
    if (!level) return;

    const question = generateQuestion(level.type, level.difficulty);

    set({
      currentLevel: level,
      currentQuestion: question,
      currentExpression: null,
      selectedAnswer: null,
      isCorrect: null,
      showExplanation: false,
      score: 0,
      streak: 0,
      totalCorrect: 0,
      totalAttempts: 0
    });
  },

  // Responder una pregunta
  answerQuestion: (answer: number) => {
    const { currentQuestion, coins, streak, currentLevel } = get();
    if (!currentQuestion || !currentLevel) return;

    const correct = answer === currentQuestion.correctAnswer;
    const coinsEarned = calculateCoinsEarned(correct, correct ? streak + 1 : 0, currentLevel.baseCoins);

    set({
      selectedAnswer: answer,
      isCorrect: correct,
      showExplanation: true,
      score: correct ? get().score + 10 : get().score,
      streak: correct ? streak + 1 : 0,
      totalCorrect: correct ? get().totalCorrect + 1 : get().totalCorrect,
      totalAttempts: get().totalAttempts + 1,
      coins: coins + coinsEarned
    });
  },

  // Siguiente pregunta
  nextQuestion: () => {
    const { currentLevel } = get();
    if (!currentLevel) return;

    const question = generateQuestion(currentLevel.type, currentLevel.difficulty);

    set({
      currentQuestion: question,
      selectedAnswer: null,
      isCorrect: null,
      showExplanation: false
    });
  },

  // Volver a selección de niveles
  goToLevelSelect: () => {
    set({
      currentLevel: null,
      currentQuestion: null,
      selectedAnswer: null,
      isCorrect: null,
      showExplanation: false
    });
  },

  // Reiniciar juego
  resetGame: () => {
    set({
      currentLevel: null,
      currentQuestion: null,
      currentExpression: null,
      selectedAnswer: null,
      isCorrect: null,
      showExplanation: false,
      score: 0,
      coins: 0,
      streak: 0,
      totalCorrect: 0,
      totalAttempts: 0,
      unlockedLevels: [GAME_LEVELS[0].id],
      completedLevels: []
    });
  },

  // Añadir monedas
  addCoins: (amount: number) => {
    set({ coins: get().coins + amount });
  },

  // Desbloquear nivel
  unlockLevel: (levelId: string) => {
    const { unlockedLevels } = get();
    if (!unlockedLevels.includes(levelId)) {
      set({ unlockedLevels: [...unlockedLevels, levelId] });
    }
  },

  // Completar nivel
  completeLevel: (levelId: string) => {
    const { completedLevels, unlockedLevels } = get();

    // Marcar nivel como completado
    if (!completedLevels.includes(levelId)) {
      set({ completedLevels: [...completedLevels, levelId] });
    }

    // Desbloquear siguiente nivel
    const currentIndex = GAME_LEVELS.findIndex(l => l.id === levelId);
    if (currentIndex >= 0 && currentIndex < GAME_LEVELS.length - 1) {
      const nextLevel = GAME_LEVELS[currentIndex + 1];
      if (!unlockedLevels.includes(nextLevel.id)) {
        set({ unlockedLevels: [...unlockedLevels, nextLevel.id] });
      }
    }
  }
}));
