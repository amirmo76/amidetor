import { useMemo } from 'react';
import { Block, Child } from '../blocks/blocks.types';
import { SelectionInfo } from './formatters.types';

export function updateBlock(
  block: Block,
  selectionInfo: SelectionInfo,
  key: string,
  value: any
): Block {
  const newBlock: Block = {
    ...block,
    children: [],
  };

  const startBlock = block.children.find(
    (_, i) => i === selectionInfo.startIndex
  );
  let endBlock = block.children.find((_, i) => i === selectionInfo.endIndex);
  if (!startBlock || !endBlock) return block;
  if (!startBlock.text || !endBlock.text) return block;
  if (
    startBlock.text.length - 1 < selectionInfo.startOffset ||
    startBlock.text.length < selectionInfo.endOffset
  )
    return block;

  // add all the parts before the start index
  newBlock.children.push(
    ...block.children.filter((_, i) => i < selectionInfo.startIndex)
  );

  // split the start index
  const startFirstHalf: Child = {
    ...startBlock,
    text: startBlock.text.substring(0, selectionInfo.startOffset),
  };
  if (startFirstHalf.text?.length) newBlock.children.push(startFirstHalf);

  const startSecondHalf: Child = {
    ...startBlock,
    text: startBlock.text.substring(selectionInfo.startOffset),
    [key]: value,
  };

  if (startSecondHalf[key] === undefined) delete startSecondHalf[key];

  if (startSecondHalf.text?.length) newBlock.children.push(startSecondHalf);

  // add the parts between the start and end indexes
  newBlock.children.push(
    ...block.children
      .filter(
        (_, i) => i > selectionInfo.startIndex && i < selectionInfo.endIndex
      )
      .map((cur) => {
        const returnVlaue = {
          ...cur,
          [key]: value,
        };
        if (value === undefined) delete returnVlaue[key];
        return returnVlaue;
      })
  );

  // split the end index
  endBlock =
    selectionInfo.startIndex === selectionInfo.endIndex
      ? newBlock.children.pop()
      : endBlock;

  const endFirstHalf: Child = {
    ...endBlock,
    text: endBlock?.text?.substring(
      0,
      selectionInfo.startIndex === selectionInfo.endIndex
        ? selectionInfo.endOffset - selectionInfo.startOffset
        : selectionInfo.endOffset
    ),
    [key]: value,
  };

  if (endFirstHalf[key] === undefined) delete endFirstHalf[key];

  if (endFirstHalf.text?.length) newBlock.children.push(endFirstHalf);

  const endSecondHalf: Child = {
    ...endBlock,
    text: endBlock?.text?.substring(
      selectionInfo.startIndex === selectionInfo.endIndex
        ? selectionInfo.endOffset - selectionInfo.startOffset
        : selectionInfo.endOffset
    ),
  };

  if (selectionInfo.startIndex === selectionInfo.endIndex) {
    endSecondHalf[key] = block.children[selectionInfo.endIndex][key];
    if (endSecondHalf[key] === undefined) delete endSecondHalf[key];
  }
  if (endSecondHalf.text?.length) newBlock.children.push(endSecondHalf);

  // add the parts after the end indexes
  newBlock.children.push(
    ...block.children.filter((_, i) => i > selectionInfo.endIndex)
  );

  return newBlock;
}

export function refactorChildren(block: Block): Block {
  try {
    const newBlock: Block = {
      ...block,
      children: [],
    };

    block.children.forEach((cur, i) => {
      if (i === 0) newBlock.children.push(cur);
      else {
        const comparableOne = {
          ...newBlock.children[newBlock.children.length - 1],
        };
        comparableOne.text = undefined;
        const comparableTwo = { ...cur };
        comparableTwo.text = undefined;
        if (JSON.stringify(comparableOne) === JSON.stringify(comparableTwo)) {
          const prev = newBlock.children.pop();
          if (prev && prev.text !== undefined && cur.text !== undefined) {
            const newPushable: Child = { ...prev, text: prev.text + cur.text };
            newBlock.children.push(newPushable);
          }
        } else {
          newBlock.children.push(cur);
        }
      }
    });

    return newBlock;
  } catch {
    return block;
  }
}

export function useTestFormat(
  value: Block,
  test: (val: Child) => boolean,
  selectionInfo?: SelectionInfo | null
): boolean {
  const isActive = useMemo(() => {
    if (!selectionInfo) return false;
    const inBetweenParts = value.children.filter(
      (_, i) => i >= selectionInfo.startIndex && i <= selectionInfo.endIndex
    );
    const hasTheFormatCount = inBetweenParts.reduce(
      (sum, cur) => (test(cur) ? sum + 1 : sum),
      0
    );
    return inBetweenParts.length === hasTheFormatCount ? true : false;
  }, [value, selectionInfo, test]);
  return isActive;
}
