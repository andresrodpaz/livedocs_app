import { getDocument } from '../../lib/actions/room.action';

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(() =>
    Promise.resolve({
      usersAccesses: { 'user@correo.com': ['room:write'] },
    } as { metadata?: any; usersAccesses: Record<string, string[]> })
  ),
}));

describe('API getDocument sin metadatos', () => {
  it('devuelve objeto sin metadata', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'user@correo.com' });
    expect(doc.metadata).toBeUndefined();
    expect(doc.usersAccesses['user@correo.com']).toContain('room:write');
  });
});
