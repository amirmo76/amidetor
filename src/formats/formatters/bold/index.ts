import Bold, { KEY } from './bold.component';
import { Formatter } from '../../formatters.types';
import { editorApply } from './bold.utils';

const formatter: Formatter = {
  Component: Bold,
  KEY,
  editorApply,
};

export default formatter;
