import React from 'react';
import Formatable from './formatable.component';
import { Formatter } from '../formatters.types';
import { Meta } from '@storybook/react';

export default {
  title: 'Formats/Formatable',
  component: Formatable,
} as Meta;

export const Primary = () => (
  <Formatable
    formatters={[]}
    value={{ type: 'a block type', children: [] }}
    onChange={() => {}}
  >
    <p>
      <span>My</span>
      <span> Name is </span>
      <span>Amir Mohseni Moghadam</span>
      <span>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
        repudiandae necessitatibus earum similique iure cum explicabo, nobis
        accusamus ut est illum reprehenderit facere rerum esse quam, optio sint
        facilis beatae?
      </span>
      <span>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
        repudiandae necessitatibus earum similique iure cum explicabo, nobis
        accusamus ut est illum reprehenderit facere rerum esse quam, optio sint
        facilis beatae?
      </span>
      <span>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
        repudiandae necessitatibus earum similique iure cum explicabo, nobis
        accusamus ut est illum reprehenderit facere rerum esse quam, optio sint
        facilis beatae?
      </span>
    </p>
  </Formatable>
);

const formatters: Formatter[] = [
  {
    Component: () => <p id="formatter-1">Formatter-1</p>,
    KEY: 'some key',
  },
  {
    Component: () => <p id="formatter-2">Formatter-2</p>,
    KEY: 'some key',
  },
];

export const WithFormatters = () => (
  <Formatable
    formatters={formatters}
    value={{ type: 'a block type', children: [] }}
    onChange={() => {}}
  >
    <p>
      <span>My</span>
      <span> Name is </span>
      <span>Amir Mohseni Moghadam</span>
      <span>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
        repudiandae necessitatibus earum similique iure cum explicabo, nobis
        accusamus ut est illum reprehenderit facere rerum esse quam, optio sint
        facilis beatae?
      </span>
    </p>
  </Formatable>
);
