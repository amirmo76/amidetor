import React, { KeyboardEvent, useState, useRef } from 'react';
import CSS from 'csstype';
import { ParagraphProps, Data } from './paragraph.types';
import './paragraph.styles.scss';

export const TYPE = 'paragraph';

export function getData(pNode: HTMLParagraphElement): Data {
  const newData: Data = {
    type: 'paragraph',
    children: Array.from(pNode.childNodes).map((node) => ({
      text: node.textContent || '',
    })),
  };
  return newData;
}

export function escape(str: string): string {
  let out = str;
  out = out.replace(/&/g, '&amp;');
  out = out.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  out = out.replace(/'/g, '&#39;').replace(/"/g, '&quot;');
  return out;
}

export function getHTML(data: Data): string {
  let html = '';
  data.children.map((node) => {
    if (node.text) html += `<span>${escape(node.text)}</span>`;
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

  const styles: CSS.Properties = {
    direction: value.direction,
    textAlign: value.textAlign,
  };

  return (
    <div className="amidetor__paragraph-wrapper">
      {React.createElement('p', {
        ref: ref,
        contentEditable: editable,
        suppressContentEditableWarning: true,
        onKeyDown: keyHandle,
        className: `${className ? className + ' ' : ''}amidetor__paragraph`,
        onClick: () => setEditable(true),
        dangerouslySetInnerHTML: { __html: getHTML(value) },
        style: styles,
        onBlur: () => ref.current && onChange(getData(ref.current)),
      })}
    </div>
  );
}

export function getEmptyBlock(): Data {
  return {
    type: 'paragraph',
    children: [],
  };
}

export default Paragraph;
