import React from 'react';
import Editor from './editor.component';

export default {
  title: 'Editor',
};

export const primary = () => <Editor />;

export const withDefaultValue = () => (
  <Editor
    defaultValue={[
      {
        type: 'paragraph',
        children: [{ text: 'hello' }],
      },
    ]}
  />
);
