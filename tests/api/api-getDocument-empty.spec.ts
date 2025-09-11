import { getDocument } from '../../lib/actions/room.action';

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(
    ({ roomId, userId }: { roomId: string; userId: string }) =>
      Promise.resolve({ metadata: {}, usersAccesses: {} })
  ),
}));

describe('API getDocument empty', () => {
  it('devuelve objeto vacío', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'user@correo.com' });
    expect(doc.metadata).toEqual({});
    expect(doc.usersAccesses).toEqual({});
  });
});
