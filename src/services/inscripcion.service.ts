import { supabase } from '../config/supabase';
import { InscripcionInput, Inscripcion, Ocupacion } from '../types';

export class InscripcionService {
  /**
   * Obtiene todas las ocupaciones
   */
  async obtenerOcupaciones(): Promise<Ocupacion[]> {
    const { data, error } = await supabase
      .from('avtbc_ocupacion')
      .select('*')
      .order('n_codocu');

    if (error) {
      console.error('Error al obtener ocupaciones:', error);
      throw new Error('No se pudieron obtener las ocupaciones');
    }

    return data || [];
  }

  /**
   * Verifica si un documento ya está registrado en un curso específico
   */
  async verificarDocumentoExistente(nroDoc: string, idCurso: number): Promise<boolean> {
    const { data, error } = await supabase
      .from('avtbc_inscripcion')
      .select('v_nrodoc, n_codcur')
      .eq('v_nrodoc', nroDoc)
      .eq('n_codcur', idCurso)  // 👈 NUEVA VALIDACIÓN: también por curso
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error al verificar documento:', error);
      throw new Error('Error al verificar el documento');
    }

    return !!data;
  }

  /**
   * Crea una nueva inscripción
   */
  async crearInscripcion(inscripcionData: InscripcionInput): Promise<Inscripcion> {
    // Verificar que el documento no esté duplicado EN ESTE CURSO
    const existe = await this.verificarDocumentoExistente(inscripcionData.v_nrodoc, inscripcionData.n_codcur);
    if (existe) {
      throw new Error('Ya existe una inscripción con este documento en este curso');
    }

    const { data, error } = await supabase
      .from('avtbc_inscripcion')
      .insert([inscripcionData])
      .select()
      .single();

    if (error) {
      console.error('Error al crear inscripción:', error);
      throw new Error('No se pudo registrar la inscripción');
    }

    return data;
  }

  /**
   * Obtiene el total de inscripciones de un curso
   */
  async contarInscripciones(idCurso: number): Promise<number> {
    const { count, error } = await supabase
      .from('avtbc_inscripcion')
      .select('*', { count: 'exact', head: true })
      .eq('n_codcur', idCurso);

    if (error) {
      console.error('Error al contar inscripciones:', error);
      throw new Error('No se pudo contar las inscripciones');
    }

    return count || 0;
  }
}