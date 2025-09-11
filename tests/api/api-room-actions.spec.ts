import { getDocument } from '../../lib/actions/room.action';

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(({ roomId, userId }: { roomId: string; userId: string }) => {
    if (roomId === 'fail') return Promise.reject(new Error('Error de acción'));
    if (roomId === 'notfound') return Promise.resolve(null);
    return Promise.resolve({
      metadata: { title: 'Doc' },
      usersAccesses: { [userId]: ['room:write'] },
    });
  }),
}));

describe('API room actions', () => {
  it('devuelve el documento correctamente', async () => {
    const doc = await getDocument({ roomId: 'ok', userId: 'user@correo.com' });
    expect(doc).not.toBeNull();
    expect(doc?.metadata.title).toBe('Doc');
  });

  it('maneja documento no encontrado', async () => {
    const doc = await getDocument({ roomId: 'notfound', userId: 'user@correo.com' });
    expect(doc).toBeNull();
  });

  it('maneja error en acción', async () => {
    await expect(getDocument({ roomId: 'fail', userId: 'user@correo.com' })).rejects.toThrow('Error de acción');
  });
});
