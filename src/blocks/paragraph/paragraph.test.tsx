import React from 'react';
import { mount } from '@cypress/react';
import * as Stories from './paragraph.stories';
import Paragraph, { getData, getHTML } from './paragraph.component';
import { ParagraphBlock, ParagraphProps } from './paragraph.types';
import { setSelection } from '../../helpers';

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
      className: 'test',
      onChange: (data: ParagraphBlock) => console.log(data),
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
        } as ParagraphBlock);
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
        } as ParagraphBlock);
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
        } as ParagraphBlock);
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
        } as ParagraphBlock);
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
        } as ParagraphBlock);
      });
  });

  it('should call the onChange correctly in combinational settings scenario', () => {
    const value: ParagraphBlock = {
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
        } as ParagraphBlock);
      });
  });

  it('should apply bold, italic and underline formats correctly', () => {
    const block: ParagraphBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'Hello there, My name is amir',
        },
      ],
    };
    const callback = cy.stub();
    mount(<Paragraph value={block} onChange={callback} className="Test" />);
    setSelection(
      'p',
      {
        query: 'My',
        offset: 13,
      },
      {
        query: 'My',
        offset: 15,
      }
    )
      .get('[aria-label="format bold"]')
      .click()
      .then(() => {
        expect(callback).to.be.calledWith({
          type: 'paragraph',
          children: [
            {
              text: 'Hello there, ',
            },
            {
              text: 'My',
              bold: true,
            },
            {
              text: ' name is amir',
            },
          ],
        } as ParagraphBlock);
      })
      .get('[aria-label="format italic"]')
      .click()
      .then(() => {
        expect(callback).to.be.calledWith({
          type: 'paragraph',
          children: [
            {
              text: 'Hello there, ',
            },
            {
              text: 'My',
              italic: true,
            },
            {
              text: ' name is amir',
            },
          ],
        } as ParagraphBlock);
      })
      .get('[aria-label="format underline"]')
      .click()
      .then(() => {
        expect(callback).to.be.calledWith({
          type: 'paragraph',
          children: [
            {
              text: 'Hello there, ',
            },
            {
              text: 'My',
              underline: true,
            },
            {
              text: ' name is amir',
            },
          ],
        } as ParagraphBlock);
      });
  });

  it('should apply bold styles', () => {
    const block: ParagraphBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'Hello ',
        },
        {
          text: 'Amir',
          bold: true,
        },
      ],
    };
    mount(<Paragraph value={block} onChange={() => {}} className="Test" />);
    cy.get('p span:nth-child(2)').should('have.css', 'font-weight', '700');
  });

  it('should apply italic styles', () => {
    const block: ParagraphBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'Hello ',
        },
        {
          text: 'Amir',
          italic: true,
        },
      ],
    };
    mount(<Paragraph value={block} onChange={() => {}} className="Test" />);
    cy.get('p span:nth-child(2)').should('have.css', 'font-style', 'italic');
  });

  it('should apply underline styles', () => {
    const block: ParagraphBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'Hello ',
        },
        {
          text: 'Amir',
          underline: true,
        },
      ],
    };
    mount(<Paragraph value={block} onChange={() => {}} className="Test" />);
    cy.get('p span:nth-child(2)').should(
      'have.css',
      'text-decoration-line',
      'underline'
    );
  });

  it('should call the onChange on blur with the correct formats', () => {
    const pBlock: ParagraphBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'Hello',
          bold: true,
        },
      ],
    };
    const callback = cy.stub();
    mount(<Paragraph value={pBlock} onChange={callback} className="Test" />);
    cy.get('p')
      .then(($el) => {
        const p = $el[0];
        p.click();
        p.focus();
        p.blur();
      })
      .then(() => {
        expect(callback).to.be.calledWith({
          ...pBlock,
          children: [
            {
              text: 'Hello',
              bold: true,
            },
          ],
        } as ParagraphBlock);
      });
  });
});

describe('getData Function', () => {
  it('should get correct data from simple spans', () => {
    const block: ParagraphBlock = {
      type: 'paragraph',
      children: [
        {
          text: 'Hello ',
          bold: true,
        },
        {
          text: ' World!',
        },
      ],
    };
    mount(
      <p data-testid="p">
        <span>Hello </span>
        <span> World!</span>
      </p>
    );
    cy.get('p').then(($el) => {
      const data = getData($el[0], block);
      expect(data.children.length).to.equal(2);
      expect(data.children[0].text).to.equal('Hello ');
      expect(data.children[1].text).to.equal(' World!');
      expect(data.children[0].bold).to.be.true;
    });
  });
});

describe('getHTML Function', () => {
  it('should get correct HTML from the given object', () => {
    const sampleData: ParagraphBlock = {
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
    const html = getHTML(sampleData, []);
    const expected = '<span>My </span><span> name is A</span><span>mir</span>';
    expect(html).to.equal(expected);
  });

  it('should escape html tags properly', () => {
    const sampleData: ParagraphBlock = {
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
    const html = getHTML(sampleData, []);
    const expected =
      '<span>M&quot;y </span><span> n&amp;ame i&#39;s &lt;bold&gt;Amir&lt;/bold&gt;</span>';
    expect(html).to.equal(expected);
  });
});
