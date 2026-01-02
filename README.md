# 🎮 Álgebra Divertida - Juego Educativo de Polinomios

Una aplicación web interactiva y divertida para enseñar álgebra elemental (monomios, binomios, trinomios y cuatrinomios) a niños de 10-12 años.

## ✨ Características

### 🎯 Diseñado para Niños
- **Interfaz Colorida y Divertida**: Diseño vibrante con colores alegres
- **Mascota Amigable**: Un robot simpático que guía el aprendizaje
- **Feedback Inmediato**: Respuestas instantáneas con animaciones

### 🎓 Sistema Educativo
- **4 Niveles Progresivos**:
  1. **Monomios**: Expresiones con un solo término
  2. **Binomios**: Expresiones con dos términos
  3. **Trinomios**: Expresiones con tres términos
  4. **Cuatrinomios**: Expresiones con cuatro términos

- **Explicaciones Simpáticas**: Conceptos explicados de forma amigable
- **Pistas Interactivas**: Sistema de ayuda cuando se atascan
- **Sistema de Racha**: Motiva respuestas correctas consecutivas

### 💰 Sistema de Recompensas
- **Monedas Virtuales**: Ganar monedas por cada respuesta correcta
- **Bonus por Racha**: Monedas adicionales por rachas
- **Niveles Desbloqueables**: Completar niveles para avanzar
- **Estadísticas**: Ver progreso y precisión

## 🚀 Tecnologías

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 4 + shadcn/ui
- **Animaciones**: Framer Motion
- **Estado**: Zustand
- **Base de Datos**: Prisma ORM + SQLite
- **Runtime**: Bun

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ o Bun instalado
- Git (para clonar el repositorio)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd <nombre-del-directorio>
```

2. **Instalar dependencias**
```bash
bun install
# o si usas npm:
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

El archivo `.env.example` ya tiene la configuración necesaria:
```env
DATABASE_URL="file:./db/custom.db"
```

4. **Generar cliente de Prisma**
```bash
bun run db:generate
# o con npm:
npx prisma generate
```

5. **Inicializar base de datos**
```bash
bun run db:push
# o con npm:
npx prisma db push
```

## 🎮 Cómo Ejecutar

### Modo Desarrollo
```bash
bun run dev
# o con npm:
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

### Verificar Código
```bash
bun run lint
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx                      # Página principal
│   ├── layout.tsx                    # Layout global
│   ├── globals.css                   # Estilos globales
│   └── api/
│       ├── player/                   # API de jugadores
│       └── progress/                # API de progreso
├── components/
│   ├── algebra-game.tsx              # Componente principal
│   ├── welcome-modal.tsx             # Modal de bienvenida
│   ├── level-card.tsx               # Tarjetas de niveles
│   ├── game-question.tsx            # Preguntas
│   ├── coin-display.tsx             # Display de monedas
│   └── ui/                         # Componentes shadcn/ui
├── lib/
│   ├── game-types.ts                # Tipos del juego
│   ├── game-store.ts               # Store de Zustand
│   ├── db.ts                       # Cliente de Prisma
│   └── utils.ts                    # Utilidades
└── hooks/
    └── use-*.tsx                   # Hooks personalizados
```

## 🎯 Flujo del Juego

1. **Bienvenida**: El niño ingresa su nombre
2. **Selección de Nivel**: Elige uno de los 4 niveles disponibles
3. **Aprendizaje**: Lee la explicación del concepto
4. **Pregunta**: Contesta cuántos términos tiene la expresión
5. **Feedback**: Recibe respuesta inmediata con animación
6. **Recompensa**: Gana monedas y actualiza estadísticas
7. **Avance**: Desbloquea el siguiente nivel

## 🎨 Personalización

### Cambiar Colores
Los colores están definidos en `src/app/globals.css` usando Tailwind CSS.

### Modificar Preguntas
Las preguntas están en `src/lib/game-types.ts` en la función `generateQuestion()`.

### Añadir Niveles
Edita `src/lib/game-types.ts` y agrega entradas al array `GAME_LEVELS`.

## 🌐 Despliegue

### Vercel (Recomendado)
1. Subir código a GitHub
2. Conectar repositorio a Vercel
3. Configurar variables de entorno en Vercel
4. Vercel detecta Next.js automáticamente

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 API Endpoints

### `POST /api/player`
Crea o obtiene un jugador.

**Request:**
```json
{
  "name": "Juan Pérez"
}
```

**Response:**
```json
{
  "success": true,
  "player": {
    "id": "cuid...",
    "name": "Juan Pérez",
    "coins": 0
  }
}
```

### `GET /api/player?name=Juan`
Obtiene información del jugador con su progreso.

### `POST /api/progress`
Guarda o actualiza el progreso del jugador.

**Request:**
```json
{
  "playerName": "Juan Pérez",
  "levelType": "monomial",
  "level": 1,
  "score": 100,
  "completed": true,
  "coinsEarned": 15
}
```

## 🐛 Solución de Problemas

### Error: "Cannot find module 'prisma'"
```bash
bun run db:generate
```

### Error: Database locked
Borra el archivo `db/custom.db` y ejecuta `bun run db:push` nuevamente.

### Las imágenes no aparecen
Asegúrate que las imágenes estén en `public/game-assets/`. Las imágenes ya están incluidas en este repositorio.

## 📄 Licencia

Este proyecto fue desarrollado para hacer el aprendizaje de matemáticas más accesible y divertido.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias, por favor abre un issue en el repositorio.

---

**¡Que se diviertan aprendiendo álgebra! 🎮📚**
