/// <reference types="cypress" />
import { updateSelectionInfo } from './formatters.utils';
import { FormatableBlock, SelectionInfo } from './formatters.types';

describe('updateSelectionInfo', () => {
  describe('when end index equals start index', () => {
    let prevBlock: FormatableBlock;
    beforeEach(() => {
      prevBlock = {
        type: 'some block',
        children: [
          {
            text: 'Amir mohseni moghadam',
          },
        ],
      };
    });

    it('should update correctly when the child is selected with no offset', () => {
      const selectionInfo: SelectionInfo = {
        startIndex: 0,
        startOffset: 0,
        endIndex: 0,
        endOffset: prevBlock.children[0].text.length,
      };
      const newBlock: FormatableBlock = {
        type: 'some block',
        children: [
          {
            text: 'Amir mohseni moghadam',
            bold: true,
          },
        ],
      };
      const updatedSelectionInfo = updateSelectionInfo(newBlock, selectionInfo);
      expect(updatedSelectionInfo).to.deep.equal(selectionInfo);
    });

    it('should update correctly when the child is selected with start offset', () => {
      const selectionInfo: SelectionInfo = {
        startIndex: 0,
        startOffset: 5,
        endIndex: 0,
        endOffset: prevBlock.children[0].text.length,
      };
      const newBlock: FormatableBlock = {
        type: 'some block',
        children: [
          {
            text: 'Amir ',
          },
          {
            text: 'mohseni moghadam',
            bold: true,
          },
        ],
      };
      const updatedSelectionInfo = updateSelectionInfo(newBlock, selectionInfo);
      const expectedSelectionInfo: SelectionInfo = {
        startIndex: 1,
        startOffset: 0,
        endIndex: 1,
        endOffset: newBlock.children[1].text.length,
      };
      expect(updatedSelectionInfo).to.deep.equal(expectedSelectionInfo);
    });

    it('should update correctly when the child is selected with end offset', () => {
      const selectionInfo: SelectionInfo = {
        startIndex: 0,
        startOffset: 0,
        endIndex: 0,
        endOffset: 4,
      };
      const newBlock: FormatableBlock = {
        type: 'some block',
        children: [
          {
            text: 'Amir',
            bold: true,
          },
          {
            text: ' mohseni moghadam',
          },
        ],
      };
      const updatedSelectionInfo = updateSelectionInfo(newBlock, selectionInfo);
      const expectedSelectionInfo: SelectionInfo = {
        startIndex: 0,
        startOffset: 0,
        endIndex: 0,
        endOffset: 4,
      };
      expect(updatedSelectionInfo).to.deep.equal(expectedSelectionInfo);
    });

    it('should update correctly when the child is selected with end and start offset', () => {
      const selectionInfo: SelectionInfo = {
        startIndex: 0,
        startOffset: 5,
        endIndex: 0,
        endOffset: 12,
      };
      const newBlock: FormatableBlock = {
        type: 'some block',
        children: [
          {
            text: 'Amir ',
          },
          {
            text: 'mohseni',
            bold: true,
          },
          {
            text: ' moghadam',
          },
        ],
      };
      const updatedSelectionInfo = updateSelectionInfo(newBlock, selectionInfo);
      const expectedSelectionInfo: SelectionInfo = {
        startIndex: 1,
        startOffset: 0,
        endIndex: 1,
        endOffset: newBlock.children[1].text.length,
      };
      expect(updatedSelectionInfo).to.deep.equal(expectedSelectionInfo);
    });
  });

  describe('when end index does not equals start index', () => {
    let prevBlock: FormatableBlock;
    beforeEach(() => {
      prevBlock = {
        type: 'some block',
        children: [
          {
            text: 'Amir mohseni moghadam',
          },
          {
            text: ' lorem ipsum ',
          },
          {
            text: 'Hello World!',
          },
        ],
      };
    });

    it('should update correctly when the children is selected with no offset', () => {
      const selectionInfo: SelectionInfo = {
        startIndex: 0,
        startOffset: 0,
        endIndex: 2,
        endOffset: prevBlock.children[2].text.length,
      };
      const newBlock: FormatableBlock = {
        type: 'some block',
        children: [
          {
            text: 'Amir mohseni moghadam',
            bold: true,
          },
          {
            text: ' lorem ipsum ',
            bold: true,
          },
          {
            text: 'Hello World!',
            bold: true,
          },
        ],
      };
      const updatedSelectionInfo = updateSelectionInfo(newBlock, selectionInfo);
      expect(updatedSelectionInfo).to.deep.equal(selectionInfo);
    });

    it('should update correctly when the children are selected with an start offset', () => {
      const selectionInfo: SelectionInfo = {
        startIndex: 0,
        startOffset: 5,
        endIndex: 2,
        endOffset: prevBlock.children[0].text.length,
      };
      const newBlock: FormatableBlock = {
        type: 'some block',
        children: [
          {
            text: 'Amir ',
          },
          {
            text: 'mohseni moghadam',
            bold: true,
          },
          {
            text: ' lorem ipsum ',
            bold: true,
          },
          {
            text: 'Hello World!',
            bold: true,
          },
        ],
      };
      const updatedSelectionInfo = updateSelectionInfo(newBlock, selectionInfo);
      const expectedSelectionInfo: SelectionInfo = {
        startIndex: 1,
        startOffset: 0,
        endIndex: 3,
        endOffset: newBlock.children[3].text.length,
      };
      expect(updatedSelectionInfo).to.deep.equal(expectedSelectionInfo);
    });

    it('should update correctly when the children are selected with an end offset', () => {
      const selectionInfo: SelectionInfo = {
        startIndex: 0,
        startOffset: 0,
        endIndex: 2,
        endOffset: 4,
      };
      const newBlock: FormatableBlock = {
        type: 'some block',
        children: [
          {
            text: 'Amir mohseni moghadam',
            bold: true,
          },
          {
            text: ' lorem ipsum ',
            bold: true,
          },
          {
            text: 'Hell',
            bold: true,
          },
          {
            text: 'o World!',
          },
        ],
      };
      const updatedSelectionInfo = updateSelectionInfo(newBlock, selectionInfo);
      const expectedSelectionInfo: SelectionInfo = {
        startIndex: 0,
        startOffset: 0,
        endIndex: 2,
        endOffset: 4,
      };
      expect(updatedSelectionInfo).to.deep.equal(expectedSelectionInfo);
    });

    it('should update correctly when the children are selected with an end and start offset', () => {
      const selectionInfo: SelectionInfo = {
        startIndex: 0,
        startOffset: 5,
        endIndex: 2,
        endOffset: 4,
      };
      const newBlock: FormatableBlock = {
        type: 'some block',
        children: [
          {
            text: 'Amir ',
          },
          {
            text: 'mohseni moghadam',
            bold: true,
          },
          {
            text: ' lorem ipsum ',
            bold: true,
          },
          {
            text: 'Hell',
            bold: true,
          },
          {
            text: 'o World!',
          },
        ],
      };
      const updatedSelectionInfo = updateSelectionInfo(newBlock, selectionInfo);
      const expectedSelectionInfo: SelectionInfo = {
        startIndex: 1,
        startOffset: 0,
        endIndex: 3,
        endOffset: newBlock.children[3].text.length,
      };
      expect(updatedSelectionInfo).to.deep.equal(expectedSelectionInfo);
    });
  });
});
