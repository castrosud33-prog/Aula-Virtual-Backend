import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

// Importar rutas
import configuracionRoutes from './routes/configuracion.routes';
import ubigeoRoutes from './routes/ubigeo.routes';
import inscripcionRoutes from './routes/inscripcion.routes';
import whatsappRoutes from './routes/whatsapp.routes';

// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app: Application = express();

// ============================
// MIDDLEWARES GLOBALES
// ============================

// CORS - Permitir peticiones desde el frontend
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:4200'];

app.use(cors({
  origin: (origin, callback) => {
    // En desarrollo, permitir TODAS las peticiones (consola, HTML local, Postman, etc.)
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // En producción, solo permitir orígenes específicos
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
}));

// Parser de JSON
app.use(express.json());

// Parser de URL-encoded
app.use(express.urlencoded({ extended: true }));

// Logging básico
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============================
// RUTAS
// ============================

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de Inscripciones SUNAFIL - Sistema funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      configuracion: '/api/configuracion/activa',
      ocupaciones: '/api/ocupaciones',
      departamentos: '/api/ubigeo/departamentos',
      provincias: '/api/ubigeo/provincias/:idDepartamento',
      distritos: '/api/ubigeo/distritos/:idProvincia',
      inscripciones: 'POST /api/inscripciones',
      contarInscripciones: '/api/inscripciones/count',
      grupoWhatsApp: '/api/whatsapp/grupo-activo'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Montar rutas de la API
app.use('/api/configuracion', configuracionRoutes);
app.use('/api/ubigeo', ubigeoRoutes);
app.use('/api', inscripcionRoutes); // ocupaciones e inscripciones
app.use('/api/whatsapp', whatsappRoutes);

// ============================
// MANEJO DE ERRORES
// ============================

// 404 - Ruta no encontrada
app.use(notFoundHandler);

// Error handler global
app.use(errorHandler);

export default app;