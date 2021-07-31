import React from 'react';
import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './button.component';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const SampleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
  </svg>
);

interface PriamryProps {
  customOnClick?: () => any;
}

export const Primary = ({ customOnClick }: PriamryProps) => (
  <Button
    Icon={SampleIcon}
    label="test"
    onClick={customOnClick || action('onClick')}
  />
);

export const Active = () => (
  <Button Icon={SampleIcon} label="test" onClick={action('onClick')} active />
);
