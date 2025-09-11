jest.mock('@clerk/nextjs/server', () => ({
  currentUser: jest.fn(() => Promise.resolve({ emailAddresses: [{ emailAddress: 'mock@correo.com' }] })),
}));

describe('Integración con servicios externos', () => {
  it('obtiene usuario mockeado de Clerk', async () => {
    const { currentUser } = require('@clerk/nextjs/server');
    const user = await currentUser();
    expect(user.emailAddresses[0].emailAddress).toBe('mock@correo.com');
  });

  it('maneja error de servicio externo', async () => {
    const { currentUser } = require('@clerk/nextjs/server');

    // Simula error solo para esta ejecución
    (currentUser as jest.Mock).mockImplementationOnce(() => { throw new Error('Servicio caído'); });

    try {
      await currentUser();
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe('Servicio caído');
      } else {
        throw e; // Si no es un Error, lo relanzamos
      }
    }
  });
});
