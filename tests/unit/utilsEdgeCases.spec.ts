import { cn } from '../../lib/utils';

describe('Utilidad cn edge cases', () => {
  it('devuelve cadena vacía si no hay argumentos', () => {
    expect(cn()).toBe('');
  });

  it('ignora valores falsy', () => {
    expect(cn('', null, undefined, false, 0, 'a')).toBe('a');
  });
});
