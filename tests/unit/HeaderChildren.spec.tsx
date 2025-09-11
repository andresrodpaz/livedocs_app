import React from 'react';
import { render } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header renderiza múltiples children', () => {
  it('renderiza varios elementos hijos correctamente', () => {
    const { getByText } = render(
      <Header>
        <span>Child 1</span>
        <span>Child 2</span>
        <span>Child 3</span>
      </Header>
    );
    expect(getByText('Child 1')).toBeInTheDocument();
    expect(getByText('Child 2')).toBeInTheDocument();
    expect(getByText('Child 3')).toBeInTheDocument();
  });
});