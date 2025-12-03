import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las credenciales de Supabase en las variables de entorno');
}

// Cliente de Supabase
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Verificar conexión
export const verificarConexion = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from('departamentos').select('count').limit(1);
    if (error) {
      console.error('❌ Error al conectar con Supabase:', error.message);
      return false;
    }
    console.log('✅ Conexión exitosa con Supabase');
    return true;
  } catch (error) {
    console.error('❌ Error al verificar conexión:', error);
    return false;
  }
};