import { useMemo } from 'react';
import {
  SelectionInfo,
  FormatableChild,
  FormatableBlock,
  Refactored,
} from './formatters.types';

export function updateBlock(
  block: FormatableBlock,
  selectionInfo: SelectionInfo,
  key: string,
  value: any
): FormatableBlock {
  const newBlock: FormatableBlock = {
    ...block,
    children: [],
  };

  const startChild = block.children.find(
    (_, i) => i === selectionInfo.startIndex
  );
  let endChild = block.children.find((_, i) => i === selectionInfo.endIndex);
  if (!startChild || !endChild) return block;
  if (!startChild.text || !endChild.text) return block;
  if (
    startChild.text.length - 1 < selectionInfo.startOffset ||
    endChild.text.length < selectionInfo.endOffset
  )
    return block;
  // add all the parts before the start index
  newBlock.children.push(
    ...block.children.filter((_, i) => i < selectionInfo.startIndex)
  );

  // split the start index
  const startFirstHalf: FormatableChild = {
    ...startChild,
    text: startChild.text.substring(0, selectionInfo.startOffset),
  };
  if (startFirstHalf.text?.length) newBlock.children.push(startFirstHalf);

  const startSecondHalf: FormatableChild = {
    ...startChild,
    text: startChild.text.substring(selectionInfo.startOffset),
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
  endChild =
    selectionInfo.startIndex === selectionInfo.endIndex
      ? newBlock.children.pop()
      : endChild;

  if (!endChild) return block;
  const endFirstHalf: FormatableChild = {
    ...endChild,
    text: endChild.text.substring(
      0,
      selectionInfo.startIndex === selectionInfo.endIndex
        ? selectionInfo.endOffset - selectionInfo.startOffset
        : selectionInfo.endOffset
    ),
    [key]: value,
  };

  if (endFirstHalf[key] === undefined) delete endFirstHalf[key];

  if (endFirstHalf.text?.length) newBlock.children.push(endFirstHalf);

  const endSecondHalf: FormatableChild = {
    ...endChild,
    text: endChild?.text?.substring(
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

export function comapreObjects(obj1: object, obj2: object) {
  let same = true;
  Object.keys(obj1).forEach((k1) => {
    if (JSON.stringify(obj1[k1]) !== JSON.stringify(obj2[k1])) same = false;
  });
  Object.keys(obj2).forEach((k2) => {
    if (JSON.stringify(obj1[k2]) !== JSON.stringify(obj2[k2])) same = false;
  });
  return same;
}

export function refactorChildren(
  block: FormatableBlock,
  selectionInfo: SelectionInfo
): Refactored {
  try {
    const newBlock: FormatableBlock = JSON.parse(JSON.stringify(block));
    const newSelectionInfo: SelectionInfo = JSON.parse(
      JSON.stringify(selectionInfo)
    );
    let foundIndex = -1;

    for (let index = 0; index < block.children.length - 1; index++) {
      const firstChild: FormatableChild = {
        ...block.children[index],
        text: '',
      };
      const secondChild: FormatableChild = {
        ...block.children[index + 1],
        text: '',
      };
      if (comapreObjects(firstChild, secondChild)) foundIndex = index;
    }

    if (foundIndex < 0) return { block, selectionInfo };
    // merge children
    newBlock.children[foundIndex].text =
      newBlock.children[foundIndex].text +
      newBlock.children[foundIndex + 1].text;
    newBlock.children = newBlock.children.filter(
      (_, i) => i !== foundIndex + 1
    );
    // recalculate selection info
    // --- start index
    if (selectionInfo.startIndex >= foundIndex + 1)
      newSelectionInfo.startIndex = selectionInfo.startIndex - 1;
    // --- end index
    if (selectionInfo.endIndex >= foundIndex + 1)
      newSelectionInfo.endIndex = selectionInfo.endIndex - 1;
    // --- start offset
    if (selectionInfo.startIndex === foundIndex + 1)
      newSelectionInfo.startOffset =
        selectionInfo.startOffset + block.children[foundIndex].text.length;
    // --- end offset
    if (selectionInfo.endIndex === foundIndex + 1)
      newSelectionInfo.endOffset =
        selectionInfo.endOffset + block.children[foundIndex].text.length;
    return refactorChildren(newBlock, newSelectionInfo);
  } catch {
    return { block, selectionInfo };
  }
}

export function useTestFormat(
  value: FormatableBlock,
  test: (val: FormatableChild) => boolean,
  selectionInfo?: SelectionInfo | null
): boolean {
  const isActive = useMemo(() => {
    if (!selectionInfo) return false;
    if (value.children.length === 0) return false;
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

/**
 * It updates the selection info based on an updated block and
 * the selection info used to get the updated block.
 * @param block
 * The return block of the updateBlock function when passed the
 * selection info.
 * @param selectionInfo
 * the selection info used to update the block
 * @returns
 * The updated selection info
 */
export function updateSelectionInfo(
  block: FormatableBlock,
  selectionInfo: SelectionInfo
): SelectionInfo {
  const newSelectionInfo = selectionInfo;
  // add one to the start and end index if there was a start offset
  if (selectionInfo.startOffset) {
    newSelectionInfo.startIndex = selectionInfo.startIndex + 1;
    newSelectionInfo.endIndex = selectionInfo.endIndex + 1;
  }
  // always set the start offset to 0
  newSelectionInfo.startOffset = 0;
  // always set the end offset to the length of the new end index text
  newSelectionInfo.endOffset =
    block.children[newSelectionInfo.endIndex].text.length;
  return newSelectionInfo;
}
