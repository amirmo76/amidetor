import { OnChangeFunction } from '../../editor/editor.types';
import {
  FormatableBlock,
  FormatableChild,
  Formatter,
} from '../formatters.types';

export type MenuPosition = {
  leftOffset: number;
  topOffset: number;
};

export type FormatableProps = {
  formatters: Formatter[];
  value: FormatableBlock;
  onChange: OnChangeFunction<any, FormatableChild>;
};
