import React from 'react';
import Icon from './underline.icon';
import Button from '../../../button';
import { FormatterProps } from '../../formatters.types';
import {
  updateBlock,
  refactorChildren,
  useTestFormat,
} from '../../formatters.utils';

export const KEY = 'underline';

function Underline({ value, onChange, selectionInfo }: FormatterProps) {
  const active = useTestFormat(value, (val) => !!val[KEY], selectionInfo);

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
      label="format underline"
      onClick={clickHandler}
      active={active}
    />
  );
}

export default Underline;
