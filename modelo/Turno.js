/**
 * MODELO: Turno
 * Maneja toda la lógica de negocio de los turnos
 * y la comunicación con la base de datos MySQL.
 */

const { obtenerConexion } = require('../patrones/Singleton');

class Turno {

  // ─── LÓGICA DE NEGOCIO (sin BD) ──────────────────────────────
  // Estas funciones validan las reglas del gimnasio

  static validarReserva(turno, nombreSocio, reservasExistentes) {
    const ocupados = reservasExistentes.length;
    if (ocupados >= turno.capacidad_maxima) {
      throw new Error(`El turno del ${turno.dia} a las ${turno.horario} está lleno`);
    }
    const yaReservo = reservasExistentes.some(
      r => r.nombre_socio === nombreSocio
    );
    if (yaReservo) {
      throw new Error(`${nombreSocio} ya tiene una reserva en este turno`);
    }
    return true;
  }

  static validarCancelacion(reservasExistentes, nombreSocio) {
    const reserva = reservasExistentes.find(r => r.nombre_socio === nombreSocio);
    if (!reserva) {
      throw new Error(`${nombreSocio} no tiene reserva en este turno`);
    }
    return reserva;
  }

  // ─── MÉTODOS CON BASE DE DATOS ───────────────────────────────

  // Obtiene todos los turnos con su cantidad de reservas
  static async obtenerTodos() {
    const db = await obtenerConexion();
    const [turnos] = await db.execute(`
      SELECT t.*, c.nombre as clase_nombre,
        COUNT(r.id) as ocupados
      FROM turnos t
      LEFT JOIN clases c ON t.clase_id = c.id
      LEFT JOIN reservas r ON t.id = r.turno_id 
        AND r.fecha_reserva = CURDATE()
      GROUP BY t.id
    `);
    return turnos;
  }

  // Obtiene un turno por ID
  static async obtenerPorId(id) {
    const db = await obtenerConexion();
    const [rows] = await db.execute(
      'SELECT * FROM turnos WHERE id = ?', [id]
    );
    if (rows.length === 0) {
      throw new Error(`Turno con ID ${id} no encontrado`);
    }
    return rows[0];
  }

  // Reserva un turno para un socio
  static async reservar(turnoId, nombreSocio, fecha) {
    const db = await obtenerConexion();

    // 1. Busca el turno
    const turno = await Turno.obtenerPorId(turnoId);

    // 2. Busca las reservas existentes para ese turno y fecha
    const [reservas] = await db.execute(
      'SELECT * FROM reservas WHERE turno_id = ? AND fecha_reserva = ?',
      [turnoId, fecha]
    );

    // 3. Valida las reglas de negocio (sin tocar la BD)
    Turno.validarReserva(turno, nombreSocio, reservas);

    // 4. Si todo está bien, guarda la reserva
    await db.execute(
      'INSERT INTO reservas (nombre_socio, turno_id, fecha_reserva) VALUES (?, ?, ?)',
      [nombreSocio, turnoId, fecha]
    );

    return { turno, mensaje: `Reserva confirmada para ${nombreSocio} el ${turno.dia} a las ${turno.horario}` };
  }

  // Cancela una reserva
  static async cancelar(turnoId, nombreSocio, fecha) {
    const db = await obtenerConexion();

    // 1. Busca el turno
    const turno = await Turno.obtenerPorId(turnoId);

    // 2. Busca las reservas existentes
    const [reservas] = await db.execute(
      'SELECT * FROM reservas WHERE turno_id = ? AND fecha_reserva = ?',
      [turnoId, fecha]
    );

    // 3. Valida que el socio tenga reserva
    const reserva = Turno.validarCancelacion(reservas, nombreSocio);

    // 4. Elimina la reserva
    await db.execute('DELETE FROM reservas WHERE id = ?', [reserva.id]);

    return { turno, mensaje: `Reserva cancelada para ${nombreSocio}` };
  }

  // Obtiene todas las reservas de un turno en una fecha
  static async obtenerReservas(turnoId, fecha) {
    const db = await obtenerConexion();
    const [reservas] = await db.execute(
      'SELECT * FROM reservas WHERE turno_id = ? AND fecha_reserva = ?',
      [turnoId, fecha]
    );
    return reservas;
  }
}

module.exports = Turno;
