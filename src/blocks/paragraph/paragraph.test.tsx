import React from 'react';
import { render } from '@testing-library/react';

import Paragraph, { getData, getHTML } from './paragraph.component';
import { ParagraphProps, Data } from './paragraph.types';

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
      onChange: () => {},
    };
  });

  it('should display the text content correctly', () => {
    const { getByText } = render(<Paragraph {...props} />);
    const el = getByText(/Hello/, {
      exact: false,
    });
    expect(el).toBeInTheDocument();
  });

  it('should have the right classNames with no provided className', () => {
    const { getByText } = render(<Paragraph {...props} />);
    const el = getByText(/Hello/, { exact: true }).parentNode;
    expect(el).toHaveClass('amidetor__paragraph');
  });

  it('should have the right classNames provided a className', () => {
    const { getByText } = render(
      <Paragraph {...props} className="test_class" />
    );
    const el = getByText(/Hello/, { exact: true }).parentNode;
    expect(el).toHaveClass('test_class', 'amidetor__paragraph');
  });
});

describe('getData Function', () => {
  it('should get correct data from simple spans', () => {
    const { getByTestId } = render(
      <p data-testid="p">
        <span>Hello </span>
        <span> World!</span>
      </p>
    );
    const el = getByTestId('p');
    const data = getData(el as HTMLParagraphElement);
    expect(data.children.length).toBe(2);
    expect(data.children[0].text).toBe('Hello ');
    expect(data.children[1].text).toBe(' World!');
  });
});

describe('getHTML Function', () => {
  it('should get correct HTML from simple spans', () => {
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
    expect(html).toBe(expected);
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
    expect(html).toBe(expected);
  });
});
