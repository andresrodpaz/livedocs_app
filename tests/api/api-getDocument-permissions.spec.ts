import { getDocument } from '../../lib/actions/room.action';

interface DocumentAccess {
  usersAccesses: Record<string, string[]>;
}

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(({ userId }: { userId: string }) => {
    if (userId === 'editor@correo.com') {
      return Promise.resolve({ usersAccesses: { [userId]: ['room:write'] } } as DocumentAccess);
    }
    if (userId === 'viewer@correo.com') {
      return Promise.resolve({ usersAccesses: { [userId]: ['room:read'] } } as DocumentAccess);
    }
    return Promise.resolve({ usersAccesses: {} } as DocumentAccess);
  }),
}));

describe('API getDocument permisos', () => {
  it('usuario editor tiene permiso de escritura', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'editor@correo.com' });
    expect(doc.usersAccesses['editor@correo.com']).toContain('room:write');
  });

  it('usuario viewer solo tiene permiso de lectura', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'viewer@correo.com' });
    expect(doc.usersAccesses['viewer@correo.com']).toContain('room:read');
  });
});
