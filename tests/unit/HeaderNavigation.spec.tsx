import React from 'react';
import { render } from '@testing-library/react';
import Header from '../../components/Header';

jest.mock('next/link', () => {
  const MockLink = ({ children }: { children: React.ReactNode }) => <a>{children}</a>;
  MockLink.displayName = 'NextLink';
  return MockLink;
});


describe('Header navegación', () => {
  it('incluye el enlace a la raíz', () => {
    const { container } = render(<Header>Contenido</Header>);
    expect(container.querySelector('a')).toBeInTheDocument();
  });
});
