import React, { KeyboardEvent, useState, useRef, useEffect } from 'react';
import { ParagraphProps, Data } from './paragraph.types';
import './paragraph.styles.scss';

export const TYPE = 'paragraph';

function getData(pNode: HTMLParagraphElement): Data {
  const newData: Data = {
    type: 'paragraph',
    children: Array.from(pNode.childNodes).map((node) => ({
      text: node.textContent || '',
    })),
  };
  return newData;
}

function getHTML(data: Data): string {
  let html = '';
  data.children.map((node) => {
    if (node.text) html += `<span>${node.text}</span>`;
  });
  return html;
}

function Paragraph({ value, onChange, className }: ParagraphProps) {
  const [editable, setEditable] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  const keyHandle = (e: KeyboardEvent) => {
    if (e.key === 'Enter') e.preventDefault();
    if (e.key === 'Escape') {
      setEditable(false);
      if (ref.current) onChange(getData(ref.current));
    }
  };

  return React.createElement('p', {
    ref: ref,
    contentEditable: editable,
    suppressContentEditableWarning: true,
    onKeyDown: keyHandle,
    className: `${className} amidetor__paragraph`,
    onClick: () => setEditable(true),
    dangerouslySetInnerHTML: { __html: getHTML(value) },
  });
}

export function getEmptyBlock(): Data {
  return {
    type: 'paragraph',
    children: [],
  };
}

export default Paragraph;
