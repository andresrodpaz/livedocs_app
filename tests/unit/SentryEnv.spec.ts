describe('SENTRY_AUTH_TOKEN env', () => {
  it('debe estar definida y no ser vacía', () => {
    expect(process.env.SENTRY_AUTH_TOKEN).toBeDefined();
    expect(process.env.SENTRY_AUTH_TOKEN).not.toBe('');
  });

  it('no debe contener espacios ni caracteres inseguros', () => {
    expect(process.env.SENTRY_AUTH_TOKEN).not.toMatch(/\s/);
    expect(process.env.SENTRY_AUTH_TOKEN).not.toMatch(/[<>]/);
  });
});
