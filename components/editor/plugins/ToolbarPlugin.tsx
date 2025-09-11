/**
 * ToolbarPlugin component provides a toolbar for text formatting and block type toggling
 * in a Lexical editor. It includes buttons for undo, redo, text formatting (bold, italic,
 * underline, strikethrough), text alignment (left, center, right, justify), font size
 * adjustment, font family selection, and color pickers for text and background colors.
 *
 * @returns {JSX.Element} The rendered toolbar component.
 *
 * @component
 * @example
 * return (
 *   <ToolbarPlugin />
 * )
 *
 * @function
 * @name ToolbarPlugin
 */

/**
 * Divider component renders a visual divider in the toolbar.
 *
 * @returns {JSX.Element} The rendered divider component.
 *
 * @component
 * @example
 * return (
 *   <Divider />
 * )
 *
 * @function
 * @name Divider
 */

/**
 * useActiveBlock hook returns the currently active block type in the Lexical editor.
 *
 * @returns {string | null} The type of the active block or null if no block is active.
 *
 * @hook
 * @example
 * const activeBlock = useActiveBlock();
 *
 * @function
 * @name useActiveBlock
 */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $createParagraphNode,
  $isRootOrShadowRoot,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $findMatchingParent } from '@lexical/utils';
import React from 'react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

import { $isTextNode } from 'lexical';
import './styles.css';
const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}

const colors = [
  '#000000', '#7F7F7F', '#FFFFFF', '#FF0000', '#FF9900', '#FFFF00', '#00FF00', 
  '#00FFFF', '#0000FF', '#9900FF', '#FF00FF', '#FF6666', '#FFCC99', '#FFFF99',
  '#99FF99', '#99FFFF', '#9999FF', '#CC99FF', '#FF99FF', '#CC6666', '#FFCC66',
  '#FFFF66', '#66FF66', '#66FFFF', '#6666FF', '#9966FF', '#FF66FF', '#B22222',
  '#8B4513', '#FFD700', '#2E8B57', '#4682B4', '#4169E1', '#8A2BE2', '#D2691E',
  '#CD5C5C', '#FF6347', '#FF4500', '#FFD700', '#32CD32', '#00FA9A', '#87CEFA',
  '#4682B4', '#DA70D6', '#EE82EE', '#FF00FF', '#9932CC'
];

/**
 * ToolbarPlugin is a React component that provides a toolbar for text formatting
 * and editing within a Lexical editor. It includes buttons for undo, redo, 
 * text formatting (bold, italic, underline, strikethrough), text alignment 
 * (left, center, right, justify), heading levels (h1, h2, h3, h4, h5), 
 * font size adjustment, and color pickers for text and background colors.
 *
 * @returns {JSX.Element} The rendered toolbar component.
 *
 * @component
 * @example
 * // Usage example:
 * import ToolbarPlugin from './ToolbarPlugin';
 * 
 * function MyEditor() {
 *   return (
 *     <div>
 *       <ToolbarPlugin />
 *        Other editor components 
 *     </div>
 *   );
 * }
 *
 * @remarks
 * This component uses Lexical's editor context and commands to interact with 
 * the editor state. It also maintains internal state for various formatting 
 * options and updates the toolbar based on the current selection in the editor.
 */
