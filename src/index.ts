import Editor from './editor/editor.component';

import * as blockTypes from './blocks/blocks.types';
import * as Paragraph from './blocks/paragraph';

import * as utils from './formats/formatters.utils';
import * as formattersTypes from './formats/formatters.types';
import Formatable from './formats/formatable';
import Bold from './formats/formatters/bold';
import Italic from './formats/formatters/italic';
import Underline from './formats/formatters/underline';

import Button from './button/button.component';

const Blocks = {
  types: blockTypes,
  Paragraph,
};

const Formats = {
  types: formattersTypes,
  Formatable,
  utils,
  Bold,
  Italic,
  Underline,
};

export { Editor, Blocks, Formats, Button };
