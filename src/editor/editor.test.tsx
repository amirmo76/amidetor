import React, { useState } from 'react';
import { mount } from '@cypress/react';
import * as Stories from './editor.stories';
import { getEmptyBlock, Icons, TYPE, Paragraph } from '../blocks/paragraph';
import Editor from './editor.component';
import { EditorProps } from './editor.types';
import { BlockProps } from '../blocks/blocks.types';

const CustomBlockComponent = ({ value }: BlockProps<string, any>) => {
  return <div>{value.children[0].text}</div>;
};

describe('Custom Components', () => {
  const Parent = () => {
    const [data, setData] = useState([
      {
        type: 'test-block',
        children: [
          {
            text: 'Hello test block!',
          },
        ],
      },
    ]);
    return (
      <Editor
        value={data}
        onChange={(val) => setData(val)}
        blocks={[
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
        ]}
      />
    );
  };

  it('should add the custom blocks to the add new block dropdown', () => {
    mount(<Parent />);
    cy.get(
      ':nth-child(1) > .amidetor__actions > [aria-label="add a new block"]'
    )
      .click()
      .then(() => {
        cy.contains('test block');
      });
  });

  it(' should detect to make use of the custom block from the data', () => {
    mount(<Parent />);
    cy.contains('Hello test block!');
  });

  it('should display new block at the bottom', () => {
    mount(<Stories.withParagraphBlock />);
    cy.contains('NEW BLOCK');
  });

  it('should add a new block of the first given block type pn clicking new block button', () => {
    mount(<Stories.WithNoDefaultValue />);
    cy.contains('NEW BLOCK')
      .click()
      .then(() => cy.get('p').should('be.visible'));
  });
});
