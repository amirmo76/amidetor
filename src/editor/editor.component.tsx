import React, { useEffect, useState } from 'react';
import { EditorProps, Block } from './editor.types';
import Paragraph, {
  Data as ParagraphData,
  TYPE as PARAGRAPH_TYPE,
} from '../blocks/paragraph';
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

  return (
    <div data-testid="amidetor" className="amidetor">
      {defaultValue?.map((block, i) => {
        if (block.type === PARAGRAPH_TYPE) {
          return (
            <div key={i}>
              <Paragraph
                defaultValue={block as ParagraphData}
                onChange={(newData: Block) => newDataHandler(i, newData)}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Editor;
