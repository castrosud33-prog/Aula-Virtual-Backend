import { Request, Response, NextFunction } from 'express';
import { ConfiguracionService } from '../services/configuracion.service';
import { ApiResponse } from '../types';

const configuracionService = new ConfiguracionService();

export class ConfiguracionController {
  /**
   * GET /api/configuracion/activa
   * Obtiene la configuración activa y verifica el periodo de inscripción
   */
  async obtenerConfiguracionActiva(req: Request, res: Response, next: NextFunction) {
    try {
      const resultado = await configuracionService.verificarPeriodoInscripcion();

      const response: ApiResponse<any> = {
        success: true,
        data: {
          configuracion: resultado.configuracion,
          dentroDePeriodo: resultado.dentroDePeriodo,
          mensaje: resultado.mensaje
        }
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}