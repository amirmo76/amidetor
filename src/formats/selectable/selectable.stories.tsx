import React from 'react';
import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Selectable from './selectable.component';

export default {
  title: 'Selectable',
  component: Selectable,
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
  <Selectable onSelect={action('onSelect')}>
    <p>
      <span>My</span>
      <span> Name is </span>
      <span>Amir Mohseni Moghadam</span>
    </p>
  </Selectable>
);
