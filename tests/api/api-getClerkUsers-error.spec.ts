import { getClerkUsers } from '../../lib/actions/user.actions';

jest.mock('../../lib/actions/user.actions', () => ({
  getClerkUsers: jest.fn(() => Promise.reject(new Error('Error de usuarios'))),
}));

describe('API getClerkUsers error', () => {
  it('lanza error si ocurre un fallo', async () => {
    await expect(getClerkUsers({ userIds: ['a@b.com'] })).rejects.toThrow('Error de usuarios');
  });
});
