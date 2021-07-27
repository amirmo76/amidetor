import React from 'react';
import { ButtonProps } from './button.types';
import './button.styles.scss';

const Button = ({ Icon, onClick, label, active }: ButtonProps) => {
  return (
    <button
      className={`amidetor__button${active ? ' amidetor__button--active' : ''}`}
      onClick={onClick}
      role="button"
      aria-label={label}
    >
      <Icon />
    </button>
  );
};

export default Button;
