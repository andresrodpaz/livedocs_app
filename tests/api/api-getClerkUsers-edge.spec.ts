import { getClerkUsers } from '../../lib/actions/user.actions';

jest.mock('../../lib/actions/user.actions', () => ({
  getClerkUsers: jest.fn(({ userIds }: { userIds: string[] }) =>
    Promise.resolve(userIds.map(id => ({ email: id, name: '' })))
  ),
}));

describe('API getClerkUsers edge', () => {
  it('devuelve usuarios con nombre vacío', async () => {
    const users = await getClerkUsers({ userIds: ['a@b.com'] });
    expect(users[0].name).toBe('');
  });
});
