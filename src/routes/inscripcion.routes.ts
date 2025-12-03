import { Router } from 'express';
import { InscripcionController } from '../controllers/inscripcion.controller';
import { inscripcionValidators } from '../validators/inscripcion.validator';
import { validateRequest } from '../middlewares/validation.middleware';

const router = Router();
const controller = new InscripcionController();

/**
 * GET /api/ocupaciones
 * Obtiene todas las ocupaciones
 */
router.get('/ocupaciones', controller.obtenerOcupaciones);

/**
 * POST /api/inscripciones
 * Crea una nueva inscripción (con validaciones)
 */
router.post(
  '/inscripciones',
  inscripcionValidators,
  validateRequest,
  controller.crearInscripcion
);

/**
 * GET /api/inscripciones/count
 * Cuenta el total de inscripciones
 */
router.get('/inscripciones/count', controller.contarInscripciones);

export default router;