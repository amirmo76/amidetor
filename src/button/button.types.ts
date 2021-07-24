import React from 'react';

export type ButtonProps = {
  Icon: React.FunctionComponent;
  onClick(e: React.MouseEvent): void;
};
