/**
 * CONTROLADOR: SocioController
 * Intermediario entre la Vista y el Modelo de Socio.
 */
 
const Socio = require('../modelo/Socio');
 
const SocioController = {
 
  async registrar(req, res) {
    const { nombre, email, telefono } = req.body;
    try {
      const socio = await Socio.registrar(nombre, email, telefono);
      res.json({ ok: true, socio });
    } catch (error) {
      res.status(400).json({ ok: false, error: error.message });
    }
  },
 
  async obtenerTodos(req, res) {
    try {
      const socios = await Socio.obtenerTodos();
      res.json({ ok: true, socios });
    } catch (error) {
      res.status(500).json({ ok: false, error: error.message });
    }
  },
 
  async obtenerPorId(req, res) {
    const { id } = req.params;
    try {
      const socio = await Socio.obtenerPorId(id);
      if (!socio) return res.status(404).json({ ok: false, error: 'Socio no encontrado' });
      res.json({ ok: true, socio });
    } catch (error) {
      res.status(500).json({ ok: false, error: error.message });
    }
  },
 
  async actualizar(req, res) {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;
    try {
      const socio = await Socio.actualizar(id, nombre, email, telefono);
      res.json({ ok: true, socio });
    } catch (error) {
      res.status(400).json({ ok: false, error: error.message });
    }
  },
 
  async eliminar(req, res) {
    const { id } = req.params;
    try {
      const resultado = await Socio.eliminar(id);
      res.json({ ok: true, mensaje: resultado.mensaje });
    } catch (error) {
      res.status(400).json({ ok: false, error: error.message });
    }
  }
 
};
 
module.exports = SocioController;