export type Block = {
  readonly type: string;
  children: Array<object>;
};

export type EditorProps = {
  defaultValue?: Array<Block>;
};
