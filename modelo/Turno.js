/**
 * MODELO: Turno
 * Representa un turno disponible en el gimnasio.
 * Solo maneja datos y lógica de negocio, no imprime nada.
 */

class Turno {
  constructor(id, dia, horario, capacidadMaxima) {
    this.id = id;
    this.dia = dia;               // Ej: "Lunes"
    this.horario = horario;       // Ej: "10:00"
    this.capacidadMaxima = capacidadMaxima;
    this.reservas = [];           // Lista de IDs de socios que reservaron
  }

  // Reserva el turno para un socio (recibe el ID del socio)
  reservar(socioId) {
    if (this.estaLleno()) {
      throw new Error(`El turno del ${this.dia} a las ${this.horario} está lleno`);
    }
    if (this.tienReserva(socioId)) {
      throw new Error(`El socio ${socioId} ya tiene una reserva en este turno`);
    }
    this.reservas.push(socioId);
    return true;
  }

  // Cancela la reserva de un socio
  cancelar(socioId) {
    const index = this.reservas.indexOf(socioId);
    if (index === -1) {
      throw new Error(`El socio ${socioId} no tiene reserva en este turno`);
    }
    this.reservas.splice(index, 1);
    return true;
  }

  // Verifica si el turno está lleno
  estaLleno() {
    return this.reservas.length >= this.capacidadMaxima;
  }

  // Verifica si un socio ya reservó este turno
  tienReserva(socioId) {
    return this.reservas.includes(socioId);
  }

  // Devuelve cuántos lugares quedan
  lugaresDisponibles() {
    return this.capacidadMaxima - this.reservas.length;
  }

  // Devuelve info del turno como objeto plano (para la Vista)
  toJSON() {
    return {
      id: this.id,
      dia: this.dia,
      horario: this.horario,
      capacidadMaxima: this.capacidadMaxima,
      ocupados: this.reservas.length,
      disponibles: this.lugaresDisponibles(),
      lleno: this.estaLleno(),
    };
  }
}

module.exports = Turno;
