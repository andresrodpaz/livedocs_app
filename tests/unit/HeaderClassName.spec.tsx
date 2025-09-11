import React from 'react';
import { render } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header className', () => {
  it('aplica className adicional correctamente', () => {
    const { container } = render(<Header className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});