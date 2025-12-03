import { supabase } from '../config/supabase';
import { GrupoWhatsApp } from '../types';
import { InscripcionService } from './inscripcion.service';

export class WhatsAppService {
  private inscripcionService: InscripcionService;

  constructor() {
    this.inscripcionService = new InscripcionService();
  }

  /**
   * Obtiene el grupo de WhatsApp activo según el número de inscritos
   */
  async obtenerGrupoActivo(idCurso: number): Promise<GrupoWhatsApp | null> {
    // Contar total de inscritos
    const totalInscritos = await this.inscripcionService.contarInscripciones(idCurso);

    // Obtener todos los grupos del curso
    const { data: grupos, error } = await supabase
      .from('avmvc_grupowhat')
      .select('*')
      .eq('n_codcur', idCurso)
      .order('n_rango_min');

    if (error) {
      console.error('Error al obtener grupos de WhatsApp:', error);
      throw new Error('No se pudieron obtener los grupos de WhatsApp');
    }

    if (!grupos || grupos.length === 0) {
      return null;
    }

    // Determinar qué grupo corresponde según el total de inscritos
    for (const grupo of grupos) {
      if (grupo.n_rango_max === null) {
        // Este es el último grupo (sin límite superior)
        if (totalInscritos >= grupo.n_rango_min) {
          return grupo;
        }
      } else {
        // Grupo con rango definido
        if (totalInscritos >= grupo.n_rango_min && totalInscritos <= grupo.n_rango_max) {
          return grupo;
        }
      }
    }

    // Si no se encontró ningún grupo, retornar el primero por defecto
    return grupos[0];
  }
}