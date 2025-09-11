import React from 'react';
import Document from '../../app/(root)/documents/[id]/page';

jest.mock('@clerk/nextjs/server', () => ({
  currentUser: jest.fn(() =>
    Promise.resolve({ emailAddresses: [{ emailAddress: 'test@correo.com' }] })
  ),
}));
jest.mock('../../lib/actions/room.action', () => ({
  getDocument: jest.fn(() =>
    Promise.resolve({
      metadata: { title: 'Doc' },
      usersAccesses: { 'test@correo.com': ['room:write'] },
    })
  ),
}));
jest.mock('../../lib/actions/user.actions', () => ({
  getClerkUsers: jest.fn(() =>
    Promise.resolve([{ email: 'test@correo.com', name: 'Test User' }])
  ),
}));
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('Document integración', () => {
  it('flujo completo de renderizado y acceso', async () => {
    await Document({
      params: { id: '123' },
      searchParams: {}, // 👈 agregado para cumplir con SearchParamProps
    });
  });
});
