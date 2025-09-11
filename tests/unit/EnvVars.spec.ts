describe('Variables de entorno QA/CI', () => {
  it('NODE_ENV debe ser development', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  it('TEST_ENV debe estar activa', () => {
    expect(process.env.TEST_ENV).toBe('true');
  });

  it('COVERAGE debe estar activa', () => {
    expect(process.env.COVERAGE).toBe('true');
  });

  it('CI debe estar activa', () => {
    expect(process.env.CI).toBe('true');
  });

  it('GIT_PIPELINE debe estar activa', () => {
    expect(process.env.GIT_PIPELINE).toBe('true');
  });
});
