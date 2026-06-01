// ── Clase base decoradora 
// Envuelve un socio y delega todos sus métodos. Las subclases solo agregan
// o sobreescriben lo que necesitan.

class SocioDecorator {
  constructor(socio) {
    this.socio = socio;
  }

  get id()       { return this.socio.id; }
  get nombre()   { return this.socio.nombre; }
  get email()    { return this.socio.email; }
  get telefono() { return this.socio.telefono; }

  // Devuelve las funcionalidades activas del socio
  getFuncionalidades() {
    return this.socio.getFuncionalidades
      ? this.socio.getFuncionalidades()
      : [];
  }
}

// ── SocioVIP 
// Agrega prioridad en reservas: puede reservar hasta 48 h antes que el resto.

class SocioVIP extends SocioDecorator {
  constructor(socio) {
    super(socio);
    this.prioridad = 48; // horas de ventaja
  }

  getFuncionalidades() {
    return [...super.getFuncionalidades(), `VIP: prioridad ${this.prioridad}h`];
  }

  // Retorna cuántas horas de anticipación puede reservar
  horasDePrioridad() {
    return this.prioridad;
  }
}

// ── SocioConDescuento 
// Agrega un porcentaje de descuento sobre la cuota mensual.

class SocioConDescuento extends SocioDecorator {
  constructor(socio, porcentaje = 10) {
    super(socio);
    this.porcentaje = porcentaje;
  }

  getFuncionalidades() {
    return [...super.getFuncionalidades(), `Descuento: ${this.porcentaje}%`];
  }

  calcularCuota(cuotaBase) {
    if (cuotaBase <= 0) throw new Error('La cuota base debe ser mayor a 0');
    return cuotaBase * (1 - this.porcentaje / 100);
  }
}

module.exports = { SocioDecorator, SocioVIP, SocioConDescuento };