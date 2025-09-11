import { cn } from '../../lib/utils';

describe('Utilidad cn', () => {
  it('concatena clases correctamente', () => {
    expect(cn('a', 'b', undefined, false, 'c')).toBe('a b c');
  });

  it('devuelve cadena vacía si no hay argumentos', () => {
    expect(cn()).toBe('');
  });

  it('ignora valores falsy', () => {
    expect(cn('', null, undefined, false, 0, 'a')).toBe('a');
  });

  it('no permite inyección de clases peligrosas', () => {
    expect(cn('<script>', 'javascript:')).toBe('');
  });
});
