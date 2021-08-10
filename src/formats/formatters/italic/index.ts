import Italic, { KEY } from './italic.component';
import { Formatter } from '../../formatters.types';
import { editorApply } from './italic.utils';

const formatter: Formatter = {
  Component: Italic,
  KEY,
  editorApply,
};

export default formatter;
