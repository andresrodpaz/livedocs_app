import { getClerkUsers } from '../../lib/actions/user.actions';

jest.mock('../../lib/actions/user.actions', () => ({
  getClerkUsers: jest.fn(({ userIds }: { userIds: string[] }) =>
    Promise.resolve(
      userIds.map(id => ({
        email: id,
        name: `Usuario ${id}`,
      }))
    )
  ),
}));

describe('API getClerkUsers single', () => {
  it('devuelve un usuario', async () => {
    const users = await getClerkUsers({ userIds: ['a@b.com'] });
    expect(users.length).toBe(1);
    expect(users[0].email).toBe('a@b.com');
  });
});
