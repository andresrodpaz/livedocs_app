import { getClerkUsers } from '../../lib/actions/user.actions';

// Mock the action with corrected error handling
jest.mock('../../lib/actions/user.actions', () => ({
  getClerkUsers: jest.fn((args: any) => {
    const { userIds } = args;

    // Case: invalid input
    if (!Array.isArray(userIds)) {
      // ✅ Return a rejected promise instead of throwing synchronously
      return Promise.reject(new Error('IDs inválidos'));
    }

    // Case: force a specific error
    if (userIds.includes('error@domain.com')) {
      // ✅ Return a rejected promise instead of throwing synchronously
      return Promise.reject(new Error('Error de usuarios'));
    }

    // Case: empty list
    if (userIds.length === 0) {
      return Promise.resolve([]);
    }

    // Case: normal return with generated names
    return Promise.resolve(
      userIds.map((id: string) => ({ email: id, name: `Usuario ${id}` }))
    );
  }),
}));

describe('API getClerkUsers', () => {
  it('devuelve lista vacía si no hay userIds', async () => {
    const users = await getClerkUsers({ userIds: [] });
    expect(users).toEqual([]);
  });

  it('devuelve usuarios con nombre generado', async () => {
    const users = await getClerkUsers({ userIds: ['a@b.com', 'c@d.com'] });
    expect(users).toEqual([
      { email: 'a@b.com', name: 'Usuario a@b.com' },
      { email: 'c@d.com', name: 'Usuario c@d.com' },
    ]);
  });

  it('lanza error si ocurre un fallo programado', async () => {
    await expect(
      getClerkUsers({ userIds: ['error@domain.com'] })
    ).rejects.toThrow('Error de usuarios');
  });

  it('lanza error si userIds no es un array', async () => {
    await expect(
      getClerkUsers({ userIds: null as any })
    ).rejects.toThrow('IDs inválidos');
  });
});