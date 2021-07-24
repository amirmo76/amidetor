export type Child = {
  text: string;
};

export type Data = {
  readonly type: 'paragraph';
  children: Child[];
  rtl?: boolean;
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
