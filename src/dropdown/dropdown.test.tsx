import React from 'react';
import { mount } from '@cypress/react';
import Dropdown from './dropdown.component';
import { DropdownProps } from './dropdown.types';

const TestIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z" />
  </svg>
);

describe('Dropdown Component', () => {
  let props: DropdownProps;

  beforeEach(() => {
    props = {
      items: [
        {
          TYPE: 'p',
          title: 'paragraph',
          Icon: TestIcon,
        },
        {
          TYPE: 'h',
          title: 'heading',
          Icon: TestIcon,
        },
        {
          TYPE: 'img',
          title: 'image',
          Icon: TestIcon,
        },
        {
          TYPE: 'video',
          title: 'video',
          Icon: TestIcon,
        },
      ],
    };
  });

  it('should render a list of icons and titles', () => {
    mount(<Dropdown {...props} />);
    cy.get('svg').should('be.visible');
    cy.contains('paragraph');
    cy.contains('heading');
    cy.contains('image');
    cy.contains('video');
  });

  it('should have an input for search', () => {
    mount(<Dropdown {...props} />);
    cy.get('input').should('be.visible').should('have.attr', 'aria-label');
  });

  it('should search through items on search input', () => {
    mount(<Dropdown {...props} />);
    cy.get('input')
      .type('hea')
      .then(() => {
        cy.contains('heading');
        cy.contains('paragraph').should('not.exist');
      });
  });

  it('should call the onClick with the type of the selected block on mouse click', () => {
    const callback = cy.stub();
    mount(<Dropdown {...props} onClick={callback} />);
    cy.contains('heading')
      .click()
      .then(() => {
        expect(callback).to.be.calledWith('h');
      });
  });
});
