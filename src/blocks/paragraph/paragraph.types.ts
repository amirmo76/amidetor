export type Child = {
  text: string;
};

export type Data = {
  readonly type: 'paragraph';
  children: Child[];
  direction?: 'rtl' | 'ltr';
  textAlign?: 'left' | 'center' | 'right';
};

export interface onChangeFunc {
  (data: Data): void;
}

export type ParagraphProps = {
  value: Data;
  onChange: onChangeFunc;
  className?: string;
};
