import React from 'react';
import { mount } from '@cypress/react';
import {
  FormatableBlock,
  FormatterProps,
  SelectionInfo,
} from '../../formatters.types';
import Underline from './underline.component';
import { editorApply } from './underline.utils';

describe('Underline Component', () => {
  let props: FormatterProps;

  beforeEach(() => {
    props = {
      value: {
        type: 'test',
        children: [
          {
            text: 'some value',
            bold: true,
          },
          {
            text: 'for the test',
          },
        ],
      },
      onChange: () => {},
    };
  });

  it('should render a button with an svg icon', () => {
    mount(<Underline {...props} />);
    cy.get('button').should('be.visible');
    cy.get('svg').should('be.visible');
  });

  it('should apply underline format', () => {
    const selection: SelectionInfo = {
      startIndex: 0,
      startOffset: 5,
      endIndex: 1,
      endOffset: 3,
    };
    const callback = cy.stub();
    mount(
      <Underline {...props} onChange={callback} selectionInfo={selection} />
    );
    cy.get('button')
      .click()
      .then(() => {
        expect(callback).to.be.calledWith({
          type: props.value.type,
          children: [
            {
              text: 'some ',
              bold: true,
            },
            {
              text: 'value',
              bold: true,
              underline: true,
            },
            {
              text: 'for',
              underline: true,
            },
            {
              text: ' the test',
            },
          ],
        } as FormatableBlock);
      });
  });

  it('should detect active', () => {
    props.value.children[1].underline = true;
    const selection: SelectionInfo = {
      startIndex: 1,
      startOffset: 0,
      endIndex: 1,
      endOffset: 3,
    };
    mount(<Underline {...props} selectionInfo={selection} />);
    cy.get('button').should('have.class', 'amidetor__button--active');
  });

  it('should delete format', () => {
    props.value.children[1].underline = true;
    props.value.children.push({ text: ' third child' });
    const callback = cy.stub();
    mount(
      <Underline
        {...props}
        onChange={callback}
        selectionInfo={{
          startIndex: 1,
          endIndex: 1,
          startOffset: 8,
          endOffset: 12,
        }}
      />
    );
    cy.get('button')
      .click()
      .then(() => {
        expect(callback).to.be.calledWith({
          type: props.value.type,
          children: [
            props.value.children[0],
            {
              text: 'for the ',
              underline: true,
            },
            {
              text: 'test',
            },
            {
              text: ' third child',
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
      underline: true,
    };
    const styles = editorApply(node, '');
    expect(styles).to.be.equal('text-decoration: underline;');

    const styles2 = editorApply(node, 'something; ');
    expect(styles2).to.be.equal('something; text-decoration: underline;');

    node.underline = false;
    const styles3 = editorApply(node, 'something; ');
    expect(styles3).to.be.equal('something; ');
  });
});
