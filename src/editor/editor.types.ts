import { Block, BlockProps } from '../blocks/blocks.types';

export type EditorBlock = Block<string, any>;

export type EditorRegisteredBlock = {
  TYPE: string;
  Component: (props: BlockProps<any, any>) => JSX.Element;
  getEmptyBlock: () => EditorBlock;
  Icon: () => JSX.Element;
  title: string;
};

export type EditorProps = {
  value: EditorBlock[];
  onChange: (value: EditorBlock[]) => any;
  blocks: EditorRegisteredBlock[];
};

export type OnChangeFunction<Type, Child> = (data: Block<Type, Child>) => void;
