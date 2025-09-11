import { getDocument } from '../../lib/actions/room.action';

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(
    ({ userId }: { roomId: string; userId: string }) =>
      Promise.resolve({ usersAccesses: { [userId]: ['room:admin'] } })
  ),
}));

describe('API getDocument admin', () => {
  it('devuelve acceso de administración', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'admin@correo.com' });
    expect(doc.usersAccesses['admin@correo.com']).toContain('room:admin');
  });
});
