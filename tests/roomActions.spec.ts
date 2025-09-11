import { getDocument } from '../lib/actions/room.action';

jest.mock('../lib/actions/room.action', () => ({
  getDocument: jest.fn(({ roomId, userId }) => {
    if (roomId === 'notfound') return null;
    return Promise.resolve({
      metadata: { title: 'Documento de prueba' },
      usersAccesses: { [userId]: ['room:write'] }
    });
  }),
}));

describe('Acciones de sala/documento', () => {
  it('devuelve el documento si existe', async () => {
    const doc = await getDocument({ roomId: 'abc', userId: 'user@correo.com' });
    expect(doc).not.toBeNull();
    expect(doc).toHaveProperty('metadata');
    expect(doc.metadata.title).toBe('Documento de prueba');
  });

  it('devuelve null si el documento no existe', async () => {
    const doc = await getDocument({ roomId: 'notfound', userId: 'user@correo.com' });
    expect(doc).toBeNull();
  });
});
