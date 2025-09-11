import React from 'react';
import { render } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header props', () => {
  it('acepta y aplica className adicional', () => {
    const { container } = render(<Header className="extra-class">Test</Header>);
    expect(container.firstChild).toHaveClass('header');
    expect(container.firstChild).toHaveClass('extra-class');
  });
});
