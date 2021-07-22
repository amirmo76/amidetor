import React from 'react';
import { EditorProps } from './editor.types';
import './editor.styles.scss';

const Editor: React.FC<EditorProps> = ({ defaultValue }) => {
  console.log('The default value is: ', defaultValue);
  return (
    <div data-testid="amidetor" className="amidetor">
      This is from editor component
    </div>
  );
};

export default Editor;
