import React, { useMemo } from 'react';
import Button from '../../../button';
import Icon from './bold.icon';
import { FormatterProps } from '../../formatters.types';
import {
  updateBlock,
  refactorChildren,
  useTestFormat,
} from '../../formatters.utils';

export const KEY = 'bold';

function Bold({ value, onChange, selectionInfo }: FormatterProps) {
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
      onClick={clickHandler}
      label="format bold"
      active={active}
    />
  );
}

export default Bold;
