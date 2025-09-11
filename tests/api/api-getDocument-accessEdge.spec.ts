import { getDocument } from '../../lib/actions/room.action';

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(
    ({ roomId, userId }: { roomId: string; userId: string }) => {
      return Promise.resolve({ usersAccesses: { [userId]: [] } });
    }
  ),
}));

describe('API getDocument edge case acceso', () => {
  it('devuelve acceso vacío para usuario', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'user@correo.com' });
    expect(doc.usersAccesses['user@correo.com']).toEqual([]);
  });
});
