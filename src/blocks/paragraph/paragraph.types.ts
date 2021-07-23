export type Child = {
  text: string;
};

export type Data = {
  readonly type: 'paragraph';
  children: Array<Child>;
  rtl?: boolean;
  textAlign?: 'left' | 'center' | 'right';
};

export interface onChangeFunc {
  (data: Data): void;
}

export type ParagraphProps = {
  defaultValue?: Data;
  onChange: onChangeFunc;
};
