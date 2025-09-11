import { getDocument } from '../../lib/actions/room.action';

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(({ roomId }: { roomId: string; userId: string }) =>
    Promise.resolve({
      metadata: { title: 'Doc', createdAt: '2024-06-01', updatedAt: '2024-06-02' } as const,
      usersAccesses: {} as Record<string, string[]>,
    })
  ),
}));

describe('API getDocument metadata', () => {
  it('devuelve metadatos correctos', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'user@correo.com' });
    expect(doc.metadata).toMatchObject({
      title: 'Doc',
      createdAt: '2024-06-01',
      updatedAt: '2024-06-02',
    });
    expect(doc.usersAccesses).toEqual({});
  });
});
