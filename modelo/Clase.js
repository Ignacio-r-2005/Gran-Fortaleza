/**
 * MODELO: Clase
 * Maneja toda la lógica de negocio de las clases
 * y la comunicación con la base de datos MySQL.
 */

const { obtenerConexion } = require('../patrones/Singleton');

class Clase {

  // ─── MÉTODOS CON BASE DE DATOS ───────────────────────────────

  // Obtiene todas las clases activas
  static async obtenerTodas() {
    const db = await obtenerConexion();
    const [clases] = await db.execute(
      'SELECT * FROM clases WHERE activa = 1'
    );
    return clases;
  }

  // Obtiene una clase por ID
  static async obtenerPorId(id) {
    const db = await obtenerConexion();
    const [rows] = await db.execute(
      'SELECT * FROM clases WHERE id = ?', [id]
    );
    if (rows.length === 0) {
      throw new Error(`Clase con ID ${id} no encontrada`);
    }
    return rows[0];
  }

  // Desactiva una clase
  static async desactivar(id) {
    const db = await obtenerConexion();
    const clase = await Clase.obtenerPorId(id);
    if (!clase.activa) {
      throw new Error(`La clase ${clase.nombre} ya está desactivada`);
    }
    await db.execute(
      'UPDATE clases SET activa = 0 WHERE id = ?', [id]
    );
    return { mensaje: `Clase ${clase.nombre} desactivada` };
  }

  // Activa una clase
  static async activar(id) {
    const db = await obtenerConexion();
    const clase = await Clase.obtenerPorId(id);
    if (clase.activa) {
      throw new Error(`La clase ${clase.nombre} ya está activa`);
    }
    await db.execute(
      'UPDATE clases SET activa = 1 WHERE id = ?', [id]
    );
    return { mensaje: `Clase ${clase.nombre} activada` };
  }
}

module.exports = Clase;
