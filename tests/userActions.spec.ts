import { getClerkUsers } from '../lib/actions/user.actions';

jest.mock('../lib/actions/user.actions', () => ({
  getClerkUsers: jest.fn(({ userIds }: { userIds: string[] }) => {
    return Promise.resolve(
      userIds.map((id: string) => ({
        email: id,
        name: `Usuario ${id}`,
      }))
    );
  }),
}));

describe('Acciones de usuario', () => {
  it('devuelve los usuarios por sus IDs', async () => {
    const users = await getClerkUsers({ userIds: ['a@b.com', 'c@d.com'] });

    expect(users.length).toBe(2);
    expect(users[0]).toHaveProperty('email', 'a@b.com');
    expect(users[1]).toHaveProperty('name', 'Usuario c@d.com');
  });
});
