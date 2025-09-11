import React from 'react';
import { render } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header logos', () => {
  it('renderiza ambos logos correctamente', () => {
    const { getByAltText } = render(<Header>{null}</Header>);
    expect(getByAltText('Logo with name')).toBeInTheDocument();
    expect(getByAltText('Logo')).toBeInTheDocument();
  });
});
