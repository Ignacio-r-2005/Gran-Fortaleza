/**
 * MODELO: Clase
 * Representa un tipo de clase del gimnasio (yoga, spinning, etc.)
 * Solo maneja datos y lógica de negocio, no imprime nada.
 */

class Clase {
  constructor(id, nombre, descripcion, duracionMinutos) {
    this.id = id;
    this.nombre = nombre;                     // Ej: "Yoga"
    this.descripcion = descripcion;           // Ej: "Clase de relajación"
    this.duracionMinutos = duracionMinutos;   // Ej: 60
    this.turnos = [];                         // Lista de IDs de turnos asociados
    this.activa = true;                       // Si la clase está disponible
  }

  // Agrega un turno a esta clase
  agregarTurno(turnoId) {
    if (this.turnos.includes(turnoId)) {
      throw new Error(`El turno ${turnoId} ya está asignado a esta clase`);
    }
    this.turnos.push(turnoId);
    return true;
  }

  // Elimina un turno de esta clase
  quitarTurno(turnoId) {
    const index = this.turnos.indexOf(turnoId);
    if (index === -1) {
      throw new Error(`El turno ${turnoId} no está asignado a esta clase`);
    }
    this.turnos.splice(index, 1);
    return true;
  }

  // Desactiva la clase (no la elimina)
  desactivar() {
    if (!this.activa) {
      throw new Error(`La clase ${this.nombre} ya está desactivada`);
    }
    this.activa = false;
    return true;
  }

  // Activa la clase
  activar() {
    if (this.activa) {
      throw new Error(`La clase ${this.nombre} ya está activa`);
    }
    this.activa = true;
    return true;
  }

  // Devuelve info de la clase como objeto plano (para la Vista)
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      duracionMinutos: this.duracionMinutos,
      cantidadTurnos: this.turnos.length,
      activa: this.activa,
    };
  }
}

module.exports = Clase;
