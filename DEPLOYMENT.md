# 📦 Guía de Despliegue

Esta guía te ayudará a desplegar el proyecto de "Álgebra Divertida" en diferentes plataformas.

## 🚀 Opciones de Despliegue

### 1. Vercel (Recomendado - Más Fácil)

**Pasos:**

1. **Subir a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <tu-github-url>
   git push -u origin main
   ```

2. **Conectar a Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con GitHub
   - Click en "New Project"
   - Selecciona tu repositorio
   - Click en "Deploy"

3. **Configurar Variables de Entorno (si es necesario)**
   - Vercel detecta Next.js automáticamente
   - No necesitas configurar nada extra para SQLite (funciona local)

   **Nota**: Para producción con base de datos real, considera usar:
   - Vercel Postgres
   - Neon
   - Supabase
   - PlanetScale

### 2. Netlify

**Pasos:**

1. **Subir a GitHub** (mismo que Vercel)

2. **Conectar a Netlify**
   - Ve a [netlify.com](https://netlify.com)
   - Click en "Add new site" → "Import an existing project"
   - Conecta tu repositorio de GitHub

3. **Configurar Build Settings**
   - **Build command**: `npm run build` o `bun run build`
   - **Publish directory**: `.next`
   - **Install command**: `npm install` o `bun install`

4. **Variables de Entorno**
   Agrega en Site Settings → Environment variables:
   ```
   DATABASE_URL="file:./db/custom.db"
   ```

### 3. Render

**Pasos:**

1. **Crear cuenta en [render.com](https://render.com)**

2. **New Web Service**
   - Selecciona "Web Service"
   - Conecta tu repositorio de GitHub

3. **Configuración**
   - **Name**: algebra-divertida
   - **Environment**: Node
   - **Build Command**: `bun run build` o `npm run build`
   - **Start Command**: `bun run start` o `npm start`

4. **Variables de Entorno**
   Agrega:
   ```
   DATABASE_URL="file:./db/custom.db"
   ```

### 4. Docker (Auto-hospedado)

**Pasos:**

1. **Crear Dockerfile** (ya incluido en el proyecto):
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

2. **Construir imagen:**
   ```bash
   docker build -t algebra-divertida .
   ```

3. **Ejecutar contenedor:**
   ```bash
   docker run -p 3000:3000 algebra-divertida
   ```

### 5. VPS o Servidor Propio

**Requisitos:**
- Ubuntu/Debian Linux
- Node.js 18+ o Bun
- Nginx (opcional, para HTTPS)

**Pasos:**

1. **Instalar Node.js/Bun**
   ```bash
   # Para Bun
   curl -fsSL https://bun.sh/install | bash

   # O para Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clonar repositorio**
   ```bash
   git clone <tu-repositorio>
   cd <nombre-directorio>
   ```

3. **Instalar y construir**
   ```bash
   bun install
   bun run build
   ```

4. **Configurar como servicio con PM2**
   ```bash
   npm install -g pm2
   pm2 start bun --name "algebra" -- run start
   pm2 save
   pm2 startup
   ```

5. **Configurar Nginx (opcional)**
   ```nginx
   server {
       listen 80;
       server_name tu-dominio.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🔧 Pre-Despliegue - Checklist

Antes de desplegar, asegúrate de:

- [ ] Todas las dependencias están en `package.json`
- [ ] El archivo `.env.example` existe
- [ ] El proyecto compila con `bun run build`
- [ ] No hay archivos sensibles (`.env`, `*.db`) en el repositorio
- [ ] El `.gitignore` excluye archivos correctos
- [ ] Las imágenes en `public/game-assets/` están presentes
- [ ] El cliente de Prisma se genera con `bun run db:generate`

## ⚠️ Notas Importantes

### Base de Datos en Producción

**SQLite (archivo local)** es perfecto para:
- Desarrollo
- Prototipos
- Proyectos pequeños con pocos usuarios

**Para producción con muchos usuarios, considera:**
- **PostgreSQL** (Vercel Postgres, Supabase, Neon)
- **MySQL** (PlanetScale, PlanetScale-compatible)
- **MongoDB** (MongoDB Atlas)

Para cambiar a otra base de datos:

1. Cambia `provider` en `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"  // o "mysql"
     url      = env("DATABASE_URL")
   }
   ```

2. Actualiza `DATABASE_URL` en tu plataforma de despliegue

3. Ejecuta migraciones:
   ```bash
   npx prisma migrate deploy
   ```

### Variables de Entorno

NUNCA subas archivos `.env` a GitHub. Usa:
- Variables de entorno de la plataforma (Vercel, Netlify, etc.)
- Archivos `.env.example` como plantilla
- Secrets del sistema

### HTTPS y Seguridad

Para producción:
- **HTTPS** es obligatorio para HTTPS
- Usa servicios como Let's Encrypt (gratis) o Cloudflare
- Protege tus API endpoints con autenticación si guardas datos reales

## 📊 Monitoreo y Logs

### En Vercel
- Ve a la pestaña "Deployments"
- Click en cualquier deploy para ver logs

### En Netlify
- Ve a "Deploys" → selecciona deploy → "View deploy log"

### En tu propio servidor
```bash
# Ver logs de PM2
pm2 logs algebra

# Ver logs en vivo
pm2 logs algebra --lines 100
```

## 🔄 Actualizaciones

Para actualizar tu aplicación desplegada:

1. **Hacer cambios localmente**
2. **Commit y push a GitHub**
3. **Tu plataforma de despliegue detectará los cambios y redeployará automáticamente**

## 💰 Costos

**Vercel**: Gratis para proyectos personales (limites generosos)
**Netlify**: Gratis para proyectos personales
**Render**: Gratis para web services (con sleep after inactivity)
**Propio**: Solo costo del servidor ($5-20/mes para VPS básico)

## 🆘 Solución de Problemas Comunes

### "Build failed"
- Verifica que `bun run build` funciona localmente
- Revisa los logs de build en la plataforma

### "Database connection failed"
- Verifica `DATABASE_URL` en variables de entorno
- Para SQLite, asegúrate de que la base de datos se cree

### "Images not found"
- Confirma que `public/game-assets/` tiene todas las imágenes
- Verifica que estén commiteadas en Git

### "Port already in use"
- Cambia el puerto en `next.config.ts` o `package.json`
- O usa variables de entorno de la plataforma (PORT=3000)

---

**¿Necesitas ayuda?** Abre un issue en el repositorio o revisa [Documentación de Next.js](https://nextjs.org/docs).
