/**
 * PATRÓN DE DISEÑO: Mediator
 * 
 * Coordina la comunicación entre Socio y Turno.
 * Ni Socio ni Turno se llaman entre sí directamente,
 * todo pasa por acá.
 */
 
const { obtenerConexion } = require('../patrones/Singleton');
 
const GimnasioMediator = {
 
  // ── Reservar turno
  async reservar(socioId, turnoId, fecha) {
    if (!socioId || !turnoId || !fecha) {
      throw new Error('socioId, turnoId y fecha son obligatorios');
    }
 
    const db = await obtenerConexion();
 
    // 1. Verificar que el socio existe
    const [socios] = await db.execute(
      'SELECT * FROM socios WHERE id = ?', [socioId]
    );
    if (socios.length === 0) throw new Error('El socio no existe');
 
    // 2. Verificar que el turno existe
    const [turnos] = await db.execute(
      'SELECT * FROM turnos WHERE id = ?', [turnoId]
    );
    if (turnos.length === 0) throw new Error('El turno no existe');
    const turno = turnos[0];
 
    // 3. Verificar que hay lugares disponibles
    const [reservas] = await db.execute(
      'SELECT COUNT(*) AS total FROM reservas WHERE turno_id = ? AND fecha_reserva = ?',
      [turnoId, fecha]
    );
    const ocupados = reservas[0].total;
    if (ocupados >= turno.capacidad_maxima) {
      throw new Error('El turno no tiene lugares disponibles');
    }
 
    // 4. Verificar que el socio no tenga ya ese turno en esa fecha
    const [duplicadas] = await db.execute(
      'SELECT * FROM reservas WHERE nombre_socio = ? AND turno_id = ? AND fecha_reserva = ?',
      [socios[0].nombre, turnoId, fecha]
    );
    if (duplicadas.length > 0) {
      throw new Error('El socio ya tiene reserva para ese turno en esa fecha');
    }
 
    // 5. Guardar la reserva
    const [result] = await db.execute(
      'INSERT INTO reservas (nombre_socio, turno_id, fecha_reserva) VALUES (?, ?, ?)',
      [socios[0].nombre, turnoId, fecha]
    );
 
    return { ok: true, reservaId: result.insertId, mensaje: 'Reserva confirmada' };
  },
 
  // ── Cancelar reserva
  async cancelar(reservaId, socioId) {
    if (!reservaId || !socioId) {
      throw new Error('reservaId y socioId son obligatorios');
    }
 
    const db = await obtenerConexion();
 
    // 1. Buscar el socio para obtener su nombre
    const [socios] = await db.execute(
      'SELECT * FROM socios WHERE id = ?', [socioId]
    );
    if (socios.length === 0) throw new Error('El socio no existe');
 
    // 2. Verificar que la reserva existe y pertenece al socio
    const [reservas] = await db.execute(
      'SELECT * FROM reservas WHERE id = ? AND nombre_socio = ?',
      [reservaId, socios[0].nombre]
    );
    if (reservas.length === 0) {
      throw new Error('Reserva no encontrada o no pertenece al socio');
    }
 
    // 3. Eliminar la reserva
    await db.execute('DELETE FROM reservas WHERE id = ?', [reservaId]);
 
    return { ok: true, mensaje: 'Reserva cancelada correctamente' };
  }
 
};
 
module.exports = GimnasioMediator;