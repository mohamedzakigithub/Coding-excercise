import '@testing-library/jest-dom';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from '../LoginForm';

const push = jest.fn();
const setUserDetails = jest.fn();

test('renders the Login form', () => {
  render(<Login push={push} setUserDetails={setUserDetails} />);
  expect(screen.queryByText('Please log in below')).toBeInTheDocument();
});

test('Show form validation error when submitting an empty form', async () => {
  render(<Login push={push} setUserDetails={setUserDetails} />);

  const loginButton = screen.getByRole('button', {
    name: /log in/i,
  });

  act(() => {
    userEvent.click(loginButton);
  });

  await waitFor(() => {
    expect(screen.queryByText('User Name is required.')).toBeInTheDocument();
  });
});
