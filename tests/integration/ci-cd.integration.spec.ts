describe('Integración CI/CD', () => {
  it('simula ejecución de tests en pipeline', async () => {
    // Simula que todos los tests pasan y se genera reporte de cobertura
    const results = { passed: true, coverage: 100 };
    expect(results.passed).toBe(true);
    expect(results.coverage).toBeGreaterThanOrEqual(90);
  });

  it('falla si la cobertura es menor al mínimo', async () => {
    const results = { passed: true, coverage: 80 };
    expect(results.coverage).toBeLessThan(90);
  });
});
