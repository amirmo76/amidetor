import { OnChangeFunction } from '../../editor/editor.types';

export type Child = {
  text: string;
};

export type Direction = 'rtl' | 'ltr';

export type TextAlign = 'left' | 'center' | 'right';

export type Data = {
  readonly type: 'paragraph';
  children: Child[];
  direction?: Direction;
  textAlign?: TextAlign;
};

export type ParagraphProps = {
  value: Data;
  onChange: OnChangeFunction;
  className?: string;
};

export type SettingKeys = 'direction' | 'textAlign';

export type SettingsValues = Direction | TextAlign;
