import { Block } from '../blocks/blocks.types';
import { OnChangeFunction } from '../editor/editor.types';

export type SelectionInfo = {
  endIndex: number;
  endOffset: number;
  startIndex: number;
  startOffset: number;
};

export interface FormatterProps {
  value: Block;
  onChange: OnChangeFunction;
  selectionInfo?: SelectionInfo | null;
}

export interface Formatter {
  Component(props: FormatterProps): JSX.Element;
  KEY: string;
}
