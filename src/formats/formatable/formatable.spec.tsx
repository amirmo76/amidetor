import React from 'react';
import { mount } from '@cypress/react';
import * as Stories from './formatable.stories';

describe('Formatable Component', () => {
  it('should mount', () => {
    mount(<Stories.Primary />);
  });
});
