export interface Child {
  text?: string;
  [key: string]: any;
}

export interface Block {
  readonly type: string;
  children: Child[];
}
