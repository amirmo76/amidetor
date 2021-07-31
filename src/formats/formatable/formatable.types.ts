import { Block } from '../../blocks/blocks.types';
import { Formatter } from '../formatters.types';

export type MenuPosition = {
  leftOffset: number;
  topOffset: number;
};

export type FormatableProps = {
  formatters: Formatter[];
  value: Block;
  onChange(): any;
};
