import { EditorRegisteredBlock } from '../../editor/editor.types';
import Paragraph, { getEmptyBlock } from './paragraph.component';
import * as Types from './paragraph.types';
import * as Icons from './paragraph.icons';

const TYPE = 'paragraph';
const block: EditorRegisteredBlock = {
  TYPE,
  Component: Paragraph,
  Icon: Icons.ParagraphIcon,
  title: 'paragraph',
  getEmptyBlock,
};

export { Types, TYPE, block, Paragraph, getEmptyBlock, Icons };
