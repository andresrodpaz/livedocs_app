import { $isTextNode } from 'lexical';

describe('Editor utils', () => {
  it('retorna false para falsy inputs', () => {
    // @ts-expect-error: estamos probando input inválido intencionalmente
    expect($isTextNode(null)).toBe(false);
    // @ts-expect-error
    expect($isTextNode(undefined)).toBe(false);
    // @ts-expect-error
    expect($isTextNode({})).toBe(false);
  });
});
