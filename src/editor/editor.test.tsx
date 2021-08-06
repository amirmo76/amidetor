import React from 'react';
import { mount } from '@cypress/react';
import Paragraph, { getEmptyBlock, Icons, TYPE } from '../blocks/paragraph';
import Editor from './editor.component';
import { EditorProps } from './editor.types';
import { BlockProps } from '../blocks/blocks.types';

const CustomBlockComponent = ({ value }: BlockProps<string, any>) => {
  return <div>{value.children[0].text}</div>;
};

describe('Custom Components', () => {
  let props: EditorProps;

  beforeEach(() => {
    props = {
      defaultValue: [
        {
          type: 'test-block',
          children: [
            {
              text: 'Hello test block!',
            },
          ],
        },
      ],
      blocks: [
        {
          TYPE: TYPE,
          title: 'paragraph',
          Icon: Icons.ParagraphIcon,
          getEmptyBlock,
          Component: Paragraph,
        },
        {
          TYPE: 'test-block',
          title: 'test block',
          getEmptyBlock: () => ({
            type: 'test-block',
            children: [{ text: 'some value' }],
          }),
          Icon: Icons.LtrIcon,
          Component: CustomBlockComponent,
        },
      ],
    };
  });

  it('should add the custom blocks to the add new block dropdown', () => {
    mount(<Editor {...props} />);
    cy.get(
      ':nth-child(1) > .amidetor__actions > [aria-label="add a new block"]'
    )
      .click()
      .then(() => {
        cy.contains('test block');
      });
  });

  it(' should detect to make use of the custom block from the data', () => {
    mount(<Editor {...props} />);
    cy.contains('Hello test block!');
  });
});
