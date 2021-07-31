import { Block } from '../blocks/blocks.types';

export interface FormatterProps {
  value: Block;
  onChange(): any;
}

export interface Formatter {
  Component(props: FormatterProps): JSX.Element;
}

export type SelectionInfo = {
  endIndex: number;
  endOffset: number;
  startIndex: number;
  startOffset: number;
};
