import { Request, Response, NextFunction } from 'express';
import { UbigeoService } from '../services/ubigeo.service';
import { ApiResponse } from '../types';

const ubigeoService = new UbigeoService();

export class UbigeoController {
  /**
   * GET /api/ubigeo/departamentos
   * Obtiene todos los departamentos
   */
  async obtenerDepartamentos(req: Request, res: Response, next: NextFunction) {
    try {
      const departamentos = await ubigeoService.obtenerDepartamentos();

      const response: ApiResponse<any> = {
        success: true,
        data: departamentos
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/ubigeo/provincias/:idDepartamento
   * Obtiene las provincias de un departamento
   */
  async obtenerProvincias(req: Request, res: Response, next: NextFunction) {
    try {
      const { idDepartamento } = req.params;
      const provincias = await ubigeoService.obtenerProvinciasPorDepartamento(idDepartamento);

      const response: ApiResponse<any> = {
        success: true,
        data: provincias
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/ubigeo/distritos/:idProvincia
   * Obtiene los distritos de una provincia
   */
  async obtenerDistritos(req: Request, res: Response, next: NextFunction) {
    try {
      const { idProvincia } = req.params;
      const distritos = await ubigeoService.obtenerDistritosPorProvincia(idProvincia);

      const response: ApiResponse<any> = {
        success: true,
        data: distritos
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}