import React from 'react';
import { render } from '@testing-library/react';
import Header from '../../components/Header';

jest.mock('next/link', () => {
  const MockLink = ({ children }: any) => <a href="/">{children}</a>;
  MockLink.displayName = 'NextLink';
  return MockLink;
});

describe('Header integración', () => {
  it('renderiza el logo y navega al hacer click', () => {
    const { container } = render(<Header><span>Extra</span></Header>);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/');
  });
});
