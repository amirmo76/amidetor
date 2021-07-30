import React from 'react';
import { mount } from '@cypress/react';
import * as Stories from './formatable.stories';
import { setSelection } from '../../helpers';

describe('Formatable Component', () => {
  it('should mount the given children', () => {
    mount(<Stories.Primary />);
    cy.contains('My Name').should('be.visible');
  });

  it('should show a menu on selection with mouse', () => {
    mount(<Stories.Primary />);
    setSelection(
      'p',
      {
        query: 'My',
        offset: 1,
      },
      {
        query: 'Amir',
        offset: 10,
      }
    )
      .get('.amidetor__formatable-menu')
      .should('be.visible');
  });
});
