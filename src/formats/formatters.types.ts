import { Block } from '../blocks/blocks.types';

export interface FormatterProps {
  value: Block;
  onChange(): any;
}

export interface Formatter {
  Component(props: FormatterProps): JSX.Element;
}
