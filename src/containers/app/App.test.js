import React from 'react';
import { render } from '@testing-library/react';
import App from './components/App';

describe('App component', () => {

  it('renders without crashing', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('layoutContainer')).toBeInTheDocument();
  });

});
