/**
 * TESTS UNITARIOS: Clase.js
 * Cubren casos de éxito y casos de error
 */

const Clase = require('../modelo/Clase');

describe('Clase - Gestión de clases del gimnasio', () => {

  // ✅ CASO ÉXITO: agregar turno
  test('debe agregar un turno correctamente', () => {
    const clase = new Clase(1, 'Yoga', 'Clase de relajación', 60);
    clase.agregarTurno('turno-001');
    expect(clase.turnos.length).toBe(1);
    expect(clase.turnos).toContain('turno-001');
  });

  // ✅ CASO ÉXITO: quitar turno
  test('debe quitar un turno correctamente', () => {
    const clase = new Clase(1, 'Yoga', 'Clase de relajación', 60);
    clase.agregarTurno('turno-001');
    clase.quitarTurno('turno-001');
    expect(clase.turnos.length).toBe(0);
  });

  // ✅ CASO ÉXITO: desactivar clase
  test('debe desactivar la clase correctamente', () => {
    const clase = new Clase(1, 'Spinning', 'Clase de ciclismo', 45);
    clase.desactivar();
    expect(clase.activa).toBe(false);
  });

  // ✅ CASO ÉXITO: activar clase desactivada
  test('debe activar una clase desactivada', () => {
    const clase = new Clase(1, 'Spinning', 'Clase de ciclismo', 45);
    clase.desactivar();
    clase.activar();
    expect(clase.activa).toBe(true);
  });

  // ❌ CASO ERROR: turno duplicado
  test('debe lanzar error si el turno ya está asignado', () => {
    const clase = new Clase(1, 'Yoga', 'Clase de relajación', 60);
    clase.agregarTurno('turno-001');
    expect(() => clase.agregarTurno('turno-001')).toThrow('ya está asignado');
  });

  // ❌ CASO ERROR: quitar turno inexistente
  test('debe lanzar error al quitar un turno no asignado', () => {
    const clase = new Clase(1, 'Yoga', 'Clase de relajación', 60);
    expect(() => clase.quitarTurno('turno-999')).toThrow('no está asignado');
  });

  // ❌ CASO ERROR: desactivar clase ya inactiva
  test('debe lanzar error al desactivar una clase ya inactiva', () => {
    const clase = new Clase(1, 'Yoga', 'Clase de relajación', 60);
    clase.desactivar();
    expect(() => clase.desactivar()).toThrow('ya está desactivada');
  });

});
