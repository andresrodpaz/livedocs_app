import React from 'react';
import { render } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header', () => {
  it('renderiza el logo y los children', () => {
    const { getByAltText, getByText } = render(
      <Header>
        <span>Contenido extra</span>
      </Header>
    );
    expect(getByAltText('Logo with name')).toBeInTheDocument();
    expect(getByAltText('Logo')).toBeInTheDocument();
    expect(getByText('Contenido extra')).toBeInTheDocument();
  });

  it('aplica className adicional correctamente', () => {
    const { container } = render(<Header className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renderiza correctamente sin children', () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toHaveClass('header');
  });
});
