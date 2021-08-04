import { Block, BlockProps } from '../blocks.types';

export type ParagraphChild = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

export type Direction = 'rtl' | 'ltr';

export type TextAlign = 'left' | 'center' | 'right';

export interface ParagraphBlock extends Block<'paragraph', ParagraphChild> {
  direction?: Direction;
  textAlign?: TextAlign;
}

export interface ParagraphProps
  extends BlockProps<'paragraph', ParagraphChild> {
  value: ParagraphBlock;
}

export type SettingKeys = 'direction' | 'textAlign';

export type SettingsValues = Direction | TextAlign;
