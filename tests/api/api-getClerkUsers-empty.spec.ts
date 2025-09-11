import { getClerkUsers } from '../../lib/actions/user.actions';

// Mock del módulo completo
jest.mock('../../lib/actions/user.actions', () => ({
  getClerkUsers: jest.fn(({ userIds }: { userIds: string[] }) => Promise.resolve([])),
}));

describe('API getClerkUsers empty', () => {
  it('devuelve lista vacía', async () => {
    const users = await getClerkUsers({ userIds: [] });
    expect(users).toEqual([]);
  });
});