export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [fontSize, setFontSize] = useState(16); // Tamaño de fuente por defecto
  const [textColor, setTextColor] = useState("#000000"); // Color de texto por defecto
  const [bgColor, setBgColor] = useState("#FFFFFF"); // Color de fondo por defecto
  const activeBlock = useActiveBlock();

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, $updateToolbar]);

  function toggleBlock(type: 'h1' | 'h2' | 'h3'| 'h4' | 'h5' | 'quote') {
    const selection = $getSelection();

    if (activeBlock === type) {
      return $setBlocksType(selection, () => $createParagraphNode());
    }

    if (type === 'h1') {
      return $setBlocksType(selection, () => $createHeadingNode('h1'));
    }

    if (type === 'h2') {
      return $setBlocksType(selection, () => $createHeadingNode('h2'));
    }

    if (type === 'h3') {
      return $setBlocksType(selection, () => $createHeadingNode('h3'));
    }
    if (type === 'h4') {
      return $setBlocksType(selection, () => $createHeadingNode('h4'));
    }
    if (type === 'h5') {
      return $setBlocksType(selection, () => $createHeadingNode('h5'));
    }

    if (type === 'quote') {
      return $setBlocksType(selection, () => $createQuoteNode());
    }
  }

  function changeFontSize(increase: boolean) {
    setFontSize((size) => {
      const newSize = increase ? size + 1 : size - 1;

      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          selection.getNodes().forEach((node) => {
            if ($isTextNode(node)) {
              node.setStyle(`font-size: ${newSize}px`);
            }
          });
        }
      });

      return newSize;
    });
  }

  function applyTextColor(color: string) {
    setTextColor(color);

    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.getNodes().forEach((node) => {
          if ($isTextNode(node)) {
            node.setStyle(`color: ${color}`);
          }
        });
      }
    });
  }

  function applyBgColor(color: string) {
    setBgColor(color);

    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.getNodes().forEach((node) => {
          if ($isTextNode(node)) {
            node.setStyle(`background-color: ${color}`);
          }
        });
      }
    });
  }

  function applyFontFamily(fontFamily: string) {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.getNodes().forEach((node) => {
          if ($isTextNode(node)) {
            node.setStyle(`font-family: ${fontFamily}`);
          }
        });
      }
    });
  }

  return (
    <div className="toolbar" ref={toolbarRef}>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <i className="format undo" />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo"
      >
        <i className="format redo" />
      </button>
      <Divider />
      <button
        onClick={() => editor.update(() => toggleBlock('h1'))}
        data-active={activeBlock === 'h1' ? '' : undefined}
        className={
          'toolbar-item spaced ' + (activeBlock === 'h1' ? 'active' : '')
        }
      >
        <i className="format h1" />
      </button>
      <button
        onClick={() => editor.update(() => toggleBlock('h2'))}
        data-active={activeBlock === 'h2' ? '' : undefined}
        className={
          'toolbar-item spaced ' + (activeBlock === 'h2' ? 'active' : '')
        }
      >
        <i className="format h2" />
      </button>
      <button
        onClick={() => editor.update(() => toggleBlock('h3'))}
        data-active={activeBlock === 'h3' ? '' : undefined}
        className={
          'toolbar-item spaced ' + (activeBlock === 'h3' ? 'active' : '')
        }
      >
        <i className="format h3" />
      </button>
      
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
        aria-label="Format Bold"
      >
        <i className="format bold" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
        aria-label="Format Italics"
      >
        <i className="format italic" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
        className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
        aria-label="Format Underline"
      >
        <i className="format underline" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
        className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
        aria-label="Format Strikethrough"
      >
        <i className="format strikethrough" />
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
        className="toolbar-item spaced"
        aria-label="Left Align"
      >
        <i className="format left-align" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
        className="toolbar-item spaced"
        aria-label="Center Align"
      >
        <i className="format center-align" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
        className="toolbar-item spaced"
        aria-label="Right Align"
      >
        <i className="format right-align" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        }}
        className="toolbar-item"
        aria-label="Justify Align"
      >
        <i className="format justify-align" />
      </button>
      <Divider />
      <div className="font-size-controls">
        <button
          onClick={() => changeFontSize(false)}
          className="toolbar-item font-size-button decrease-font"
          aria-label="Decrease Font Size"
        >
          <span>-</span>
        </button>
        <div className="font-size-display">{fontSize}</div>
        <button
          onClick={() => changeFontSize(true)}
          className="toolbar-item font-size-button increase-font"
          aria-label="Increase Font Size"
        >
          <span>+</span>
        </button>
      </div>
      <Divider />
      {/* <select
        onChange={(e) => applyFontFamily(e.target.value)}
        className="toolbar-item font-family-picker"
        aria-label="Font Family"
      >
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
      </select>
      <Divider />
      <input
        type="color"
        value={textColor}
        onChange={(e) => applyTextColor(e.target.value)}
        className="toolbar-item color-picker"
        aria-label="Text Color"
      />
      <input
        type="color"
        value={bgColor}
        onChange={(e) => applyBgColor(e.target.value)}
        className="toolbar-item color-picker"
        aria-label="Background Color"
      /> */}
    </div>
  );
}

function useActiveBlock() {
  const [editor] = useLexicalComposerContext();

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      return editor.registerUpdateListener(onStoreChange);
    },
    [editor],
  );

  const getSnapshot = useCallback(() => {
    return editor.getEditorState().read(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return null;

      const anchor = selection.anchor.getNode();
      let element =
        anchor.getKey() === 'root'
          ? anchor
          : $findMatchingParent(anchor, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchor.getTopLevelElementOrThrow();
      }

      if ($isHeadingNode(element)) {
        return element.getTag();
      }

      return element.getType();
    });
  }, [editor]);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}