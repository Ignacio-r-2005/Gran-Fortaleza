const Socio = require('../modelo/Socio');
const { SocioVIP, SocioConDescuento } = require('../patrones/Decorator');

//  Tests de Socio (lógica de negocio pura, sin BD) 

describe('Socio - validarRegistro', () => {

  test('debe permitir registrar un socio con datos válidos', () => {
    expect(Socio.validarRegistro('Juan Pérez', 'juan@email.com')).toBe(true);
  });

  test('debe lanzar error si el nombre está vacío', () => {
    expect(() => Socio.validarRegistro('', 'juan@email.com'))
      .toThrow('El nombre del socio es obligatorio');
  });

  test('debe lanzar error si el nombre es solo espacios', () => {
    expect(() => Socio.validarRegistro('   ', 'juan@email.com'))
      .toThrow('El nombre del socio es obligatorio');
  });

  test('debe lanzar error si el email no tiene @', () => {
    expect(() => Socio.validarRegistro('Juan', 'juanemail.com'))
      .toThrow('El email del socio no es válido');
  });

  test('debe lanzar error si el email está vacío', () => {
    expect(() => Socio.validarRegistro('Juan', ''))
      .toThrow('El email del socio no es válido');
  });

});

// Tests del Decorator 

describe('SocioVIP', () => {

  test('debe agregar funcionalidad VIP al socio', () => {
    const socioBase = new Socio(1, 'Ana', 'ana@email.com', '1234');
    const socioVip  = new SocioVIP(socioBase);
    expect(socioVip.getFuncionalidades()).toContain('VIP: prioridad 48h');
  });

  test('debe mantener los datos originales del socio', () => {
    const socioBase = new Socio(2, 'Luis', 'luis@email.com', '5678');
    const socioVip  = new SocioVIP(socioBase);
    expect(socioVip.nombre).toBe('Luis');
    expect(socioVip.email).toBe('luis@email.com');
  });

  test('debe devolver 48 horas de prioridad por defecto', () => {
    const socioBase = new Socio(3, 'María', 'maria@email.com', null);
    const socioVip  = new SocioVIP(socioBase);
    expect(socioVip.horasDePrioridad()).toBe(48);
  });

});

describe('SocioConDescuento', () => {

  test('debe calcular el precio con descuento correctamente', () => {
    const socioBase     = new Socio(4, 'Carlos', 'carlos@email.com', null);
    const socioDescuento = new SocioConDescuento(socioBase, 10);
    expect(socioDescuento.calcularCuota(1000)).toBe(900);
  });

  test('debe lanzar error si la cuota base es 0 o negativa', () => {
    const socioBase     = new Socio(5, 'Rosa', 'rosa@email.com', null);
    const socioDescuento = new SocioConDescuento(socioBase, 20);
    expect(() => socioDescuento.calcularCuota(0))
      .toThrow('La cuota base debe ser mayor a 0');
  });

  test('debe acumular funcionalidades con SocioVIP', () => {
    const socioBase     = new Socio(6, 'Pedro', 'pedro@email.com', null);
    const socioVip      = new SocioVIP(socioBase);
    const socioCompleto = new SocioConDescuento(socioVip, 15);
    const funcs         = socioCompleto.getFuncionalidades();
    expect(funcs).toContain('VIP: prioridad 48h');
    expect(funcs).toContain('Descuento: 15%');
  });

});