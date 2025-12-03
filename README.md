# 🎓 Sistema de Inscripciones - Aula Virtual SUNAFIL

Backend API REST para el sistema de inscripciones a cursos virtuales gratuitos de SUNAFIL (Superintendencia Nacional de Fiscalización Laboral - Perú).

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints](#endpoints)
- [Base de Datos](#base-de-datos)
- [Validaciones](#validaciones)
- [Scripts Disponibles](#scripts-disponibles)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

---

## ✨ Características

- ✅ **Cobertura Nacional Completa**: 1,891 distritos de Perú (100% de cobertura)
- ✅ **Validación de Periodo**: Verifica automáticamente si las inscripciones están abiertas
- ✅ **Validaciones Robustas**: 18 reglas de validación para datos de inscripción
- ✅ **Ubigeos en Cascada**: Departamentos → Provincias → Distritos
- ✅ **Grupos WhatsApp Dinámicos**: Asignación automática según número de inscritos
- ✅ **Prevención de Duplicados**: No permite inscripciones duplicadas por curso
- ✅ **Arquitectura Escalable**: Separación en capas (Routes → Controllers → Services)
- ✅ **TypeScript**: Tipado estático para mayor confiabilidad
- ✅ **CORS Configurado**: Listo para integrarse con frontend Angular

---

## 🛠️ Tecnologías

### Backend
- **Node.js** (v18+)
- **Express** (v5.2.1)
- **TypeScript** (v5.9.3)

### Base de Datos
- **Supabase** (PostgreSQL)
- **@supabase/supabase-js** (v2.86.0)

### Validación y Seguridad
- **express-validator** (v7.3.1)
- **cors** (v2.8.5)
- **dotenv** (v17.2.3)

### Herramientas de Desarrollo
- **ts-node-dev** (v2.0.0) - Hot reload
- **@types/node**, **@types/express**, **@types/cors**

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** (viene con Node.js)
- **Git** (opcional, para control de versiones)
- **Cuenta de Supabase** - [Crear cuenta gratis](https://supabase.com)

Verifica las instalaciones:

```bash
node --version  # Debe ser v18 o superior
npm --version   # Debe ser v9 o superior
```

---

## 🚀 Instalación

### 1. Clonar el repositorio (o descargar el código)

```bash
git clone <url-del-repositorio>
cd inscripciones-backend
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias (producción y desarrollo).

---

## ⚙️ Configuración

### 1. Crear archivo `.env`

Crea un archivo `.env` en la raíz del proyecto (copia desde `.env.example`):

```bash
cp .env.example .env
```

### 2. Configurar variables de entorno

Edita el archivo `.env` con tus credenciales de Supabase:

```env
# Supabase Configuration
SUPABASE_URL=https://tuproyecto.supabase.co
SUPABASE_ANON_KEY=tu_clave_anonima_aqui

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:4200
```

**¿Dónde encuentro mis credenciales de Supabase?**

1. Ve a [https://supabase.com](https://supabase.com)
2. Selecciona tu proyecto
3. Ve a **Settings** → **API**
4. Copia:
   - `Project URL` → `SUPABASE_URL`
   - `anon public` → `SUPABASE_ANON_KEY`

### 3. Configurar la base de datos

Ejecuta el script SQL de inicialización en Supabase SQL Editor:

```sql
-- Ver el archivo: /database/schema.sql
-- Incluye la creación de todas las tablas y datos iniciales
```

---

## 🎯 Uso

### Modo Desarrollo (con hot reload)

```bash
npm run dev
```

El servidor se iniciará en: `http://localhost:3000`

### Modo Producción

```bash
# 1. Compilar TypeScript a JavaScript
npm run build

# 2. Ejecutar el servidor compilado
npm start
```

### Verificar que funciona

Abre tu navegador en: `http://localhost:3000`

Deberías ver:

```json
{
  "success": true,
  "message": "API de Inscripciones SUNAFIL - Sistema funcionando correctamente",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

---

## 📁 Estructura del Proyecto

```
inscripciones-backend/
├── src/
│   ├── config/
│   │   └── supabase.ts              # Configuración de Supabase
│   │
│   ├── types/
│   │   └── index.ts                 # Definiciones TypeScript
│   │
│   ├── middlewares/
│   │   ├── error.middleware.ts      # Manejo de errores
│   │   └── validation.middleware.ts # Validación de requests
│   │
│   ├── validators/
│   │   └── inscripcion.validator.ts # Reglas de validación
│   │
│   ├── services/                    # Lógica de negocio
│   │   ├── configuracion.service.ts
│   │   ├── ubigeo.service.ts
│   │   ├── inscripcion.service.ts
│   │   └── whatsapp.service.ts
│   │
│   ├── controllers/                 # Controladores HTTP
│   │   ├── configuracion.controller.ts
│   │   ├── ubigeo.controller.ts
│   │   ├── inscripcion.controller.ts
│   │   └── whatsapp.controller.ts
│   │
│   ├── routes/                      # Definición de rutas
│   │   ├── configuracion.routes.ts
│   │   ├── ubigeo.routes.ts
│   │   ├── inscripcion.routes.ts
│   │   └── whatsapp.routes.ts
│   │
│   ├── app.ts                       # Configuración de Express
│   └── server.ts                    # Punto de entrada
│
├── dist/                            # Código compilado (generado)
├── node_modules/                    # Dependencias (generado)
│
├── .env                             # Variables de entorno (NO subir a Git)
├── .env.example                     # Template de variables
├── .gitignore                       # Archivos ignorados por Git
├── package.json                     # Dependencias y scripts
├── tsconfig.json                    # Configuración TypeScript
└── README.md                        # Este archivo
```

---

## 🌐 Endpoints

### **Base URL**: `http://localhost:3000`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Información general de la API |
| GET | `/health` | Health check del servidor |
| GET | `/api/configuracion/activa` | Configuración y periodo de inscripción |
| GET | `/api/ocupaciones` | Lista de ocupaciones |
| GET | `/api/ubigeo/departamentos` | 25 departamentos de Perú |
| GET | `/api/ubigeo/provincias/:id` | Provincias de un departamento |
| GET | `/api/ubigeo/distritos/:id` | Distritos de una provincia |
| POST | `/api/inscripciones` | Crear nueva inscripción |
| GET | `/api/inscripciones/count` | Contar inscripciones por curso |
| GET | `/api/whatsapp/grupo-activo` | Obtener grupo de WhatsApp activo |

**Para documentación detallada de cada endpoint, ver:** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 🗄️ Base de Datos

### Tablas Principales

1. **avtbc_configuracion** - Configuración del sistema (fechas, periodos)
2. **avtbc_curso** - Información de cursos disponibles
3. **avtbc_ocupacion** - Catálogo de ocupaciones (5 opciones)
4. **departamentos** - 25 departamentos de Perú
5. **provincias** - 196 provincias
6. **distritos** - 1,891 distritos (cobertura nacional 100%)
7. **avtbc_inscripcion** - Registros de inscripciones
8. **avmvc_grupowhat** - Grupos de WhatsApp (4 rangos)
9. **Tablas de evaluación** - Para funcionalidad futura

### Diagrama de Relaciones

```
avtbc_configuracion
        ↓
   avtbc_curso ←──────────┐
        ↓                 │
   avtbc_inscripcion ─────┤
        ↑                 │
        ├─ avtbc_ocupacion│
        ├─ departamentos  │
        ├─ provincias     │
        └─ distritos      │
                          │
   avmvc_grupowhat ───────┘
```

---

## ✅ Validaciones

### Validaciones de Inscripción

| Campo | Validación |
|-------|------------|
| **v_nombres** | Obligatorio, solo letras y espacios |
| **v_apepaterno** | Obligatorio, solo letras y espacios |
| **v_apematerno** | Obligatorio, solo letras y espacios |
| **v_tipodoc** | Debe ser: DNI, CE o PTP |
| **v_nrodoc** | DNI: 8 dígitos / CE-PTP: 8-20 alfanuméricos |
| **d_fechanac** | Fecha válida, mayor de 18 años |
| **n_codocu** | Debe existir en tabla ocupaciones |
| **v_departamento** | Obligatorio |
| **v_provincia** | Obligatorio |
| **v_distrito** | Obligatorio |
| **v_email** | Formato email válido, solo @gmail.com |
| **n_numtelf** | 9 dígitos, debe empezar con 9 |
| **v_autoriza** | Debe ser: S o N |

### Validaciones de Negocio

- ✅ **Periodo activo**: Solo permite inscripciones dentro del rango de fechas
- ✅ **Sin duplicados**: No permite el mismo DNI en el mismo curso
- ✅ **Referencias válidas**: Curso, ocupación y ubigeos deben existir en BD

---

## 🎮 Scripts Disponibles

```bash
# Desarrollo con hot reload
npm run dev

# Compilar TypeScript a JavaScript
npm run build

# Ejecutar versión compilada (producción)
npm start

# Verificar versión de Node.js
node --version
```

---

## 🧪 Testing

### Testing Manual con cURL

```bash
# Health check
curl http://localhost:3000/health

# Obtener departamentos
curl http://localhost:3000/api/ubigeo/departamentos

# Crear inscripción
curl -X POST http://localhost:3000/api/inscripciones \
  -H "Content-Type: application/json" \
  -d '{
    "n_codcur": 1,
    "v_nombres": "JUAN",
    "v_apepaterno": "PEREZ",
    "v_apematerno": "LOPEZ",
    "v_tipodoc": "DNI",
    "v_nrodoc": "12345678",
    "d_fechanac": "1990-05-15",
    "n_codocu": 2,
    "v_departamento": "LIMA",
    "v_provincia": "LIMA",
    "v_distrito": "MIRAFLORES",
    "v_email": "juan.perez@gmail.com",
    "n_numtelf": "987654321",
    "v_autoriza": "S"
  }'
```

**Para más ejemplos de testing, ver:** [TESTING.md](./TESTING.md)

---

## 🚀 Despliegue a Producción

Para desplegar esta aplicación en producción (Railway, Render, Vercel, etc.):

**Ver guía completa:** [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🤝 Contribuir

Si deseas contribuir a este proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 🔐 Seguridad

- ✅ Variables de entorno para credenciales sensibles
- ✅ CORS configurado para orígenes permitidos
- ✅ Validaciones exhaustivas en backend
- ✅ Manejo de errores sin exponer información sensible
- ⚠️ **IMPORTANTE**: Nunca subas el archivo `.env` a Git

---

## 📞 Soporte

Para preguntas o problemas:

- **Issues**: Abre un issue en el repositorio
- **Email**: [tu-email@example.com]
- **Documentación**: Revisa los archivos `.md` en este repositorio

---

## 📄 Licencia

Este proyecto es propiedad de SUNAFIL (Superintendencia Nacional de Fiscalización Laboral - Perú).

---

## 🙏 Agradecimientos

- **Supabase** - Por proporcionar la infraestructura de base de datos
- **INEI** - Por los datos oficiales de UBIGEO
- **SUNAFIL** - Por la oportunidad de crear este sistema

---

## 📚 Documentación Adicional

- [📖 Documentación de API](./API_DOCUMENTATION.md) - Detalles de cada endpoint
- [🧪 Guía de Testing](./TESTING.md) - Ejemplos de pruebas
- [🚀 Guía de Despliegue](./DEPLOYMENT.md) - Cómo subir a producción

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0  
**Estado:** ✅ Producción Ready
