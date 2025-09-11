import { cn } from '../../lib/utils';

describe('Utilidad cn vacío', () => {
  it('devuelve cadena vacía si no hay argumentos', () => {
    expect(cn()).toBe('');
  });
});