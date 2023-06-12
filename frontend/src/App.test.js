import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Store from './redux/store';
import App from './App';

test('renders labby', () => {
  render(
    <Provider store={Store}>
      <App />
    </Provider>
  );

  // expect(screen.getByText("Not a user? Create an account ")).toBeInTheDocument();
  const signup = screen.getByTestId("signup");
  expect(signup).toBeInTheDocument();
});
