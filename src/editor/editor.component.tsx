import React, { useState } from 'react';
import { EditorProps, EditorBlock } from './editor.types';
import Button from '../button';
import { PlusIcon, DeleteIcon, CloseIcon } from './editor.icons';
import Dropdown from '../dropdown';
import './editor.styles.scss';

const Editor = ({ value, onChange, blocks }: EditorProps) => {
  const [dropdown, setDropdown] = useState({
    isOpen: false,
    index: 0,
  });

  const newDataHandler = (index: number, newData: EditorBlock) => {
    if (value) {
      onChange(value.map((cur, i) => (index === i ? newData : cur)));
    } else {
      onChange([newData]);
    }
  };

  const removeBlock = (index: number): void =>
    onChange(value.filter((_, i) => i !== index));

  return (
    <div data-testid="amidetor" className="amidetor">
      {value?.map((block, i) => {
        const foundBlock = blocks.find((cur) => cur.TYPE === block.type);
        if (!foundBlock) return null;

        return (
          <div key={i} className="amidetor__block-wrapper">
            <div className="amidetor__actions">
              <Button
                label="add a new block"
                onClick={() =>
                  setDropdown((prev) => ({ isOpen: !prev.isOpen, index: i }))
                }
                Icon={
                  dropdown.index === i && dropdown.isOpen ? CloseIcon : PlusIcon
                }
              />
              <Button
                label="delete block"
                onClick={() => removeBlock(i)}
                Icon={DeleteIcon}
              />
              {dropdown.index === i && dropdown.isOpen && (
                <div className="amidetor__dropdown-wrapper">
                  <Dropdown
                    items={blocks}
                    onClick={(type) => {
                      const newBlock = blocks
                        .find((cur) => cur.TYPE === type)
                        ?.getEmptyBlock();
                      if (!newBlock) return;
                      const prevBlocks = value.filter((_, index) => index <= i);
                      const afterBlocks = value.filter((_, index) => index > i);
                      onChange([...prevBlocks, newBlock, ...afterBlocks]);
                      setDropdown((prev) => ({
                        ...prev,
                        isOpen: false,
                      }));
                    }}
                  />
                </div>
              )}
            </div>
            <foundBlock.Component
              value={block}
              onChange={(newData: EditorBlock) => newDataHandler(i, newData)}
              className="amidetor__block"
            />
          </div>
        );
      })}
      <button
        type="button"
        className="amidetor__new"
        onClick={() => onChange([...value, blocks[0].getEmptyBlock()])}
      >
        NEW BLOCK
      </button>
    </div>
  );
};

export default Editor;
