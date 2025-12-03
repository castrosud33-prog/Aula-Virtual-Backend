// Tipos para las tablas de la base de datos

export interface Departamento {
  id_departamento: string;
  nombre_departamento: string;
}

export interface Provincia {
  id_provincia: string;
  id_departamento: string;
  nombre_provincia: string;
}

export interface Distrito {
  id_distrito: string;
  id_provincia: string;
  nombre_distrito: string;
}

export interface Ocupacion {
  n_codocu: number;
  v_ocupacion: string;
}

export interface Configuracion {
  n_codcon: number;
  v_descripcion: string;
  d_feciniins: string;
  d_fecfinins: string;
  d_fecinieva: string | null;
  d_fecfineva: string | null;
  v_flagact: string;
}

export interface Curso {
  n_codcur: number;
  n_codcon: number;
  v_nombre: string;
  v_descripcion: string;
  d_feccreacion: string;
}

export interface InscripcionInput {
  n_codcur: number;
  v_nombres: string;
  v_apepaterno: string;
  v_apematerno: string;
  v_tipodoc: string;
  v_nrodoc: string;
  d_fechanac: string;
  n_codocu: number;
  v_departamento: string;
  v_provincia: string;
  v_distrito: string;
  v_email: string;
  n_numtelf: string;
  v_autoriza: string;
}

export interface Inscripcion extends InscripcionInput {
  n_codins: number;
  created_at: string;
}

export interface GrupoWhatsApp {
  n_codwhat: number;
  n_codcur: number;
  v_nomgrupo: string;
  v_link: string;
  n_rango_min: number;
  n_rango_max: number | null;
  v_flag: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}