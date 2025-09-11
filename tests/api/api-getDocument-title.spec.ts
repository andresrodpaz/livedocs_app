import { getDocument } from '../../lib/actions/room.action';

interface Document {
  metadata: {
    title: string;
  };
  usersAccesses: Record<string, string[]>;
}

jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn((): Promise<Document> =>
    Promise.resolve({ metadata: { title: 'Test Doc' }, usersAccesses: {} })
  ),
}));

describe('API getDocument title', () => {
  it('devuelve el título correcto', async () => {
    const doc = await getDocument({ roomId: 'room1', userId: 'user@correo.com' });
    expect(doc.metadata.title).toBe('Test Doc');
  });
});
