import Underline, { KEY } from './underline.component';
import { Formatter } from '../../formatters.types';
import { editorApply } from './underline.utils';

const formatter: Formatter = {
  Component: Underline,
  KEY,
  editorApply,
};

export default formatter;
