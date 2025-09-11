import { getDocument } from '../../lib/actions/room.action';

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(
    (_args: { roomId: string; userId: string }) =>
      Promise.resolve({
        usersAccesses: {
          'editor@correo.com': ['room:write'],
          'viewer@correo.com': ['room:read'],
          'admin@correo.com': ['room:admin'],
        },
      })
  ),
}));

describe('API getDocument access multiple', () => {
  it('devuelve accesos para todos los usuarios', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'editor@correo.com' });
    expect(doc.usersAccesses['editor@correo.com']).toContain('room:write');
    expect(doc.usersAccesses['viewer@correo.com']).toContain('room:read');
    expect(doc.usersAccesses['admin@correo.com']).toContain('room:admin');
  });
});
