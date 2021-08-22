import React, { useState } from 'react';
import { getEmptyBlock, Icons, TYPE, Paragraph } from '../blocks/paragraph';
import Editor from './editor.component';
import { EditorBlock } from './editor.types';

export default {
  title: 'Editor',
};

// export const primary = () => <Editor />;

export const withParagraphBlock = () => {
  const [data, setData] = useState<EditorBlock[]>([
    {
      type: 'paragraph',
      children: [
        {
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
          text:
            ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor. Id faucibus nisl tincidunt eget. Elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Amet purus gravida quis blandit turpis cursus in. Dolor magna eget est lorem. Diam in arcu cursus euismod quis viverra nibh cras. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Ornare arcu odio ut sem nulla pharetra diam sit amet. Duis at tellus at urna condimentum mattis pellentesque. Euismod nisi porta lorem mollis aliquam. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur.',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
          text:
            ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque eu ultrices vitae auctor. Id faucibus nisl tincidunt eget. Elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Amet purus gravida quis blandit turpis cursus in. Dolor magna eget est lorem. Diam in arcu cursus euismod quis viverra nibh cras. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Ornare arcu odio ut sem nulla pharetra diam sit amet. Duis at tellus at urna condimentum mattis pellentesque. Euismod nisi porta lorem mollis aliquam. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur.',
        },
      ],
    },
  ]);
  return (
    <Editor
      blocks={[
        {
          TYPE: TYPE,
          getEmptyBlock: getEmptyBlock,
          Component: Paragraph,
          title: 'paragraph',
          Icon: Icons.ParagraphIcon,
        },
      ]}
      value={data}
      onChange={(value) => {
        setData(value);
        console.log(value);
      }}
    />
  );
};

export const WithNoDefaultValue = () => {
  const [data, setData] = useState<EditorBlock[]>([]);
  return (
    <Editor
      blocks={[
        {
          TYPE: TYPE,
          getEmptyBlock: getEmptyBlock,
          Component: Paragraph,
          title: 'paragraph',
          Icon: Icons.ParagraphIcon,
        },
      ]}
      value={data}
      onChange={(value) => setData(value)}
    />
  );
};
