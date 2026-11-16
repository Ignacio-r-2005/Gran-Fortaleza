/**
 * MODELO: Socio
 * Maneja toda la lógica de negocio de los socios
 * y la comunicación con la base de datos MySQL.
 */
 
const { obtenerConexion } = require('../patrones/Singleton');
 
class Socio {
  constructor(id, nombre, email, telefono) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
  }
 
  // ── Lógica de negocio pura (sin BD, testeable)
  static validarRegistro(nombre, email) {
    if (!nombre || nombre.trim() === '') {
      throw new Error('El nombre del socio es obligatorio');
    }
    if (!email || !email.includes('@')) {
      throw new Error('El email del socio no es válido');
    }
    return true;
  }
 
  // ── Métodos con base de datos
 
  static async registrar(nombre, email, telefono) {
    Socio.validarRegistro(nombre, email);
    const db = await obtenerConexion();
    const [result] = await db.execute(
      'INSERT INTO socios (nombre, email, telefono) VALUES (?, ?, ?)',
      [nombre.trim(), email.trim(), telefono || null]
    );
    return new Socio(result.insertId, nombre, email, telefono);
  }
 
  static async obtenerTodos() {
    const db = await obtenerConexion();
    const [rows] = await db.execute('SELECT * FROM socios');
    return rows.map(r => new Socio(r.id, r.nombre, r.email, r.telefono));
  }
 
  static async obtenerPorId(id) {
    const db = await obtenerConexion();
    const [rows] = await db.execute('SELECT * FROM socios WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    const r = rows[0];
    return new Socio(r.id, r.nombre, r.email, r.telefono);
  }
 
  // ── NUEVO: Actualizar socio
  static async actualizar(id, nombre, email, telefono) {
    Socio.validarRegistro(nombre, email);
    const db = await obtenerConexion();
    const [result] = await db.execute(
      'UPDATE socios SET nombre = ?, email = ?, telefono = ? WHERE id = ?',
      [nombre.trim(), email.trim(), telefono || null, id]
    );
    if (result.affectedRows === 0) throw new Error('Socio no encontrado');
    return new Socio(id, nombre, email, telefono);
  }
 
  // ── NUEVO: Eliminar socio
  static async eliminar(id) {
    const db = await obtenerConexion();
    const socio = await Socio.obtenerPorId(id);
    if (!socio) throw new Error('Socio no encontrado');
    await db.execute('DELETE FROM socios WHERE id = ?', [id]);
    return { mensaje: `Socio ${socio.nombre} eliminado correctamente` };
  }
}
 
module.exports = Socio;