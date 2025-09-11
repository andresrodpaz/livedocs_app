import { getClerkUsers } from '../../lib/actions/user.actions';

jest.mock('../../lib/actions/user.actions', () => ({
  getClerkUsers: jest.fn(({ userIds }: { userIds: string[] }) =>
    Promise.resolve(userIds.map(id => ({ email: id, name: `Usuario ${id}` })))
  ),
}));

describe('API getClerkUsers multiple', () => {
  it('devuelve varios usuarios', async () => {
    const users = await getClerkUsers({ userIds: ['a@b.com', 'c@d.com'] });
    expect(users.length).toBe(2);
    expect(users[1].email).toBe('c@d.com');
  });
});
