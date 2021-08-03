import React from 'react';
import { mount } from '@cypress/react';
import * as Stories from './formatable.stories';
import { setSelection } from '../../helpers';
import { getNodeIndex } from './formatable.component';

function selectSomething() {
  return setSelection(
    'p',
    {
      query: 'My',
      offset: 1,
    },
    {
      query: 'Amir',
      offset: 10,
    }
  );
}

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

  it('should display recived formatters in the menu', () => {
    mount(<Stories.WithFormatters />);
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
      .get('[aria-label="format bold"]')
      .should('be.visible')
      .get('[aria-label="format italic"]')
      .should('be.visible')
      .get('[aria-label="format underline"]')
      .should('be.visible');
  });

  it('should display formatters placeholder if formatters array is empty', () => {
    mount(<Stories.Primary />);
    selectSomething()
      .get('.amidetor__formatable-menu')
      .contains('No Formatter Found');
  });
});

describe('getNodeIndex Function', () => {
  it('should give the right index', () => {
    mount(
      <div>
        <span id="0">amir</span>
        <span id="1">Mohseni</span>
        <span id="2">Moghadam</span>
        <p>
          <span id="3">Another</span>
          <span id="4">test</span>
        </p>
      </div>
    );

    cy.get('#0').then(($el) => {
      expect(getNodeIndex($el[0])).to.equal(0);
    });

    cy.get('#1').then(($el) => {
      expect(getNodeIndex($el[0])).to.equal(1);
    });

    cy.get('#4').then(($el) => {
      expect(getNodeIndex($el[0])).to.equal(1);
    });
  });
});
