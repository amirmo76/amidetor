import { Block } from '../blocks/blocks.types';

export type EditorProps = {
  defaultValue?: Block[];
};

export type OnChangeFunction = (data: Block) => void;
