import { Block, BlockProps } from '../blocks/blocks.types';

export type EditorBlock = Block<string, any>;

export type EditorRegisteredBlock = {
  TYPE: string;
  Component: (props: BlockProps<any, any>) => JSX.Element;
  getEmptyBlock: () => EditorBlock;
};

export type EditorProps = {
  defaultValue?: EditorBlock[];
  blocks: EditorRegisteredBlock[];
};

export type OnChangeFunction<Type, Child> = (data: Block<Type, Child>) => void;
