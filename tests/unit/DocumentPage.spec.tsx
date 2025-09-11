import React from 'react';
import Document from '../../app/(root)/documents/[id]/page';

jest.mock('@clerk/nextjs/server', () => ({
  currentUser: jest.fn(() => Promise.resolve({ emailAddresses: [{ emailAddress: 'test@correo.com' }] })),
}));
jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(() => Promise.resolve({ metadata: {}, usersAccesses: { 'test@correo.com': ['room:write'] } })),
}));
jest.mock('../../lib/actions/user.actions', () => ({
  getClerkUsers: jest.fn(() => Promise.resolve([{ email: 'test@correo.com' }])),
}));
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('Document page', () => {
  it('renderiza CollaborativeRoom si el usuario y el documento existen', async () => {
    // Solo se verifica que no arroja error al renderizar
    await Document({ params: { id: '123' }, searchParams: {} });
  });
});
