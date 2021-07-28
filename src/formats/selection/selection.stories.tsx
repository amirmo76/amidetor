import React from 'react';
import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Selection from './selection.component';

export default {
  title: 'Selection',
  component: Selection,
  argTypes: {
    children: {
      name: 'children',
      type: { name: 'React.Node', required: true },
      description: 'Children nodes to render and track selections.',
    },
    onSelect: {
      name: 'onSelect',
      type: { name: 'func', required: true },
      description: 'Will get called on each selection.',
      action: 'onSelect',
    },
  },
} as Meta;

export const primary = () => (
  <Selection onSelect={action('onSelect')}>
    <p>
      <span>My</span>
      <span> Name is </span>
      <span>Amir Mohseni Moghadam</span>
    </p>
  </Selection>
);
