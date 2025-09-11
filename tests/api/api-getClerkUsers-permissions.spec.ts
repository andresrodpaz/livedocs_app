import { getClerkUsers } from '../../lib/actions/user.actions';

jest.mock('../../lib/actions/user.actions', () => ({
  getClerkUsers: jest.fn(({ userIds }: { userIds: string[] }) =>
    Promise.resolve(
      userIds.map(id => ({
        email: id,
        name: `Usuario ${id}`,
        userType: id === 'viewer@correo.com' ? 'viewer' : 'editor',
      }))
    )
  ),
}));

describe('API getClerkUsers permissions', () => {
  it('devuelve tipo de usuario correctamente', async () => {
    const users = await getClerkUsers({ userIds: ['editor@correo.com', 'viewer@correo.com'] });
    expect(users[0].userType).toBe('editor');
    expect(users[1].userType).toBe('viewer');
  });
});
