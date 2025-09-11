import React from 'react';
import { render } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header error scenarios', () => {
  it('renderiza sin children ni className', () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toHaveClass('header');
  });

  it('renderiza correctamente si className es undefined', () => {
    const { container } = render(<Header className={undefined}>Test</Header>);
    expect(container.firstChild).toHaveClass('header');
  });
});
