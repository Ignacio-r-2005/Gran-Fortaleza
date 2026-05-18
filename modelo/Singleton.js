/**
 * PATRÓN DE DISEÑO: Singleton
 * 
 * ¿Qué problema resuelve?
 * Si creás dos "bases de datos" en memoria, cada una tendría datos distintos
 * y el sistema sería inconsistente. El Singleton garantiza que solo
 * exista UNA instancia de la base de datos en toda la aplicación.
 * 
 * ¿Cómo funciona?
 * La primera vez que pedís la instancia, la crea.
 * Las siguientes veces, devuelve la misma que ya creó.
 */

const Turno = require('../modelo/Turno');
const Clase = require('../modelo/Clase');

class BaseDeDatos {
  constructor() {
    // Almacenamiento en memoria
    this.turnos = [];
    this.clases = [];
    this.contadorTurnos = 1;
    this.contadorClases = 1;

    // Cargamos algunos datos de ejemplo al iniciar
    this._cargarDatosIniciales();
  }

  // ─── MÉTODOS DE TURNOS ────────────────────────────────────────

  // Crea y guarda un nuevo turno
  agregarTurno(dia, horario, capacidad) {
    const turno = new Turno(this.contadorTurnos++, dia, horario, capacidad);
    this.turnos.push(turno);
    return turno;
  }

  // Devuelve todos los turnos
  obtenerTurnos() {
    return this.turnos;
  }

  // Busca un turno por ID
  obtenerTurnoPorId(id) {
    const turno = this.turnos.find(t => t.id === parseInt(id));
    if (!turno) throw new Error(`Turno con ID ${id} no encontrado`);
    return turno;
  }

  // ─── MÉTODOS DE CLASES ────────────────────────────────────────

  // Crea y guarda una nueva clase
  agregarClase(nombre, descripcion, duracion) {
    const clase = new Clase(this.contadorClases++, nombre, descripcion, duracion);
    this.clases.push(clase);
    return clase;
  }

  // Devuelve todas las clases activas
  obtenerClases() {
    return this.clases.filter(c => c.activa);
  }

  // Busca una clase por ID
  obtenerClasePorId(id) {
    const clase = this.clases.find(c => c.id === parseInt(id));
    if (!clase) throw new Error(`Clase con ID ${id} no encontrada`);
    return clase;
  }

  // ─── DATOS INICIALES ─────────────────────────────────────────

  _cargarDatosIniciales() {
    // Clases disponibles en el gimnasio
    this.agregarClase('Yoga', 'Clase de relajación y flexibilidad', 60);
    this.agregarClase('Spinning', 'Clase de ciclismo indoor', 45);
    this.agregarClase('Funcional', 'Entrenamiento funcional completo', 50);

    // Turnos disponibles
    this.agregarTurno('Lunes', '08:00', 15);
    this.agregarTurno('Lunes', '10:00', 15);
    this.agregarTurno('Martes', '18:00', 10);
    this.agregarTurno('Miércoles', '08:00', 15);
    this.agregarTurno('Jueves', '20:00', 10);
    this.agregarTurno('Viernes', '10:00', 15);
  }
}

// ─── LÓGICA DEL SINGLETON ─────────────────────────────────────────
// Esta variable guarda la única instancia
let instancia = null;

function obtenerBaseDeDatos() {
  if (!instancia) {
    // Solo entra acá la PRIMERA vez
    instancia = new BaseDeDatos();
    console.log('✅ Base de datos creada (primera vez)');
  }
  // Las demás veces devuelve la misma instancia
  return instancia;
}

module.exports = { obtenerBaseDeDatos };
