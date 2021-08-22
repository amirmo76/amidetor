/// <reference types="cypress" />
import { FormatableBlock, SelectionInfo } from './formatters.types';
import { updateBlock } from './formatters.utils';

describe('updateBlock Function', () => {
  let initBlock: FormatableBlock;

  beforeEach(() => {
    initBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'Hello world!',
        },
        {
          text: ' ',
        },
        {
          text: 'My name is ',
        },
        {
          text: 'Amir Mohseni',
        },
        {
          text: 'Moghadam',
        },
      ],
    };
  });

  describe('when selection is inside the same node', () => {
    it('should update block correctly when the block has only one child', () => {
      initBlock = {
        type: 'paragraph',
        children: [
          {
            text: 'Hello world! My name is Amir Mohseni Moghadam.',
          },
        ],
      };

      const expectedBlock: FormatableBlock = {
        type: 'paragraph',
        children: [
          {
            text: 'Hello ',
          },
          {
            text: 'world',
            bold: true,
          },
          {
            text: '! My name is Amir Mohseni Moghadam.',
          },
        ],
      };

      const selection: SelectionInfo = {
        startIndex: 0,
        endIndex: 0,
        startOffset: 6,
        endOffset: 11,
      };

      const updatedBlock = updateBlock(initBlock, selection, 'bold', true);
      expect(updatedBlock).to.deep.equal(expectedBlock);
    });

    it('should update block correctly when the block has multiple children', () => {
      const expectedBlock: FormatableBlock = {
        type: 'paragraph',
        children: [
          {
            text: 'Hello world!',
          },
          {
            text: ' ',
          },
          {
            text: 'My ',
          },
          {
            text: 'name',
            bold: true,
          },
          {
            text: ' is ',
          },
          {
            text: 'Amir Mohseni',
          },
          {
            text: 'Moghadam',
          },
        ],
      };

      const selection: SelectionInfo = {
        startIndex: 2,
        endIndex: 2,
        startOffset: 3,
        endOffset: 7,
      };

      const updatedBlock = updateBlock(initBlock, selection, 'bold', true);
      expect(updatedBlock).to.deep.equal(expectedBlock);
    });

    it('should handle an emoty node as the target', () => {
      initBlock.children.push({
        text: '',
      });
      const expectedBlock: FormatableBlock = {
        type: 'paragraph',
        children: [
          {
            text: 'Hello world!',
          },
          {
            text: ' ',
          },
          {
            text: 'My name is ',
          },
          {
            text: 'Amir Mohseni',
          },
          {
            text: 'Moghadam',
          },
          {
            text: '',
          },
        ],
      };

      const selection: SelectionInfo = {
        startIndex: 5,
        endIndex: 5,
        startOffset: 0,
        endOffset: 0,
      };

      const updatedBlock = updateBlock(initBlock, selection, 'bold', true);
      expect(updatedBlock).to.deep.equal(expectedBlock);
    });

    it('should handle entire node selection', () => {
      const expectedBlock: FormatableBlock = {
        type: 'paragraph',
        children: [
          {
            text: 'Hello world!',
            bold: true,
          },
          {
            text: ' ',
          },
          {
            text: 'My name is ',
          },
          {
            text: 'Amir Mohseni',
          },
          {
            text: 'Moghadam',
          },
        ],
      };

      const selection: SelectionInfo = {
        startIndex: 0,
        endIndex: 0,
        startOffset: 0,
        endOffset: 12,
      };

      const updatedBlock = updateBlock(initBlock, selection, 'bold', true);
      expect(updatedBlock).to.deep.equal(expectedBlock);
    });

    it('should handle out of bound selections', () => {
      const expectedBlock = initBlock;

      const selection: SelectionInfo = {
        startIndex: 0,
        endIndex: 0,
        startOffset: 12,
        endOffset: 15,
      };

      const updatedBlock = updateBlock(initBlock, selection, 'bold', true);
      expect(updatedBlock).to.deep.equal(expectedBlock);
    });

    it('should apply multiple formats', () => {
      const expectedBlock = initBlock;
      expectedBlock.children[0].bold = true;
      expectedBlock.children[0].italic = true;

      const selection: SelectionInfo = {
        startIndex: 0,
        endIndex: 0,
        startOffset: 0,
        endOffset: 12,
      };

      let updatedBlock = updateBlock(initBlock, selection, 'bold', true);
      updatedBlock = updateBlock(updatedBlock, selection, 'italic', true);
      expect(updatedBlock).to.deep.equal(expectedBlock);
    });
  });

  describe('when selection is across nodes', () => {
    it('should update the block correctly', () => {
      const expectedBlock: FormatableBlock = {
        type: 'paragraph',
        children: [
          {
            text: 'Hello ',
          },
          {
            text: 'world!',
            bold: true,
          },
          {
            text: ' ',
            bold: true,
          },
          {
            text: 'My name is ',
            bold: true,
          },
          {
            text: 'Am',
            bold: true,
          },
          {
            text: 'ir Mohseni',
          },
          {
            text: 'Moghadam',
          },
        ],
      };

      const selection: SelectionInfo = {
        startIndex: 0,
        endIndex: 3,
        startOffset: 6,
        endOffset: 2,
      };

      let updatedBlock = updateBlock(initBlock, selection, 'bold', true);
      expect(updatedBlock).to.deep.equal(expectedBlock);
    });

    it('should update children correctly when middle parts have properties', () => {
      initBlock = {
        type: 'paragraph',
        children: [
          {
            text: 'Lorem ipsum dolor sit amet, ',
          },
          {
            text: 'consectetur',
            bold: true,
          },
          {
            text: ' adipiscing elit, sed do eiusmod tempor incididunt ut',
          },
        ],
      };

      const expectedBlock: FormatableBlock = {
        type: 'paragraph',
        children: [
          {
            text: 'Lorem ipsum dolor sit amet, ',
            bold: true,
          },
          {
            text: 'consectetur',
            bold: true,
          },
          {
            text: ' adipiscing elit, sed do eiusmod tempor incididunt ut',
            bold: true,
          },
        ],
      };

      const selection: SelectionInfo = {
        startIndex: 0,
        endIndex: 2,
        startOffset: 0,
        endOffset: 53,
      };

      const updatedBlock = updateBlock(initBlock, selection, 'bold', true);
      expect(updatedBlock).to.deep.equal(expectedBlock);
    });
  });
});
