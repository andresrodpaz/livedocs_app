jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(() => Promise.reject(new Error('Network Error'))),
}));

describe('Integración fallos de red', () => {
  it('maneja error de red al obtener documento', async () => {
    const { getDocument } = require('../../lib/actions/room.action');
    await expect(getDocument({ roomId: 'room1', userId: 'user@correo.com' }))
      .rejects.toThrow('Network Error');
  });
});