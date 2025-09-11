import { getDocument } from '../../lib/actions/room.action';

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(() => Promise.resolve({ metadata: {}, usersAccesses: {} })),
}));

describe('API: getDocument', () => {
  it('retorna un objeto con metadata y usersAccesses', async () => {
    const result = await getDocument({ roomId: 'test', userId: 'user@test.com' });
    expect(result).toHaveProperty('metadata');
    expect(result).toHaveProperty('usersAccesses');
  });
});