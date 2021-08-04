import { Block } from '../blocks/blocks.types';
import { OnChangeFunction } from '../editor/editor.types';

export type SelectionInfo = {
  endIndex: number;
  endOffset: number;
  startIndex: number;
  startOffset: number;
};

export interface FormatableChild {
  text: string;
  [key: string]: any;
}

export type FormatableBlock = Block<any, FormatableChild>;

export interface FormatterProps {
  value: Block<any, FormatableChild>;
  onChange: OnChangeFunction<any, FormatableChild>;
  selectionInfo?: SelectionInfo | null;
}

export interface Formatter {
  Component(props: FormatterProps): JSX.Element;
  KEY: string;
}
