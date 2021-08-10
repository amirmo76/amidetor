import { EditorApplyFunction } from '../../formatters.types';

export const editorApply: EditorApplyFunction = (node, style) =>
  node.bold ? style + 'font-weight: 700;' : style;
