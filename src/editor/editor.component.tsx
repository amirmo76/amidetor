import React, { useEffect, useState } from 'react';
import { EditorProps, Block } from './editor.types';
import Paragraph, {
  Data as ParagraphData,
  TYPE as PARAGRAPH_TYPE,
  getEmptyBlock as getEmptyParagraphBlock,
} from '../blocks/paragraph';
import Button from '../button';
import { PlusIcon, DeleteIcon } from './editor.icons';
import './editor.styles.scss';

const Editor = ({ defaultValue }: EditorProps) => {
  const [data, setData] = useState(defaultValue);
  useEffect(() => console.log('The data is: ', data));

  const newDataHandler = (index: number, newData: Block) => {
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
        if (block.type === PARAGRAPH_TYPE) {
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
              <Paragraph
                value={block as ParagraphData}
                onChange={(newData: Block) => newDataHandler(i, newData)}
                className="amidetor__block"
              />
            </div>
          );
        }
        return null;
      })}
      <div
        className="amidetor__add-area"
        onClick={() => {
          if (!data) setData([getEmptyParagraphBlock()]);
          else setData([...data, getEmptyParagraphBlock()]);
        }}
      />
    </div>
  );
};

export default Editor;
