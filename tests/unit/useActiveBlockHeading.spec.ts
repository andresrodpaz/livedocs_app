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

describe('useActiveBlock heading', () => {
  it('retorna el tipo heading si corresponde', () => {
    // ...existing code...
    // Simula selección de heading
    // ...existing code...
  });
});