import { renderHook } from '@testing-library/react-hooks';
import { useActiveBlock } from '../../components/editor/plugins/ToolbarPlugin';

jest.mock('@lexical/react/LexicalComposerContext', () => ({
  useLexicalComposerContext: () => [{
    registerUpdateListener: jest.fn(() => () => {}),
    getEditorState: jest.fn(() => ({
      read: (cb: any) => cb(),
    })),
  }],
}));

describe('useActiveBlock tipo de bloque', () => {
  it('retorna el tipo de bloque si corresponde', () => {
    // ...existing code...
    // Simula selección de tipo de bloque
    // ...existing code...
  });
});