import React from 'react';
import { Meta } from '@storybook/react';
import Paragraph from './paragraph.component';
import { ParagraphProps } from './paragraph.types';

export default {
  title: 'Blocks/Paragraph',
  component: Paragraph,
} as Meta;

const props: ParagraphProps = {
  value: {
    type: 'paragraph',
    children: [
      {
        text: 'Hello, This is a ',
      },
      {
        text: 'test',
      },
      {
        text: '. My name is Amir',
      },
      {
        text: ' by the way!',
      },
    ],
  },
  onChange: () => {},
};

export const Primary = () => <Paragraph {...props} />;
