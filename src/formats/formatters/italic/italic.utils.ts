import { EditorApplyFunction } from '../../formatters.types';

export const editorApply: EditorApplyFunction = (node, style) =>
  node.italic ? style + 'font-style: italic;' : style;
