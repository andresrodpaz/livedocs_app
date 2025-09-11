import React from 'react';
import { render } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header integración children', () => {
  it('renderiza correctamente los children', () => {
    const { getByText } = render(<Header><span>Child test</span></Header>);
    expect(getByText('Child test')).toBeInTheDocument();
  });
});
