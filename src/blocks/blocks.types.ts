export interface Block<Type, Child> {
  readonly type: Type;
  children: Child[];
}

export interface BlockProps<Type, Child> {
  value: Block<Type, Child>;
  onChange: (newData: Block<Type, Child>) => void;
  className: string;
}
