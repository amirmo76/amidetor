import { Block } from '../../blocks/blocks.types';
import { OnChangeFunction } from '../../editor/editor.types';
import { Formatter } from '../formatters.types';

export type MenuPosition = {
  leftOffset: number;
  topOffset: number;
};

export type FormatableProps = {
  formatters: Formatter[];
  value: Block;
  onChange: OnChangeFunction;
};
