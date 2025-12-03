import { Request, Response, NextFunction } from 'express';
import { InscripcionService } from '../services/inscripcion.service';
import { ConfiguracionService } from '../services/configuracion.service';
import { ApiResponse } from '../types';

const inscripcionService = new InscripcionService();
const configuracionService = new ConfiguracionService();

export class InscripcionController {
  /**
   * GET /api/ocupaciones
   * Obtiene todas las ocupaciones
   */
  async obtenerOcupaciones(req: Request, res: Response, next: NextFunction) {
    try {
      const ocupaciones = await inscripcionService.obtenerOcupaciones();

      const response: ApiResponse<any> = {
        success: true,
        data: ocupaciones
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/inscripciones
   * Crea una nueva inscripción
   */
  async crearInscripcion(req: Request, res: Response, next: NextFunction) {
    try {
      // Verificar que estemos dentro del periodo de inscripción
      const { dentroDePeriodo, mensaje } = await configuracionService.verificarPeriodoInscripcion();

      if (!dentroDePeriodo) {
        return res.status(400).json({
          success: false,
          error: mensaje || 'Fuera del periodo de inscripción'
        });
      }

      // Crear inscripción
      const inscripcion = await inscripcionService.crearInscripcion(req.body);

      const response: ApiResponse<any> = {
        success: true,
        data: inscripcion,
        message: 'Inscripción registrada exitosamente'
      };

      res.status(201).json(response);
    } catch (error: any) {
      if (error.message === 'El número de documento ya está registrado') {
        return res.status(409).json({
          success: false,
          error: error.message
        });
      }
      next(error);
    }
  }

  /**
   * GET /api/inscripciones/count
   * Obtiene el total de inscripciones
   */
  async contarInscripciones(req: Request, res: Response, next: NextFunction) {
    try {
      const { idCurso } = req.query;
      
      if (!idCurso) {
        return res.status(400).json({
          success: false,
          error: 'El parámetro idCurso es obligatorio'
        });
      }

      const total = await inscripcionService.contarInscripciones(Number(idCurso));

      const response: ApiResponse<any> = {
        success: true,
        data: { total }
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}