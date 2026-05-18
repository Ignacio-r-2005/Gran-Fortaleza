 // ✅ CASO ÉXITO: lugares disponibles se actualizan
  test('debe actualizar los lugares disponibles al reservar', () => {
    const turno = new Turno(1, 'Lunes', '10:00', 5);
    turno.reservar('socio-001');
    turno.reservar('socio-002');
    expect(turno.lugaresDisponibles()).toBe(3);
  });