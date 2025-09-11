import { getDocument } from '../../lib/actions/room.action';

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(() =>
    Promise.resolve({
      metadata: { title: '', createdAt: null, updatedAt: undefined } as const,
      usersAccesses: {} as Record<string, string[]>,
    })
  ),
}));

describe('API getDocument metadata edge', () => {
  it('devuelve metadatos edge', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'user@correo.com' });
    expect(doc.metadata.title).toBe('');
    expect(doc.metadata.createdAt).toBeNull();
    expect(doc.metadata.updatedAt).toBeUndefined();
    expect(doc.usersAccesses).toEqual({});
  });
});
