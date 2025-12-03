import app from './app';
import { verificarConexion } from './config/supabase';

const PORT = process.env.PORT || 3000;

/**
 * Inicia el servidor
 */
const iniciarServidor = async () => {
  try {
    console.log('='.repeat(60));
    console.log('🚀 INICIANDO SERVIDOR - API INSCRIPCIONES DPPR');
    console.log('='.repeat(60));

    // Verificar conexión con Supabase
    console.log('\n📡 Verificando conexión con Supabase...');
    const conexionExitosa = await verificarConexion();

    if (!conexionExitosa) {
      console.error('❌ No se pudo conectar a Supabase. Verifica las credenciales en .env');
      process.exit(1);
    }

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log('\n' + '='.repeat(60));
      console.log('✅ SERVIDOR INICIADO CORRECTAMENTE');
      console.log('='.repeat(60));
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📅 Fecha: ${new Date().toLocaleString()}`);
      console.log('='.repeat(60));
      console.log('\n📋 ENDPOINTS DISPONIBLES:');
      console.log('   GET  / - Información de la API');
      console.log('   GET  /health - Health check');
      console.log('   GET  /api/configuracion/activa - Configuración y periodo');
      console.log('   GET  /api/ocupaciones - Lista de ocupaciones');
      console.log('   GET  /api/ubigeo/departamentos - Departamentos');
      console.log('   GET  /api/ubigeo/provincias/:id - Provincias por departamento');
      console.log('   GET  /api/ubigeo/distritos/:id - Distritos por provincia');
      console.log('   POST /api/inscripciones - Crear inscripción');
      console.log('   GET  /api/inscripciones/count - Contar inscripciones');
      console.log('   GET  /api/whatsapp/grupo-activo - Link de WhatsApp');
      console.log('='.repeat(60));
      console.log('\n✨ ¡Listo para recibir peticiones!\n');
    });

  } catch (error) {
    console.error('❌ Error fatal al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Iniciar
iniciarServidor();

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});