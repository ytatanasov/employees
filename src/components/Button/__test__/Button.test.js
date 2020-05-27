import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Button from '../Button';

const mockId = 'buttonMockId';
const mockContent = 'Button mock content';
const mockTitle = 'Button mock title';

describe('Button component test', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<Button id={mockId} content={mockContent} />);
    expect(getByTestId(mockId)).toBeInTheDocument();
  });

  it('renders text correctly', () => {
    const { getByText } = render(<Button content={mockContent} />);
    expect(getByText(mockContent)).toBeInTheDocument();
  });

  it('button is disabled if prop is passed', () => {
    const { getByTestId } = render(<Button id={mockId} disabled content={mockContent} />);
    expect(getByTestId(mockId)).toHaveAttribute('disabled');
  });

  it('button is not disabled if prop is not passed', () => {
    const { getByTestId } = render(<Button id={mockId} content={mockContent} />);
    expect(getByTestId(mockId)).not.toHaveAttribute('disabled');
  });

  it('button has title when prop is passed', () => {
    const { getByTestId } = render(<Button id={mockId} title={mockTitle} content={mockContent} />);
    expect(getByTestId(mockId)).toHaveAttribute('title');
  });

  it('button has not title when prop is not passed', () => {
    const { getByTestId } = render(<Button id={mockId} content={mockContent} />);
    expect(getByTestId(mockId)).not.toHaveAttribute('title');
  });

  it('renders with default size', () => {
    const { getByTestId } = render(<Button id={mockId} content={mockContent} />);
    expect(getByTestId(mockId)).not.toHaveClass('medium');
  });

  it('renders with custom size', () => {
    const { getByTestId } = render(<Button id={mockId} content={mockContent} md />);
    expect(getByTestId(mockId)).toHaveClass('medium');
  });

  it('renders with without background', () => {
    const { getByTestId } = render(<Button id={mockId} content={mockContent} icon />);
    expect(getByTestId(mockId)).toHaveClass('icon');
  });
});
