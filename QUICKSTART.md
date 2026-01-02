# 🚀 Inicio Rápido - Guía en 3 Pasos

Esta es la guía más rápida para poner a funcionar el proyecto.

## ⚡ Instalación en 3 Pasos

### Paso 1: Clonar y Entrar
```bash
git clone <tu-repositorio>
cd <nombre-del-directorio>
```

### Paso 2: Instalar Dependencias
```bash
bun install
# o si usas npm:
npm install
```

**Nota**: El script `postinstall` generará automáticamente el cliente de Prisma.

### Paso 3: Configurar y Ejecutar
```bash
# Crear archivo .env
cp .env.example .env

# Inicializar base de datos
bun run db:push

# ¡Arrancar!
bun run dev
```

**¡Listo! 🎉** La aplicación estará en: **http://localhost:3000**

---

## 📋 Lo Que Necesitas

- ✅ Git instalado
- ✅ Bun o Node.js 18+ instalado
- ✅ Acceso a terminal/consola

## 🔧 Instalar Bun (si no lo tienes)

### macOS/Linux
```bash
curl -fsSL https://bun.sh/install | bash
```

### Windows (PowerShell)
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

## 🐛 Solución Rápida de Problemas

### "Command not found: bun"
Usa `npm` en lugar de `bun`:
```bash
npm install
npm run dev
```

### "prisma not found"
```bash
npx prisma generate
npx prisma db push
```

### "Port 3000 already in use"
Mata el proceso en el puerto 3000:
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID <el-pid> /F
```

## 🎮 Una Vez Funcionando

1. **Abre** http://localhost:3000
2. **Ingresa** tu nombre en el modal de bienvenida
3. **Elige** un nivel para empezar
4. **¡Diviértete** aprendiendo álgebra!

---

## 📚 ¿Necesitas Más Detalles?

- **README.md**: Documentación completa del proyecto
- **DEPLOYMENT.md**: Guía de despliegue a diferentes plataformas
- **GAME_README.md**: Detalles del juego y sistema educativo

## 💡 Tips

- Usa **Bun** si puedes (más rápido que npm)
- Las **imágenes** ya están incluidas en `public/game-assets/`
- La **base de datos** se crea automáticamente en `db/custom.db`
- No necesitas configurar **variables de entorno adicionales**

---

**¿Problemas?** Revisa el archivo `dev.log` para ver errores detallados.

**¡A jugar! 🎮**
