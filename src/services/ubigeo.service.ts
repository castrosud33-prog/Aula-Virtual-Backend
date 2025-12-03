import { supabase } from '../config/supabase';
import { Departamento, Provincia, Distrito } from '../types';

export class UbigeoService {
  /**
   * Obtiene todos los departamentos
   */
  async obtenerDepartamentos(): Promise<Departamento[]> {
    const { data, error } = await supabase
      .from('departamentos')
      .select('*')
      .order('nombre_departamento');

    if (error) {
      console.error('Error al obtener departamentos:', error);
      throw new Error('No se pudieron obtener los departamentos');
    }

    return data || [];
  }

  /**
   * Obtiene las provincias de un departamento
   */
  async obtenerProvinciasPorDepartamento(idDepartamento: string): Promise<Provincia[]> {
    const { data, error } = await supabase
      .from('provincias')
      .select('*')
      .eq('id_departamento', idDepartamento)
      .order('nombre_provincia');

    if (error) {
      console.error('Error al obtener provincias:', error);
      throw new Error('No se pudieron obtener las provincias');
    }

    return data || [];
  }

  /**
   * Obtiene los distritos de una provincia
   */
  async obtenerDistritosPorProvincia(idProvincia: string): Promise<Distrito[]> {
    const { data, error } = await supabase
      .from('distritos')
      .select('*')
      .eq('id_provincia', idProvincia)
      .order('nombre_distrito');

    if (error) {
      console.error('Error al obtener distritos:', error);
      throw new Error('No se pudieron obtener los distritos');
    }

    return data || [];
  }
}