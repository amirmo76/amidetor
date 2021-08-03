import React, { KeyboardEvent, useState, useRef } from 'react';
import CSS from 'csstype';
import Button from '../../button';
import Formatable from '../../formats/formatable';
import Bold from '../../formats/formatters/bold';
import Italic from '../../formats/formatters/italic';
import Underline from '../../formats/formatters/underline';
import {
  ParagraphProps,
  Data,
  SettingKeys,
  SettingsValues,
} from './paragraph.types';
import {
  RtlIcon,
  LtrIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  TextAlignLeftIcon,
} from './paragraph.icons';
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
      if (ref.current) onChange({ ...value, ...getData(ref.current) });
    }
  };

  const updateSettings = (key: SettingKeys, val: SettingsValues): void => {
    if (!ref.current) return;
    const newData: Data = {
      ...value,
      ...getData(ref.current),
      [key]: val,
    };
    onChange(newData);
  };

  const styles: CSS.Properties = {
    direction: value.direction,
    textAlign: value.textAlign,
  };

  return (
    <div className="amidetor__paragraph-wrapper">
      <div className="amidetor__paragraph-settings">
        <Button
          Icon={TextAlignLeftIcon}
          onClick={() => updateSettings('textAlign', 'left')}
          label="left text align"
          active={value.textAlign === 'left'}
        />
        <Button
          Icon={TextAlignCenterIcon}
          onClick={() => updateSettings('textAlign', 'center')}
          label="center text align"
          active={value.textAlign === 'center'}
        />
        <Button
          Icon={TextAlignRightIcon}
          onClick={() => updateSettings('textAlign', 'right')}
          label="right text align"
          active={value.textAlign === 'right'}
        />
        <Button
          Icon={LtrIcon}
          onClick={() => updateSettings('direction', 'ltr')}
          label="left to right text direction"
          active={value.direction === 'ltr'}
        />
        <Button
          Icon={RtlIcon}
          onClick={() => updateSettings('direction', 'rtl')}
          label="right to left text direction"
          active={value.direction === 'rtl'}
        />
      </div>
      <Formatable
        value={value}
        onChange={onChange}
        formatters={[Bold, Italic, Underline]}
      >
        {React.createElement('p', {
          ref: ref,
          contentEditable: editable,
          suppressContentEditableWarning: true,
          onKeyDown: keyHandle,
          className: `${className ? className + ' ' : ''}amidetor__paragraph`,
          onClick: () => setEditable(true),
          dangerouslySetInnerHTML: { __html: getHTML(value) },
          style: styles,
          onBlur: () =>
            ref.current && onChange({ ...value, ...getData(ref.current) }),
        })}
      </Formatable>
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
