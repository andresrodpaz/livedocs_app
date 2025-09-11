import { cn } from '../../lib/utils';

describe('Utilidad cn falsy', () => {
  it('ignora valores falsy correctamente', () => {
    expect(cn('', null, undefined, false, 0, 'a')).toBe('a');
  });
});