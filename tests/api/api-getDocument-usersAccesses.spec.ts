import { getDocument } from '../../lib/actions/room.action';

interface Document {
  metadata: Record<string, unknown>;
  usersAccesses: Record<string, string[]>;
}

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(
    ({ roomId, userId }: { roomId: string; userId: string }): Promise<Document> =>
      Promise.resolve({
        metadata: {},
        usersAccesses: { [userId]: ['room:write'], 'viewer@correo.com': ['room:read'] },
      })
  ),
}));

describe('API getDocument usersAccesses', () => {
  it('devuelve los accesos de usuarios correctamente', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'editor@correo.com' });
    expect(doc.usersAccesses['editor@correo.com']).toContain('room:write');
    expect(doc.usersAccesses['viewer@correo.com']).toContain('room:read');
  });
});
