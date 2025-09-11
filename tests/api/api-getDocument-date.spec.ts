import { getDocument } from '../../lib/actions/room.action';

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(
    ({ roomId, userId }: { roomId: string; userId: string }) =>
      Promise.resolve({
        metadata: { createdAt: '2024-06-01', updatedAt: '2024-06-02' },
        usersAccesses: {},
      })
  ),
}));

describe('API getDocument date', () => {
  it('devuelve fechas correctas', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'user@correo.com' });
    expect(doc.metadata.createdAt).toBe('2024-06-01');
    expect(doc.metadata.updatedAt).toBe('2024-06-02');
  });
});
