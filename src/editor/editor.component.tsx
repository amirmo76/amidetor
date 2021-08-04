import React, { useEffect, useState } from 'react';
import { EditorProps, EditorBlock } from './editor.types';
import Button from '../button';
import { PlusIcon, DeleteIcon } from './editor.icons';
import './editor.styles.scss';

const Editor = ({ defaultValue, blocks }: EditorProps) => {
  const [data, setData] = useState(defaultValue);
  useEffect(() => console.log('The data is: ', data));

  const newDataHandler = (index: number, newData: EditorBlock) => {
    if (data) {
      setData(data.map((cur, i) => (index === i ? newData : cur)));
    } else {
      setData([newData]);
    }
  };

  const removeBlock = (index: number): void =>
    setData(data?.filter((_, i) => i !== index));

  return (
    <div data-testid="amidetor" className="amidetor">
      {data?.map((block, i) => {
        const foundBlock = blocks.find((cur) => cur.TYPE === block.type);
        if (!foundBlock) return null;

        return (
          <div key={i} className="amidetor__block-wrapper">
            <div className="amidetor__actions">
              <Button
                label="add a new block"
                onClick={() => console.log('Clicked the plus button')}
                Icon={PlusIcon}
              />
              <Button
                label="delete block"
                onClick={() => removeBlock(i)}
                Icon={DeleteIcon}
              />
            </div>
            <foundBlock.Component
              value={block}
              onChange={(newData: EditorBlock) => newDataHandler(i, newData)}
              className="amidetor__block"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Editor;
