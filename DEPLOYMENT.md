# 🚀 Guía de Despliegue - Sistema de Inscripciones SUNAFIL

Guía completa para desplegar el backend en diferentes plataformas de producción.

---

## 📋 Tabla de Contenidos

- [Preparación Pre-Despliegue](#preparación-pre-despliegue)
- [Opciones de Hosting](#opciones-de-hosting)
- [Despliegue en Railway](#despliegue-en-railway)
- [Despliegue en Render](#despliegue-en-render)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Despliegue en Heroku](#despliegue-en-heroku)
- [Configuración Post-Despliegue](#configuración-post-despliegue)
- [Monitoreo y Mantenimiento](#monitoreo-y-mantenimiento)
- [Troubleshooting](#troubleshooting)

---

## ✅ Preparación Pre-Despliegue

### 1. Verificar que el proyecto funciona localmente

```bash
npm run dev
```

Asegúrate de que todos los endpoints funcionan correctamente.

### 2. Compilar el proyecto

```bash
npm run build
```

Verifica que la compilación sea exitosa y que se cree la carpeta `dist/`.

### 3. Actualizar variables de entorno

Crea un archivo `.env.production` con tus credenciales de producción:

```env
# Supabase (usa tu proyecto de producción)
SUPABASE_URL=https://tu-proyecto-prod.supabase.co
SUPABASE_ANON_KEY=tu_clave_produccion

# Server
PORT=3000
NODE_ENV=production

# CORS (tu dominio de frontend)
ALLOWED_ORIGINS=https://tu-frontend.com,https://www.tu-frontend.com
```

### 4. Verificar el archivo `.gitignore`

Asegúrate de que estos archivos NO se suban a Git:

```
node_modules/
dist/
.env
.env.production
.env.local
*.log
```

### 5. Crear scripts de producción

Verifica que tu `package.json` tenga:

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "prod": "npm run build && npm start"
  }
}
```

---

## 🌐 Opciones de Hosting

### Comparativa de Plataformas

| Plataforma | Gratis | Facilidad | Soporte Node.js | Dominio | Recomendado |
|------------|--------|-----------|-----------------|---------|-------------|
| **Railway** | ⚠️ $5/mes (500h gratis) | ⭐⭐⭐⭐⭐ | ✅ Excelente | railway.app | ⭐ Mejor opción |
| **Render** | ✅ Sí (con límites) | ⭐⭐⭐⭐ | ✅ Bueno | render.com | ⭐ Muy buena |
| **Vercel** | ✅ Sí | ⭐⭐⭐ | ⚠️ Serverless | vercel.app | Para proyectos simples |
| **Heroku** | ❌ No (desde 2022) | ⭐⭐⭐⭐ | ✅ Bueno | herokuapp.com | Solo si ya tienes cuenta |

**Recomendación:** **Railway** es la mejor opción por su facilidad de uso y soporte completo para Node.js + TypeScript.

---

## 🚂 Despliegue en Railway

Railway es la opción más recomendada por su simplicidad y potencia.

### Paso 1: Crear cuenta en Railway

1. Ve a [https://railway.app](https://railway.app)
2. Haz clic en **"Start a New Project"**
3. Inicia sesión con GitHub

### Paso 2: Crear proyecto desde GitHub

```bash
# 1. Sube tu código a GitHub (si no lo has hecho)
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/inscripciones-backend.git
git push -u origin main
```

### Paso 3: Conectar Railway con GitHub

1. En Railway, haz clic en **"Deploy from GitHub repo"**
2. Autoriza Railway para acceder a tus repositorios
3. Selecciona el repositorio `inscripciones-backend`
4. Railway detectará automáticamente que es un proyecto Node.js

### Paso 4: Configurar variables de entorno

1. Ve a la pestaña **"Variables"**
2. Agrega las siguientes variables:

```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...
PORT=3000
NODE_ENV=production
ALLOWED_ORIGINS=https://tu-frontend.com
```

### Paso 5: Configurar el build

Railway debería detectar automáticamente los comandos, pero verifica:

**Build Command:** `npm run build`  
**Start Command:** `npm start`

### Paso 6: Desplegar

1. Haz clic en **"Deploy"**
2. Railway compilará y desplegará tu app
3. Te dará una URL como: `https://inscripciones-backend-production.up.railway.app`

### Paso 7: Verificar despliegue

```bash
curl https://tu-app.up.railway.app/health
```

Deberías ver:

```json
{
  "success": true,
  "status": "OK",
  "timestamp": "2024-12-03T..."
}
```

### Configurar dominio personalizado (opcional)

1. Ve a **Settings** → **Domains**
2. Haz clic en **"Generate Domain"** o **"Custom Domain"**
3. Si tienes un dominio propio, configura los DNS según las instrucciones

---

## 🎨 Despliegue en Render

Render ofrece un plan gratuito con algunas limitaciones.

### Paso 1: Crear cuenta

1. Ve a [https://render.com](https://render.com)
2. Regístrate con GitHub

### Paso 2: Crear Web Service

1. Haz clic en **"New"** → **"Web Service"**
2. Conecta tu repositorio de GitHub
3. Selecciona el repositorio `inscripciones-backend`

### Paso 3: Configurar el servicio

**Name:** `inscripciones-backend`  
**Region:** `Oregon (US West)` (o el más cercano)  
**Branch:** `main`  
**Runtime:** `Node`  
**Build Command:** `npm install && npm run build`  
**Start Command:** `npm start`  
**Plan:** `Free` (o el que prefieras)

### Paso 4: Variables de entorno

En la sección **Environment**, agrega:

```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu_clave
PORT=10000
NODE_ENV=production
ALLOWED_ORIGINS=https://tu-frontend.com
```

**Nota:** Render usa el puerto `10000` por defecto. Tu código debe leer `process.env.PORT`.

### Paso 5: Desplegar

1. Haz clic en **"Create Web Service"**
2. Render comenzará el despliegue (puede tardar 5-10 minutos)
3. Te dará una URL como: `https://inscripciones-backend.onrender.com`

### ⚠️ Limitaciones del plan gratuito

- El servicio se "duerme" después de 15 minutos de inactividad
- La primera petición después de dormir tarda ~30 segundos
- Para evitar esto, actualiza al plan de pago ($7/mes)

---

## ▲ Despliegue en Vercel

Vercel es ideal para proyectos serverless, pero tiene limitaciones con APIs tradicionales.

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Configurar para Vercel

Crea un archivo `vercel.json` en la raíz:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Paso 3: Modificar el server.ts

Vercel necesita que exportes el app:

```typescript
// src/server.ts
import app from './app';

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
}

// Para Vercel
export default app;
```

### Paso 4: Desplegar

```bash
# Compilar
npm run build

# Login en Vercel
vercel login

# Desplegar
vercel --prod
```

### ⚠️ Consideraciones Vercel

- **Limitación:** Las funciones serverless tienen timeout de 10 segundos (plan gratuito)
- **Recomendación:** Solo usar Vercel si es un proyecto pequeño

---

## 📦 Despliegue en Heroku

**Nota:** Heroku eliminó su plan gratuito en 2022. Ahora cuesta mínimo $7/mes.

### Paso 1: Instalar Heroku CLI

```bash
# Windows (con Chocolatey)
choco install heroku-cli

# macOS (con Homebrew)
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

### Paso 2: Login y crear app

```bash
heroku login
heroku create inscripciones-sunafil
```

### Paso 3: Crear Procfile

Crea un archivo `Procfile` en la raíz:

```
web: npm start
```

### Paso 4: Configurar variables de entorno

```bash
heroku config:set SUPABASE_URL=https://tu-proyecto.supabase.co
heroku config:set SUPABASE_ANON_KEY=tu_clave
heroku config:set NODE_ENV=production
heroku config:set ALLOWED_ORIGINS=https://tu-frontend.com
```

### Paso 5: Desplegar

```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### Paso 6: Verificar

```bash
heroku open
heroku logs --tail
```

---

## ⚙️ Configuración Post-Despliegue

### 1. Actualizar CORS en el backend

Asegúrate de que tu `.env` de producción tenga:

```env
ALLOWED_ORIGINS=https://tu-frontend-angular.com,https://www.tu-frontend-angular.com
```

### 2. Actualizar URL en el frontend

En tu proyecto Angular, actualiza el archivo de entorno:

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://tu-backend.up.railway.app'
};
```

### 3. Configurar SSL/HTTPS

Railway, Render y Vercel ya incluyen SSL automático. No necesitas configurar nada.

### 4. Configurar Rate Limiting (opcional)

Para producción, es recomendable limitar peticiones. Instala:

```bash
npm install express-rate-limit
```

En `src/app.ts`:

```typescript
import rateLimit from 'express-rate-limit';

// Limitar a 100 peticiones por 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas peticiones desde esta IP'
});

app.use('/api/', limiter);
```

---

## 📊 Monitoreo y Mantenimiento

### Logs en Railway

```bash
# Ver logs en tiempo real
railway logs
```

### Logs en Render

1. Ve a tu dashboard de Render
2. Haz clic en tu servicio
3. Ve a la pestaña **"Logs"**

### Logs en Heroku

```bash
heroku logs --tail
```

### Health Checks

Configura un servicio como **UptimeRobot** para hacer ping a tu API cada 5 minutos:

```
GET https://tu-api.com/health
```

Esto evita que el servicio se "duerma" (en planes gratuitos).

---

## 🐛 Troubleshooting

### Error: "Cannot find module"

**Solución:** Asegúrate de que el build se ejecutó correctamente:

```bash
npm run build
ls dist/  # Debe mostrar archivos .js
```

### Error: "Port already in use"

**Solución:** Usa una variable de entorno para el puerto:

```typescript
const PORT = process.env.PORT || 3000;
```

### Error: "CORS policy"

**Solución:** Verifica que `ALLOWED_ORIGINS` incluya tu dominio de frontend:

```env
ALLOWED_ORIGINS=https://tu-frontend.com
```

### Error: "Supabase connection failed"

**Solución:** Verifica tus credenciales:

```bash
# En Railway, verifica las variables
railway variables

# Prueba la conexión manualmente
curl https://tu-proyecto.supabase.co/rest/v1/
```

### App se "duerme" (Render free tier)

**Solución:**

1. Actualiza al plan de pago ($7/mes)
2. O configura un cron job que haga ping cada 14 minutos:

```bash
# En cron-job.org o similar
*/14 * * * * curl https://tu-api.onrender.com/health
```

---

## 🔒 Seguridad en Producción

### 1. Nunca expongas secretos

```bash
# ❌ MAL
git add .env

# ✅ BIEN
# .env está en .gitignore
```

### 2. Usa HTTPS siempre

Todas las plataformas modernas incluyen SSL gratuito.

### 3. Limita CORS

```typescript
// ❌ MAL - Permite todo
app.use(cors({ origin: '*' }));

// ✅ BIEN - Solo tu frontend
app.use(cors({ 
  origin: process.env.ALLOWED_ORIGINS.split(',')
}));
```

### 4. Valida todas las entradas

Ya lo tienes con `express-validator` ✅

### 5. Oculta información sensible en errores

```typescript
// En app.ts, solo mostrar stack en desarrollo
app.use(errorHandler);
```

---

## 📋 Checklist de Despliegue

Antes de considerar tu despliegue completo, verifica:

- [ ] ✅ El código compila sin errores (`npm run build`)
- [ ] ✅ Todas las variables de entorno están configuradas
- [ ] ✅ CORS permite tu dominio de frontend
- [ ] ✅ El endpoint `/health` responde correctamente
- [ ] ✅ Todos los endpoints REST funcionan
- [ ] ✅ La base de datos tiene todos los datos (1891 distritos)
- [ ] ✅ No hay credenciales hardcodeadas en el código
- [ ] ✅ `.env` está en `.gitignore`
- [ ] ✅ SSL/HTTPS está activo
- [ ] ✅ Los logs se están monitoreando

---

## 🎓 Próximos Pasos

Después del despliegue:

1. **Monitoreo**: Configura alertas de errores (Sentry, LogRocket)
2. **Backups**: Supabase hace backups automáticos, pero verifica
3. **CDN**: Considera usar Cloudflare para caché y protección DDoS
4. **Dominio**: Compra un dominio personalizado (.pe para Perú)
5. **CI/CD**: Configura GitHub Actions para deploys automáticos

---

## 📚 Recursos Adicionales

- [Railway Docs](https://docs.railway.app/)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Production Checklist](https://supabase.com/docs/guides/platform/going-into-prod)

---

**¿Problemas con el despliegue?** Revisa la sección de [Troubleshooting](#troubleshooting) o abre un issue en el repositorio.

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0
