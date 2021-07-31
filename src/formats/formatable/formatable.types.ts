import { Block } from '../../blocks/blocks.types';
import { Formatter } from '../formatters.types';

export type MenuPosition = {
  leftOffset: number;
  topOffset: number;
};

export type SelectionInfo = {
  endIndex: number;
  endOffset: number;
  startIndex: number;
  startOffset: number;
};

export type FormatableProps = {
  formatters: Formatter[];
  value: Block;
  onChange(): any;
};
