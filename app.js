/**
 * APP.JS - Punto de entrada del servidor
 * 
 * Acá se configura Express y se definen todas las rutas.
 * Es el que conecta las URLs con los Controladores.
 */

const express = require('express');
const path = require('path');
const TurnoController = require('./controlador/TurnoController');

const app = express();
const turnoController = new TurnoController();

// ─── CONFIGURACIÓN ────────────────────────────────────────────────
app.use(express.json());                            // Para leer JSON del body
app.use(express.urlencoded({ extended: true }));    // Para leer formularios HTML
app.use(express.static(path.join(__dirname, 'vista/public'))); // Archivos estáticos
app.set('view engine', 'ejs');                      // Motor de plantillas
app.set('views', path.join(__dirname, 'vista/views'));

// ─── RUTAS DE TURNOS ──────────────────────────────────────────────
app.get('/turnos', (req, res) => turnoController.obtenerTodos(req, res));
app.get('/turnos/:id', (req, res) => turnoController.obtenerUno(req, res));
app.post('/turnos/reservar', (req, res) => turnoController.reservar(req, res));
app.post('/turnos/cancelar', (req, res) => turnoController.cancelar(req, res));

// ─── RUTAS DE CLASES ──────────────────────────────────────────────
app.get('/clases', (req, res) => turnoController.obtenerClases(req, res));

// ─── RUTA PRINCIPAL ───────────────────────────────────────────────
app.get('/', (req, res) => {
  res.redirect('/turnos');
});

// ─── INICIAR SERVIDOR ─────────────────────────────────────────────
const PUERTO = 3000;
app.listen(PUERTO, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PUERTO}`);
});

module.exports = app;
