import { getClerkUsers } from '../../lib/actions/user.actions';

jest.mock('../../lib/actions/user.actions', () => ({
  getClerkUsers: jest.fn(({ userIds }: { userIds: string[] }) => {
    if (!userIds || userIds.length === 0) return Promise.reject(new Error('Sin usuarios'));
    return Promise.resolve(userIds.map((email: string) => ({ email, name: `Usuario ${email}` })));
  }),
}));

describe('API user actions', () => {
  it('devuelve usuarios correctamente', async () => {
    const users = await getClerkUsers({ userIds: ['a@b.com'] });
    expect(users[0].name).toBe('Usuario a@b.com');
  });

  it('maneja error sin usuarios', async () => {
    await expect(getClerkUsers({ userIds: [] })).rejects.toThrow('Sin usuarios');
  });
});
