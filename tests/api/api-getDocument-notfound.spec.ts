import { getDocument } from '../../lib/actions/room.action';

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(({ roomId }) =>
    roomId === 'notfound'
      ? Promise.resolve(null)
      : Promise.resolve({ metadata: {}, usersAccesses: {} } as { metadata: any; usersAccesses: Record<string, string[]> })
  ),
}));

describe('API getDocument notfound', () => {
  it('devuelve null si no existe', async () => {
    const doc = await getDocument({ roomId: 'notfound', userId: 'user@correo.com' });
    expect(doc).toBeNull();
  });
});
