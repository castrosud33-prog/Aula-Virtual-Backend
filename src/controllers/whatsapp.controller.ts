import { Request, Response, NextFunction } from 'express';
import { WhatsAppService } from '../services/whatsapp.service';
import { ApiResponse } from '../types';

const whatsappService = new WhatsAppService();

export class WhatsAppController {
  /**
   * GET /api/whatsapp/grupo-activo
   * Obtiene el grupo de WhatsApp correspondiente según el total de inscritos
   */
  async obtenerGrupoActivo(req: Request, res: Response, next: NextFunction) {
    try {
      const { idCurso } = req.query;

      if (!idCurso) {
        return res.status(400).json({
          success: false,
          error: 'El parámetro idCurso es obligatorio'
        });
      }

      const grupo = await whatsappService.obtenerGrupoActivo(Number(idCurso));

      if (!grupo) {
        return res.status(404).json({
          success: false,
          error: 'No se encontró un grupo de WhatsApp configurado'
        });
      }

      const response: ApiResponse<any> = {
        success: true,
        data: {
          nombreGrupo: grupo.v_nomgrupo,
          link: grupo.v_link
        }
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}