/// <reference types="cypress" />
import { FormatableBlock, SelectionInfo } from './formatters.types';
import { refactorChildren } from './formatters.utils';

describe('refactorChildren Function', () => {
  it("should refactor given block's children", () => {
    const someSelection: SelectionInfo = {
      startIndex: 0,
      startOffset: 0,
      endIndex: 1,
      endOffset: 2,
    };
    const initBlock: FormatableBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'Some text',
          bold: true,
        },
        {
          text: ' Amir',
          bold: true,
        },
        {
          text: '!',
          bold: true,
          italic: true,
        },
      ],
    };

    const expectedBlock: FormatableBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'Some text Amir',
          bold: true,
        },
        {
          text: '!',
          bold: true,
          italic: true,
        },
      ],
    };

    const { block } = refactorChildren(initBlock, someSelection);
    expect(block).to.deep.equal(expectedBlock);
  });

  it("should refactor given block's children multiple times", () => {
    const someSelection: SelectionInfo = {
      startIndex: 0,
      startOffset: 0,
      endIndex: 0,
      endOffset: 2,
    };
    const initBlock: FormatableBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'Some text',
          bold: true,
        },
        {
          text: '2',
          bold: true,
        },
        {
          text: '3',
          bold: true,
        },
        {
          text: '4',
          bold: true,
        },
        {
          text: '!',
          bold: true,
          italic: true,
        },
      ],
    };

    const expectedBlock: FormatableBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'Some text234',
          bold: true,
        },
        {
          text: '!',
          bold: true,
          italic: true,
        },
      ],
    };

    const { block } = refactorChildren(initBlock, someSelection);
    expect(block).to.deep.equal(expectedBlock);
  });

  it('should return the same given block when no equal is found', () => {
    const someSelection: SelectionInfo = {
      startIndex: 0,
      startOffset: 0,
      endIndex: 1,
      endOffset: 2,
    };
    const initBlock: FormatableBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'Some text',
          bold: true,
        },
        {
          text: ' Amir',
        },
        {
          text: '!',
          bold: true,
          italic: true,
        },
      ],
    };

    const expectedBlock = initBlock;

    const { block } = refactorChildren(initBlock, someSelection);
    expect(block).to.deep.equal(expectedBlock);
  });

  it('should update the selection info correctly #1 BEFORE START', () => {
    const someSelection: SelectionInfo = {
      startIndex: 0,
      startOffset: 0,
      endIndex: 0,
      endOffset: 5,
    };
    const initBlock: FormatableBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'Some text',
          bold: true,
        },
        {
          text: ' Amir',
          bold: true,
        },
        {
          text: '!',
          bold: true,
          italic: true,
        },
      ],
    };
    const expectedBlock: FormatableBlock = {
      ...initBlock,
      children: [
        {
          text: 'Some text Amir',
          bold: true,
        },
        initBlock.children[2],
      ],
    };
    const expectedSelectionInfo = someSelection;
    const { block, selectionInfo } = refactorChildren(initBlock, someSelection);
    expect(block).to.deep.equal(expectedBlock);
    expect(selectionInfo).to.deep.equal(expectedSelectionInfo);
  });

  it('should update the selection info correctly #2 AFTER END', () => {
    const someSelection: SelectionInfo = {
      startIndex: 2,
      startOffset: 0,
      endIndex: 2,
      endOffset: 1,
    };
    const initBlock: FormatableBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'Some text',
          bold: true,
        },
        {
          text: ' Amir',
          bold: true,
        },
        {
          text: '!',
          bold: true,
          italic: true,
        },
      ],
    };
    const expectedBlock: FormatableBlock = {
      ...initBlock,
      children: [
        {
          text: 'Some text Amir',
          bold: true,
        },
        initBlock.children[2],
      ],
    };
    const expectedSelectionInfo: SelectionInfo = {
      startIndex: 1,
      startOffset: 0,
      endIndex: 1,
      endOffset: 1,
    };
    const { block, selectionInfo } = refactorChildren(initBlock, someSelection);
    expect(block).to.deep.equal(expectedBlock);
    expect(selectionInfo).to.deep.equal(expectedSelectionInfo);
  });

  it('should update the selection info correctly #3 COMBINED', () => {
    const someSelection: SelectionInfo = {
      startIndex: 1,
      startOffset: 0,
      endIndex: 1,
      endOffset: 5,
    };
    const initBlock: FormatableBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'Some text',
          bold: true,
        },
        {
          text: ' Amir',
          bold: true,
        },
        {
          text: '!',
          bold: true,
          italic: true,
        },
      ],
    };
    const expectedBlock: FormatableBlock = {
      ...initBlock,
      children: [
        {
          text: 'Some text Amir',
          bold: true,
        },
        initBlock.children[2],
      ],
    };
    const expectedSelectionInfo: SelectionInfo = {
      startIndex: 0,
      startOffset: 9,
      endIndex: 0,
      endOffset: expectedBlock.children[0].text.length,
    };
    const { block, selectionInfo } = refactorChildren(initBlock, someSelection);
    expect(block).to.deep.equal(expectedBlock);
    expect(selectionInfo).to.deep.equal(expectedSelectionInfo);
  });

  it('should update the selection info correctly #4 COMBINED', () => {
    const someSelection: SelectionInfo = {
      startIndex: 1,
      startOffset: 0,
      endIndex: 3,
      endOffset: 1,
    };
    const initBlock: FormatableBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'Some text',
          bold: true,
        },
        {
          text: '1',
          bold: true,
        },
        {
          text: '2',
          bold: true,
        },
        {
          text: '3',
          bold: true,
        },
        {
          text: '!',
          bold: true,
          italic: true,
        },
      ],
    };
    const expectedBlock: FormatableBlock = {
      ...initBlock,
      children: [
        {
          text: 'Some text123',
          bold: true,
        },
        initBlock.children[4],
      ],
    };
    const expectedSelectionInfo: SelectionInfo = {
      startIndex: 0,
      startOffset: 9,
      endIndex: 0,
      endOffset: expectedBlock.children[0].text.length,
    };
    const { block, selectionInfo } = refactorChildren(initBlock, someSelection);
    expect(block).to.deep.equal(expectedBlock);
    expect(selectionInfo).to.deep.equal(expectedSelectionInfo);
  });

  it('should update the selection info correctly #5 COMBINED', () => {
    const someSelection: SelectionInfo = {
      startIndex: 1,
      startOffset: 0,
      endIndex: 1,
      endOffset: 4,
    };
    const initBlock: FormatableBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'Some',
          bold: true,
        },
        {
          text: 'text',
        },
        {
          text: '1',
        },
        {
          text: '!',
          bold: true,
          italic: true,
        },
      ],
    };
    const expectedBlock: FormatableBlock = {
      ...initBlock,
      children: [
        {
          text: 'Some',
          bold: true,
        },
        {
          text: 'text1',
        },
        initBlock.children[3],
      ],
    };
    const expectedSelectionInfo: SelectionInfo = {
      startIndex: 1,
      startOffset: 0,
      endIndex: 1,
      endOffset: 4,
    };
    const { block, selectionInfo } = refactorChildren(initBlock, someSelection);
    expect(block).to.deep.equal(expectedBlock);
    expect(selectionInfo).to.deep.equal(expectedSelectionInfo);
  });

  it('should update the selection info correctly #6 COMBINED', () => {
    const someSelection: SelectionInfo = {
      startIndex: 2,
      startOffset: 0,
      endIndex: 3,
      endOffset: 2,
    };
    const initBlock: FormatableBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'Some',
          bold: true,
        },
        {
          text: '123',
        },
        {
          text: '4567',
        },
        {
          text: '89',
        },
        {
          text: '11213',
        },
        {
          text: '!',
          bold: true,
          italic: true,
        },
      ],
    };
    const expectedBlock: FormatableBlock = {
      ...initBlock,
      children: [
        {
          text: 'Some',
          bold: true,
        },
        {
          text: '12345678911213',
        },
        initBlock.children[5],
      ],
    };
    const expectedSelectionInfo: SelectionInfo = {
      startIndex: 1,
      startOffset: 3,
      endIndex: 1,
      endOffset: 9,
    };
    const { block, selectionInfo } = refactorChildren(initBlock, someSelection);
    expect(block).to.deep.equal(expectedBlock);
    expect(selectionInfo).to.deep.equal(expectedSelectionInfo);
  });
});
