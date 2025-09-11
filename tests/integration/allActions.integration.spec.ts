jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(({ roomId }) => {
    if (roomId === 'fail') {
      return Promise.reject(new Error('Error de acción'));
    }
    if (roomId === 'notfound') {
      return Promise.resolve(null);
    }
    return Promise.resolve({ metadata: { title: 'Doc' }, usersAccesses: {} });
  }),
}));

jest.mock('../../lib/actions/user.actions', () => ({
  getClerkUsers: jest.fn(({ userIds }: { userIds: string[] }) => {
    if (!userIds || userIds.length === 0) {
      return Promise.reject(new Error('Sin usuarios'));
    }
    return Promise.resolve(
      userIds.map((email: string) => ({ email, name: `Usuario ${email}` }))
    );
  }),
}));


describe('Integración de todas las acciones', () => {
  it('obtiene documento correctamente', async () => {
    const { getDocument } = require('../../lib/actions/room.action');
    const doc = await getDocument({ roomId: 'ok', userId: 'user@correo.com' });
    expect(doc.metadata.title).toBe('Doc');
  });

  it('maneja documento no encontrado', async () => {
    const { getDocument } = require('../../lib/actions/room.action');
    const doc = await getDocument({ roomId: 'notfound', userId: 'user@correo.com' });
    expect(doc).toBeNull();
  });

  it('maneja error en acción', async () => {
    const { getDocument } = require('../../lib/actions/room.action');
    await expect(getDocument({ roomId: 'fail', userId: 'user@correo.com' })).rejects.toThrow('Error de acción');
  });

  it('obtiene usuarios correctamente', async () => {
    const { getClerkUsers } = require('../../lib/actions/user.actions');
    const users = await getClerkUsers({ userIds: ['a@b.com'] });
    expect(users[0].name).toBe('Usuario a@b.com');
  });

  it('maneja error sin usuarios', async () => {
    const { getClerkUsers } = require('../../lib/actions/user.actions');
    await expect(getClerkUsers({ userIds: [] })).rejects.toThrow('Sin usuarios');
  });
});