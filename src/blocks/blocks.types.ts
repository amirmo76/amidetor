export interface Child {
  text?: string;
}

export interface Block {
  readonly type: string;
  children: Child[];
}
