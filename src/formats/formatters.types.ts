import { Block } from '../blocks/blocks.types';

export type SelectionInfo = {
  endIndex: number;
  endOffset: number;
  startIndex: number;
  startOffset: number;
};

export interface FormatterProps {
  value: Block;
  onChange(block: Block): any;
  selectionInfo?: SelectionInfo | null;
}

export interface Formatter {
  Component(props: FormatterProps): JSX.Element;
  KEY: string;
}
