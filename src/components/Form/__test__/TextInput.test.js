import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TextInput from '../TextInput/TextInput';

const wrapperDataId = 'text-input-wrapper';
const mockLabel = 'Text Input Mock Label';
const mockErrorText = 'Text Input Mock Error';

describe('TextInput component test', () => {
  afterEach(cleanup);

  it('component renders without crashing', () => {
    const { getByTestId } = render(<TextInput value="" />);
    expect(getByTestId(wrapperDataId)).toBeInTheDocument();
  });

  it('renders label text correctly', () => {
    const { getByText } = render(<TextInput value="" label={mockLabel} />);
    expect(getByText(mockLabel)).toBeInTheDocument();
  });

  it('input is required when prop is passed', () => {
    const { getByTestId } = render(<TextInput value="" required />);
    expect(getByTestId(wrapperDataId).firstChild).toHaveAttribute('required');
  });

  it('input is not required when prop is not passed', () => {
    const { getByTestId } = render(<TextInput value="" />);
    expect(getByTestId(wrapperDataId).firstChild).not.toHaveAttribute('required');
  });

  it('input has the same value as the passed prop `value`', () => {
    const { getByTestId } = render(<TextInput value="" />);
    expect(getByTestId(wrapperDataId).firstChild.value).toBe('');
    expect(getByTestId(wrapperDataId).firstChild.value).not.toBe('Test');
  });

  it('renders with errorText if prop is passed', () => {
    const { queryByText } = render(<TextInput error errorText={mockErrorText} value="" />);
    expect(queryByText(mockErrorText)).toBeInTheDocument();
  });

  it('renders without errorText if prop is not passed', () => {
    const { queryByText } = render(<TextInput value="" />);
    expect(queryByText(mockErrorText)).not.toBeInTheDocument();
  });
});
