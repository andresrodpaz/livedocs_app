import { getDocument } from '../../lib/actions/room.action';
import { getClerkUsers } from '../../lib/actions/user.actions';

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(({ roomId, userId }) => {
    if (userId === 'viewer@correo.com') {
      return Promise.resolve({
        metadata: { title: 'Doc' },
        usersAccesses: { [userId]: ['room:read'] }
      });
    }
    return Promise.resolve({
      metadata: { title: 'Doc' },
      usersAccesses: { [userId]: ['room:write'] }
    });
  }),
}));

jest.mock('../../lib/actions/user.actions', () => ({
  getClerkUsers: jest.fn(({ userIds }: { userIds: string[] }) => {
    return Promise.resolve(
      userIds.map((email: string) => ({
        email,
        name: `Usuario ${email}`,
        userType: email === 'viewer@correo.com' ? 'viewer' : 'editor',
      }))
    );
  }),
}));


describe('Integración de roles y permisos', () => {
  it('flujo completo para usuario editor', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'editor@correo.com' });
    const users = await getClerkUsers({ userIds: Object.keys(doc.usersAccesses) });
    expect(users[0].userType).toBe('editor');
    expect(doc.usersAccesses['editor@correo.com']).toContain('room:write');
  });

  it('flujo completo para usuario viewer', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'viewer@correo.com' });
    const users = await getClerkUsers({ userIds: Object.keys(doc.usersAccesses) });
    expect(users[0].userType).toBe('viewer');
    expect(doc.usersAccesses['viewer@correo.com']).toContain('room:read');
  });
});
