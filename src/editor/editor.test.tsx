import React from 'react';
import { render } from '@testing-library/react';

import Editor from './editor.component';
import { EditorProps } from './editor.types';

describe('Editor Component', () => {
  let props: EditorProps;

  beforeEach(() => {
    props = {
      defaultValue: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'hello',
            },
          ],
        },
      ],
    };
  });

  const renderComponent = () => render(<Editor {...props} />);

  it('should have the right className', () => {
    const { getByTestId } = renderComponent();

    const editorComponent = getByTestId('amidetor');

    expect(editorComponent).toHaveClass('amidetor');
  });
});
