import React from 'react';
import { mount } from '@cypress/react';
import * as Stories from './button.stories';

describe('Button Component', () => {
  it('should render the button with an svg', () => {
    mount(<Stories.Primary />);
    cy.get('svg').should('be.visible');
  });

  it('should fire the callback function on click', () => {
    const onClickFunc = cy.stub();
    mount(<Stories.Primary customOnClick={onClickFunc} />);
    cy.get('button')
      .click()
      .then(() => {
        expect(onClickFunc).to.have.been.calledOnce;
      });
  });

  it('should apply the label', () => {
    mount(<Stories.Primary />);
    cy.get('button').then(($el) => {
      expect($el[0]).to.have.attr('aria-label').match(/test/);
    });
  });

  it('should apply active styles', () => {
    mount(<Stories.Active />);
    cy.get('button').should('have.class', 'amidetor__button--active');
  });
});
