const express = require('express');
const path = require('path');
const TurnoController = require('./controlador/TurnoController');

const app = express();
const turnoController = new TurnoController();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'vista/public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'vista/views'));

// Rutas de turnos
app.get('/turnos', (req, res) => turnoController.obtenerTodos(req, res));
app.get('/turnos/:id', (req, res) => turnoController.obtenerUno(req, res));
app.post('/turnos/reservar', (req, res) => turnoController.reservar(req, res));
app.post('/turnos/cancelar', (req, res) => turnoController.cancelar(req, res));

// Rutas de clases
app.get('/clases', (req, res) => turnoController.obtenerClases(req, res));

// Ruta principal → muestra la vista
app.get('/', (req, res) => {
  res.render('index');
});

const PUERTO = 3000;
app.listen(PUERTO, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PUERTO}`);
});

module.exports = app;
