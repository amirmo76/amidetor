import React from 'react';
import { mount } from '@cypress/react';
import { FormatterProps, SelectionInfo } from '../../formatters.types';
import Italic from './italic.component';
import { Block } from '../../../blocks/blocks.types';

describe('Italic Formatter', () => {
  let props: FormatterProps;

  beforeEach(() => {
    props = {
      value: {
        type: 'test block',
        children: [
          {
            text: 'This is a test',
            bold: true,
          },
          {
            text: 'block.',
          },
        ],
      },
      onChange: () => {},
    };
  });

  it('should render a button with an svg icon', () => {
    mount(<Italic {...props} />);
    cy.get('button').should('be.visible');
    cy.get('svg').should('be.visible');
  });

  it('should apply italic format', () => {
    const selection: SelectionInfo = {
      startIndex: 0,
      startOffset: 10,
      endIndex: 1,
      endOffset: 5,
    };
    const callback = cy.stub();
    mount(<Italic {...props} selectionInfo={selection} onChange={callback} />);
    cy.get('button')
      .click()
      .then(() => {
        expect(callback).to.be.calledWith({
          type: props.value.type,
          children: [
            {
              text: 'This is a ',
              bold: true,
            },
            {
              text: 'test',
              bold: true,
              italic: true,
            },
            {
              text: 'block',
              italic: true,
            },
            {
              text: '.',
            },
          ],
        } as Block);
      });
  });

  it('should apply with refactoring', () => {
    const value: Block = {
      type: 'some type',
      children: [
        {
          text: 'hello there',
          italic: true,
        },
        {
          text: ', you!',
        },
      ],
    };
    const selection: SelectionInfo = {
      startIndex: 1,
      startOffset: 0,
      endIndex: 1,
      endOffset: 1,
    };
    const callback = cy.stub();
    mount(
      <Italic value={value} selectionInfo={selection} onChange={callback} />
    );
    cy.get('button')
      .click()
      .then(() => {
        expect(callback).to.be.calledWith({
          type: value.type,
          children: [
            {
              text: 'hello there,',
              italic: true,
            },
            {
              text: ' you!',
            },
          ],
        } as Block);
      });
  });

  it('should detect active', () => {
    const selection: SelectionInfo = {
      startIndex: 0,
      startOffset: 0,
      endIndex: 0,
      endOffset: 2,
    };
    props.value.children[0].italic = true;
    mount(<Italic {...props} selectionInfo={selection} />);
    cy.get('button').should('have.class', 'amidetor__button--active');
  });

  it('should delete format', () => {
    const selection: SelectionInfo = {
      startIndex: 0,
      startOffset: 0,
      endIndex: 0,
      endOffset: 2,
    };
    props.value.children[0].italic = true;
    const callback = cy.stub();
    mount(<Italic {...props} selectionInfo={selection} onChange={callback} />);
    cy.get('button')
      .click()
      .then(() => {
        expect(callback).to.be.calledWith({
          type: props.value.type,
          children: [
            {
              text: 'Th',
              bold: true,
            },
            {
              text: 'is is a test',
              bold: true,
              italic: true,
            },
            {
              text: 'block.',
            },
          ],
        } as Block);
      });
  });
});
