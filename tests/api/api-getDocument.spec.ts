import { getDocument } from '../../lib/actions/room.action';

interface Document {
  metadata?: { title?: string };
  usersAccesses: Record<string, string[]>;
}

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(
    ({ roomId }: { roomId: string }): Promise<Document | null> => {
      if (roomId === 'notfound') return Promise.resolve(null);
      if (roomId === 'abc') return Promise.resolve({ metadata: { title: 'Documento de prueba' }, usersAccesses: {} });
      return Promise.resolve({ metadata: {}, usersAccesses: {} });
    }
  ),
}));

describe('API getDocument', () => {
  it('devuelve el documento si existe', async () => {
    const doc = await getDocument({ roomId: 'abc', userId: 'user@correo.com' });
    expect(doc).not.toBeNull();
    expect(doc).toHaveProperty('metadata');
    expect(doc?.metadata?.title).toBe('Documento de prueba');
  });

  it('devuelve null si el documento no existe', async () => {
    const doc = await getDocument({ roomId: 'notfound', userId: 'user@correo.com' });
    expect(doc).toBeNull();
  });

  it('devuelve el documento correctamente', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'user@correo.com' });
    expect(doc).toHaveProperty('metadata');
    expect(doc).toHaveProperty('usersAccesses');
  });
});
