import { getDocument } from '../../lib/actions/room.action';
import { getClerkUsers } from '../../lib/actions/user.actions';

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(() => Promise.resolve({
    metadata: { title: 'Doc Integración' },
    usersAccesses: { 'user@correo.com': ['room:write'] }
  })),
}));

jest.mock('../../lib/actions/user.actions', () => ({
  getClerkUsers: jest.fn(() => Promise.resolve([
    { email: 'user@correo.com', name: 'Usuario Integración' }
  ])),
}));

describe('API integración', () => {
  it('flujo completo de obtención de documento y usuarios', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'user@correo.com' });
    expect(doc.metadata.title).toBe('Doc Integración');
    const users = await getClerkUsers({ userIds: Object.keys(doc.usersAccesses) });
    expect(users[0].name).toBe('Usuario Integración');
  });
});
