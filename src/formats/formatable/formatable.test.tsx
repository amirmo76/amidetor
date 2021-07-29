import React from 'react';
import { render } from '@testing-library/react';
import Formatable, { getNodeIndex } from './formatable.component';

describe('Fromatable Component', () => {
  const children = (
    <p>
      <span>My</span>
      <span> Name is </span>
      <span>Amir Mohseni Moghadam</span>
    </p>
  );

  it('should render the given children', () => {
    const { getByText } = render(<Formatable>{children}</Formatable>);
    expect(getByText(/My/)).toBeInTheDocument();
    expect(getByText(/Amir Mohseni Moghadam/)).toBeInTheDocument();
  });
});

describe('get node index function', () => {
  it('should give the right index', () => {
    const { getByText } = render(
      <div>
        <span>amir</span>
        <span>Mohseni</span>
        <span>Moghadam</span>
        <p>
          <span>Another</span>
          <span>test</span>
        </p>
      </div>
    );

    expect(getNodeIndex(getByText(/amir/))).toBe(0);
    expect(getNodeIndex(getByText(/Mohseni/))).toBe(1);
    expect(getNodeIndex(getByText(/test/))).toBe(1);
  });
});
