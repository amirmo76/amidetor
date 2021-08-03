import React from 'react';
import { mount } from '@cypress/react';
import * as Stories from './paragraph.stories';
import Paragraph, { getData, getHTML } from './paragraph.component';
import { Data, ParagraphProps } from './paragraph.types';
import { Block } from '../blocks.types';

describe('Paragraph Component', () => {
  let props: ParagraphProps;

  beforeEach(() => {
    props = {
      value: {
        type: 'paragraph',
        children: [
          {
            text: 'Hello, This is a ',
          },
          {
            text: 'test',
          },
          {
            text: '. My name is Amir',
          },
          {
            text: ' by the way!',
          },
        ],
      },
      onChange: (data: Block) => console.log(data),
    };
  });

  it('should display the text content correctly', () => {
    mount(<Stories.Primary />);
    cy.contains('Hello, This is a');
  });

  it('should have the right classNames with provided className', () => {
    const className = 'test-class-name';
    mount(<Paragraph {...props} className={className} />);
    cy.get(`.${className}`);
  });

  it('should have the right classNames with no provided className', () => {
    mount(<Stories.Primary />);
    cy.get('.amidetor__paragraph');
  });

  it('should apply the rtl text direction setting correctly', () => {
    props.value.direction = 'rtl';
    mount(<Paragraph {...props} />);
    cy.get('p').should('have.css', 'direction', 'rtl');
  });

  it('should change the rtl button class correctly', () => {
    props.value.direction = 'rtl';
    mount(<Paragraph {...props} />);
    cy.get('[aria-label="right to left text direction"]').should(
      'have.class',
      'amidetor__button--active'
    );
  });

  it('should apply the ltr text direction setting correctly', () => {
    props.value.direction = 'ltr';
    mount(<Paragraph {...props} />);
    cy.get('p').should('have.css', 'direction', 'ltr');
  });

  it('should change the ltr button class correctly', () => {
    props.value.direction = 'ltr';
    mount(<Paragraph {...props} />);
    cy.get('[aria-label="left to right text direction"]').should(
      'have.class',
      'amidetor__button--active'
    );
  });

  it('should apply the right text align setting correctly', () => {
    props.value.textAlign = 'right';
    mount(<Paragraph {...props} />);
    cy.get('p').should('have.css', 'text-align', 'right');
  });

  it("should change the right text align button's class correctly", () => {
    props.value.textAlign = 'right';
    mount(<Paragraph {...props} />);
    cy.get('[aria-label="right text align"]').should(
      'have.class',
      'amidetor__button--active'
    );
  });

  it('should apply the left text align setting correctly', () => {
    props.value.textAlign = 'left';
    mount(<Paragraph {...props} />);
    cy.get('p').should('have.css', 'text-align', 'left');
  });

  it("should change the left align button's class correctly", () => {
    props.value.textAlign = 'left';
    mount(<Paragraph {...props} />);
    cy.get('[aria-label="left text align"]').should(
      'have.class',
      'amidetor__button--active'
    );
  });

  it('should apply the center text align setting correctly', () => {
    props.value.textAlign = 'center';
    mount(<Paragraph {...props} />);
    cy.get('p').should('have.css', 'text-align', 'center');
  });

  it("should change the center align button's class correctly", () => {
    props.value.textAlign = 'center';
    mount(<Paragraph {...props} />);
    cy.get('[aria-label="center text align"]').should(
      'have.class',
      'amidetor__button--active'
    );
  });

  it('should call the onChange correctly when clicking on the text align settings', () => {
    const stub1 = cy.stub();
    mount(<Paragraph {...props} onChange={stub1} />);
    // Text align center
    cy.get('[aria-label="center text align"]')
      .click()
      .then(() => {
        expect(stub1).to.be.calledOnceWith({
          ...props.value,
          textAlign: 'center',
        } as Data);
      });
    // Text align left
    const stub2 = cy.stub();
    mount(<Paragraph {...props} onChange={stub2} />);
    cy.get('[aria-label="left text align"]')
      .click()
      .then(() => {
        expect(stub2).to.be.calledWith({
          ...props.value,
          textAlign: 'left',
        } as Data);
      });
    // Text align right
    const stub3 = cy.stub();
    mount(<Paragraph {...props} onChange={stub3} />);
    cy.get('[aria-label="right text align"]')
      .click()
      .then(() => {
        expect(stub3).to.be.calledWith({
          ...props.value,
          textAlign: 'right',
        } as Data);
      });
  });

  it('should call the onChange correctly when clicking on the text direction settings', () => {
    const stub1 = cy.stub();
    mount(<Paragraph {...props} onChange={stub1} />);
    // ltr
    cy.get('[aria-label="left to right text direction"]')
      .click()
      .then(() => {
        expect(stub1).to.be.calledOnceWith({
          ...props.value,
          direction: 'ltr',
        } as Data);
      });
    // rtl
    const stub2 = cy.stub();
    mount(<Paragraph {...props} onChange={stub2} />);
    cy.get('[aria-label="right to left text direction"]')
      .click()
      .then(() => {
        expect(stub2).to.be.calledWith({
          ...props.value,
          direction: 'rtl',
        } as Data);
      });
  });

  it('should call the onChange correctly in combinational settings scenario', () => {
    const value: Data = {
      type: 'paragraph',
      children: [],
      textAlign: 'center',
    };
    const stub1 = cy.stub();
    mount(<Paragraph {...props} value={value} onChange={stub1} />);
    cy.get('[aria-label="left to right text direction"]')
      .click()
      .then(() => {
        expect(stub1).to.be.calledOnceWith({
          ...value,
          direction: 'ltr',
        } as Data);
      });
  });
});

describe('getData Function', () => {
  it('should get correct data from simple spans', () => {
    mount(
      <p data-testid="p">
        <span>Hello </span>
        <span> World!</span>
      </p>
    );
    cy.get('p').then(($el) => {
      const data = getData($el[0]);
      expect(data.children.length).to.equal(2);
      expect(data.children[0].text).to.equal('Hello ');
      expect(data.children[1].text).to.equal(' World!');
    });
  });
});

describe('getHTML Function', () => {
  it('should get correct HTML from the given object', () => {
    const sampleData: Data = {
      type: 'paragraph',
      children: [
        {
          text: 'My ',
        },
        {
          text: ' name is A',
        },
        {
          text: 'mir',
        },
      ],
    };
    const html = getHTML(sampleData);
    const expected = '<span>My </span><span> name is A</span><span>mir</span>';
    expect(html).to.equal(expected);
  });

  it('should escape html tags properly', () => {
    const sampleData: Data = {
      type: 'paragraph',
      children: [
        {
          text: 'M"y ',
        },
        {
          text: " n&ame i's <bold>Amir</bold>",
        },
      ],
    };
    const html = getHTML(sampleData);
    const expected =
      '<span>M&quot;y </span><span> n&amp;ame i&#39;s &lt;bold&gt;Amir&lt;/bold&gt;</span>';
    expect(html).to.equal(expected);
  });
});
