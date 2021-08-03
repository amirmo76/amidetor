import React, { useMemo } from 'react';
import { FormatterProps } from '../../formatters.types';
import { updateBlock, refactorChildren } from '../../formatters.utils';
import Button from '../../../button';
import Icon from './italic.icon';

export const KEY = 'italic';

function Italic({ selectionInfo, value, onChange }: FormatterProps) {
  const active: boolean = useMemo(() => {
    if (!selectionInfo) return false;
    const inBetweenParts = value.children.filter(
      (_, i) => i >= selectionInfo.startIndex && i <= selectionInfo.endIndex
    );
    const hasTheFormatCount = inBetweenParts.reduce(
      (sum, cur) => (cur[KEY] ? sum + 1 : sum),
      0
    );
    return inBetweenParts.length === hasTheFormatCount ? true : false;
  }, [value, selectionInfo]);

  const clickHandler = () => {
    if (!selectionInfo) return;
    const updatedBlock = updateBlock(
      value,
      selectionInfo,
      KEY,
      active ? undefined : true
    );
    onChange(refactorChildren(updatedBlock));
  };

  return (
    <Button
      Icon={Icon}
      label="format italic"
      onClick={clickHandler}
      active={active}
    />
  );
}

export default Italic;
