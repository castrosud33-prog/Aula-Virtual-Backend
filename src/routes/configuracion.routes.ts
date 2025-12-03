import { Router } from 'express';
import { ConfiguracionController } from '../controllers/configuracion.controller';

const router = Router();
const controller = new ConfiguracionController();

/**
 * GET /api/configuracion/activa
 * Obtiene la configuración activa del sistema
 */
router.get('/activa', controller.obtenerConfiguracionActiva);

export default router;