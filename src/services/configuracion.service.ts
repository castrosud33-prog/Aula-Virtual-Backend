import { supabase } from '../config/supabase';
import { Configuracion } from '../types';

export class ConfiguracionService {
  /**
   * Obtiene la configuración activa del sistema
   */
  async obtenerConfiguracionActiva(): Promise<Configuracion | null> {
    const { data, error } = await supabase
      .from('avtbc_configuracion')
      .select('*')
      .eq('v_flagact', 'S')
      .single();

    if (error) {
      console.error('Error al obtener configuración:', error);
      throw new Error('No se pudo obtener la configuración del sistema');
    }

    return data;
  }

  /**
   * Verifica si estamos dentro del periodo de inscripción
   */
  async verificarPeriodoInscripcion(): Promise<{ 
    dentroDePeriodo: boolean; 
    configuracion: Configuracion | null;
    mensaje?: string;
  }> {
    const config = await this.obtenerConfiguracionActiva();

    if (!config) {
      return {
        dentroDePeriodo: false,
        configuracion: null,
        mensaje: 'No hay una configuración activa'
      };
    }

    const hoy = new Date();
    const fechaInicio = new Date(config.d_feciniins);
    const fechaFin = new Date(config.d_fecfinins);

    const dentroDePeriodo = hoy >= fechaInicio && hoy <= fechaFin;

    return {
      dentroDePeriodo,
      configuracion: config,
      mensaje: dentroDePeriodo 
        ? 'Periodo de inscripción activo'
        : `Las inscripciones estuvieron disponibles desde ${fechaInicio.toLocaleDateString()} hasta ${fechaFin.toLocaleDateString()}`
    };
  }
}