import React from 'react';
import { mount } from '@cypress/react';
import { FormatableBlock } from '../../formatters.types';
import Bold from './bold.component';
import { editorApply } from './bold.utils';

describe('Bold Formatter', () => {
  let block: FormatableBlock;

  beforeEach(() => {
    block = {
      type: 'some type',
      children: [
        {
          text: 'Hello there, my name',
          italic: true,
        },
        {
          text: "Amir Mohseni Moghadam. I'm so happy to",
        },
        {
          text: 'be here with you testing this component',
        },
      ],
    };
  });

  it('should render a button with an icon', () => {
    mount(<Bold value={block} onChange={() => {}} />);
    cy.get('button').should('be.visible');
    cy.get('svg').should('be.visible');
  });

  it('should apply bold format on click and call the callback with it', () => {
    const expectedBlock: FormatableBlock = {
      ...block,
      children: [
        {
          text: 'Hello there, my name',
          italic: true,
        },
        {
          text: 'Amir Mohseni Moghadam',
          bold: true,
        },
        {
          text: ". I'm so happy to",
        },
        {
          text: 'be here with you testing this component',
        },
      ],
    };
    const callback = cy.stub();
    mount(
      <Bold
        value={block}
        onChange={callback}
        selectionInfo={{
          startIndex: 1,
          startOffset: 0,
          endIndex: 1,
          endOffset: 21,
        }}
      />
    );
    cy.get('button')
      .click()
      .then(() => {
        expect(callback).to.be.calledWith(expectedBlock);
      });
  });

  it('should detect active state', () => {
    block.children[1].bold = true;
    const selection = {
      startIndex: 1,
      startOffset: 0,
      endIndex: 1,
      endOffset: 8,
    };
    mount(<Bold value={block} onChange={() => {}} selectionInfo={selection} />);
    cy.get('button').should('have.class', 'amidetor__button--active');
  });

  it('should detect active state across nodes', () => {
    block.children[1].bold = true;
    block.children[0].bold = true;
    const selection = {
      startIndex: 0,
      startOffset: 0,
      endIndex: 1,
      endOffset: 5,
    };
    mount(<Bold value={block} onChange={() => {}} selectionInfo={selection} />);
    cy.get('button').should('have.class', 'amidetor__button--active');
  });

  it('should not set active state', () => {
    const selection = {
      startIndex: 0,
      startOffset: 0,
      endIndex: 1,
      endOffset: 5,
    };
    mount(<Bold value={block} onChange={() => {}} selectionInfo={selection} />);
    cy.get('button').should('not.have.class', 'amidetor__button--active');
  });

  it('should delete format', () => {
    block.children[2].bold = true;
    const selection = {
      startIndex: 2,
      startOffset: 3,
      endIndex: 2,
      endOffset: 7,
    };
    const stub = cy.stub();
    mount(<Bold value={block} onChange={stub} selectionInfo={selection} />);
    cy.get('button')
      .should('have.class', 'amidetor__button--active')
      .click()
      .then(() => {
        expect(stub).to.be.calledWith({
          ...block,
          children: [
            block.children[0],
            block.children[1],
            {
              text: 'be ',
              bold: true,
            },
            {
              text: 'here',
            },
            {
              text: ' with you testing this component',
              bold: true,
            },
          ],
        } as FormatableBlock);
      });
  });
});

describe('editorApply Function', () => {
  it('should return correct style string', () => {
    const node = {
      text: 'Hello',
      bold: true,
    };
    const styles = editorApply(node, '');
    expect(styles).to.be.equal('font-weight: 700;');

    const styles2 = editorApply(node, 'something; ');
    expect(styles2).to.be.equal('something; font-weight: 700;');

    node.bold = false;
    const styles3 = editorApply(node, 'something; ');
    expect(styles3).to.be.equal('something; ');
  });
});
