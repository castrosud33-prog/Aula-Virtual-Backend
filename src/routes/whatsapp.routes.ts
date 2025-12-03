import { Router } from 'express';
import { WhatsAppController } from '../controllers/whatsapp.controller';

const router = Router();
const controller = new WhatsAppController();

/**
 * GET /api/whatsapp/grupo-activo
 * Obtiene el grupo de WhatsApp activo según el número de inscritos
 */
router.get('/grupo-activo', controller.obtenerGrupoActivo);

export default router;