import { getDocument } from '../../lib/actions/room.action';

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(
    ({ roomId, userId }: { roomId: string; userId: string }) =>
      Promise.resolve({ usersAccesses: { [userId]: ['room:write'] } })
  ),
}));

describe('API getDocument access', () => {
  it('devuelve acceso de usuario', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'editor@correo.com' });
    expect(doc.usersAccesses['editor@correo.com']).toContain('room:write');
  });
});
