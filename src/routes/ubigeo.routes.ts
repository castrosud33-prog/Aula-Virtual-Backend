import { Router } from 'express';
import { UbigeoController } from '../controllers/ubigeo.controller';

const router = Router();
const controller = new UbigeoController();

/**
 * GET /api/ubigeo/departamentos
 * Obtiene todos los departamentos
 */
router.get('/departamentos', controller.obtenerDepartamentos);

/**
 * GET /api/ubigeo/provincias/:idDepartamento
 * Obtiene las provincias de un departamento
 */
router.get('/provincias/:idDepartamento', controller.obtenerProvincias);

/**
 * GET /api/ubigeo/distritos/:idProvincia
 * Obtiene los distritos de una provincia
 */
router.get('/distritos/:idProvincia', controller.obtenerDistritos);

export default router;