import React from 'react';
import { render } from '@testing-library/react';
import Selection from './selection.component';
import { SelectionProps } from './selection.types';

describe('Selection Component', () => {
  let props: SelectionProps;

  beforeEach(() => {
    props = {
      onSelect: () => {},
    };
  });

  it('should render the element with children', () => {
    const { getByText } = render(
      <Selection {...props}>
        <p>Hello World!</p>
      </Selection>
    );
    expect(getByText(/Hello World!/)).toBeInTheDocument();
  });

  // it('should fire onSelect on text selection', () => {
  //   const onSelect = jest.fn();
  //   const { getByText } = render(
  //     <Selection {...props} onSelect={onSelect}>
  //       <p>Hello World!</p>
  //     </Selection>
  //   );
  //   const pElement = getByText(/Hello World!/);
  //   userEvent.type(pElement, '{selectAll}');
  //   expect(onSelect).toHaveBeenCalled();
  // });

  // it('should tell which part of the text has been selected', () => {
  //   const onSelect = jest.fn();
  //   const { getByText } = render(
  //     <Selection {...props} onSelect={onSelect}>
  //       <p>
  //         <span>This</span>
  //         <span> is a </span>
  //         <span>complex </span>
  //         <span>text</span>
  //         <span>!</span>
  //       </p>
  //     </Selection>
  //   );
  //   const pElement = getByText(/This/).parentElement;
  //   if (!pElement) return;
  //   userEvent.type(
  //     pElement,
  //     '{selectAll}{arrowleft}{arrowleft}{arrowleft}{arrowleft}'
  //   );
  //   let expectedReturn: SelectedInfo = {
  //     anchorIndex: 0,
  //     anchorOffset: 0,
  //     focusIndex: 3,
  //     focusOffset: 1,
  //   };
  //   expect(onSelect).lastCalledWith(expectedReturn);

  //   userEvent.type(
  //     pElement,
  //     '{selectAll}{arrowleft}{arrowleft}{arrowleft}{arrowright}{arrowright}'
  //   );
  //   expectedReturn = {
  //     anchorIndex: 0,
  //     anchorOffset: 2,
  //     focusIndex: 3,
  //     focusOffset: 2,
  //   };
  //   expect(onSelect).lastCalledWith(expectedReturn);
  // });
});
