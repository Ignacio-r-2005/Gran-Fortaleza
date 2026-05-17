/**
 * TESTS UNITARIOS: Turno.js
 * Cubren casos de éxito y casos de error (camino feliz y camino triste)
 */

const Turno = require('../modelo/Turno');

describe('Turno - Reservas', () => {

  // ✅ CASO ÉXITO: reserva normal
  test('debe reservar un turno correctamente', () => {
    const turno = new Turno(1, 'Lunes', '10:00', 10);
    turno.reservar('socio-001');
    expect(turno.reservas.length).toBe(1);
    expect(turno.reservas).toContain('socio-001');
  });

  // ✅ CASO ÉXITO: cancelar reserva
  test('debe cancelar una reserva correctamente', () => {
    const turno = new Turno(1, 'Lunes', '10:00', 10);
    turno.reservar('socio-001');
    turno.cancelar('socio-001');
    expect(turno.reservas.length).toBe(0);
  });

  // ✅ CASO ÉXITO: lugares disponibles se actualizan
  test('debe actualizar los lugares disponibles al reservar', () => {
    const turno = new Turno(1, 'Lunes', '10:00', 5);
    turno.reservar('socio-001');
    turno.reservar('socio-002');
    expect(turno.lugaresDisponibles()).toBe(3);
  });

  // ❌ CASO ERROR: turno lleno
  test('debe lanzar error si el turno está lleno', () => {
    const turno = new Turno(1, 'Lunes', '10:00', 1);
    turno.reservar('socio-001');
    expect(() => turno.reservar('socio-002')).toThrow('está lleno');
  });

  // ❌ CASO ERROR: socio ya reservó
  test('debe lanzar error si el socio ya tiene reserva', () => {
    const turno = new Turno(1, 'Lunes', '10:00', 10);
    turno.reservar('socio-001');
    expect(() => turno.reservar('socio-001')).toThrow('ya tiene una reserva');
  });

  // ❌ CASO ERROR: cancelar sin reserva
  test('debe lanzar error al cancelar si el socio no tiene reserva', () => {
    const turno = new Turno(1, 'Lunes', '10:00', 10);
    expect(() => turno.cancelar('socio-999')).toThrow('no tiene reserva');
  });

});
