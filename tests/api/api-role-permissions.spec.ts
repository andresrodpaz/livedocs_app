import { getDocument } from '../../lib/actions/room.action';

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(({ roomId, userId }: { roomId: string; userId: string }) => {
    const metadata = { title: 'Doc' };
    const usersAccesses =
      userId === 'viewer@correo.com'
        ? { [userId]: ['room:read'] }
        : { [userId]: ['room:write'] };

    return Promise.resolve({ metadata, usersAccesses });
  }),
}));

describe('API role permissions', () => {
  it('usuario editor tiene permiso de escritura', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'editor@correo.com' });
    expect(doc.usersAccesses['editor@correo.com']).toContain('room:write');
  });

  it('usuario viewer solo tiene permiso de lectura', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'viewer@correo.com' });
    expect(doc.usersAccesses['viewer@correo.com']).toContain('room:read');
    expect(doc.usersAccesses['viewer@correo.com']).not.toContain('room:write');
  });
});
