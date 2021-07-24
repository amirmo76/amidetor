import React from 'react';
import { render } from '@testing-library/react';

import Button from './button.component';
import { ButtonProps } from './button.types';

describe('Button Component', () => {
  let props: ButtonProps;

  beforeEach(() => {
    props = {
      Icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </svg>
      ),
      onClick: () => {},
    };
  });

  const renderComponent = () => render(<Button {...props} />);

  it('should render button with an svg', () => {
    const { getByRole } = renderComponent();
    getByRole('button');
  });
});
