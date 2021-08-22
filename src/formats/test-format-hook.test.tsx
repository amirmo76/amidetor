import React from 'react';
import { mount } from '@cypress/react';
import { FormatableBlock, SelectionInfo } from './formatters.types';
import { useTestFormat } from './formatters.utils';

describe('testFormat Hook', () => {
  it('should detect active format correctly', () => {
    const block: FormatableBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'some text',
        },
        {
          text: 'hello',
          someKey: true,
        },
        {
          text: 'my name',
          someKey: true,
        },
        {
          text: 'is Amir!',
          someKey: true,
        },
      ],
    };
    const selectionInfo: SelectionInfo = {
      startIndex: 1,
      endIndex: 3,
      startOffset: 2,
      endOffset: 3,
    };
    function TestComponent() {
      const active = useTestFormat(
        block,
        (val) => !!val['someKey'],
        selectionInfo
      );

      return active ? <p>yes</p> : <p>no</p>;
    }
    mount(<TestComponent />);
    cy.contains('yes');
  });

  it('should not detect active on empty children', () => {
    const block: FormatableBlock = {
      type: 'paragraph',
      children: [],
    };
    const selectionInfo: SelectionInfo = {
      startIndex: 1,
      endIndex: 3,
      startOffset: 2,
      endOffset: 3,
    };
    function TestComponent() {
      const active = useTestFormat(
        block,
        (val) => !!val['someKey'],
        selectionInfo
      );

      return active ? <p>yes</p> : <p>no</p>;
    }
    mount(<TestComponent />);
    cy.contains('no');
  });
});
