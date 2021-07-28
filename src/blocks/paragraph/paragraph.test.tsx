import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

  it('should apply text direction setting correctly', () => {
    const { getByText } = render(<Paragraph {...props} />);
    const pElement = getByText(/Hello/, { exact: false }).parentElement;
    expect(pElement?.style.direction).toBe('');

    cleanup();
    props.value.direction = 'rtl';
    const { getByText: getByText2 } = render(<Paragraph {...props} />);
    const pElement2 = getByText2(/Hello/, { exact: false }).parentElement;
    expect(pElement2?.style.direction).toBe('rtl');

    cleanup();
    props.value.direction = 'ltr';
    const { getByText: getByText3 } = render(<Paragraph {...props} />);
    const pElement3 = getByText3(/Hello/, { exact: false }).parentElement;
    expect(pElement3?.style.direction).toBe('ltr');
  });

  it('should apply text align setting correctly', () => {
    const { getByText } = render(<Paragraph {...props} />);
    const pElement = getByText(/Hello/, { exact: false }).parentElement;
    expect(pElement?.style.textAlign).toBe('');

    cleanup();
    props.value.textAlign = 'left';
    const { getByText: getByText2 } = render(<Paragraph {...props} />);
    const pElement2 = getByText2(/Hello/, { exact: false }).parentElement;
    expect(pElement2?.style.textAlign).toBe('left');

    cleanup();
    props.value.textAlign = 'center';
    const { getByText: getByText3 } = render(<Paragraph {...props} />);
    const pElement3 = getByText3(/Hello/, { exact: false }).parentElement;
    expect(pElement3?.style.textAlign).toBe('center');

    cleanup();
    props.value.textAlign = 'right';
    const { getByText: getByText4 } = render(<Paragraph {...props} />);
    const pElement4 = getByText4(/Hello/, { exact: false }).parentElement;
    expect(pElement4?.style.textAlign).toBe('right');
  });

  it('should call onChange function with applied settings', () => {
    const onChangeFunc = jest.fn();
    const { getByRole } = render(
      <Paragraph {...props} onChange={onChangeFunc} />
    );
    const LtrBtn = getByRole('button', {
      name: 'left to right text direction',
    });
    const RtlBtn = getByRole('button', {
      name: 'right to left text direction',
    });
    const TxtAlignLeft = getByRole('button', {
      name: 'left text align',
    });
    const TxtAlignCenter = getByRole('button', {
      name: 'center text align',
    });
    const TxtAlignRight = getByRole('button', {
      name: 'right text align',
    });

    userEvent.click(LtrBtn);
    let expectedObj: Data = {
      type: 'paragraph',
      children: props.value.children,
      direction: 'ltr',
    };
    expect(onChangeFunc).lastCalledWith(expectedObj);

    userEvent.click(RtlBtn);
    expectedObj.direction = 'rtl';
    expect(onChangeFunc).lastCalledWith(expectedObj);

    expectedObj = {
      type: 'paragraph',
      children: props.value.children,
    };
    userEvent.click(TxtAlignLeft);
    expectedObj.textAlign = 'left';
    expect(onChangeFunc).lastCalledWith(expectedObj);

    userEvent.click(TxtAlignCenter);
    expectedObj.textAlign = 'center';
    expect(onChangeFunc).lastCalledWith(expectedObj);

    userEvent.click(TxtAlignRight);
    expectedObj.textAlign = 'right';
    expect(onChangeFunc).lastCalledWith(expectedObj);
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
