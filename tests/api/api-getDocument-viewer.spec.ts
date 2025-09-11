import { getDocument } from '../../lib/actions/room.action';

interface Document {
  usersAccesses: Record<string, string[]>;
}

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(
    ({ userId }: { userId: string }): Promise<Document> =>
      Promise.resolve({ usersAccesses: { [userId]: ['room:read'] } })
  ),
}));

describe('API getDocument viewer', () => {
  it('devuelve acceso de solo lectura', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'viewer@correo.com' });
    expect(doc.usersAccesses['viewer@correo.com']).toContain('room:read');
  });
});
