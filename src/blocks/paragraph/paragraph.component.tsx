import React from 'react';
import { ParagraphProps, onChangeFunc, Data } from './paragraph.types';
import './paragraph.styles.scss';

export const TYPE = 'paragraph';

const buildData = (pNode: HTMLElement, callBack: onChangeFunc) => {
  const newData: Data = {
    type: 'paragraph',
    children: Array.from(pNode.childNodes).map((node) => ({
      text: node.textContent || '',
    })),
  };
  callBack(newData);
};

const Paragraph = ({ defaultValue, onChange, className }: ParagraphProps) => {
  return (
    <p
      onBlur={(e) => buildData(e.target, onChange)}
      contentEditable
      suppressContentEditableWarning
      onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
      className={`${className} amidetor__paragraph`}
    >
      {defaultValue?.children.map((node, index) => (
        <span key={index}>{node.text}</span>
      ))}
    </p>
  );
};

export default Paragraph;
