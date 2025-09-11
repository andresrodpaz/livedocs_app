import { getDocument } from '../../lib/actions/room.action';

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(() => Promise.reject(new Error('Error inesperado'))),
}));

describe('API getDocument error', () => {
  it('lanza error si ocurre un fallo', async () => {
    await expect(getDocument({ roomId: 'room1', userId: 'user@correo.com' }))
      .rejects.toThrow('Error inesperado');
  });
});
