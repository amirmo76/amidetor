export type Block = {
  readonly type: string;
  children: object[];
};

export type EditorProps = {
  defaultValue?: Block[];
};
