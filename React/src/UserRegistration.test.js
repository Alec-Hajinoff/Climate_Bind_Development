import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import UserRegistration from './UserRegistration';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('UserRegistration', () => {
  let navigateMock;

  beforeEach(() => {
    // Reset the mock implementation before each test
    navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    // Mock the global fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      })
    );
  });

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  it('renders the registration form', () => {
    render(<UserRegistration />);

    expect(screen.getByPlaceholderText('Your first name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Choose a strong password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('updates form data when input values change', () => {
    render(<UserRegistration />);

    const firstNameInput = screen.getByPlaceholderText('Your first name');
    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Choose a strong password');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(firstNameInput.value).toBe('John');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('submits the form and navigates to RegisteredPage on success', async () => {
    render(<UserRegistration />);

    const firstNameInput = screen.getByPlaceholderText('Your first name');
    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Choose a strong password');
    const submitButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Check if loading spinner is displayed
    //expect(screen.getByRole('status')).toBeInTheDocument();

    // Simulate async resolution before checking assertions
    
await new Promise((resolve) => setTimeout(resolve, 0));

expect(global.fetch).toHaveBeenCalledWith(
  'http://localhost:8001/Climate_Bind_Development/form_capture.php',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name: 'John',
      email: 'john@example.com',
      password: 'password123',
    }),
  }
);


{/*}
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8001/Climate_Bind_Development/form_capture.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: 'John',
            email: 'john@example.com',
            password: 'password123',
          }),
        }
      );
    });
*/}


    // Check if navigation occurred
    expect(navigateMock).toHaveBeenCalledWith('/RegisteredPage');
  });

  it('displays an error message when registration fails', async () => {
    // Mock fetch to return a failure response
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: false }),
      })
    );

    render(<UserRegistration />);

    const firstNameInput = screen.getByPlaceholderText('Your first name');
    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Choose a strong password');
    const submitButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Registration failed. Please try again.')).toBeInTheDocument();
    });
  });

  it('displays an error message when fetch fails', async () => {
    // Mock fetch to throw an error
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Network error'))
    );

    render(<UserRegistration />);

    const submitButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('An error occurred.')).toBeInTheDocument();
    });
  });
});


{/*}
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserRegistration from "./UserRegistration.js"; 

describe("UserRegistration Component", () => {
  it("should render the first name input with the correct placeholder", () => {
    render(
      <BrowserRouter>
        <UserRegistration />
      </BrowserRouter>
    );
    const firstNameInput = screen.getByPlaceholderText("Your first name");
    expect(firstNameInput).toBeInTheDocument();
  });
});
*/}