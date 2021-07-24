import React from 'react';
import { ButtonProps } from './button.types';
import './button.styles.scss';

const Button = ({ Icon, onClick }: ButtonProps) => {
  return (
    <button className="amidetor__button" onClick={onClick} role="button">
      <Icon />
    </button>
  );
};

export default Button;
