// Tipos para el juego educativo de álgebra

export type LevelType = 'monomial' | 'binomial' | 'trinomial' | 'quadrinomial';

export interface GameLevel {
  id: string;
  type: LevelType;
  level: number;
  title: string;
  description: string;
  funExplanation: string;
  icon: string;
  color: string;
  difficulty: 1 | 2 | 3 | 4;
  baseCoins: number;
}

export interface AlgebraExpression {
  id: string;
  type: LevelType;
  expression: string;
  terms: Term[];
  correctAnswer: number;
  hint: string;
}

export interface Term {
  coefficient: number;
  variable?: string;
  exponent?: number;
}

export interface GameState {
  currentLevel: GameLevel | null;
  currentExpression: AlgebraExpression | null;
  score: number;
  coins: number;
  streak: number;
  totalCorrect: number;
  totalAttempts: number;
}

export interface Question {
  expression: string;
  options: number[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

// Niveles del juego con explicaciones simpáticas
export const GAME_LEVELS: GameLevel[] = [
  {
    id: 'mono-1',
    type: 'monomial',
    level: 1,
    title: '¡Hola Monomio! 🌟',
    description: 'Comencemos con algo simple',
    funExplanation: '¡Un monomio es como un solitario! Solo tiene UN término, como cuando comes solo una galleta 🍪. ¡Súper fácil!',
    icon: '/game-assets/level-monomial.png',
    color: 'bg-yellow-400',
    difficulty: 1,
    baseCoins: 10
  },
  {
    id: 'bi-1',
    type: 'binomial',
    level: 1,
    title: '¡Dúo Binomio! 🎭',
    description: 'Dos términos, el doble de diversión',
    funExplanation: '¡Un binomio es como dos mejores amigos! Tiene DOS términos que se llevan súper bien. ¡Como tú y tu mejor amigo! 👫',
    icon: '/game-assets/level-binomial.png',
    color: 'bg-orange-400',
    difficulty: 2,
    baseCoins: 15
  },
  {
    id: 'tri-1',
    type: 'trinomial',
    level: 1,
    title: '¡Trío Trinomio! 🎪',
    description: 'Tres términos, triple emoción',
    funExplanation: '¡Un trinomio es como un equipo de tres amigos! Tres términos juntos, como los tres chiflados o un trío musical 🎵',
    icon: '/game-assets/level-trinomial.png',
    color: 'bg-green-400',
    difficulty: 3,
    baseCoins: 20
  },
  {
    id: 'quad-1',
    type: 'quadrinomial',
    level: 1,
    title: '¡Cuadrinomio Legendario! 🏆',
    description: 'Cuatro términos, ¡eres un maestro!',
    funExplanation: '¡Wow! Un cuatrinomio tiene CUATRO términos, como los cuatro elementos: fuego, agua, tierra y aire 🔥💧🌍💨 ¡Eres un genio!',
    icon: '/game-assets/level-quadrinomial.png',
    color: 'bg-purple-400',
    difficulty: 4,
    baseCoins: 25
  }
];

export const LEVEL_INFO = {
  monomial: {
    title: 'Monomios',
    description: 'Un término solo',
    funExplanation: '¡Un monomio es como un solitario! Solo tiene UN término. ¡Súper fácil de identificar!',
    color: 'bg-yellow-400',
    emoji: '🌟'
  },
  binomial: {
    title: 'Binomios',
    description: 'Dos términos juntos',
    funExplanation: '¡Un binomio es como dos mejores amigos! Tiene DOS términos unidos por un + o un -',
    color: 'bg-orange-400',
    emoji: '🎭'
  },
  trinomial: {
    title: 'Trinomios',
    description: 'Tres términos unidos',
    funExplanation: '¡Un trinomio es un equipo de tres! TRES términos, perfecto para trabajar en grupo',
    color: 'bg-green-400',
    emoji: '🎪'
  },
  quadrinomial: {
    title: 'Cuatrinomios',
    description: 'Cuatro términos poderosos',
    funExplanation: '¡Un cuatrinomio es como un supergrupo! CUATRO términos, ¡eres un experto!',
    color: 'bg-purple-400',
    emoji: '🏆'
  }
};

// Generar preguntas para cada tipo
export function generateQuestion(type: LevelType, difficulty: number): Question {
  let expression: string;
  let correctAnswer: number;
  let options: number[];
  let hint: string;
  let explanation: string;

  switch (type) {
    case 'monomial':
      const monomials = [
        { expr: '3x', answer: 1, hint: '¡Solo un término con x!', expl: '3x es un monomio porque tiene UN solo término' },
        { expr: '5', answer: 1, hint: '¡Es solo un número!', expl: '5 es un monomio porque es un solo número' },
        { expr: '-2y', answer: 1, hint: '¡Un término con y y signo negativo!', expl: '-2y es un monomio, un solo término con signo negativo' },
        { expr: '7z²', answer: 1, hint: '¡Un término con z al cuadrado!', expl: '7z² es un monomio, un solo término con exponente' },
      ];
      const mono = monomials[Math.floor(Math.random() * monomials.length)];
      expression = mono.expr;
      correctAnswer = mono.answer;
      options = shuffleArray([correctAnswer, 2, 3, 4]);
      hint = mono.hint;
      explanation = mono.expl;
      break;

    case 'binomial':
      const binomials = [
        { expr: '3x + 2', answer: 2, hint: '¡Dos términos unidos por +!', expl: '3x + 2 es un binomio porque tiene DOS términos' },
        { expr: '5x - 3y', answer: 2, hint: '¡Dos términos con x y y!', expl: '5x - 3y es un binomio, dos términos diferentes' },
        { expr: 'x² + 1', answer: 2, hint: '¡Dos términos, uno con cuadrado!', expl: 'x² + 1 es un binomio con un término elevado al cuadrado' },
        { expr: '2a - 5', answer: 2, hint: '¡Dos términos con a!', expl: '2a - 5 es un binomio clásico' },
      ];
      const bi = binomials[Math.floor(Math.random() * binomials.length)];
      expression = bi.expr;
      correctAnswer = bi.answer;
      options = shuffleArray([correctAnswer, 1, 3, 4]);
      hint = bi.hint;
      explanation = bi.expl;
      break;

    case 'trinomial':
      const trinomials = [
        { expr: 'x² + 2x + 1', answer: 3, hint: '¡Tres términos, uno al cuadrado!', expl: 'x² + 2x + 1 es un trinomio con TRES términos' },
        { expr: '2x + 3y - 5', answer: 3, hint: '¡Tres términos con x e y!', expl: '2x + 3y - 5 tiene exactamente TRES términos' },
        { expr: 'a² + b² + c²', answer: 3, hint: '¡Tres términos al cuadrado!', expl: 'a² + b² + c² es un trinomio perfecto' },
        { expr: '3x² - x + 2', answer: 3, hint: '¡Tres términos, dos con x!', expl: '3x² - x + 2 es un trinomio clásico' },
      ];
      const tri = trinomials[Math.floor(Math.random() * trinomials.length)];
      expression = tri.expr;
      correctAnswer = tri.answer;
      options = shuffleArray([correctAnswer, 2, 4, 5]);
      hint = tri.hint;
      explanation = tri.expl;
      break;

    case 'quadrinomial':
      const quadrinomials = [
        { expr: 'x³ + 2x² - x + 1', answer: 4, hint: '¡Cuatro términos con potencias!', expl: 'x³ + 2x² - x + 1 es un cuatrinomio' },
        { expr: 'a² + b² + c² + d²', answer: 4, hint: '¡Cuatro términos al cuadrado!', expl: 'a² + b² + c² + d² tiene CUATRO términos' },
        { expr: '3x³ + x² - 2x + 5', answer: 4, hint: '¡Cuatro términos con x!', expl: '3x³ + x² - 2x + 5 es un cuatrinomio completo' },
        { expr: 'x⁴ + x³ - x² + 1', answer: 4, hint: '¡Cuatro términos de cuarto grado!', expl: 'x⁴ + x³ - x² + 1 es un cuatrinomio avanzado' },
      ];
      const quad = quadrinomials[Math.floor(Math.random() * quadrinomials.length)];
      expression = quad.expr;
      correctAnswer = quad.answer;
      options = shuffleArray([correctAnswer, 3, 5, 6]);
      hint = quad.hint;
      explanation = quad.expl;
      break;

    default:
      expression = '3x';
      correctAnswer = 1;
      options = [1, 2, 3, 4];
      hint = '¡Un solo término!';
      explanation = 'Es un monomio';
  }

  return {
    expression,
    options,
    correctAnswer,
    hint,
    explanation
  };
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Calcular monedas ganadas
export function calculateCoinsEarned(correct: boolean, streak: number, baseCoins: number): number {
  if (!correct) return 0;

  // Bonus por racha
  const streakBonus = Math.floor(streak / 3) * 5;
  return baseCoins + streakBonus;
}

// Verificar si se desbloquea un nivel
export function checkLevelUnlock(currentType: LevelType, currentLevel: number, completedTypes: LevelType[]): boolean {
  const typeOrder: LevelType[] = ['monomial', 'binomial', 'trinomial', 'quadrinomial'];
  const currentIndex = typeOrder.indexOf(currentType);

  // El primer nivel siempre está desbloqueado
  if (currentType === 'monomial' && currentLevel === 1) return true;

  // Para desbloquear un tipo, debes haber completado el anterior
  if (currentIndex > 0) {
    const previousType = typeOrder[currentIndex - 1];
    return completedTypes.includes(previousType);
  }

  return false;
}
