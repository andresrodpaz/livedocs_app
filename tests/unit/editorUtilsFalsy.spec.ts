import { $isTextNode } from 'lexical';

describe('Editor utils falsy', () => {
  it('retorna false para valores falsy', () => {
    expect($isTextNode(null)).toBe(false);
    expect($isTextNode(undefined)).toBe(false);
  });
});