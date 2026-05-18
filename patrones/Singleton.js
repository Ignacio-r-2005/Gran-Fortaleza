/**
 * PATRÓN DE DISEÑO: Singleton
 * 
 * Ahora en vez de guardar datos en memoria,
 * maneja la CONEXIÓN A MYSQL.
 * 
 * Garantiza que toda la aplicación use
 * una sola conexión a la base de datos.
 */

const mysql = require('mysql2/promise');

// Configuración de la conexión
const CONFIG = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',           // En XAMPP por defecto no tiene contraseña
  database: 'gimnasio_gran_fortaleza'
};

// La única instancia de la conexión
let instancia = null;

async function obtenerConexion() {
  if (!instancia) {
    instancia = await mysql.createConnection(CONFIG);
    console.log('✅ Conexión a MySQL establecida (primera vez)');
  }
  return instancia;
}

module.exports = { obtenerConexion };
