# 🎮 Álgebra Divertida - Juego Educativo de Polinomios

Una aplicación web interactiva y divertida para enseñar álgebra elemental (monomios, binomios, trinomios y cuatrinomios) a niños de 10-12 años, especialmente diseñada para captar y mantener la atención de usuarios con déficit de atención.

## ✨ Características

### 🎯 Diseñado para Niños
- **Interfaz Colorida y Divertida**: Diseño vibrante con colores alegres y animaciones atractivas
- **Mascota Amigable**: Un robot simpático que guía al niño durante todo el aprendizaje
- **Feedback Inmediato**: Respuestas instantáneas con animaciones de celebración

### 🎓 Sistema Educativo
- **4 Niveles Progresivos**:
  1. **Monomios**: Expresiones con un solo término
  2. **Binomios**: Expresiones con dos términos
  3. **Trinomios**: Expresiones con tres términos
  4. **Cuatrinomios**: Expresiones con cuatro términos

- **Explicaciones Simpáticas**: Cada concepto tiene una explicación amigable y fácil de entender
- **Pistas Interactivas**: Sistema de pistas para ayudar cuando están atascados
- **Sistema de Racha**: Motiva a mantener respuestas correctas consecutivas

### 💰 Sistema de Recompensas
- **Monedas Virtuales**: Ganar monedas por cada respuesta correcta
- **Bonus por Racha**: Monedas adicionales por mantener rachas de aciertos
- **Niveles Desbloqueables**: Completar niveles para desbloquear el siguiente
- **Visualización de Progreso**: Estadísticas de rendimiento y precisión

### 🎨 Características Técnicas
- **Animaciones Fluidas**: Transiciones suaves con Framer Motion
- **Diseño Responsivo**: Funciona perfectamente en móviles, tablets y escritorio
- **Estado Persistente**: Guardado de progreso con Prisma y SQLite
- **Componentes shadcn/ui**: Interfaz moderna y accesible

## 🚀 Tecnologías Utilizadas

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 4
- **Componentes**: shadcn/ui
- **Animaciones**: Framer Motion
- **Estado**: Zustand
- **Base de Datos**: Prisma ORM con SQLite
- **Generación de Imágenes**: z-ai-web-dev-sdk (AI Image Generation)

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx                      # Página principal del juego
│   ├── globals.css                   # Estilos globales y animaciones
│   └── api/
│       ├── player/                   # API para gestión de jugadores
│       └── progress/                 # API para gestión de progreso
├── components/
│   ├── algebra-game.tsx              # Componente principal del juego
│   ├── welcome-modal.tsx             # Modal de bienvenida
│   ├── level-card.tsx                # Tarjetas de niveles
│   ├── game-question.tsx             # Preguntas del juego
│   ├── coin-display.tsx              # Display de monedas
│   └── ui/                           # Componentes shadcn/ui
├── lib/
│   ├── game-types.ts                 # Tipos y datos del juego
│   ├── game-store.ts                 # Store de Zustand
│   └── db.ts                         # Cliente de Prisma
└── public/
    └── game-assets/                  # Imágenes generadas por IA
```

## 🎮 Cómo Jugar

1. **Bienvenida**: Ingresa tu nombre para comenzar la aventura
2. **Selección de Nivel**: Elige uno de los 4 niveles disponibles
3. **Aprender**: Lee la explicación simpática del concepto
4. **Responder**: Contesta cuántos términos tiene la expresión mostrada
5. **Ganar Monedas**: Gana monedas por respuestas correctas
6. **Avanzar**: Desbloquea el siguiente nivel completando el actual

## 📊 Sistema de Preguntas

### Monomios (Nivel 1)
- 3x, 5, -2y, 7z²
- Explicación: "¡Un monomio es como un solitario! Solo tiene UN término"

### Binomios (Nivel 2)
- 3x + 2, 5x - 3y, x² + 1, 2a - 5
- Explicación: "¡Un binomio es como dos mejores amigos! Tiene DOS términos"

### Trinomios (Nivel 3)
- x² + 2x + 1, 2x + 3y - 5, a² + b² + c²
- Explicación: "¡Un trinomio es un equipo de tres! TRES términos"

### Cuatrinomios (Nivel 4)
- x³ + 2x² - x + 1, a² + b² + c² + d²
- Explicación: "¡Un cuatrinomio es como un supergrupo! CUATRO términos"

## 🎨 Diseño y UX

### Principios de Diseño
- **Colores Vibrantes**: Gradientes azules, púrpuras y rosas
- **Tipografía Clara**: Textos grandes y legibles
- **Touch-Friendly**: Botones grandes (mínimo 44px) para fácil interacción
- **Animaciones Suaves**: Transiciones que no distraen del aprendizaje

### Accesibilidad
- **WCAG AA Compliance**: Contraste suficiente para lectura
- **Keyboard Navigation**: Navegación completa por teclado
- **ARIA Labels**: Etiquetas para lectores de pantalla
- **Reduced Motion**: Respeto a preferencias de movimiento reducido

## 🔧 Desarrollo

### Instalación
```bash
bun install
```

### Ejecutar en Desarrollo
```bash
bun run dev
```

### Generar Imágenes del Juego
```bash
bun run generate-images.ts
```

### Verificar Código
```bash
bun run lint
```

### Sincronizar Base de Datos
```bash
bun run db:push
```

## 📝 API Endpoints

### `/api/player`
- `POST`: Crear o obtener un jugador
- `GET`: Obtener información del jugador

### `/api/progress`
- `POST`: Guardar o actualizar progreso
- `GET`: Obtener progreso del jugador

## 🎯 Objetivos Pedagógicos

1. **Identificación Visual**: Reconocer visualmente diferentes tipos de expresiones algebraicas
2. **Conteo de Términos**: Aprender a contar términos en expresiones polinómicas
3. **Progresión Gradual**: De lo simple a lo complejo
4. **Motivación Continua**: Sistema de recompensas mantiene el interés

## 🧠 Consideraciones para Déficit de Atención

- **Sesiones Cortas**: Preguntas rápidas con feedback inmediato
- **Estimulación Visual**: Colores y animaciones mantienen la atención
- **Recompensas Frecuentes**: Monedas por cada logro
- **Interacciones Simplificadas**: Pocos clics, resultados inmediatos
- **Mensajes Positivos**: Siempre aliento, incluso en errores

## 📜 Licencia

Este proyecto fue desarrollado como parte de una iniciativa educativa para hacer el aprendizaje de matemáticas más accesible y divertido para todos los niños.

## 🙏 Agradecimientos

- **z-ai-web-dev-sdk**: Por la generación de imágenes con IA
- **shadcn/ui**: Por los componentes UI de alta calidad
- **Framer Motion**: Por las animaciones fluidas
- **Next.js**: Por el framework React excepcional

---

**¡Que se diviertan aprendiendo álgebra! 🎮📚**
