import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button from './button.component';
import { ButtonProps } from './button.types';

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

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = { Icon: SampleIcon };
