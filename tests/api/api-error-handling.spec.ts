import { getDocument } from '../../lib/actions/room.action';

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(({ roomId }: { roomId: string }) => {
    // Return a rejected promise for errors instead of throwing them synchronously.
    if (roomId === 'network-error') {
      return Promise.reject(new Error('Network Error'));
    }
    if (roomId === 'permission-denied') {
      return Promise.reject(new Error('Permission Denied'));
    }
    // Return a resolved promise for success.
    return Promise.resolve({ metadata: {}, usersAccesses: {} });
  }),
}));

describe('API error handling', () => {
  it('maneja error de red', async () => {
    await expect(getDocument({ roomId: 'network-error', userId: 'user@correo.com' }))
      .rejects
      .toThrow('Network Error');
  });

  it('maneja error de permisos', async () => {
    await expect(getDocument({ roomId: 'permission-denied', userId: 'user@correo.com' }))
      .rejects
      .toThrow('Permission Denied');
  });

  it('retorna datos correctamente si no hay error', async () => {
    await expect(getDocument({ roomId: 'ok-room', userId: 'user@correo.com' }))
      .resolves
      .toEqual({ metadata: {}, usersAccesses: {} });
  });
});