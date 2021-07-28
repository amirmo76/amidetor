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

export interface onChangeFunc {
  (data: Data): void;
}

export type ParagraphProps = {
  value: Data;
  onChange: onChangeFunc;
  className?: string;
};

export type SettingKeys = 'direction' | 'textAlign';

export type SettingsValues = Direction | TextAlign;
