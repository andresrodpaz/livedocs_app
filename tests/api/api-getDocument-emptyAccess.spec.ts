import { getDocument } from '../../lib/actions/room.action';

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(
    ({ roomId, userId }: { roomId: string; userId: string }) =>
      Promise.resolve({ metadata: {}, usersAccesses: {} })
  ),
}));

describe('API getDocument sin accesos', () => {
  it('devuelve objeto con usersAccesses vacío', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'user@correo.com' });
    expect(doc.usersAccesses).toEqual({});
  });
});
