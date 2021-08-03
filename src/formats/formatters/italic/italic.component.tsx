import React from 'react';
import { FormatterProps } from '../../formatters.types';
import {
  updateBlock,
  refactorChildren,
  useTestFormat,
} from '../../formatters.utils';
import Button from '../../../button';
import Icon from './italic.icon';

export const KEY = 'italic';

function Italic({ selectionInfo, value, onChange }: FormatterProps) {
  const active = useTestFormat(value, (child) => !!child[KEY], selectionInfo);

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
