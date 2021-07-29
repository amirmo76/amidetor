import React from 'react';
import Formatable from './formatable.component';
import { Meta } from '@storybook/react';

export default {
  title: 'Formatable',
  component: Formatable,
} as Meta;

export const Primary = () => (
  <Formatable>
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
