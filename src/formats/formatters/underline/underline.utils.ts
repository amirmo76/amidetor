import { EditorApplyFunction } from '../../formatters.types';

export const editorApply: EditorApplyFunction = (node, style) =>
  node.underline ? style + 'text-decoration: underline;' : style;
