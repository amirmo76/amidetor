import React from 'react';
import Formatable from './formatable.component';
import { Formatter } from '../formatters.types';
import { Meta } from '@storybook/react';
import Bold from '../formatters/bold';
import Italic from '../formatters/italic';
import Underline from '../formatters/underline';

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

const formatters: Formatter[] = [Bold, Italic, Underline];

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
