/**
 * TESTS UNITARIOS: Singleton.js
 * Verifican que siempre se use la misma instancia
 * y que la base de datos funcione correctamente
 */

const { obtenerBaseDeDatos } = require('../patrones/Singleton');

describe('Singleton - Base de datos', () => {

  // ✅ Lo más importante: siempre devuelve la misma instancia
  test('debe devolver siempre la misma instancia', () => {
    const instancia1 = obtenerBaseDeDatos();
    const instancia2 = obtenerBaseDeDatos();
    expect(instancia1).toBe(instancia2); // mismo objeto en memoria
  });

  // ✅ Los datos son compartidos entre instancias
  test('los cambios en una instancia se ven en la otra', () => {
    const instancia1 = obtenerBaseDeDatos();
    const instancia2 = obtenerBaseDeDatos();

    instancia1.agregarTurno('Sábado', '09:00', 5);
    const turnos = instancia2.obtenerTurnos();

    expect(turnos.some(t => t.dia === 'Sábado')).toBe(true);
  });

  // ✅ Trae los datos iniciales cargados
  test('debe tener clases cargadas al iniciar', () => {
    const db = obtenerBaseDeDatos();
    const clases = db.obtenerClases();
    expect(clases.length).toBeGreaterThan(0);
  });

  // ❌ CASO ERROR: turno inexistente
  test('debe lanzar error si el turno no existe', () => {
    const db = obtenerBaseDeDatos();
    expect(() => db.obtenerTurnoPorId(9999)).toThrow('no encontrado');
  });

  // ❌ CASO ERROR: clase inexistente
  test('debe lanzar error si la clase no existe', () => {
    const db = obtenerBaseDeDatos();
    expect(() => db.obtenerClasePorId(9999)).toThrow('no encontrada');
  });

});
