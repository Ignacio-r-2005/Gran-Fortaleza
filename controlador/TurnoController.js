/**
 * CONTROLADOR: TurnoController
 * 
 * Intermediario entre la Vista y el Modelo.
 * Ahora usa async/await porque la BD es asíncrona.
 */

const Turno = require('../modelo/Turno');
const Clase = require('../modelo/Clase');

class TurnoController {

  // GET /turnos → devuelve todos los turnos
  async obtenerTodos(req, res) {
    try {
      const turnos = await Turno.obtenerTodos();
      res.json({ ok: true, data: turnos });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: error.message });
    }
  }

  // GET /turnos/:id → devuelve un turno por ID
  async obtenerUno(req, res) {
    try {
      const turno = await Turno.obtenerPorId(req.params.id);
      res.json({ ok: true, data: turno });
    } catch (error) {
      res.status(404).json({ ok: false, mensaje: error.message });
    }
  }

  // POST /turnos/reservar → reserva un lugar en un turno
  async reservar(req, res) {
    try {
      const { turnoId, nombreSocio, fecha } = req.body;

      if (!turnoId || !nombreSocio || !fecha) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Se requiere turnoId, nombreSocio y fecha'
        });
      }

      const resultado = await Turno.reservar(turnoId, nombreSocio, fecha);
      res.json({ ok: true, mensaje: resultado.mensaje, data: resultado.turno });
    } catch (error) {
      res.status(400).json({ ok: false, mensaje: error.message });
    }
  }

  // POST /turnos/cancelar → cancela una reserva
  async cancelar(req, res) {
    try {
      const { turnoId, nombreSocio, fecha } = req.body;

      if (!turnoId || !nombreSocio || !fecha) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Se requiere turnoId, nombreSocio y fecha'
        });
      }

      const resultado = await Turno.cancelar(turnoId, nombreSocio, fecha);
      res.json({ ok: true, mensaje: resultado.mensaje, data: resultado.turno });
    } catch (error) {
      res.status(400).json({ ok: false, mensaje: error.message });
    }
  }

  // GET /clases → devuelve todas las clases activas
  async obtenerClases(req, res) {
    try {
      const clases = await Clase.obtenerTodas();
      res.json({ ok: true, data: clases });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: error.message });
    }
  }
}

module.exports = TurnoController;
